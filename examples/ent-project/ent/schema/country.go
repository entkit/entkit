package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/entc/gen"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/diazoxide/ent-refine"
	"github.com/google/uuid"
)

type Country struct {
	ent.Schema
}

func (Country) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New).
			Annotations(
				entgql.OrderField("ID"),
			),
		field.String("name").
			MaxLen(128).
			Annotations(
				EntRefine.TitleField(),
				EntRefine.FilterOperator(gen.Contains),
				entgql.OrderField("NAME"),
			),
		field.String("code").
			MaxLen(2).
			Annotations(
				entgql.OrderField("CODE"),
			),
	}
}

func (Country) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("companies", Company.Type).
			Ref("countries").
			Annotations(entgql.RelayConnection()),
		edge.To("phones", Phone.Type).
			Annotations(entgql.RelayConnection()),
		edge.To("emails", Email.Type).
			Annotations(entgql.RelayConnection()),
		edge.To("websites", Website.Type).
			Annotations(entgql.RelayConnection()),
		edge.To("locations", Location.Type).
			Annotations(entgql.RelayConnection()),
	}
}

func (Country) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.Mutations(entgql.MutationCreate(), entgql.MutationUpdate()),
		EntRefine.Icon("GlobalOutlined"),
		EntRefine.ListItemActions(
			EntRefine.ShowAction,
			EntRefine.DeleteAction,
			EntRefine.EditAction,
		),
	}
}
