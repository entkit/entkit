package entkit

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

// test for entkit.NewRoute with testify/assert
func TestNewRoute(t *testing.T) {
	assert := assert.New(t)
	assert.Equal(&Route{
		Path:    StringP("pth"),
		Element: StringP("elem"),
		Index:   BoolP(true),
	}, NewRoute("pth", "elem", RouteAsIndex()))
}

// test for entkit.RouteAsIndex with testify/assert
func TestRouteAsIndex(t *testing.T) {
	assert := assert.New(t)
	route := &Route{}
	assert.Nil(RouteAsIndex()(route))
	assert.Equal(&Route{Index: BoolP(true)}, route)
}
