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
	Name          *string    `json:"Name,omitempty"`
	Extension     *Extension `json:"Extension,omitempty"`
	SkipGoModTidy *bool      `json:"SkipGoModTidy,omitempty"`

	Adapter GeneratorAdapter
	Path    *string `json:"Path,omitempty"`
	Enabled *bool   `json:"Enabled,omitempty"`
	Serve   *bool   `json:"Serve,omitempty"`

	Graph     *gen.Graph
	SkipModes SkipModes
	Ops       []gen.Op

	CWD    *string `json:"CWD,omitempty"` // base directory of gen.go file or running `go generate` command CWD
	RelCWD *string `json:"RelCWD"`        // relative directory of CWD and current generator path
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
	CommandAfterGen(generator *Generator) string
}

type GeneratorAdapterWithBeforeCommand interface {
	CommandBeforeGen(generator *Generator) string
}

type GeneratorAdapterWithBefore interface {
	BeforeGen(generator *Generator) error
}

type GeneratorAdapterWithAfter interface {
	AfterGen(generator *Generator) error
}

type GeneratorAdapterWithTemplates interface {
	GeneratorAdapterWithFS
	GetTemplates() []string
}

type GeneratorAdapterWithStaticTemplates interface {
	GeneratorAdapterWithFS
	GetStaticTemplates() []string
}

func (gr *Generator) parseTemplate(path string, adapter GeneratorAdapterWithFS) *gen.Template {
	t := gen.NewTemplate(path).Funcs(gr.Extension.funcMap)
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

func (gr *Generator) ServableAdapter() ServableAdapter {
	sa, ok := (gr.Adapter).(ServableAdapter)
	if ok {
		return sa
	}
	panic("provided Adapter is not a ServableAdapter")
}

func (gr *Generator) Generate(graph *gen.Graph) {
	gr.Graph = graph

	gr.runBeforeGenCommands()
	gr.runBeforeGen()

	adapterWithDependencies, ok := gr.Adapter.(GeneratorAdapterWithDependencies)
	if ok {
		deps := adapterWithDependencies.GetDependencies()
		for _, depAdapter := range deps {
			gr.generateAdapterOutput(depAdapter, graph)
		}
	}

	gr.generateAdapterOutput(gr.Adapter, graph)

	if !PBool(gr.SkipGoModTidy) {
		gr.runCMD("go mod tidy -e")
	}

	gr.runAfterGenCommand()
	gr.runAfterGen()
}

func (gr *Generator) generateAdapterOutput(adapter GeneratorAdapter, graph *gen.Graph) {
	adapterWithFS, ok := adapter.(GeneratorAdapterWithFS)
	if !ok {
		panic("unable to parse template from adapter that not implements FS")
	}

	genWithTemplates, ok := (adapter).(GeneratorAdapterWithTemplates)
	if ok {
		for _, t := range genWithTemplates.GetTemplates() {
			_t := gr.parseTemplate(t, adapterWithFS)
			gr.rendAndSave(_t, true)
		}
	}

	genWithStaticTemplates, ok := (adapter).(GeneratorAdapterWithStaticTemplates)
	if ok {
		for _, t := range genWithStaticTemplates.GetStaticTemplates() {
			_t := gr.parseTemplate(t, adapterWithFS)
			gr.rendAndSave(_t, false)
		}
	}
}

func (gr *Generator) runAfterGen() {
	adapter, ok := (gr.Adapter).(GeneratorAdapterWithAfter)
	if !ok {
		return
	}
	err := adapter.AfterGen(gr)
	if err != nil {
		panic(err)
	}
}

func (gr *Generator) runBeforeGen() {
	adapter, ok := (gr.Adapter).(GeneratorAdapterWithBefore)
	if !ok {
		return
	}
	err := adapter.BeforeGen(gr)
	if err != nil {
		panic(err)
	}
}

func (gr *Generator) runCMD(command string) {
	cmd := exec.Command("/bin/sh", "-c", command)
	cmd.Dir = PString(gr.Path)
	out, err := cmd.Output()
	if err != nil {
		fmt.Println("Command", cmd, string(out), err.Error())
	}
}

func (gr *Generator) runAfterGenCommand() {
	adapterWithAfterGenCommand, ok := (gr.Adapter).(GeneratorAdapterWithAfterCommand)
	if !ok {
		return
	}
	gr.runCMD(adapterWithAfterGenCommand.CommandAfterGen(gr))
}

func (gr *Generator) runBeforeGenCommands() {
	adapterWithBeforeGenCommand, ok := (gr.Adapter).(GeneratorAdapterWithBeforeCommand)
	if !ok {
		return
	}
	gr.runCMD(adapterWithBeforeGenCommand.CommandBeforeGen(gr))
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

		t = t.Funcs(gr.Extension.funcMap)

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

func TargetPath(path string) GeneratorOption {
	return func(gen *Generator) (err error) {
		gen.Path = StringP(path)
		return nil
	}
}

func SkipGoModTidy() GeneratorOption {
	return func(gen *Generator) (err error) {
		gen.SkipGoModTidy = BoolP(true)
		return nil
	}
}

func GeneratorHook(ex *Extension) gen.Hook {
	return func(next gen.Generator) gen.Generator {
		return gen.GenerateFunc(func(g *gen.Graph) error {
			// Run ent codegen first to ensure working against an updated schema.
			if err := next.Generate(g); err != nil {
				return err
			}

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

			return nil
		})
	}
}

func NewGenerator(extension *Extension, name string, adapter GeneratorAdapter, options ...GeneratorOption) *Generator {
	var err error
	g := &Generator{
		Name:      StringP(name),
		Extension: extension,
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

	cwd, err := os.Getwd()
	if err != nil {
		panic(err)
	}
	g.CWD = &cwd

	for _, opt := range options {
		if err := opt(g); err != nil {
			panic(err)
		}
	}

	_, ok := (g.Adapter).(ServableAdapter)
	if ok {
		if g.Serve == nil {
			g.Serve = BoolP(true)
		}
	}

	if g.Path == nil {
		g.Path = StringP("./" + name)
	}

	absPath, err := filepath.Abs(*g.Path)
	if err != nil {
		panic(err)
	}

	relCWD, err := filepath.Rel(absPath, *g.CWD)
	if err != nil {
		panic(err)
	}

	g.RelCWD = &relCWD
	return g
}

func (gr *Generator) DefaultActions() []*Action {
	return DefaultActions
}
