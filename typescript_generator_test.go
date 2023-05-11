package entkit

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

// test for TypescriptAdapter.GetName with testify/assert
func TestTypescriptAdapterGetName(t *testing.T) {
	assert := assert.New(t)
	assert.Equal("typescript", DefaultTypescriptAdapter.GetName())
}

// test for TypescriptAdapter.GetFS with testify/assert
func TestTypescriptAdapterGetFS(t *testing.T) {
	assert := assert.New(t)
	assert.NotNil(DefaultTypescriptAdapter.GetFS())
}

// test for TypescriptAdapter.GetTemplates with testify/assert
func TestTypescriptAdapterGetTemplates(t *testing.T) {
	assert := assert.New(t)
	assert.Equal([]string{"typescript-templates/Typedefs.gots"}, DefaultTypescriptAdapter.GetTemplates())
}
