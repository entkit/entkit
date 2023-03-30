package entkit

import (
	"entgo.io/ent/entc/gen"
	"entgo.io/ent/schema"
)

// CodeFieldOptions code field is configurable
//
// **Example**
//
// ```go
//
//	CodeFieldOptions{
//		Language: "javascript"
//	}
//
// ```
type CodeFieldOptions struct {
	Language string `json:"Language,omitempty"`
}

// RefineAnnotation struct container of all annotations
type RefineAnnotation struct {
	TitleField     bool              `json:"TitleField,omitempty"`     // Mark field as title of entity
	ImageField     bool              `json:"ImageField,omitempty"`     // Mark field as image
	MainImageField bool              `json:"MainImageField,omitempty"` // Mark field as main image of entity
	CodeField      *CodeFieldOptions `json:"CodeField,omitempty"`      // Mark field as code field
	URLField       bool              `json:"URLField,omitempty"`       // Mark field as url field
	RichTextField  bool              `json:"RichTextField,omitempty"`  // Mark field as rich text field
	HideOnList     bool              `json:"HideOnList,omitempty"`
	HideOnShow     bool              `json:"HideOnShow,omitempty"`
	HideOnForm     bool              `json:"HideOnForm,omitempty"`
	HideOnCreate   bool              `json:"HideOnCreate,omitempty"`
	HideOnUpdate   bool              `json:"HideOnUpdate,omitempty"`
	FilterOperator *string           `json:"FilterOperator,omitempty"`
	Icon           *string           `json:"Icon,omitempty"`
	Label          *string           `json:"Label,omitempty"`
	Description    *string           `json:"Description,omitempty"`
	Prefix         *string           `json:"Prefix,omitempty"`
	Suffix         *string           `json:"Suffix,omitempty"`
	Actions        []*Action         `json:"Actions,omitempty"`
	View           *string           `json:"View,omitempty"`

	Route      *string `json:"Route,omitempty"`
	IndexRoute bool    `json:"IndexRoute,omitempty"`

	ViewOnShow *string `json:"ViewOnShow,omitempty"`
	ViewOnList *string `json:"ViewOnList,omitempty"`
	ViewOnForm *string `json:"ViewOnForm,omitempty"`
	Badge      *string `json:"Badge,omitempty"`

	EdgesDiagram *string `json:"EdgesDiagram,omitempty"`
}

// Merge implements the schema.Merger interface.
func (ra RefineAnnotation) Merge(other schema.Annotation) schema.Annotation {
	var annotation RefineAnnotation
	switch other := other.(type) {
	case RefineAnnotation:
		annotation = other
	case *RefineAnnotation:
		if other != nil {
			annotation = *other
		}
	default:
		return ra
	}

	if annotation.TitleField {
		ra.TitleField = annotation.TitleField
	}

	if annotation.CodeField != nil {
		ra.CodeField = annotation.CodeField
	}

	if annotation.TitleField {
		ra.TitleField = annotation.TitleField
	}

	if annotation.URLField {
		ra.URLField = annotation.URLField
	}

	if annotation.ImageField {
		ra.ImageField = annotation.ImageField
	}

	if annotation.MainImageField {
		ra.MainImageField = annotation.MainImageField
	}

	if annotation.RichTextField {
		ra.RichTextField = annotation.RichTextField
	}

	if annotation.HideOnShow {
		ra.HideOnList = annotation.HideOnList
	}

	if annotation.HideOnList {
		ra.HideOnList = annotation.HideOnList
	}

	if annotation.HideOnForm {
		ra.HideOnForm = annotation.HideOnForm
	}

	if annotation.HideOnCreate {
		ra.HideOnCreate = annotation.HideOnCreate
	}

	if annotation.HideOnUpdate {
		ra.HideOnUpdate = annotation.HideOnUpdate
	}

	if annotation.Route != nil {
		ra.Route = annotation.Route
	}

	if annotation.IndexRoute {
		ra.IndexRoute = annotation.IndexRoute
	}

	if annotation.FilterOperator != nil {
		ra.FilterOperator = annotation.FilterOperator
	}

	if annotation.Label != nil {
		ra.Label = annotation.Label
	}

	if annotation.Description != nil {
		ra.Description = annotation.Description
	}

	if annotation.Icon != nil {
		ra.Icon = annotation.Icon
	}

	if annotation.Prefix != nil {
		ra.Prefix = annotation.Prefix
	}

	if annotation.Suffix != nil {
		ra.Suffix = annotation.Suffix
	}

	if annotation.View != nil {
		ra.View = annotation.View
	}

	if annotation.ViewOnList != nil {
		ra.ViewOnList = annotation.ViewOnList
	}

	if annotation.ViewOnShow != nil {
		ra.ViewOnShow = annotation.ViewOnShow
	}

	if annotation.Badge != nil {
		ra.Badge = annotation.Badge
	}

	if len(annotation.Actions) > 0 {
		ra.Actions = append(ra.Actions, annotation.Actions...)
	}

	if annotation.EdgesDiagram != nil {
		ra.EdgesDiagram = annotation.EdgesDiagram
	}

	return ra
}

// Name annotation
func (ra RefineAnnotation) Name() string {
	return "ENTKIT"
}

// Actions actions/buttons on list items
func Actions(actions ...*Action) RefineAnnotation {
	return RefineAnnotation{
		Actions: actions,
	}
}

// OnlyOnList show field only on list
func OnlyOnList() RefineAnnotation {
	return RefineAnnotation{
		HideOnList: false,
		HideOnShow: true,
		HideOnForm: true,
	}
}

// OnlyOnForm show field only on form
func OnlyOnForm() RefineAnnotation {
	return RefineAnnotation{
		HideOnList: true,
		HideOnShow: true,
		HideOnForm: false,
	}
}

// OnlyOnShow show field only on show page
func OnlyOnShow() RefineAnnotation {
	return RefineAnnotation{
		HideOnList: true,
		HideOnShow: false,
		HideOnForm: true,
	}
}

// HideOnList hide field on list
func HideOnList() RefineAnnotation {
	return RefineAnnotation{
		HideOnList: true,
	}
}

// HideOnShow hide field on show page
func HideOnShow() RefineAnnotation {
	return RefineAnnotation{
		HideOnShow: true,
	}
}

// HideOnForm hide field on form
func HideOnForm() RefineAnnotation {
	return RefineAnnotation{
		HideOnForm: true,
	}
}

// HideOnCreate hide field on form
func HideOnCreate() RefineAnnotation {
	return RefineAnnotation{
		HideOnCreate: true,
	}
}

// HideOnUpdate hide field on form
func HideOnUpdate() RefineAnnotation {
	return RefineAnnotation{
		HideOnUpdate: true,
	}
}

// TitleField mark field as a title field
func TitleField() RefineAnnotation {
	return RefineAnnotation{
		TitleField: true,
	}
}

// ImageField mark field as an image field
func ImageField() RefineAnnotation {
	return RefineAnnotation{
		ImageField: true,
	}
}

// MainImageField mark field as a main image field
func MainImageField() RefineAnnotation {
	return RefineAnnotation{
		MainImageField: true,
		ImageField:     true,
	}
}

// RichTextField mark field as a rich text field (wysiwyg editor)
func RichTextField() RefineAnnotation {
	return RefineAnnotation{
		RichTextField: true,
	}
}

// CodeField mark field as a code field
func CodeField(config *CodeFieldOptions) RefineAnnotation {
	return RefineAnnotation{
		CodeField: config,
	}
}

// URLField mark field as an url field
func URLField() RefineAnnotation {
	return RefineAnnotation{
		URLField: true,
	}
}

// Icon define icon of entity that will be shown on navigations, breadcrumbs etc.
func Icon(icon string) RefineAnnotation {
	return RefineAnnotation{
		Icon: &icon,
	}
}

// RoutePath define entity route for url.
func RoutePath(path string) RefineAnnotation {
	return RefineAnnotation{
		Route: &path,
	}
}

// IndexRoute make entity route as index route
func IndexRoute() RefineAnnotation {
	return RefineAnnotation{
		IndexRoute: true,
	}
}

// Label define label of field
// todo: implement generator
func Label(label string) RefineAnnotation {
	return RefineAnnotation{
		Label: &label,
	}
}

// Description define description of field/entity
// todo: implement generator
func Description(description string) RefineAnnotation {
	return RefineAnnotation{
		Label: &description,
	}
}

// Prefix add prefix to value of field
// todo: implement generator
func Prefix(prefix string) RefineAnnotation {
	return RefineAnnotation{
		Prefix: &prefix,
	}
}

// Suffix add suffix to value of field
func Suffix(suffix string) RefineAnnotation {
	return RefineAnnotation{
		Prefix: &suffix,
	}
}

// View define field views on list and show
func View(name string) RefineAnnotation {
	return RefineAnnotation{
		View:       &name,
		ViewOnList: &name,
		ViewOnShow: &name,
	}
}

// ViewOnList define field view on list
func ViewOnList(name string) RefineAnnotation {
	return RefineAnnotation{
		ViewOnList: &name,
	}
}

// ViewOnShow define field view on show page
func ViewOnShow(name string) RefineAnnotation {
	return RefineAnnotation{
		ViewOnShow: &name,
	}
}

// ViewOnForm define field view on form
func ViewOnForm(name string) RefineAnnotation {
	return RefineAnnotation{
		ViewOnForm: &name,
	}
}

// Badge define entity badge view
func Badge(name string) RefineAnnotation {
	return RefineAnnotation{
		Badge: &name,
	}
}

// FilterOperator define entity field filter operator
func FilterOperator(operator gen.Op) RefineAnnotation {
	opName := operator.Name()
	return RefineAnnotation{
		FilterOperator: &opName,
	}
}
