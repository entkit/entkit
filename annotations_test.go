package entkit

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

// unit test for Annotation.Merge with testify/assert
func TestAnnotationMerge(t *testing.T) {
	assert := assert.New(t)
	annotation := Annotation{
		TitleField:     nil,
		CodeField:      nil,
		URLField:       BoolP(false),
		ImageField:     BoolP(true),
		MainImageField: BoolP(false),
		RichTextField:  BoolP(false),
		HideOnShow:     BoolP(false),
		HideOnList:     BoolP(false),
		HideOnForm:     BoolP(false),
		HideOnCreate:   BoolP(false),
		HideOnUpdate:   BoolP(false),
		Route:          nil,
	}
	annotation2 := Annotation{
		TitleField:     BoolP(true),
		CodeField:      &CodeFieldOptions{},
		URLField:       BoolP(true),
		ImageField:     BoolP(false),
		MainImageField: BoolP(false),
		RichTextField:  BoolP(false),
		HideOnShow:     BoolP(false),
		HideOnList:     BoolP(false),
		HideOnForm:     BoolP(false),
		HideOnCreate:   BoolP(false),
		HideOnUpdate:   BoolP(false),
		Route:          StringP("test-route"),
	}
	newAnnotation := annotation.Merge(&annotation2).(Annotation)
	assert.True(*newAnnotation.TitleField)
	assert.NotNil(newAnnotation.CodeField)
	assert.True(*newAnnotation.URLField)
	assert.False(*newAnnotation.ImageField)
	assert.False(*newAnnotation.MainImageField)
	assert.False(*newAnnotation.RichTextField)
	assert.False(*newAnnotation.HideOnShow)
	assert.False(*newAnnotation.HideOnList)
	assert.False(*newAnnotation.HideOnForm)
	assert.False(*newAnnotation.HideOnCreate)
	assert.False(*newAnnotation.HideOnUpdate)
	assert.Equal("test-route", *newAnnotation.Route)
}
