package entkit

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

// test for ServerAdapter.GetName with testify/assert
func TestServerAdapterGetName(t *testing.T) {
	assert := assert.New(t)
	assert.Equal("server", DefaultServerAdapter.GetName())
}

// test for ServerAdapter.GetFS with testify/assert
func TestServerAdapterGetFS(t *testing.T) {
	assert := assert.New(t)
	assert.NotNil(DefaultServerAdapter.GetFS())
}

// test for entkit.ServerAdapter.GetTemplates with testify/assert
func TestServerAdapterGetTemplates(t *testing.T) {
	assert := assert.New(t)
	assert.Equal([]string{
		"server-templates/Gitignore.goignore",
		"server-templates/Main.tmpl",
		"server-templates/Embed-fs.tmpl",
		"server-templates/Dockerfile.godockerfile",
		"server-templates/Dockerignore.goignore",
		"server-templates/Docker-compose.goyaml",
	}, DefaultServerAdapter.GetTemplates())
}

// test for entkit.ServerAdapter.BeforeGen with testify/assert
func TestServerAdapterBeforeGen(t *testing.T) {
	assert := assert.New(t)
	assert.Nil(DefaultServerAdapter.BeforeGen(&Generator{
		Extension: &Extension{},
	}))
}

// test for entkit.ServerAdapter.CommandAfterGen with testify/assert
func TestServerAdapterCommandAfterGen(t *testing.T) {
	assert := assert.New(t)
	assert.Equal("go fmt", DefaultServerAdapter.CommandAfterGen(&Generator{
		Extension: &Extension{},
	}))
}
