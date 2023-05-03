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

// Annotation struct container of all annotations
type Annotation struct {
	TitleField     *bool             `json:"TitleField,omitempty"`     // Mark field as title of entity
	ImageField     *bool             `json:"ImageField,omitempty"`     // Mark field as image
	MainImageField *bool             `json:"MainImageField,omitempty"` // Mark field as main image of entity
	CodeField      *CodeFieldOptions `json:"CodeField,omitempty"`      // Mark field as code field
	URLField       *bool             `json:"URLField,omitempty"`       // Mark field as url field
	RichTextField  *bool             `json:"RichTextField,omitempty"`  // Mark field as rich text field
	HideOnList     *bool             `json:"HideOnList,omitempty"`     // Hide field on list
	HideOnShow     *bool             `json:"HideOnShow,omitempty"`     // Hide field on show
	HideOnForm     *bool             `json:"HideOnForm,omitempty"`     // Hide field on all forms
	HideOnCreate   *bool             `json:"HideOnCreate,omitempty"`   // Hide field on create form
	HideOnUpdate   *bool             `json:"HideOnUpdate,omitempty"`   // Hide field on update form
	FilterOperator *string           `json:"FilterOperator,omitempty"` // Set filter operator for field `gen.Op`
	Icon           *string           `json:"Icon,omitempty"`           // Set entity or field icon
	Label          *string           `json:"Label,omitempty"`          // Set label for entity or field
	Description    *string           `json:"Description,omitempty"`    // Set description for entity or field
	Prefix         *string           `json:"Prefix,omitempty"`         // Set prefix on field: TODO
	Suffix         *string           `json:"Suffix,omitempty"`         // Set suffix on field: TODO
	Actions        []*Action         `json:"Actions,omitempty"`        // Set entity related actions
	View           *string           `json:"View,omitempty"`           // Set view for field
	Route          *string           `json:"Route,omitempty"`          // Set root Route for entity
	IndexRoute     *bool             `json:"IndexRoute,omitempty"`     // Mark entity as index route
	ViewOnShow     *string           `json:"ViewOnShow,omitempty"`     // Set a view of entity on show
	ViewOnList     *string           `json:"ViewOnList,omitempty"`     // Set a view of entity on list
	ViewOnForm     *string           `json:"ViewOnForm,omitempty"`     // Set a view on entity on form
	Badge          *string           `json:"Badge,omitempty"`          // Set a badge view

	EdgesDiagram *string `json:"EdgesDiagram,omitempty"`
}

// Merge implements the schema.Merger interface.
func (at Annotation) Merge(other schema.Annotation) schema.Annotation {
	var annotation Annotation
	switch other := other.(type) {
	case Annotation:
		annotation = other
	case *Annotation:
		if other != nil {
			annotation = *other
		}
	default:
		return at
	}

	if annotation.TitleField != nil {
		at.TitleField = annotation.TitleField
	}

	if annotation.CodeField != nil {
		at.CodeField = annotation.CodeField
	}

	if annotation.TitleField != nil {
		at.TitleField = annotation.TitleField
	}

	if annotation.URLField != nil {
		at.URLField = annotation.URLField
	}

	if annotation.ImageField != nil {
		at.ImageField = annotation.ImageField
	}

	if annotation.MainImageField != nil {
		at.MainImageField = annotation.MainImageField
	}

	if annotation.RichTextField != nil {
		at.RichTextField = annotation.RichTextField
	}

	if annotation.HideOnShow != nil {
		at.HideOnList = annotation.HideOnList
	}

	if annotation.HideOnList != nil {
		at.HideOnList = annotation.HideOnList
	}

	if annotation.HideOnForm != nil {
		at.HideOnForm = annotation.HideOnForm
	}

	if annotation.HideOnCreate != nil {
		at.HideOnCreate = annotation.HideOnCreate
	}

	if annotation.HideOnUpdate != nil {
		at.HideOnUpdate = annotation.HideOnUpdate
	}

	if annotation.Route != nil {
		at.Route = annotation.Route
	}

	if annotation.IndexRoute != nil {
		at.IndexRoute = annotation.IndexRoute
	}

	if annotation.FilterOperator != nil {
		at.FilterOperator = annotation.FilterOperator
	}

	if annotation.Label != nil {
		at.Label = annotation.Label
	}

	if annotation.Description != nil {
		at.Description = annotation.Description
	}

	if annotation.Icon != nil {
		at.Icon = annotation.Icon
	}

	if annotation.Prefix != nil {
		at.Prefix = annotation.Prefix
	}

	if annotation.Suffix != nil {
		at.Suffix = annotation.Suffix
	}

	if annotation.View != nil {
		at.View = annotation.View
	}

	if annotation.ViewOnList != nil {
		at.ViewOnList = annotation.ViewOnList
	}

	if annotation.ViewOnShow != nil {
		at.ViewOnShow = annotation.ViewOnShow
	}

	if annotation.Badge != nil {
		at.Badge = annotation.Badge
	}

	if len(annotation.Actions) > 0 {
		at.Actions = append(at.Actions, annotation.Actions...)
	}

	if annotation.EdgesDiagram != nil {
		at.EdgesDiagram = annotation.EdgesDiagram
	}

	return at
}

// Name annotation
func (at Annotation) Name() string {
	return "ENTKIT"
}

// Actions actions/buttons on list items
func Actions(actions ...*Action) Annotation {
	return Annotation{
		Actions: actions,
	}
}

// OnlyOnList show field only on list
func OnlyOnList() Annotation {
	return Annotation{
		HideOnList: BoolP(false),
		HideOnShow: BoolP(true),
		HideOnForm: BoolP(true),
	}
}

// OnlyOnForm show field only on form
func OnlyOnForm() Annotation {
	return Annotation{
		HideOnList: BoolP(true),
		HideOnShow: BoolP(true),
		HideOnForm: BoolP(false),
	}
}

// OnlyOnShow show field only on show page
func OnlyOnShow() Annotation {
	return Annotation{
		HideOnList: BoolP(true),
		HideOnShow: BoolP(false),
		HideOnForm: BoolP(true),
	}
}

// HideOnList hide field on list
func HideOnList() Annotation {
	return Annotation{
		HideOnList: BoolP(true),
	}
}

// HideOnShow hide field on show page
func HideOnShow() Annotation {
	return Annotation{
		HideOnShow: BoolP(true),
	}
}

// HideOnForm hide field on form
func HideOnForm() Annotation {
	return Annotation{
		HideOnForm: BoolP(true),
	}
}

// HideOnCreate hide field on form
func HideOnCreate() Annotation {
	return Annotation{
		HideOnCreate: BoolP(true),
	}
}

// HideOnUpdate hide field on form
func HideOnUpdate() Annotation {
	return Annotation{
		HideOnUpdate: BoolP(true),
	}
}

// TitleField mark field as a title field
func TitleField() Annotation {
	return Annotation{
		TitleField: BoolP(true),
	}
}

// ImageField mark field as an image field
func ImageField() Annotation {
	return Annotation{
		ImageField: BoolP(true),
	}
}

// MainImageField mark field as a main image field
func MainImageField() Annotation {
	return Annotation{
		MainImageField: BoolP(true),
		ImageField:     BoolP(true),
	}
}

// RichTextField mark field as a rich text field (wysiwyg editor)
func RichTextField() Annotation {
	return Annotation{
		RichTextField: BoolP(true),
	}
}

// CodeField mark field as a code field
func CodeField(config *CodeFieldOptions) Annotation {
	return Annotation{
		CodeField: config,
	}
}

// URLField mark field as an url field
func URLField() Annotation {
	return Annotation{
		URLField: BoolP(true),
	}
}

// Icon define icon of entity that will be shown on navigations, breadcrumbs etc.
func Icon(icon string) Annotation {
	return Annotation{
		Icon: &icon,
	}
}

// RoutePath define entity route for url.
func RoutePath(path string) Annotation {
	return Annotation{
		Route: &path,
	}
}

// IndexRoute make entity route as index route
func IndexRoute() Annotation {
	return Annotation{
		IndexRoute: BoolP(true),
	}
}

// Label define label of field
// todo: implement generator
func Label(label string) Annotation {
	return Annotation{
		Label: &label,
	}
}

// Description define description of field/entity
// todo: implement generator
func Description(description string) Annotation {
	return Annotation{
		Label: &description,
	}
}

// Prefix add prefix to value of field
// todo: implement generator
func Prefix(prefix string) Annotation {
	return Annotation{
		Prefix: &prefix,
	}
}

// Suffix add suffix to value of field
func Suffix(suffix string) Annotation {
	return Annotation{
		Prefix: &suffix,
	}
}

// View define field views on list and show
func View(name string) Annotation {
	return Annotation{
		View:       &name,
		ViewOnList: &name,
		ViewOnShow: &name,
	}
}

// ViewOnList define field view on list
func ViewOnList(name string) Annotation {
	return Annotation{
		ViewOnList: &name,
	}
}

// ViewOnShow define field view on show page
func ViewOnShow(name string) Annotation {
	return Annotation{
		ViewOnShow: &name,
	}
}

// ViewOnForm define field view on form
func ViewOnForm(name string) Annotation {
	return Annotation{
		ViewOnForm: &name,
	}
}

// Badge define entity badge view
func Badge(name string) Annotation {
	return Annotation{
		Badge: &name,
	}
}

// FilterOperator define entity field filter operator
func FilterOperator(operator gen.Op) Annotation {
	opName := operator.Name()
	return Annotation{
		FilterOperator: &opName,
	}
}
