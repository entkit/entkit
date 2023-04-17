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

// EntkitAnnotation struct container of all annotations
type EntkitAnnotation struct {
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
func (ra EntkitAnnotation) Merge(other schema.Annotation) schema.Annotation {
	var annotation EntkitAnnotation
	switch other := other.(type) {
	case EntkitAnnotation:
		annotation = other
	case *EntkitAnnotation:
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
func (ra EntkitAnnotation) Name() string {
	return "ENTKIT"
}

// Actions actions/buttons on list items
func Actions(actions ...*Action) EntkitAnnotation {
	return EntkitAnnotation{
		Actions: actions,
	}
}

// OnlyOnList show field only on list
func OnlyOnList() EntkitAnnotation {
	return EntkitAnnotation{
		HideOnList: false,
		HideOnShow: true,
		HideOnForm: true,
	}
}

// OnlyOnForm show field only on form
func OnlyOnForm() EntkitAnnotation {
	return EntkitAnnotation{
		HideOnList: true,
		HideOnShow: true,
		HideOnForm: false,
	}
}

// OnlyOnShow show field only on show page
func OnlyOnShow() EntkitAnnotation {
	return EntkitAnnotation{
		HideOnList: true,
		HideOnShow: false,
		HideOnForm: true,
	}
}

// HideOnList hide field on list
func HideOnList() EntkitAnnotation {
	return EntkitAnnotation{
		HideOnList: true,
	}
}

// HideOnShow hide field on show page
func HideOnShow() EntkitAnnotation {
	return EntkitAnnotation{
		HideOnShow: true,
	}
}

// HideOnForm hide field on form
func HideOnForm() EntkitAnnotation {
	return EntkitAnnotation{
		HideOnForm: true,
	}
}

// HideOnCreate hide field on form
func HideOnCreate() EntkitAnnotation {
	return EntkitAnnotation{
		HideOnCreate: true,
	}
}

// HideOnUpdate hide field on form
func HideOnUpdate() EntkitAnnotation {
	return EntkitAnnotation{
		HideOnUpdate: true,
	}
}

// TitleField mark field as a title field
func TitleField() EntkitAnnotation {
	return EntkitAnnotation{
		TitleField: true,
	}
}

// ImageField mark field as an image field
func ImageField() EntkitAnnotation {
	return EntkitAnnotation{
		ImageField: true,
	}
}

// MainImageField mark field as a main image field
func MainImageField() EntkitAnnotation {
	return EntkitAnnotation{
		MainImageField: true,
		ImageField:     true,
	}
}

// RichTextField mark field as a rich text field (wysiwyg editor)
func RichTextField() EntkitAnnotation {
	return EntkitAnnotation{
		RichTextField: true,
	}
}

// CodeField mark field as a code field
func CodeField(config *CodeFieldOptions) EntkitAnnotation {
	return EntkitAnnotation{
		CodeField: config,
	}
}

// URLField mark field as an url field
func URLField() EntkitAnnotation {
	return EntkitAnnotation{
		URLField: true,
	}
}

// Icon define icon of entity that will be shown on navigations, breadcrumbs etc.
func Icon(icon string) EntkitAnnotation {
	return EntkitAnnotation{
		Icon: &icon,
	}
}

// RoutePath define entity route for url.
func RoutePath(path string) EntkitAnnotation {
	return EntkitAnnotation{
		Route: &path,
	}
}

// IndexRoute make entity route as index route
func IndexRoute() EntkitAnnotation {
	return EntkitAnnotation{
		IndexRoute: true,
	}
}

// Label define label of field
// todo: implement generator
func Label(label string) EntkitAnnotation {
	return EntkitAnnotation{
		Label: &label,
	}
}

// Description define description of field/entity
// todo: implement generator
func Description(description string) EntkitAnnotation {
	return EntkitAnnotation{
		Label: &description,
	}
}

// Prefix add prefix to value of field
// todo: implement generator
func Prefix(prefix string) EntkitAnnotation {
	return EntkitAnnotation{
		Prefix: &prefix,
	}
}

// Suffix add suffix to value of field
func Suffix(suffix string) EntkitAnnotation {
	return EntkitAnnotation{
		Prefix: &suffix,
	}
}

// View define field views on list and show
func View(name string) EntkitAnnotation {
	return EntkitAnnotation{
		View:       &name,
		ViewOnList: &name,
		ViewOnShow: &name,
	}
}

// ViewOnList define field view on list
func ViewOnList(name string) EntkitAnnotation {
	return EntkitAnnotation{
		ViewOnList: &name,
	}
}

// ViewOnShow define field view on show page
func ViewOnShow(name string) EntkitAnnotation {
	return EntkitAnnotation{
		ViewOnShow: &name,
	}
}

// ViewOnForm define field view on form
func ViewOnForm(name string) EntkitAnnotation {
	return EntkitAnnotation{
		ViewOnForm: &name,
	}
}

// Badge define entity badge view
func Badge(name string) EntkitAnnotation {
	return EntkitAnnotation{
		Badge: &name,
	}
}

// FilterOperator define entity field filter operator
func FilterOperator(operator gen.Op) EntkitAnnotation {
	opName := operator.Name()
	return EntkitAnnotation{
		FilterOperator: &opName,
	}
}
