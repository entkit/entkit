package EntRefine

import (
	"bytes"
	"embed"
	"encoding/json"
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/entc/gen"
	"github.com/Masterminds/sprig/v3"
	"github.com/diazoxide/ent-refine/common"
	"log"
	"os"
	"path"
	"path/filepath"
	"text/template"
)

var (
	//go:embed refine-templates/*
	_templates embed.FS
	_funcMap   = template.FuncMap{
		"label": common.ToLabel,
	}
	funcMap = template.FuncMap{}

	JsDependencies = map[string]string{
		"pluralize":         "^8.0.0",
		"camelcase":         "^6.2.0",
		"gql-query-builder": "^3.5.5",
		"graphql-request":   "^4.3.0",
		"graphql":           "^15.6.1",
		"truncate":          "^3.0.0",
	}

	JsDevDependencies = map[string]string{
		"@types/pluralize": "^0.0.29",
	}

	RefineCreateTemplate       = parseT("refine-templates/Create.gotsx")
	RefineEditTemplate         = parseT("refine-templates/Edit.gotsx")
	RefineListTemplate         = parseT("refine-templates/List.gotsx")
	RefineResourcesTemplate    = parseT("refine-templates/Resources.gotsx")
	RefineShowTemplate         = parseT("refine-templates/Show.gotsx")
	RefineInterfacesTemplate   = parseT("refine-templates/Interfaces.gots")
	RefineDataProviderTemplate = parseT("refine-templates/DataProvider.gots")
	AllTemplates               = []*gen.Template{
		RefineCreateTemplate,
		RefineEditTemplate,
		RefineListTemplate,
		RefineResourcesTemplate,
		RefineShowTemplate,
		RefineInterfacesTemplate,
		RefineDataProviderTemplate,
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

func (sm *SkipModes) Cast(value int) entgql.SkipMode {
	return entgql.SkipMode(value)
}

type RefineGen struct {
	Extension *Extension
	Entities  []ent.Interface
	Graph     *gen.Graph
	SkipModes SkipModes
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
	}
	return rg
}

func (rg *RefineGen) FieldTypeName(field gen.Field) string {
	switch field.Type.String() {
	case "uuid.UUID":
		return "string"
	case "time.Time":
		return "Date"
	default:
		return "string"
	}
}

func (rg *RefineGen) saveGenerated(name string, content bytes.Buffer) error {
	dir := path.Join(rg.Extension.appPath, rg.Extension.srcDirName, "ent-refine")
	err := os.MkdirAll(dir, 0777)
	if err != nil {
		panic(err)
	}

	p := filepath.Join(dir, name)

	return rg.saveFile(p, content.Bytes())
}

func (rg *RefineGen) saveFile(path string, content []byte) error {
	_ = os.Remove(path)

	f, err := os.Create(path)
	if err != nil {
		return err
	}

	defer f.Close()

	_, err = f.Write(content)

	return err
}

func parseT(path string) *gen.Template {
	if len(funcMap) == 0 {
		for k, v := range _funcMap {
			funcMap[k] = v
		}

		for k, v := range sprig.FuncMap() {
			funcMap[k] = v
		}

		for k, v := range gen.Funcs {
			funcMap[k] = v
		}

		for k, v := range entgql.TemplateFuncs {
			funcMap[k] = v
		}
	}

	return gen.MustParse(gen.NewTemplate(path).
		Funcs(funcMap).
		ParseFS(_templates, path))
}

func (rg *RefineGen) Generate() {
	for _, t := range AllTemplates {
		rg.rendAndSave(t)
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

	err = rg.saveFile(packageJsonPath, r)
	if err != nil {
		log.Fatalln(err.Error())
	}
}

func (rg *RefineGen) rendAndSave(tmpl *gen.Template) {
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

		err = rg.saveGenerated(t.Name(), b)
		if err != nil {
			panic(err)
		}
	}
}
