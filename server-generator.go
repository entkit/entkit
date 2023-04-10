package entkit

import (
	"embed"
	cp "github.com/otiai10/copy"
	"io/fs"
	"path"
)

var (
	//go:embed server-templates/*
	_serverTemplates embed.FS
)

type ServableAdapter interface {
	BuildPath() string
	RewritePath() string
	StaticPaths() []string
}

type ServerAdapter struct{}

var DefaultServerAdapter = ServerAdapter{}

func (r ServerAdapter) GetName() string {
	return "server"
}

func (r ServerAdapter) GetFS() fs.FS {
	return _serverTemplates
}

func (r ServerAdapter) BeforeGen(generator *Generator) error {
	for _, g := range generator.Extension.Generators {
		servableGenerator, ok := g.Adapter.(ServableAdapter)
		if !ok {
			continue
		}

		if PBool(g.Serve) {
			err := cp.Copy(
				path.Join(PString(g.Path), servableGenerator.BuildPath()),
				path.Join(PString(generator.Path), PString(g.Name)),
			)
			if err != nil {
				return err
			}
		}
	}
	return nil
}

func (r ServerAdapter) CommandAfterGen(generator *Generator) string {
	return "go fmt"
}

func (r ServerAdapter) GetTemplates() []string {
	return []string{
		"server-templates/Gitignore.goignore",
		"server-templates/Main.tmpl",
		"server-templates/Embed-fs.tmpl",
		"server-templates/Dockerfile.godockerfile",
		"server-templates/Dockerignore.goignore",
		"server-templates/Docker-compose.goyaml",
	}
}

func (r ServerAdapter) GetStaticTemplates() []string {
	return []string{
		"server-templates/Client.tmpl",
	}
}
