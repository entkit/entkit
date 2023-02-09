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
		"ER_label":          common.ToLabel,
		"ER_fieldTSType":    common.FieldTSType,
		"ER_tsType":         common.TSType,
		"ER_resourceAlias":  common.ResourceAlias,
		"ER_titleField":     titleField,
		"ER_mainImageField": mainImageField,
	}
	funcMap = template.FuncMap{}
)

type ExtensionOption = func(*Extension) error

// Extension main struct
type Extension struct {
	entc.DefaultExtension
	AppPath    string         // AppPath JS Application path (packages.json directory path)
	SrcDirName string         // SrcDirName JS Application source dir name
	Meta       map[string]any // Meta to share with frontend application

	GoJs                GoJSOptions
	ForceGraph2D        ForceGraph2DOptions
	DefaultEdgesDiagram string
}

type GoJSOptions struct {
	Enabled    bool   `json:"Enabled,omitempty"`
	LicenseKey string `json:"LicenseKey,omitempty"`
}

type ForceGraph2DOptions struct {
	Enabled bool `json:"Enabled,omitempty"`
}

// WithAppPath define refine-project directory
func WithAppPath(path string) ExtensionOption {
	return func(ex *Extension) (err error) {
		ex.AppPath = path
		return nil
	}
}

// WithSrcDirName additional option to configure Refine repo code-source directory, default value is `src`
func WithSrcDirName(name string) ExtensionOption {
	return func(ex *Extension) (err error) {
		ex.SrcDirName = name
		return nil
	}
}

// WithDefaultEdgesDiagram set default edges graph/diagram view component name
func WithDefaultEdgesDiagram(name string) ExtensionOption {
	return func(ex *Extension) (err error) {
		ex.DefaultEdgesDiagram = name
		return nil
	}
}

// WithGoJs use gojs for edges diagrams
func WithGoJs(options GoJSOptions) ExtensionOption {
	return func(ex *Extension) (err error) {
		ex.GoJs = options
		return nil
	}
}

// WithForceGraph2D use react-force-graph-2d for edges diagrams
func WithForceGraph2D(options ForceGraph2DOptions) ExtensionOption {
	return func(ex *Extension) (err error) {
		ex.ForceGraph2D = options
		return nil
	}
}

// WithMeta add metadata to `{AppPath}/ent-refine.json`
func WithMeta(meta map[string]any) ExtensionOption {
	return func(ex *Extension) (err error) {
		ex.Meta = meta
		return nil
	}
}

// NewExtension initialize extension
func NewExtension(opts ...ExtensionOption) (*Extension, error) {
	ex := &Extension{
		SrcDirName: "src",
		Meta:       map[string]any{},

		DefaultEdgesDiagram: "Diagram.GoJS",
		GoJs: GoJSOptions{
			Enabled:    true,
			LicenseKey: "test",
		},
	}

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

	for _, opt := range opts {
		if err := opt(ex); err != nil {
			return nil, err
		}
	}
	return ex, nil
}

// Annotations Define Ent annotations
func (ex *Extension) Annotations() []entc.Annotation {
	return []entc.Annotation{}
}

// Templates Define Ent templates
func (ex *Extension) Templates() []*gen.Template {
	return []*gen.Template{
		gen.MustParse(gen.NewTemplate("greet").
			Funcs(funcMap).
			ParseFS(_templates, "templates/search_query_apply.tmpl")),
	}
}

// Hooks Define Ent hooks
func (ex *Extension) Hooks() []gen.Hook {
	return []gen.Hook{
		GenerateRefineScripts(ex),
	}
}
