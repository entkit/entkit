package entkit

import (
	"embed"
	"io/fs"
)

var (
	//go:embed typescript-templates/*
	_typescriptTemplates embed.FS
)

type Typescript struct{}

// Generate Typescript definitions based on Ent definitions
var TypescriptAdapter = Typescript{}

func (r Typescript) GetName() string {
	return "typescript"
}

func (r Typescript) GetFS() fs.FS {
	return _typescriptTemplates
}

func (r Typescript) GetTemplates() []string {
	return []string{
		"typescript-templates/Typedefs.gots",
	}
}
