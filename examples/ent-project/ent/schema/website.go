package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/entc/gen"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
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
				entkit.TitleField(),
				entgql.OrderField("TITLE"),
				entkit.FilterOperator(gen.Contains),
			),
		field.String("description").
			MaxLen(500).
			Annotations(
				entgql.OrderField("DESCRIPTION"),
				entkit.FilterOperator(gen.Contains),
			),
		field.String("url").
			MaxLen(128).
			Annotations(
				entgql.OrderField("URL"),
				entkit.FilterOperator(gen.Contains),
				entkit.URLField(),
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
		entkit.Icon("LinkOutlined"),
		entkit.Actions(
			entkit.ListAction,
			entkit.ShowAction,
			entkit.DeleteAction,
			entkit.EditAction,
		),
	}
}
