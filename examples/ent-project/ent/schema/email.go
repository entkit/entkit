package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/entc/gen"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	EntRefine "github.com/diazoxide/ent-refine"
	"github.com/google/uuid"
)

type Email struct {
	ent.Schema
}

func (Email) Fields() []ent.Field {
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
				EntRefine.FilterOperator(gen.Contains),
				entgql.OrderField("TITLE"),
			),
		field.String("description").
			MaxLen(500).
			Annotations(
				entgql.OrderField("DESCRIPTION"),
				EntRefine.FilterOperator(gen.Contains),
			),
		field.String("address").
			Annotations(
				entgql.OrderField("ADDRESS"),
			).
			MaxLen(128),
	}
}

func (Email) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("company", Company.Type).
			Ref("emails").
			Unique(),
		edge.From("country", Country.Type).
			Ref("emails").
			Unique(),
	}
}

func (Email) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.Mutations(entgql.MutationCreate(), entgql.MutationUpdate()),
		EntRefine.Icon("MailOutlined"),
		EntRefine.ListActions(
			EntRefine.ShowAction,
			EntRefine.DeleteAction,
			EntRefine.EditAction,
		),
	}
}
