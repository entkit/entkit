package entkit

import (
	"strings"
)

// Action item related action
type Action struct {
	Name            *string         `json:"Name,omitempty"`            // Name of action (Required)
	General         *bool           `json:"General,omitempty"`         // Mark action as general (independent of record) (e.g. create, list)
	Scope           *string         `json:"Scope,omitempty"`           // Scope of resource authorization
	Props           *map[string]any `json:"Props,omitempty"`           // Props are directly passing to react component
	CustomComponent *string         `json:"CustomComponent,omitempty"` // Custom component TODO: custom component
	Description     *string         `json:"Description,omitempty"`     // Description of action
	Label           *string         `json:"Label,omitempty"`           // Label of button
	Icon            *string         `json:"Icon,omitempty"`            // Icon of button
	OnList          *bool           `json:"OnList,omitempty"`          // Display on list
	OnShow          *bool           `json:"OnShow,omitempty"`          // Display on show
	OnEdit          *bool           `json:"OnEdit,omitempty"`          // Display on edit
	OnCreate        *bool           `json:"OnCreate,omitempty"`        // Display on edit
	DisplayOn       []string        `json:"DisplayOn,omitempty"`
	Route           *Route          `json:"Route,omitempty"`     // Route of action
	Operation       *Operation      `json:"Operation,omitempty"` // Operation of action
}

var (
	// ListAction standard list action
	ListAction = NewAction(
		"list",
		ActionAsGeneral(),
		ActionWithLabel("List"),
		ActionWithScope(ActionReadScope),
		ActionWithIcon("AntdIcons.UnorderedListOutlined"),
		ActionDisplayOn("show", "edgesDiagram"),
		ActionWithRoute(NewRoute("/", "List.{name}List", RouteAsIndex())),
	)
	// EditAction standard edit action
	EditAction = NewAction(
		"edit",
		ActionWithLabel("Edit"),
		ActionWithScope(ActionUpdateScope),
		ActionWithRoute(NewRoute("edit/:id", "Edit.{name}Edit")),
		ActionWithIcon("AntdIcons.EditOutlined"),
		ActionDisplayOn("list", "show", "edgesDiagram"),
	)
	// CreateAction standard create action
	CreateAction = NewAction(
		"create",
		ActionAsGeneral(),
		ActionWithLabel("Create"),
		ActionWithScope(ActionCreateScope),
		ActionWithIcon("AntdIcons.PlusCircleOutlined"),
		ActionWithRoute(NewRoute("create", "Create.{name}Create")),
		ActionDisplayOn("list"),
	)
	// ShowAction standard show action
	ShowAction = NewAction(
		"show",
		ActionWithLabel("Show"),
		ActionWithScope(ActionReadScope),
		ActionWithIcon("AntdIcons.EyeOutlined"),
		ActionWithRoute(NewRoute("show/:id", "Show.{name}MainShow")),
		ActionDisplayOn("list", "edit", "edgesDiagram"),
	)
	// DeleteAction standard delete action
	DeleteAction = NewAction(
		"delete",
		ActionWithLabel("Delete"),
		ActionWithScope(ActionDeleteScope),
		ActionWithIcon("AntdIcons.DeleteOutlined"),
		ActionWithProps(map[string]any{
			"danger": true,
		}),
		ActionDisplayOn("list", "show", "edgesDiagram"),
		ActionWithOperation(NewOperation(
			"delete",
			OperationAsBulk(),
			OperationAsMutation(),
		)),
	)
	// EdgesDiagramAction edges diagram action (optional)
	EdgesDiagramAction = NewAction(
		"edgesDiagram",
		ActionWithLabel("Edges Diagram"),
		ActionWithScope(ActionReadScope),
		ActionWithIcon("AntdIcons.EyeOutlined"),
		ActionWithRoute(NewRoute("edges/:id", "EdgesDiagram.{name}EdgesDiagram")),
		ActionDisplayOn("show", "edit"),
	)
	DefaultActions = []*Action{
		ShowAction, ListAction, CreateAction, EditAction, DeleteAction,
	}
)

type ActionOption = func(*Action) error

func NewAction(name string, options ...ActionOption) *Action {
	action := &Action{
		Name: StringP(name),
	}
	for _, opt := range options {
		if err := opt(action); err != nil {
			panic(err)
		}
	}

	if action.Scope == nil {
		action.Scope = action.Name
	}
	return action
}

// region Options

func ActionWithLabel(label string) ActionOption {
	return func(ac *Action) (err error) {
		ac.Label = StringP(label)
		return nil
	}
}

func ActionWithRoute(route *Route) ActionOption {
	return func(ac *Action) (err error) {
		if ac.Operation != nil {
			panic("Error: `operation` already set. One of `operation` and `route` should be defined.")
		}
		if !PBool(ac.General) && !strings.Contains(*route.Path, "/:id") {
			panic("Not general actions routes must have a `:id` on path")
		}
		ac.Route = route
		return nil
	}
}

func ActionWithOperation(operation *Operation) ActionOption {
	return func(ac *Action) (err error) {
		if ac.Route != nil {
			panic("Error: `route` already set. One of `operation` and `route` should be defined.")
		}
		ac.Operation = operation
		return nil
	}
}

func ActionWithIcon(icon string) ActionOption {
	return func(ac *Action) (err error) {
		ac.Icon = StringP(icon)
		return nil
	}
}

func WithDescription(description string) ActionOption {
	return func(ac *Action) (err error) {
		ac.Description = StringP(description)
		return nil
	}
}

func ActionWithScope(scope string) ActionOption {
	return func(ac *Action) (err error) {
		ac.Scope = StringP(scope)
		return nil
	}
}

func ActionWithProps(props map[string]any) ActionOption {
	return func(ac *Action) (err error) {
		ac.Props = &props
		return nil
	}
}

func WithCustomComponent(component string) ActionOption {
	return func(ac *Action) (err error) {
		ac.CustomComponent = StringP(component)
		return nil
	}
}

func ActionDisplayOn(actionNames ...string) ActionOption {
	return func(ac *Action) (err error) {
		ac.DisplayOn = actionNames
		return nil
	}
}

func ActionDisplayOnList(display bool) ActionOption {
	return func(ac *Action) (err error) {
		ac.OnList = BoolP(display)
		return nil
	}
}

func ActionDisplayOnEdit(display bool) ActionOption {
	return func(ac *Action) (err error) {
		ac.OnEdit = BoolP(display)
		return nil
	}
}

func ActionDisplayOnShow(display bool) ActionOption {
	return func(ac *Action) (err error) {
		ac.OnShow = BoolP(display)
		return nil
	}
}

func ActionDisplayOnCreate(display bool) ActionOption {
	return func(ac *Action) (err error) {
		ac.OnCreate = BoolP(display)
		return nil
	}
}

func ActionAsGeneral() ActionOption {
	return func(ac *Action) (err error) {
		ac.General = BoolP(true)
		return nil
	}
}

// endregion options
