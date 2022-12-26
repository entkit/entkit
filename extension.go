package refine

import (
	"entgo.io/ent/entc"
	"entgo.io/ent/entc/gen"
)

type Extension struct {
	entc.DefaultExtension
	GeneratedResourcesDir string
}

func New(generatedResourcesDir string) *Extension {
	return &Extension{
		GeneratedResourcesDir: generatedResourcesDir,
	}
}

//func (ex Extension) Templates() []*gen.Template {
//	return []*gen.Template{
//		gen.MustParse(gen.NewTemplate("greet").ParseFiles("templates/many-setter.tmpl")),
//	}
//}

func (ex *Extension) Hooks() []gen.Hook {
	return []gen.Hook{
		GenerateRefineScripts(ex),
	}
}
func GenerateRefineScripts(ex *Extension) gen.Hook {
	return func(next gen.Generator) gen.Generator {
		return gen.GenerateFunc(func(g *gen.Graph) error {
			NewRefineGen(ex, g).Generate()
			return next.Generate(g)
		})
	}
}
