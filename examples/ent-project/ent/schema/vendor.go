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

type Vendor struct {
	ent.Schema
}

func (Vendor) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New).
			Annotations(
				entgql.OrderField("ID"),
			),
		field.String("name").
			MaxLen(128).
			Annotations(
				entkit.TitleField(),
				entkit.FilterOperator(gen.Contains),
				entgql.OrderField("NAME"),
			),
		field.Text("schema").
			Annotations(
				entgql.OrderField("SCHEMA"),
				entkit.FilterOperator(gen.Contains),
				entkit.CodeField(
					&entkit.CodeFieldOptions{
						Language: "graphql",
					},
				),
			),
	}
}

func (Vendor) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("warehouses", Warehouse.Type).
			Annotations(entgql.RelayConnection()),
		edge.To("products", Product.Type).
			Annotations(entgql.RelayConnection()),
	}
}

func (Vendor) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.Mutations(entgql.MutationCreate(), entgql.MutationUpdate()),
		entkit.Icon("StarOutlined"),
		entkit.Actions(
			entkit.ListAction,
			entkit.ShowAction,
			entkit.DeleteAction,
			entkit.EditAction,
		),
	}
}
