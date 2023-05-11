package entkit

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

// test for Refine.NewOperation()
func TestRefineNewOperation(t *testing.T) {
	assert := assert.New(t)
	assert.Equal(&Operation{
		Name: StringP("name"),
	}, NewOperation("name"))
}

// test for Refine.OperationWithSuccessMessage()
func TestRefineOperationWithSuccessMessage(t *testing.T) {
	assert := assert.New(t)
	operation := &Operation{}
	assert.Nil(OperationWithSuccessMessage("msg")(operation))
	assert.Equal(&Operation{SuccessMessage: StringP("msg")}, operation)
}

// test for Refine.OperationWithErrorMessage()
func TestRefineOperationWithErrorMessage(t *testing.T) {
	assert := assert.New(t)
	operation := &Operation{}
	assert.Nil(OperationWithFailMessage("msg")(operation))
	assert.Equal(&Operation{FailMessage: StringP("msg")}, operation)
}

// test for Refine.OperationWithFields()
func TestRefineOperationWithFields(t *testing.T) {
	assert := assert.New(t)
	operation := &Operation{}
	assert.Nil(OperationWithFields("a", "b")(operation))
	assert.Equal(&Operation{Fields: &[]string{"a", "b"}}, operation)
}

// test for Refine.OperationAsBulk()
func TestRefineOperationAsBulk(t *testing.T) {
	assert := assert.New(t)
	operation := &Operation{}
	assert.Nil(OperationAsBulk()(operation))
	assert.Equal(&Operation{Single: BoolP(false), Bulk: BoolP(true)}, operation)
}

// test for Refine.OperationAsSingle()
func TestRefineOperationAsSingle(t *testing.T) {
	assert := assert.New(t)
	operation := &Operation{}
	assert.Nil(OperationAsSingle()(operation))
	assert.Equal(&Operation{Bulk: BoolP(false), Single: BoolP(true)}, operation)
}

// test for Refine.OperationAsMutation()
func TestRefineOperationAsMutation(t *testing.T) {
	assert := assert.New(t)
	operation := &Operation{}
	assert.Nil(OperationAsMutation()(operation))
	assert.Equal(BoolP(true), operation.Mutation)
}

// test for Refine.OperationAsQuery()
func TestRefineOperationAsQuery(t *testing.T) {
	assert := assert.New(t)
	operation := &Operation{}
	assert.Nil(OperationAsQuery()(operation))
	assert.Equal(BoolP(true), operation.Query)
}
