package EntRefine

import (
	"entgo.io/ent/entc/gen"
	"entgo.io/ent/schema"
)

// CodeFieldOptions code field is configurable
type CodeFieldOptions struct {
	Language string `json:"Language,omitempty"`
}

// Action item related action
// e.g. show, edit, delete
// also you can create custom actions
type Action struct {
	Name  string         `json:"Name,omitempty"`
	Attrs map[string]any `json:"Attrs,omitempty"`
}

var (
	// EditAction standard edit action
	EditAction = Action{
		Name:  "RA.EditButton",
		Attrs: map[string]any{},
	}
	// ShowAction standard show action
	ShowAction = Action{
		Name:  "RA.ShowButton",
		Attrs: map[string]any{},
	}
	// DeleteAction standard delete action
	DeleteAction = Action{
		Name:  "RA.DeleteButton",
		Attrs: map[string]any{},
	}
)

// RefineAnnotation struct container of all annotations
type RefineAnnotation struct {
	TitleField      bool              `json:"TitleField,omitempty"`     // Mark field as title of entity
	ImageField      bool              `json:"ImageField,omitempty"`     // Mark field as image
	MainImageField  bool              `json:"MainImageField,omitempty"` // Mark field as main image of entity
	CodeField       *CodeFieldOptions `json:"CodeField,omitempty"`      // Mark field as code field
	URLField        bool              `json:"URLField,omitempty"`       // Mark field as url field
	RichTextField   bool              `json:"RichTextField,omitempty"`  // Mark field as rich text field
	NoList          bool              `json:"NoList,omitempty"`
	NoShow          bool              `json:"NoShow,omitempty"`
	NoCreate        bool              `json:"NoCreate,omitempty"`
	NoEdit          bool              `json:"NoEdit,omitempty"`
	HideOnList      bool              `json:"HideOnList,omitempty"`
	HideOnShow      bool              `json:"HideOnShow,omitempty"`
	HideOnForm      bool              `json:"HideOnForm,omitempty"`
	FilterOperator  *string           `json:"FilterOperator,omitempty"`
	Icon            *string           `json:"Icon,omitempty"`
	Label           *string           `json:"Label,omitempty"`
	Description     *string           `json:"Description,omitempty"`
	Prefix          *string           `json:"Prefix,omitempty"`
	Suffix          *string           `json:"Suffix,omitempty"`
	ListItemActions []Action          `json:"ListItemActions,omitempty"`
	ShowActions     []Action          `json:"ShowActions,omitempty"`

	View       *string `json:"View,omitempty"`
	ViewOnShow *string `json:"ViewOnShow,omitempty"`
	ViewOnList *string `json:"ViewOnList,omitempty"`
	ViewOnForm *string `json:"ViewOnForm,omitempty"`
	Badge      *string `json:"Badge,omitempty"`
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

	if ant.NoList {
		ra.NoList = ant.NoList
	}

	if ant.NoShow {
		ra.NoShow = ant.NoShow
	}

	if ant.NoCreate {
		ra.NoCreate = ant.NoCreate
	}

	if ant.NoEdit {
		ra.NoEdit = ant.NoEdit
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

	if ant.View != nil {
		ra.View = ant.View
	}

	if ant.ViewOnList != nil {
		ra.ViewOnList = ant.ViewOnList
	}

	if ant.ViewOnShow != nil {
		ra.ViewOnShow = ant.ViewOnShow
	}

	if ant.Badge != nil {
		ra.Badge = ant.Badge
	}

	if len(ant.ListItemActions) > 0 {
		ra.ListItemActions = append(ra.ListItemActions, ant.ListItemActions...)
	}

	if len(ant.ShowActions) > 0 {
		ra.ShowActions = append(ra.ShowActions, ant.ShowActions...)
	}

	return ra
}

// Name annotation
func (ra RefineAnnotation) Name() string {
	return "REFINE"
}

// ListItemActions actions/buttons on list items
func ListItemActions(actions ...Action) RefineAnnotation {
	return RefineAnnotation{
		ListItemActions: actions,
	}
}

// ShowActions actions/buttons on show page
func ShowActions(actions ...Action) RefineAnnotation {
	return RefineAnnotation{
		ShowActions: actions,
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

// NoList disable entity browse, also hide from navigation
func NoList() RefineAnnotation {
	return RefineAnnotation{
		NoList: true,
	}
}

// NoShow disable entity show page
func NoShow() RefineAnnotation {
	return RefineAnnotation{
		NoShow: true,
	}
}

// NoCreate disable entity creation form
func NoCreate() RefineAnnotation {
	return RefineAnnotation{
		NoCreate: true,
	}
}

// NoEdit disable entity edit form
func NoEdit() RefineAnnotation {
	return RefineAnnotation{
		NoEdit: true,
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

// Icon define icon of entity that will be shown on navigations, breadcrumbs e.t.c.
func Icon(icon string) RefineAnnotation {
	return RefineAnnotation{
		Icon: &icon,
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
