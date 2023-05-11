package entkit

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

// test for Refine.GetName()
func TestRefineGetName(t *testing.T) {
	assert := assert.New(t)
	assert.Equal("refine", DefaultRefineAdapter.GetName())
}

// test for Refine.GetFS()
func TestRefineGetFS(t *testing.T) {
	assert := assert.New(t)
	assert.NotNil(DefaultRefineAdapter.GetFS())
}

// test for Refine.GetTemplates()
func TestRefineGetTemplates(t *testing.T) {
	assert := assert.New(t)
	assert.Equal([]string{
		"refine-templates/Tsconfig.gojson",
		"refine-templates/Eslintignore.goignore",
		"refine-templates/Dockerignore.goignore",
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
		"refine-templates/EdgesDiagram.gotsx",
		"refine-templates/Routes.gotsx",
		"refine-templates/DataProvider.gots",
		"refine-templates/SearchComponent.gotsx",
		"refine-templates/SorterEnums.gotsx",
		"refine-templates/View.gotsx",
		"refine-templates/Actions.gotsx",
		"refine-templates/Helpers.gotsx",
		"refine-templates/Diagram.gotsx",
	}, DefaultRefineAdapter.GetTemplates())
}
