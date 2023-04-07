package entkit

import (
	"embed"
	"io/fs"
)

var (
	//go:embed environment-templates/*
	_environmentTemplates embed.FS
)

type Environment = struct {
	Meta       map[string]any   `json:"meta,omitempty"`
	GraphqlURL string           `json:"graphqlUrl,omitempty"`
	Auth       *AuthEnvironment `json:"auth,omitempty"`
}

type EnvironmentAdapter struct{}

var DefaultEnvironmentAdapter = EnvironmentAdapter{}

func (r EnvironmentAdapter) GetName() string {
	return "environment"
}

func (r EnvironmentAdapter) GetFS() fs.FS {
	return _environmentTemplates
}

func (r EnvironmentAdapter) GetTemplates() []string {
	return []string{
		"environment-templates/Environment.gojson",
	}
}
