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

type Phone struct {
	ent.Schema
}

func (Phone) Fields() []ent.Field {
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
				entkit.FilterOperator(gen.Contains),
				entgql.OrderField("DESCRIPTION"),
			),
		field.String("number").
			MaxLen(24).
			Annotations(
				entgql.OrderField("NUMBER"),
			),
		field.String("type").
			MaxLen(24).
			Annotations(
				entgql.OrderField("TYPE"),
			),
	}
}

func (Phone) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("company", Company.Type).
			Ref("phones").
			Unique(),
		edge.From("country", Country.Type).
			Ref("phones").
			Unique(),
	}
}

func (Phone) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.Mutations(entgql.MutationCreate(), entgql.MutationUpdate()),
		entkit.Icon("PhoneOutlined"),
		entkit.Actions(
			entkit.ListAction,
			entkit.ShowAction,
			entkit.DeleteAction,
			entkit.EditAction,
		),
	}
}
