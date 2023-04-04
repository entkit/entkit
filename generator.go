package entkit

import (
	"bytes"
	"entgo.io/contrib/entgql"
	"entgo.io/ent/entc/gen"
	"fmt"
	"io/fs"
	"os"
	"os/exec"
	"path"
	"path/filepath"
	"strings"
	"text/template"
)

type Generator struct {
	Extension *Extension `json:"Extension,omitempty"`
	Path      *string    `json:"Path,omitempty"`
	Enabled   *bool      `json:"Enabled,omitempty"`
	Adapter   GeneratorAdapter
	Graph     *gen.Graph
	SkipModes SkipModes
	Ops       []gen.Op
}

type SkipModes struct {
	SkipAll                 int
	SkipEnumField           entgql.SkipMode
	SkipMutationCreateInput entgql.SkipMode
	SkipMutationUpdateInput entgql.SkipMode
	SkipOrderField          entgql.SkipMode
	SkipWhereInput          entgql.SkipMode
}

func (sm *SkipModes) Cast(value int) entgql.SkipMode {
	return entgql.SkipMode(value)
}

type GeneratorAdapter interface {
	GetName() string
}

type GeneratorAdapterWithDependencies interface {
	GetDependencies() []GeneratorAdapter
}

type GeneratorAdapterWithFS interface {
	GetFS() fs.FS
}

type GeneratorAdapterWithAfterCommand interface {
	CommandAfterGen() string
}

type GeneratorAdapterWithTemplates interface {
	GeneratorAdapterWithFS
	GetTemplates() []string
}

type GeneratorAdapterWithStaticTemplates interface {
	GeneratorAdapterWithFS
	GetStaticTemplates() []string
}

func parseTemplate(path string, adapter GeneratorAdapterWithFS) *gen.Template {
	t := gen.NewTemplate(path).Funcs(funcMap)
	var _funcMap template.FuncMap = map[string]interface{}{}
	// copied from: https://github.com/helm/helm/blob/8648ccf5d35d682dcd5f7a9c2082f0aaf071e817/pkg/engine/engine.go#L147-L154
	_funcMap["include"] = func(name string, data interface{}) (string, error) {
		buf := bytes.NewBuffer(nil)
		if err := t.ExecuteTemplate(buf, name, data); err != nil {
			return "", err
		}
		return buf.String(), nil
	}

	return gen.MustParse(t.Funcs(_funcMap).ParseFS(adapter.GetFS(), path))
}

func (gr *Generator) Generate(graph *gen.Graph) {
	gr.Graph = graph

	uiAdapterWithDependencies, ok := gr.Adapter.(GeneratorAdapterWithDependencies)
	if ok {
		deps := uiAdapterWithDependencies.GetDependencies()
		for _, depAdapter := range deps {
			gr.generateAdapterOutput(depAdapter, graph)
		}
	}

	gr.generateAdapterOutput(gr.Adapter, graph)

	gr.runAfterGenCommands()
}

func (gr *Generator) generateAdapterOutput(adapter GeneratorAdapter, graph *gen.Graph) {
	uIAdapterWithFS, ok := adapter.(GeneratorAdapterWithFS)
	if !ok {
		panic("unable to parse template from adapter that not implements FS")
	}

	genWithTemplates, ok := (adapter).(GeneratorAdapterWithTemplates)
	if ok {
		for _, t := range genWithTemplates.GetTemplates() {
			_t := parseTemplate(t, uIAdapterWithFS)
			gr.rendAndSave(_t, true)
		}
	}

	genWithStaticTemplates, ok := (adapter).(GeneratorAdapterWithStaticTemplates)
	if ok {
		for _, t := range genWithStaticTemplates.GetStaticTemplates() {
			_t := parseTemplate(t, uIAdapterWithFS)
			gr.rendAndSave(_t, false)
		}
	}
}

func (gr *Generator) runAfterGenCommands() {
	adapterWithAfterGenCommand, ok := (gr.Adapter).(GeneratorAdapterWithAfterCommand)
	if !ok {
		return
	}
	cmd := exec.Command("/bin/sh", "-c", adapterWithAfterGenCommand.CommandAfterGen())
	cmd.Dir = PString(gr.Path)
	out, _ := cmd.Output()
	println(string(out))
}

func (gr *Generator) rendAndSave(tmpl *gen.Template, override bool) {
	rootName := path.Base(tmpl.Name())
	for _, t := range tmpl.Templates() {
		var b bytes.Buffer

		if t.Name() == rootName {
			continue
		}

		if strings.HasPrefix(t.Name(), "partial:") {
			continue
		}

		t = t.Funcs(funcMap)

		err := tmpl.ExecuteTemplate(&b, t.Name(), gr)
		if err != nil {
			panic(err)
		}

		err = gr.saveGenerated(t.Name(), b, override)
		if err != nil {
			panic(err)
		}
	}
}

func (gr *Generator) exists(name string) bool {
	_, err := os.Stat(name)
	return !os.IsNotExist(err)
}

func (gr *Generator) saveFile(path string, content []byte, override bool) error {
	if override {
		_ = os.Remove(path)
	} else if gr.exists(path) {
		return nil
	}

	f, err := os.Create(path)
	if err != nil {
		return err
	}

	defer f.Close()

	_, err = f.Write(content)

	return err
}

func (gr *Generator) saveGenerated(name string, content bytes.Buffer, override bool) error {
	resDir := PString(gr.Path)
	p := filepath.Join(resDir, name)

	err := os.MkdirAll(filepath.Dir(p), os.ModePerm)
	if err != nil {
		panic(err)
	}

	return gr.saveFile(p, content.Bytes(), override)
}

type GeneratorOption = func(*Generator) error

func GeneratorHook(ex *Extension) gen.Hook {
	return func(next gen.Generator) gen.Generator {
		return gen.GenerateFunc(func(g *gen.Graph) error {

			var tracked = false

			if PBool(ex.IgnoreUncommittedChanges) {
				tracked = true
			} else {
				cmd := exec.Command("git", "update-index", "--refresh")
				_ = cmd.Run()
				cmd = exec.Command("git", "diff-index", "--quiet", "HEAD", "--")
				err := cmd.Run()
				if exitError, ok := err.(*exec.ExitError); ok {
					if exitError.ExitCode() > 0 {
						fmt.Println("entkit: skipped: \"It seems you have uncommitted changes. Please commit them before proceeding with code generation.\"")
					}
				} else {
					tracked = true
				}
			}

			if tracked {
				for _, generator := range ex.Generators {
					generator.Generate(g)
				}
			}

			return next.Generate(g)
		})
	}
}

func NewGenerator(extension *Extension, path string, adapter GeneratorAdapter, options ...GeneratorOption) *Generator {
	ui := &Generator{
		Extension: extension,
		Path:      StringP(path),
		Adapter:   adapter,
		SkipModes: SkipModes{
			SkipEnumField:           entgql.SkipEnumField,
			SkipMutationCreateInput: entgql.SkipMutationCreateInput,
			SkipMutationUpdateInput: entgql.SkipMutationUpdateInput,
			SkipOrderField:          entgql.SkipOrderField,
			SkipWhereInput:          entgql.SkipWhereInput,
		},
		Ops: []gen.Op{
			gen.EQ,
			gen.NEQ,
			gen.GT,
			gen.GTE,
			gen.LT,
			gen.LTE,
			gen.IsNil,
			gen.NotNil,
			gen.In,
			gen.NotIn,
			gen.EqualFold,
			gen.Contains,
			gen.ContainsFold,
			gen.HasPrefix,
			gen.HasSuffix,
		},
	}
	for _, opt := range options {
		if err := opt(ui); err != nil {
			panic(err)
		}
	}
	return ui
}
