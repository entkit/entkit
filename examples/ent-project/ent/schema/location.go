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

type Location struct {
	ent.Schema
}

func (Location) Fields() []ent.Field {
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
				EntRefine.FilterOperator(gen.Contains),
				entgql.OrderField("DESCRIPTION"),
			),
		field.Float("latitude").
			Annotations(
				entgql.OrderField("LATITUDE"),
			),
		field.Float("longitude").
			Annotations(
				entgql.OrderField("LONGITUDE"),
			),
		field.String("address").
			MaxLen(128).
			Annotations(
				EntRefine.FilterOperator(gen.Contains),
				entgql.OrderField("ADDRESS"),
			),
		field.String("postcode").
			MaxLen(8).
			Annotations(
				entgql.OrderField("POSTCODE"),
			),
		field.String("type").
			MaxLen(64).
			Annotations(
				entgql.OrderField("TYPE"),
			),
		field.String("state").
			MaxLen(64).
			Annotations(
				EntRefine.FilterOperator(gen.Contains),
				entgql.OrderField("STATE"),
			),
		field.String("suburb").
			MaxLen(64).
			Annotations(
				EntRefine.FilterOperator(gen.Contains),
				entgql.OrderField("SUBURB"),
			),
		field.String("street_type").
			MaxLen(64).
			Annotations(
				entgql.OrderField("STREET_TYPE"),
			),
		field.String("street_name").
			MaxLen(64).
			Annotations(
				EntRefine.FilterOperator(gen.Contains),
				entgql.OrderField("STREET_NAME"),
			),
	}
}

func (Location) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("company", Company.Type).
			Ref("locations").
			Unique(),
		edge.From("country", Country.Type).
			Ref("locations").
			Unique(),
	}
}

func (Location) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.Mutations(entgql.MutationCreate(), entgql.MutationUpdate()),
		EntRefine.Icon("PushpinOutlined"),
		EntRefine.ListItemActions(
			EntRefine.ShowAction,
			EntRefine.DeleteAction,
			EntRefine.EditAction,
		),
	}
}
