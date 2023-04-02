package entkit

import (
	"entgo.io/contrib/entgql"
	_ "entgo.io/contrib/entgql"
	"entgo.io/ent/entc/gen"
	"fmt"
	"github.com/entkit/entkit/common"
	"github.com/vektah/gqlparser/v2/ast"
)

func NewEntgqlExtension(opts ...entgql.ExtensionOption) (*entgql.Extension, error) {
	plural := gen.Funcs["plural"].(func(string) string)
	return entgql.NewExtension(
		append(
			opts,
			entgql.WithSchemaGenerator(),
			entgql.WithWhereInputs(true),
			entgql.WithSchemaHook(
				func(graph *gen.Graph, s *ast.Schema) error {
					for _, n := range graph.Nodes {

						name := common.LcFirst(plural(n.Name))
						f := s.Types["Query"].Fields.ForName(name)
						if f == nil {
							return fmt.Errorf("missing query field %q", name)
						}
						f.Arguments = append(f.Arguments, &ast.ArgumentDefinition{
							Description: "Search query",
							Name:        "q",
							Type:        ast.NamedType("String", nil),
						})

					}
					return nil

				},
			),
		)...,
	)
}

type Mutation struct {
	description string
	isCreate    bool
}

func NewMutation(description string, isCreate bool) Mutation {
	return Mutation{
		description: description,
		isCreate:    isCreate,
	}
}

func (v Mutation) IsCreate() bool { return v.isCreate }

func (v Mutation) GetDescription() string { return v.description }

func (v Mutation) Description(desc string) entgql.MutationOption {
	v.description = desc
	return v
}
