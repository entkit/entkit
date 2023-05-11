package entkit

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

// test for StringP with testify/assert
func TestStringP(t *testing.T) {
	assert := assert.New(t)
	assert.Equal("test", *StringP("test"))
}

// test for PString with testify/assert
func TestPString(t *testing.T) {
	assert := assert.New(t)
	assert.Equal("test", PString(StringP("test")))
	assert.Equal("", PString(nil))
}

// test for BoolP with testify/assert
func TestBoolP(t *testing.T) {
	assert := assert.New(t)
	assert.True(*BoolP(true))
	assert.False(*BoolP(false))
}

// test for PBool with testify/assert
func TestPBool(t *testing.T) {
	assert := assert.New(t)
	assert.True(PBool(BoolP(true)))
	assert.False(PBool(BoolP(false)))
	assert.False(PBool(nil))
}

// test for IntP with testify/assert
func TestIntP(t *testing.T) {
	assert := assert.New(t)
	assert.Equal(1, *IntP(1))
}

// test for Int32P with testify/assert
func TestInt32P(t *testing.T) {
	assert := assert.New(t)
	assert.Equal(int32(1), *Int32P(int32(1)))
}

// test for Int64P with testify/assert
func TestInt64P(t *testing.T) {
	assert := assert.New(t)
	assert.Equal(int64(1), *Int64P(int64(1)))
}

// test for PInt with testify/assert
func TestPInt(t *testing.T) {
	assert := assert.New(t)
	assert.Equal(1, PInt(IntP(1)))
	assert.Equal(0, PInt(nil))
}

// test for PInt32 with testify/assert
func TestPInt32(t *testing.T) {
	assert := assert.New(t)
	assert.Equal(int32(1), PInt32(Int32P(int32(1))))
	assert.Equal(int32(0), PInt32(nil))
}

// test for PInt64 with testify/assert
func TestPInt64(t *testing.T) {
	assert := assert.New(t)
	assert.Equal(int64(1), PInt64(Int64P(int64(1))))
	assert.Equal(int64(0), PInt64(nil))
}
