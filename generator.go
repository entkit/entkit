package entrefine

import (
	"bytes"
	"embed"
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/entc/gen"
	"fmt"
	"os"
	"os/exec"
	"path"
	"path/filepath"
	"strings"
	"text/template"
)

type JSDeps struct {
	Deps    map[string]string
	DevDeps map[string]string
}

var (
	//go:embed refine-templates/*
	_refineTemplates embed.FS
)

type SkipModes struct {
	SkipAll                 int
	SkipEnumField           entgql.SkipMode
	SkipMutationCreateInput entgql.SkipMode
	SkipMutationUpdateInput entgql.SkipMode
	SkipOrderField          entgql.SkipMode
	SkipWhereInput          entgql.SkipMode
}

func GenerateRefineScripts(ex *Extension) gen.Hook {
	return func(next gen.Generator) gen.Generator {
		return gen.GenerateFunc(func(g *gen.Graph) error {

			tracked := false
			cmd := exec.Command("git", "update-index", "--refresh")
			_ = cmd.Run()
			cmd = exec.Command("git", "diff-index", "--quiet", "HEAD", "--")
			err := cmd.Run()
			if exitError, ok := err.(*exec.ExitError); ok {
				if exitError.ExitCode() > 0 {
					fmt.Println("entrefine: skipped: \"It seems you have uncommitted changes. Please commit them before proceeding with code generation.\"")
				}
			} else {
				tracked = true
			}

			if tracked {
				NewRefineGen(ex, g).Generate()
			}
			return next.Generate(g)
		})
	}
}

func (sm *SkipModes) Cast(value int) entgql.SkipMode {
	return entgql.SkipMode(value)
}

type RefineGen struct {
	Extension *Extension
	Entities  []ent.Interface
	Graph     *gen.Graph
	SkipModes SkipModes
	Ops       []gen.Op
	Prefix    string
}

func NewRefineGen(extension *Extension, graph *gen.Graph) *RefineGen {
	rg := &RefineGen{
		Extension: extension,
		Prefix:    extension.Prefix,
		Graph:     graph,
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
	return rg
}

// saveGenerated Save generated file
func (rg *RefineGen) saveGenerated(name string, content bytes.Buffer, override bool) error {
	resDir := rg.Extension.AppPath
	p := filepath.Join(resDir, name)

	err := os.MkdirAll(filepath.Dir(p), os.ModePerm)
	if err != nil {
		panic(err)
	}

	return rg.saveFile(p, content.Bytes(), override)
}

func (rg *RefineGen) exists(name string) bool {
	_, err := os.Stat(name)
	return !os.IsNotExist(err)
}

func (rg *RefineGen) saveFile(path string, content []byte, override bool) error {
	if override {
		_ = os.Remove(path)
	} else if rg.exists(path) {
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

func parseT(path string) *gen.Template {

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

	return gen.MustParse(t.Funcs(_funcMap).ParseFS(_refineTemplates, path))
}

func (rg *RefineGen) Generate() {
	var (
		DynamicTemplates = []*gen.Template{
			parseT("refine-templates/Tsconfig.gojson"),
			parseT("refine-templates/Gitignore.goignore"),
			parseT("refine-templates/NpmRC.goenv"),
			parseT("refine-templates/Package.gojson"),
			parseT("refine-templates/Index.gohtml"),
			parseT("refine-templates/Definition.gots"),
			parseT("refine-templates/Index.gotsx"),
			parseT("refine-templates/Login.gotsx"),
			parseT("refine-templates/App.gotsx"),
			parseT("refine-templates/Show.gotsx"),
			parseT("refine-templates/Form.gotsx"),
			parseT("refine-templates/Table.gotsx"),
			parseT("refine-templates/List.gotsx"),
			parseT("refine-templates/Resources.gotsx"),
			parseT("refine-templates/Routes.gotsx"),
			parseT("refine-templates/Interfaces.gots"),
			parseT("refine-templates/DataProvider.gots"),
			parseT("refine-templates/SearchComponent.gotsx"),
			parseT("refine-templates/SorterEnums.gotsx"),
			parseT("refine-templates/View.gotsx"),
			parseT("refine-templates/Actions.gotsx"),
			parseT("refine-templates/Helpers.gotsx"),
			parseT("refine-templates/Diagram.gotsx"),
		}
		StaticTemplates = []*gen.Template{
			parseT("refine-templates/Custom.gotsx"),
		}
	)
	for _, t := range DynamicTemplates {
		rg.rendAndSave(t, true)
	}

	for _, t := range StaticTemplates {
		rg.rendAndSave(t, false)
	}

	rg.updatePackages()
}

func (rg *RefineGen) updatePackages() {
	cmd := exec.Command("/bin/sh", "-c", "npm i && npm run lint && npm run build")
	cmd.Dir = rg.Extension.AppPath
	out, _ := cmd.Output()
	println(string(out))
}

func (rg *RefineGen) rendAndSave(tmpl *gen.Template, override bool) {
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

		err := tmpl.ExecuteTemplate(&b, t.Name(), rg)
		if err != nil {
			panic(err)
		}

		err = rg.saveGenerated(t.Name(), b, override)
		if err != nil {
			panic(err)
		}
	}
}
