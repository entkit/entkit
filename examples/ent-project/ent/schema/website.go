package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/entc/gen"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	EntRefine "github.com/diazoxide/entrefine"
	"github.com/google/uuid"
)

type Website struct {
	ent.Schema
}

func (Website) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New).
			Annotations(
				entgql.OrderField("ID"),
			),
		field.String("title").
			MaxLen(128).
			Annotations(
				EntRefine.TitleField(),
				entgql.OrderField("TITLE"),
				EntRefine.FilterOperator(gen.Contains),
			),
		field.String("description").
			MaxLen(500).
			Annotations(
				entgql.OrderField("DESCRIPTION"),
				EntRefine.FilterOperator(gen.Contains),
			),
		field.String("url").
			MaxLen(128).
			Annotations(
				entgql.OrderField("URL"),
				EntRefine.FilterOperator(gen.Contains),
				EntRefine.URLField(),
			),
	}
}

func (Website) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("company", Company.Type).
			Ref("websites").
			Unique(),
		edge.From("country", Country.Type).
			Ref("websites").
			Unique(),
	}
}

func (Website) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.Mutations(entgql.MutationCreate(), entgql.MutationUpdate()),
		EntRefine.Icon("LinkOutlined"),
		EntRefine.ListItemActions(
			EntRefine.ShowAction,
			EntRefine.DeleteAction,
			EntRefine.EditAction,
		),
	}
}
