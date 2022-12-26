package refine

import (
	"bytes"
	"embed"
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/entc/gen"
	"github.com/Masterminds/sprig/v3"
	"os"
	"path/filepath"
	"text/template"
)

var (
	//go:embed templates/*
	_templates embed.FS
	funcMap    *template.FuncMap
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

	RefineCreateTemplate     *gen.Template
	RefineEditTemplate       *gen.Template
	RefineListTemplate       *gen.Template
	RefineShowTemplate       *gen.Template
	RefineInterfacesTemplate *gen.Template
	RefineResourcesTemplate  *gen.Template
}

func NewRefineGen(extension *Extension, graph *gen.Graph) *RefineGen {

	rg := &RefineGen{

		RefineCreateTemplate:    parseT("create.tsx", "Create.tsx.gotsx"),
		RefineEditTemplate:      parseT("edit.tsx", "Edit.tsx.gotsx"),
		RefineListTemplate:      parseT("list.tsx", "List.tsx.gotsx"),
		RefineResourcesTemplate: parseT("resources.tsx", "Resources.tsx.gotsx"),
		RefineShowTemplate:      parseT("show.tsx", "show.tsx.gotsx"),

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

//func (rg *RefineGen) FieldName(field *gen.Field) string {
//	type fnType = func(string) string
//	fnAny := rg.funcMap["camel"]
//	fn := fnAny.(fnType)
//	return fn(field.Name)
//}

//func (rg *RefineGen) FieldList(node *gen.Type) string {
//	var names = []string{"id"}
//	for _, f := range node.Fields {
//		names = append(names, rg.FieldName(f))
//	}
//	j, err := json.Marshal(names)
//	if err != nil {
//		panic(err)
//	}
//	return string(j)
//}

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

func (rg *RefineGen) FieldRender(f *gen.Field) string {
	component := `<RA.TextField value={value} />`

	switch f.Type.String() {
	case "time.Time":
		component = `<RA.DateField format="LLL" value={value} />`
	case "uuid.UUID":
		component = `<RA.TextField value={value.substring(0, 5) + '...'} title={value} />`
	}

	//return `(value) => {console.log("` + field.Descriptor().Info.String() + `", value); return ` + component + `}`
	return `(value) =>` + component
}

func (rg *RefineGen) saveGenerated(name string, content bytes.Buffer) error {
	dir := rg.Extension.GeneratedResourcesDir
	err := os.MkdirAll(dir, 0777)
	if err != nil {
		panic(err)
	}

	p := filepath.Join(dir, name)
	_ = os.Remove(p)

	f, err := os.Create(p)
	if err != nil {
		return err
	}

	defer f.Close()

	_, err = f.Write(content.Bytes())

	return err
}

func parseT(name string, path string) *gen.Template {
	if funcMap == nil {
		*funcMap = sprig.FuncMap()

		for k, v := range gen.Funcs {
			(*funcMap)[k] = v
		}

		for k, v := range entgql.TemplateFuncs {
			(*funcMap)[k] = v
		}
	}

	return gen.MustParse(gen.NewTemplate(name).
		Funcs(*funcMap).
		ParseFS(_templates, path))
}

func (rg *RefineGen) Generate() {
	//dir := filepath.Join("ent", "refine", "refine-templates")
	//files, err := os.ReadDir(dir)
	//if err != nil {
	//	log.Fatal(err)
	//}
	//
	//for _, file := range files {
	//	filePath := dir + string(os.PathSeparator) + file.Name()
	//	content := rg.render(filePath)
	//	name := file.Name()
	//	name = strings.TrimSuffix(name, ".gots")
	//	name = strings.TrimSuffix(name, ".gotsx")
	//	rg.saveGenerated(name, content)
	//}

	rg.RendAndSave(rg.RefineCreateTemplate)
	rg.RendAndSave(rg.RefineEditTemplate)
	rg.RendAndSave(rg.RefineListTemplate)
	rg.RendAndSave(rg.RefineShowTemplate)
	rg.RendAndSave(rg.RefineInterfacesTemplate)
	rg.RendAndSave(rg.RefineResourcesTemplate)
}

func (rg *RefineGen) RendAndSave(tmpl *gen.Template) {
	var b bytes.Buffer
	err := tmpl.Execute(&b, rg)
	if err != nil {
		panic(err)
	}

	err = rg.saveGenerated(tmpl.Name(), b)
	if err != nil {
		panic(err)
	}
}
