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

type UI struct {
	Extension *Extension `json:"Extension,omitempty"`
	Path      *string    `json:"Path,omitempty"`
	Enabled   *bool      `json:"Enabled,omitempty"`
	Adapter   UIAdapter
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

type UIAdapter interface {
	GetName() string
}

type UIAdapterWithDependencies interface {
	GetDependencies() []UIAdapter
}

type UIAdapterWithFS interface {
	GetFS() fs.FS
}

type UIAdapterWithAfterCommand interface {
	CommandAfterGen() string
}

type UIAdapterWithTemplates interface {
	UIAdapterWithFS
	GetTemplates() []string
}

type UIAdapterWithStaticTemplates interface {
	UIAdapterWithFS
	GetStaticTemplates() []string
}

func parseTemplate(path string, adapter UIAdapterWithFS) *gen.Template {
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

func (ui *UI) Generate(graph *gen.Graph) {
	ui.Graph = graph

	uiAdapterWithDependencies, ok := ui.Adapter.(UIAdapterWithDependencies)
	if ok {
		deps := uiAdapterWithDependencies.GetDependencies()
		for _, depAdapter := range deps {
			ui.generateAdapterOutput(depAdapter, graph)
		}
	}

	ui.generateAdapterOutput(ui.Adapter, graph)

	ui.runAfterGenCommands()
}

func (ui *UI) generateAdapterOutput(adapter UIAdapter, graph *gen.Graph) {
	uIAdapterWithFS, ok := adapter.(UIAdapterWithFS)
	if !ok {
		panic("unable to parse template from adapter that not implements FS")
	}

	uiWithTemplates, ok := (adapter).(UIAdapterWithTemplates)
	if ok {
		for _, t := range uiWithTemplates.GetTemplates() {
			_t := parseTemplate(t, uIAdapterWithFS)
			ui.rendAndSave(_t, true)
		}
	}

	uiWithStaticTemplates, ok := (adapter).(UIAdapterWithStaticTemplates)
	if ok {
		for _, t := range uiWithStaticTemplates.GetStaticTemplates() {
			_t := parseTemplate(t, uIAdapterWithFS)
			ui.rendAndSave(_t, false)
		}
	}
}

func (ui *UI) runAfterGenCommands() {
	adapterWithAfterGenCommand, ok := (ui.Adapter).(UIAdapterWithAfterCommand)
	if !ok {
		return
	}
	cmd := exec.Command("/bin/sh", "-c", adapterWithAfterGenCommand.CommandAfterGen())
	cmd.Dir = PString(ui.Path)
	out, _ := cmd.Output()
	println(string(out))
}

func (ui *UI) rendAndSave(tmpl *gen.Template, override bool) {
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

		err := tmpl.ExecuteTemplate(&b, t.Name(), ui)
		if err != nil {
			panic(err)
		}

		err = ui.saveGenerated(t.Name(), b, override)
		if err != nil {
			panic(err)
		}
	}
}

func (ui *UI) exists(name string) bool {
	_, err := os.Stat(name)
	return !os.IsNotExist(err)
}

func (ui *UI) saveFile(path string, content []byte, override bool) error {
	if override {
		_ = os.Remove(path)
	} else if ui.exists(path) {
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

func (ui *UI) saveGenerated(name string, content bytes.Buffer, override bool) error {
	resDir := PString(ui.Path)
	p := filepath.Join(resDir, name)

	err := os.MkdirAll(filepath.Dir(p), os.ModePerm)
	if err != nil {
		panic(err)
	}

	return ui.saveFile(p, content.Bytes(), override)
}

type UIOption = func(*UI) error

func GenerateUIsHook(ex *Extension) gen.Hook {
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
				for _, ui := range ex.UIs {
					ui.Generate(g)
				}
			}

			return next.Generate(g)
		})
	}
}

func NewUI(path string, adapter UIAdapter, options ...UIOption) *UI {
	ui := &UI{
		Path:    StringP(path),
		Adapter: adapter,
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
