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
		field.String("title").
			MaxLen(128).
			Annotations(
				EntRefine.TitleField(),
				EntRefine.FilterOperator(gen.Contains),
				entgql.OrderField("TITLE"),
			),
		field.String("url").
			MaxLen(128).
			Annotations(
				entgql.OrderField("URL"),
				EntRefine.FilterOperator(gen.Contains),
			),
		field.Text("schema").
			Annotations(
				entgql.OrderField("SCHEMA"),
				EntRefine.FilterOperator(gen.Contains),
				EntRefine.CodeField(
					&EntRefine.CodeFieldOptions{
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
		EntRefine.Icon("StarOutlined"),
		EntRefine.ListActions(
			EntRefine.ShowAction,
			EntRefine.DeleteAction,
			EntRefine.EditAction,
		),
	}
}