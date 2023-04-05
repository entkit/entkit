package entkit

import (
	"embed"
	"entgo.io/contrib/entgql"
	"entgo.io/ent/entc"
	"entgo.io/ent/entc/gen"
	"errors"
	"github.com/Masterminds/sprig/v3"
	"github.com/entkit/entkit/common"
	"text/template"
)

var (
	//go:embed templates/*
	_templates embed.FS

	funcMap = template.FuncMap{}
)

type ExtensionOption = func(*Extension) error

// Extension main struct
type Extension struct {
	entc.DefaultExtension
	IgnoreUncommittedChanges *bool
	GraphqlURL               *string // Graphql URL
	Prefix                   *string // General prefix for all generated resources
	GoJs                     GoJSOptions
	ForceGraph2D             ForceGraph2DOptions
	DefaultEdgesDiagram      string
	Auth                     *Auth

	Generators []*Generator
	Meta       map[string]any // Meta to share with frontend application
}

type GoJSOptions struct {
	Enabled    bool   `json:"Enabled,omitempty"`
	LicenseKey string `json:"LicenseKey,omitempty"`
}

type ForceGraph2DOptions struct {
	Enabled bool `json:"Enabled,omitempty"`
}

func WithGenerator(path string, adapter GeneratorAdapter, options ...GeneratorOption) ExtensionOption {
	return func(ex *Extension) (err error) {
		ex.Generators = append(ex.Generators, NewGenerator(ex, path, adapter, options...))
		return nil
	}
}

func IgnoreUncommittedChanges() ExtensionOption {
	return func(ex *Extension) (err error) {
		ex.IgnoreUncommittedChanges = BoolP(true)
		return nil
	}
}

// WithGraphqlURL define graphql server url
func WithGraphqlURL(url string) ExtensionOption {
	return func(ex *Extension) (err error) {
		ex.GraphqlURL = StringP(url)
		WithMeta("GraphqlURL", url)
		return nil
	}
}

// WithPrefix define typescript types/vars prefix
func WithPrefix(prefix string) ExtensionOption {
	return func(ex *Extension) (err error) {
		ex.Prefix = StringP(prefix)
		return nil
	}
}

// WithAuth configure authentication and authorization
func WithAuth(options ...AuthOption) ExtensionOption {
	return func(ex *Extension) (err error) {
		ex.Auth = NewAuth(options...)
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

// WithMeta add metadata to `{AppPath}/entkit.json`
func WithMeta(key string, value any) ExtensionOption {
	return func(ex *Extension) (err error) {
		ex.Meta[key] = value
		return nil
	}
}

// NewExtension initialize extension
func NewExtension(opts ...ExtensionOption) (*Extension, error) {
	ex := &Extension{
		Meta:                map[string]any{},
		Prefix:              StringP("Ent"),
		DefaultEdgesDiagram: "Diagram.GoJS",
		GoJs: GoJSOptions{
			Enabled:    true,
			LicenseKey: "test",
		},
		Auth:       NewAuth(),
		Generators: []*Generator{},
	}

	_funcMap := template.FuncMap{
		"ER_label": common.ToLabel,
		"ER_fieldTSType": func(f gen.Field) string {
			return common.FieldTSType(f, PString(ex.Prefix))
		},
		"ER_tsType": func(t string) string {
			return common.TSType(t, PString(ex.Prefix))
		},
		"ER_resourceAlias":   common.ResourceAlias,
		"ER_someField":       someField,
		"ER_titleField":      titleField,
		"ER_someNode":        someNode,
		"ER_indexNode":       indexNode,
		"ER_mainImageField":  mainImageField,
		"ER_getActionByName": getActionByName,
		"ER_prepareName": func(str string) string {
			return PrepareName(PString(ex.Prefix), str)
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

	if ex.GraphqlURL == nil {
		return nil, errors.New("'GraphqlURL' is required. Use 'WithGraphqlURL' method to set it")
	}

	return ex, nil
}

type Annotations struct {
	Prefix string
	Auth   *Auth
}

// Name of the annotation. Used by the codegen templates.
func (Annotations) Name() string {
	return "ENTKIT"
}

// Annotations Define Ent annotations
func (ex *Extension) Annotations() []entc.Annotation {
	return []entc.Annotation{
		Annotations{
			Prefix: PString(ex.Prefix),
			Auth:   ex.Auth,
		},
	}
}

// Templates Define Ent templates
func (ex *Extension) Templates() []*gen.Template {
	return []*gen.Template{
		gen.MustParse(gen.NewTemplate("search_query_apply").
			Funcs(funcMap).
			ParseFS(_templates, "templates/search_query_apply.tmpl")),
		gen.MustParse(gen.NewTemplate("auth").
			Funcs(funcMap).
			ParseFS(_templates, "templates/auth.tmpl")),
	}
}

// Hooks Define Ent hooks
func (ex *Extension) Hooks() []gen.Hook {
	return []gen.Hook{
		GeneratorHook(ex),
		GenerateAuthResourcesHook(ex),
	}
}
