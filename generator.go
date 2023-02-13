package entrefine

import (
	"bytes"
	"embed"
	"encoding/json"
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/entc/gen"
	"log"
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

	Dependencies = JSDeps{
		Deps: map[string]string{
			"pluralize":         "^8.0.0",
			"camelcase":         "^6.2.0",
			"gql-query-builder": "^3.5.5",
			"graphql-request":   "^4.3.0",
			"graphql":           "^15.6.1",
			"lodash":            "^4.17.21",
		},
		DevDeps: map[string]string{
			"@types/pluralize": "^0.0.29",
			"@types/lodash":    "^4.14.171",
		},
	}

	ForceGraph2DDependencies = JSDeps{
		Deps: map[string]string{
			"react-force-graph-2d": "^1.23.17",
		},
	}

	GoJSDependencies = JSDeps{
		Deps: map[string]string{
			"gojs":       "^2.3.1",
			"gojs-react": "^1.1.1",
		},
	}
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
			NewRefineGen(ex, g).Generate()
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
		Prefix:    extension.TypeScriptPrefix,
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

func (rg *RefineGen) GetJSDependencies() JSDeps {
	combined := Dependencies

	if rg.Extension.GoJs.Enabled {
		for k, v := range GoJSDependencies.Deps {
			combined.Deps[k] = v
		}
		for k, v := range GoJSDependencies.DevDeps {
			combined.DevDeps[k] = v
		}
	}

	if rg.Extension.ForceGraph2D.Enabled {
		for k, v := range ForceGraph2DDependencies.Deps {
			combined.Deps[k] = v
		}
		for k, v := range ForceGraph2DDependencies.DevDeps {
			combined.DevDeps[k] = v
		}
	}
	return combined
}

// saveGenerated Save generated file
func (rg *RefineGen) saveGenerated(name string, content bytes.Buffer, override bool) error {
	resDir := path.Join(rg.Extension.AppPath, rg.Extension.SrcDirName, "entrefine")
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
			parseT("refine-templates/Definition.gots"),
			parseT("refine-templates/Show.gotsx"),
			parseT("refine-templates/MainShow.gotsx"),
			parseT("refine-templates/Form.gotsx"),
			parseT("refine-templates/Table.gotsx"),
			parseT("refine-templates/List.gotsx"),
			parseT("refine-templates/Resources.gotsx"),
			parseT("refine-templates/Interfaces.gots"),
			parseT("refine-templates/DataProvider.gots"),
			parseT("refine-templates/SearchComponent.gotsx"),
			parseT("refine-templates/SorterEnums.gotsx"),
			parseT("refine-templates/View.gotsx"),
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

	rg.updatePackageJson()
}

func (rg *RefineGen) updatePackageJson() {
	packageJsonPath := path.Join(rg.Extension.AppPath, "package.json")
	dat, err := os.ReadFile(packageJsonPath)
	if err != nil {
		panic(err.Error())
	}

	var p map[string]interface{}
	err = json.Unmarshal(dat, &p)
	if err != nil {
		panic(err.Error())
	}

	deps := p["dependencies"]
	v, ok := deps.(map[string]interface{})
	if !ok {
		log.Fatalln("Something bad happened. Check your package.json `dependencies`", deps)
	}

	_deps := rg.GetJSDependencies()

	for name, ver := range _deps.Deps {
		v[name] = ver
	}
	p["dependencies"] = v

	devDeps := p["devDependencies"]
	v, ok = devDeps.(map[string]interface{})
	if !ok {
		log.Fatalln("Something bad happened. Check your package.json `devDependencies`", devDeps)
	}
	for name, ver := range _deps.DevDeps {
		v[name] = ver
	}
	p["devDependencies"] = v

	r, err := json.MarshalIndent(p, "", "  ")

	err = rg.saveFile(packageJsonPath, r, true)
	if err != nil {
		log.Fatalln(err.Error())
	}

	cmd := exec.Command("/bin/sh", "-c", "npm i; npm run build")
	cmd.Dir = rg.Extension.AppPath
	out, err := cmd.Output()
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
