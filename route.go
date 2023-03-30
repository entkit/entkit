package entkit

import (
	"strings"
)

type Route struct {
	Path    *string `json:"Path,omitempty"`    // Route of action
	Index   *bool   `json:"Index,omitempty"`   // Mark action as index route
	Element *string `json:"Element,omitempty"` // Element that should be rendered
}

type RouteOption = func(route *Route) error

func NewRoute(path string, element string, options ...RouteOption) *Route {
	path = strings.Trim(path, "/")
	action := &Route{
		Path:    StringP(path),
		Element: StringP(element),
	}
	for _, opt := range options {
		if err := opt(action); err != nil {
			panic(err)
		}
	}
	return action
}

func RouteAsIndex() RouteOption {
	return func(op *Route) (err error) {
		op.Index = BoolP(true)
		return nil
	}
}
