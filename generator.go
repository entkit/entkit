package EntRefine

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
)

var (
	//go:embed refine-templates/*
	_refineTemplates embed.FS

	JsDependencies = map[string]string{
		"pluralize":         "^8.0.0",
		"camelcase":         "^6.2.0",
		"gql-query-builder": "^3.5.5",
		"graphql-request":   "^4.3.0",
		"graphql":           "^15.6.1",
		"lodash":            "^4.17.21",
	}

	JsDevDependencies = map[string]string{
		"@types/pluralize": "^0.0.29",
		"@types/lodash":    "^4.14.171",
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
}

func NewRefineGen(extension *Extension, graph *gen.Graph) *RefineGen {
	rg := &RefineGen{
		Extension: extension,
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
	resDir := path.Join(rg.Extension.appPath, rg.Extension.srcDirName, "ent-refine")
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
	return gen.MustParse(gen.NewTemplate(path).
		Funcs(funcMap).
		ParseFS(_refineTemplates, path))
}

func (rg *RefineGen) Generate() {
	var (
		RefineCreateTemplate          = parseT("refine-templates/Create.gotsx")
		RefineEditTemplate            = parseT("refine-templates/Edit.gotsx")
		RefineTableTemplate           = parseT("refine-templates/Table.gotsx")
		RefineListTemplate            = parseT("refine-templates/List.gotsx")
		RefineResourcesTemplate       = parseT("refine-templates/Resources.gotsx")
		RefineShowTemplate            = parseT("refine-templates/Show.gotsx")
		RefineInterfacesTemplate      = parseT("refine-templates/Interfaces.gots")
		RefineDataProviderTemplate    = parseT("refine-templates/DataProvider.gots")
		RefineSearchComponentTemplate = parseT("refine-templates/SearchComponent.gotsx")
		RefineSorterEnumsTemplate     = parseT("refine-templates/SorterEnums.gotsx")
		RefineFieldViewsTemplate      = parseT("refine-templates/FieldViews.gotsx")
		HelpersTemplate               = parseT("refine-templates/Helpers.gotsx")
		CustomTemplate                = parseT("refine-templates/Custom.gotsx")

		DynamicTemplates = []*gen.Template{
			RefineCreateTemplate,
			RefineEditTemplate,
			RefineTableTemplate,
			RefineListTemplate,
			RefineResourcesTemplate,
			RefineShowTemplate,
			RefineInterfacesTemplate,
			RefineDataProviderTemplate,
			RefineSearchComponentTemplate,
			RefineSorterEnumsTemplate,
			RefineFieldViewsTemplate,
			HelpersTemplate,
		}
		StaticTemplates = []*gen.Template{
			CustomTemplate,
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
	packageJsonPath := path.Join(rg.Extension.appPath, "package.json")
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
	for name, ver := range JsDependencies {
		v[name] = ver
	}
	p["dependencies"] = v

	devDeps := p["devDependencies"]
	v, ok = devDeps.(map[string]interface{})
	if !ok {
		log.Fatalln("Something bad happened. Check your package.json `devDependencies`", devDeps)
	}
	for name, ver := range JsDevDependencies {
		v[name] = ver
	}
	p["devDependencies"] = v

	r, err := json.MarshalIndent(p, "", "  ")

	err = rg.saveFile(packageJsonPath, r, true)
	if err != nil {
		log.Fatalln(err.Error())
	}

	cmd := exec.Command("/bin/sh", "-c", "npm ls || npm ci ; npm run build")
	cmd.Dir = rg.Extension.appPath
	out, err := cmd.Output()
	println(string(out))
}

func (rg *RefineGen) rendAndSave(tmpl *gen.Template, override bool) {
	var b bytes.Buffer
	rootName := path.Base(tmpl.Name())

	for _, t := range tmpl.Templates() {
		if t.Name() == rootName {
			continue
		}

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
