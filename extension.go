package EntRefine

import (
	"embed"
	"entgo.io/contrib/entgql"
	"entgo.io/ent/entc"
	"entgo.io/ent/entc/gen"
	"github.com/Masterminds/sprig/v3"
	"github.com/diazoxide/ent-refine/common"
	"text/template"
)

var (
	//go:embed templates/*
	_templates embed.FS

	_funcMap = template.FuncMap{
		"label":             common.ToLabel,
		"ER_fieldTSType":    common.FieldTSType,
		"ER_tsType":         common.TSType,
		"ER_titleField":     titleField,
		"ER_mainImageField": mainImageField,
	}
	funcMap = template.FuncMap{}
)

// Extension main struct
type Extension struct {
	entc.DefaultExtension
	appPath    string
	srcDirName string
}

// AppPath directory that contains package.json file
func (ex *Extension) AppPath(dir string) *Extension {
	ex.appPath = dir
	return ex
}

// SrcDirName directory to save generated TS files
func (ex *Extension) SrcDirName(dir string) *Extension {
	ex.srcDirName = dir
	return ex
}

// New Initialize extension
func New() *Extension {
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

	return &Extension{
		srcDirName: "src",
	}
}

// Annotations Define Ent annotations
func (ex *Extension) Annotations() []entc.Annotation {
	return []entc.Annotation{}
}

// Templates Define Ent templates
func (ex *Extension) Templates() []*gen.Template {
	return []*gen.Template{
		gen.MustParse(gen.NewTemplate("greet").Funcs(funcMap).ParseFS(_templates, "templates/search_query_apply.tmpl")),
	}
}

// Hooks Define Ent hooks
func (ex *Extension) Hooks() []gen.Hook {
	return []gen.Hook{
		GenerateRefineScripts(ex),
	}
}
