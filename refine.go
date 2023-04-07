package entkit

import (
	"embed"
	"io/fs"
)

var (
	//go:embed refine-templates/*
	_refineTemplates embed.FS
)

type Refine struct{}

var RefineAdapter = Refine{}

func (r Refine) GetName() string {
	return "refine"
}

func (r Refine) GetFS() fs.FS {
	return _refineTemplates
}

func (r Refine) GetDependencies() []GeneratorAdapter {
	return []GeneratorAdapter{
		DefaultEnvironmentAdapter,
		DefaultTypescriptAdapter,
	}
}

func (r Refine) CommandAfterGen() string {
	return "npm i && npm run lint && npm run build"
}

func (r Refine) GetStaticTemplates() []string {
	return []string{
		"refine-templates/Custom.gotsx",
	}
}

func (r Refine) GetTemplates() []string {
	return []string{
		"refine-templates/Tsconfig.gojson",
		"refine-templates/Eslintignore.goignore",
		"refine-templates/Eslintrc.gojson",
		"refine-templates/Prettierignore.goignore",
		"refine-templates/Prettierrc.gojson",
		"refine-templates/Gitignore.goignore",
		"refine-templates/NpmRC.goenv",
		"refine-templates/Package.gojson",
		"refine-templates/Index.gohtml",
		"refine-templates/Header.gotsx",
		"refine-templates/Index.gotsx",
		"refine-templates/Login.gotsx",
		"refine-templates/App.gotsx",
		"refine-templates/Show.gotsx",
		"refine-templates/Form.gotsx",
		"refine-templates/Table.gotsx",
		"refine-templates/List.gotsx",
		"refine-templates/Routes.gotsx",
		"refine-templates/DataProvider.gots",
		"refine-templates/SearchComponent.gotsx",
		"refine-templates/SorterEnums.gotsx",
		"refine-templates/View.gotsx",
		"refine-templates/Actions.gotsx",
		"refine-templates/Helpers.gotsx",
		"refine-templates/Diagram.gotsx",
	}
}
