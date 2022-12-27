package EntRefine

import (
	"entgo.io/ent/entc"
	"entgo.io/ent/entc/gen"
)

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

func New() *Extension {
	return &Extension{
		srcDirName: "src",
	}
}

func (ex *Extension) Templates() []*gen.Template {
	return []*gen.Template{
		//gen.MustParse(gen.NewTemplate("greet").ParseFiles("templates/many-setter.tmpl")),
	}
}

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
