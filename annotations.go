package EntRefine

import (
	"entgo.io/ent/entc/gen"
	"entgo.io/ent/schema"
)

type CodeFieldOptions struct {
	Language string `json:"Language,omitempty"`
}

type RefineAnnotation struct {
	TitleField     bool              `json:"TitleField,omitempty"`
	ImageField     bool              `json:"ImageField,omitempty"`
	Prefix         string            `json:"Prefix,omitempty"`
	Suffix         string            `json:"Suffix,omitempty"`
	MainImageField bool              `json:"MainImageField,omitempty"`
	CodeField      *CodeFieldOptions `json:"CodeField,omitempty"`
	RichTextField  bool              `json:"RichTextField,omitempty"`
	HideOnList     bool              `json:"HideOnList,omitempty"`
	HideOnShow     bool              `json:"HideOnShow,omitempty"`
	HideOnForm     bool              `json:"HideOnForm,omitempty"`
	FilterOperator *string           `json:"FilterOperator,omitempty"`
	Icon           *string           `json:"Icon,omitempty"`
}

// Merge implements the schema.Merger interface.
func (ra RefineAnnotation) Merge(other schema.Annotation) schema.Annotation {
	var ant RefineAnnotation
	switch other := other.(type) {
	case RefineAnnotation:
		ant = other
	case *RefineAnnotation:
		if other != nil {
			ant = *other
		}
	default:
		return ra
	}
	if ant.TitleField {
		ra.TitleField = ant.TitleField
	}
	if ant.CodeField != nil {
		ra.CodeField = ant.CodeField
	}
	if ant.RichTextField {
		ra.RichTextField = ant.RichTextField
	}
	if ant.HideOnShow {
		ra.HideOnList = ant.HideOnList
	}
	if ant.HideOnForm {
		ra.HideOnForm = ant.HideOnForm
	}
	if ant.HideOnList {
		ra.HideOnList = ant.HideOnList
	}

	if ant.FilterOperator != nil {
		ra.FilterOperator = ant.FilterOperator
	}

	if ant.Icon != nil {
		ra.Icon = ant.Icon
	}
	return ra
}
func (ra RefineAnnotation) Name() string {
	return "REFINE"
}

func OnlyOnList() RefineAnnotation {
	return RefineAnnotation{
		HideOnList: false,
		HideOnShow: true,
		HideOnForm: true,
	}
}

func OnlyOnForm() RefineAnnotation {
	return RefineAnnotation{
		HideOnList: true,
		HideOnShow: true,
		HideOnForm: false,
	}
}

func OnlyOnShow() RefineAnnotation {
	return RefineAnnotation{
		HideOnList: true,
		HideOnShow: false,
		HideOnForm: true,
	}
}

func HideOnList() RefineAnnotation {
	return RefineAnnotation{
		HideOnList: true,
	}
}

func HideOnShow() RefineAnnotation {
	return RefineAnnotation{
		HideOnShow: true,
	}
}

func HideOnForm() RefineAnnotation {
	return RefineAnnotation{
		HideOnForm: true,
	}
}

func TitleField() RefineAnnotation {
	return RefineAnnotation{
		TitleField: true,
	}
}

func ImageField() RefineAnnotation {
	return RefineAnnotation{
		ImageField: true,
	}
}

func MainImageField() RefineAnnotation {
	return RefineAnnotation{
		MainImageField: true,
		ImageField:     true,
	}
}

func RichTextField() RefineAnnotation {
	return RefineAnnotation{
		RichTextField: true,
	}
}

func CodeField(config *CodeFieldOptions) RefineAnnotation {
	return RefineAnnotation{
		CodeField: config,
	}
}

func Icon(icon string) RefineAnnotation {
	return RefineAnnotation{
		Icon: &icon,
	}
}

func FilterOperator(operator gen.Op) RefineAnnotation {
	opName := operator.Name()
	return RefineAnnotation{
		FilterOperator: &opName,
	}
}
