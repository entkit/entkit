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
				entkit.TitleField(),
				entkit.FilterOperator(gen.Contains),
				entgql.OrderField("TITLE"),
			),
		field.String("description").
			MaxLen(500).
			Annotations(
				entgql.OrderField("DESCRIPTION"),
				entkit.FilterOperator(gen.Contains),
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
		entkit.Icon("MailOutlined"),
		entkit.Actions(
			entkit.ListAction,
			entkit.ShowAction,
			entkit.DeleteAction,
			entkit.EditAction,
		),
	}
}
