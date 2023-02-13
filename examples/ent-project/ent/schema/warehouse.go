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

type Warehouse struct {
	ent.Schema
}

func (Warehouse) Fields() []ent.Field {
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
		field.Time("last_update").
			Nillable().
			Optional().
			Annotations(
				entgql.Skip(entgql.SkipMutationCreateInput),
				entgql.OrderField("LAST_UPDATE"),
			),
		field.String("original_data").
			Optional().
			Nillable().
			Annotations(
				//EntRefine.HideOnList(),
				EntRefine.FilterOperator(gen.Contains),
				EntRefine.CodeField(
					&EntRefine.CodeFieldOptions{
						Language: "json",
					},
				),
			),
		field.Bool("enabled").
			Default(true).
			Annotations(
				entgql.OrderField("ENABLED"),
			),
		field.Strings("filters").
			Optional().
			Annotations(),
	}
}

func (Warehouse) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("products", Product.Type).
			Annotations(entgql.RelayConnection()),

		edge.From("vendor", Vendor.Type).
			Ref("warehouses").
			Unique(),
	}
}

func (Warehouse) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.Mutations(entgql.MutationCreate(), entgql.MutationUpdate()),
		EntRefine.Icon("OrderedListOutlined"),
		EntRefine.ListItemActions(
			EntRefine.ShowAction,
			EntRefine.DeleteAction,
			EntRefine.EditAction,
		),
	}
}
