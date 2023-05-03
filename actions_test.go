package entkit

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

// test for NewAction with testify/assert
func TestNewAction(t *testing.T) {
	assert := assert.New(t)
	action := NewAction("test")
	assert.Equal(*action.Name, "test")
}

// test for entkit.ActionWithLabel with testify/assert
func TestActionWithLabel(t *testing.T) {
	assert := assert.New(t)
	action := NewAction("test", ActionWithLabel("test label"))
	assert.Equal(*action.Label, "test label")
}

// test for entkit.ActionWithRoute with testify/assert
func TestActionWithRoute(t *testing.T) {
	assert := assert.New(t)
	route := NewRoute("/test/:id", "testElement")
	action := NewAction("test", ActionWithRoute(route))
	assert.Equal(action.Route, route)
}

// test for entkit.ActionWithOperation with testify/assert
func TestActionWithOperation(t *testing.T) {
	assert := assert.New(t)
	operation := NewOperation("test")
	action := NewAction("test", ActionWithOperation(operation))
	assert.Equal(action.Operation, operation)
}

// test for entkit.ActionWithIcon with testify/assert
func TestActionWithIcon(t *testing.T) {
	assert := assert.New(t)
	action := NewAction("test", ActionWithIcon("test icon"))
	assert.Equal(*action.Icon, "test icon")
}

// test for entkit.ActionWithScope with testify/assert
func TestActionWithScope(t *testing.T) {
	assert := assert.New(t)
	action := NewAction("test", ActionWithScope("test scope"))
	assert.Equal(*action.Scope, "test scope")
}

// test for entkit.WithDescription with testify/assert
func TestActionWithDescription(t *testing.T) {
	assert := assert.New(t)
	action := NewAction("test", WithDescription("test description"))
	assert.Equal(*action.Description, "test description")
}

// test for entkit.ActionDisplayOn with testify/assert
func TestActionDisplayOn(t *testing.T) {
	assert := assert.New(t)
	action := NewAction("test", ActionDisplayOn("create", "update", "list", "show"))
	assert.Equal(action.DisplayOn, []string{"create", "update", "list", "show"})
}

// test for entkit.ActionAsGeneral with testify/assert
func TestActionAsGeneral(t *testing.T) {
	assert := assert.New(t)
	action := NewAction("test", ActionAsGeneral())
	assert.True(*action.General)
}
