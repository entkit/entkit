package EntRefine

import (
	"entgo.io/ent/entc/gen"
	"entgo.io/ent/schema"
)

type CodeFieldOptions struct {
	Language string `json:"Language,omitempty"`
}

type Action struct {
	Name  string         `json:"Name,omitempty"`
	Attrs map[string]any `json:"Attrs,omitempty"`
}

var (
	EditAction = Action{
		Name:  "RA.EditButton",
		Attrs: map[string]any{},
	}
	ShowAction = Action{
		Name:  "RA.ShowButton",
		Attrs: map[string]any{},
	}
	DeleteAction = Action{
		Name:  "RA.DeleteButton",
		Attrs: map[string]any{},
	}
)

type RefineAnnotation struct {
	TitleField      bool              `json:"TitleField,omitempty"`     // Mark field as title of entity
	ImageField      bool              `json:"ImageField,omitempty"`     // Mark field as image
	MainImageField  bool              `json:"MainImageField,omitempty"` // Mark field as main image of entity
	CodeField       *CodeFieldOptions `json:"CodeField,omitempty"`      // Mark field as code field
	URLField        bool              `json:"URLField,omitempty"`       // Mark field as url field
	RichTextField   bool              `json:"RichTextField,omitempty"`  // Mark field as rich text field
	HideOnList      bool              `json:"HideOnList,omitempty"`
	HideOnShow      bool              `json:"HideOnShow,omitempty"`
	HideOnForm      bool              `json:"HideOnForm,omitempty"`
	FilterOperator  *string           `json:"FilterOperator,omitempty"`
	Icon            *string           `json:"Icon,omitempty"`
	Label           *string           `json:"Label,omitempty"`
	Description     *string           `json:"Description,omitempty"`
	Prefix          *string           `json:"Prefix,omitempty"`
	Suffix          *string           `json:"Suffix,omitempty"`
	ListActions     []Action          `json:"ListActions,omitempty"`
	ShowActions     []Action          `json:"ShowActions,omitempty"`
	FieldView       *string           `json:"FieldView,omitempty"`
	FieldViewOnShow *string           `json:"FieldViewOnShow,omitempty"`
	FieldViewOnList *string           `json:"FieldViewOnList,omitempty"`
	FieldViewOnForm *string           `json:"FieldViewOnForm,omitempty"`
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

	if ant.TitleField {
		ra.TitleField = ant.TitleField
	}

	if ant.URLField {
		ra.URLField = ant.URLField
	}

	if ant.ImageField {
		ra.ImageField = ant.ImageField
	}

	if ant.MainImageField {
		ra.MainImageField = ant.MainImageField
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

	if ant.Label != nil {
		ra.Label = ant.Label
	}

	if ant.Description != nil {
		ra.Description = ant.Description
	}

	if ant.Icon != nil {
		ra.Icon = ant.Icon
	}

	if ant.Prefix != nil {
		ra.Prefix = ant.Prefix
	}

	if ant.Suffix != nil {
		ra.Suffix = ant.Suffix
	}

	if ant.FieldView != nil {
		ra.FieldView = ant.FieldView
	}

	if ant.FieldViewOnList != nil {
		ra.FieldViewOnList = ant.FieldViewOnList
	}

	if ant.FieldViewOnShow != nil {
		ra.FieldViewOnShow = ant.FieldViewOnShow
	}

	if len(ant.ListActions) > 0 {
		ra.ListActions = append(ra.ListActions, ant.ListActions...)
	}

	if len(ant.ShowActions) > 0 {
		ra.ShowActions = append(ra.ShowActions, ant.ShowActions...)
	}

	return ra
}

func (ra RefineAnnotation) Name() string {
	return "REFINE"
}

func ListActions(actions ...Action) RefineAnnotation {
	return RefineAnnotation{
		ListActions: actions,
	}
}

func ShowActions(actions ...Action) RefineAnnotation {
	return RefineAnnotation{
		ShowActions: actions,
	}
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

func URLField() RefineAnnotation {
	return RefineAnnotation{
		URLField: true,
	}
}

func Icon(icon string) RefineAnnotation {
	return RefineAnnotation{
		Icon: &icon,
	}
}

func Label(label string) RefineAnnotation {
	return RefineAnnotation{
		Label: &label,
	}
}

func Description(description string) RefineAnnotation {
	return RefineAnnotation{
		Label: &description,
	}
}

func Prefix(prefix string) RefineAnnotation {
	return RefineAnnotation{
		Prefix: &prefix,
	}
}

func Suffix(suffix string) RefineAnnotation {
	return RefineAnnotation{
		Prefix: &suffix,
	}
}

func FieldView(name string) RefineAnnotation {
	return RefineAnnotation{
		FieldView:       &name,
		FieldViewOnList: &name,
		FieldViewOnShow: &name,
	}
}

func FieldViewOnList(name string) RefineAnnotation {
	return RefineAnnotation{
		FieldViewOnList: &name,
	}
}

func FieldViewOnShow(name string) RefineAnnotation {
	return RefineAnnotation{
		FieldViewOnShow: &name,
	}
}

func FieldViewOnForm(name string) RefineAnnotation {
	return RefineAnnotation{
		FieldViewOnForm: &name,
	}
}

func FilterOperator(operator gen.Op) RefineAnnotation {
	opName := operator.Name()
	return RefineAnnotation{
		FilterOperator: &opName,
	}
}
