package entkit

import (
	"embed"
	"io/fs"
)

var (
	//go:embed environment-templates/*
	_environmentTemplates embed.FS
)

// Environment main struct
type Environment = struct {
	Meta       map[string]any   `json:"meta,omitempty"`
	GraphqlURL string           `json:"graphqlUrl,omitempty"`
	AppPath    string           `json:"appPath,omitempty"`
	Auth       *AuthEnvironment `json:"auth,omitempty"`
}

// EnvironmentAdapter main struct
type EnvironmentAdapter struct{}

// DefaultEnvironmentAdapter main struct
var DefaultEnvironmentAdapter = EnvironmentAdapter{}

// GetName returns name of adapter
func (r EnvironmentAdapter) GetName() string {
	return "environment"
}

// GetFS returns fs of adapter
func (r EnvironmentAdapter) GetFS() fs.FS {
	return _environmentTemplates
}

// GetTemplates returns templates of adapter
func (r EnvironmentAdapter) GetTemplates() []string {
	return []string{
		"environment-templates/Environment.gojson",
	}
}
