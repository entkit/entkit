package entkit

import (
	"embed"
	"io/fs"
)

var (
	//go:embed typescript-templates/*
	_typescriptTemplates embed.FS
)

type TypescriptAdapter struct{}

var DefaultTypescriptAdapter = TypescriptAdapter{}

func (r TypescriptAdapter) GetName() string {
	return "typescript"
}

func (r TypescriptAdapter) GetFS() fs.FS {
	return _typescriptTemplates
}

func (r TypescriptAdapter) GetTemplates() []string {
	return []string{
		"typescript-templates/Typedefs.gots",
	}
}
