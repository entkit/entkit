package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/entc/gen"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	EntRefine "github.com/diazoxide/entrefine"
	"github.com/diazoxide/entrefine/examples/ent-project/ent/schema/enums"
	"github.com/google/uuid"
)

type Product struct {
	ent.Schema
}

func (Product) Fields() []ent.Field {
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
				entgql.OrderField("TITLE"),
			),
		field.String("description").
			MaxLen(512).
			Annotations(
				EntRefine.RichTextField(),
				EntRefine.FilterOperator(gen.Contains),
				EntRefine.HideOnList(),
				entgql.OrderField("DESCRIPTION"),
			),
		field.String("image").
			MaxLen(128).
			Annotations(
				entgql.OrderField("IMAGE"),
				EntRefine.MainImageField(),
			),
		field.String("url").
			MaxLen(128).
			Annotations(
				EntRefine.TitleField(),
				EntRefine.URLField(),
				EntRefine.FilterOperator(gen.Contains),
				entgql.OrderField("URL"),
			),
		field.Time("last_sell").
			Optional().
			Nillable().
			Annotations(
				entgql.Skip(entgql.SkipMutationCreateInput),
				entgql.OrderField("LAST_SELL"),
			),
		field.Time("created_at").
			Optional().
			Nillable().
			Annotations(
				entgql.Skip(entgql.SkipMutationCreateInput),
				entgql.OrderField("CREATED_AT"),
			),
		field.Enum("status").
			GoType(enums.ProcessStatus("")).
			Default(string(enums.ProcessStatusNone)).
			Annotations(
				entgql.OrderField("STATUS"),
			),
		field.Enum("build_status").
			GoType(enums.ProcessStatus("")).
			Default(string(enums.ProcessStatusNone)).
			Annotations(
				entgql.OrderField("BUILD_STATUS"),
			),
	}
}

func (Product) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("warehouse", Warehouse.Type).
			Ref("products").
			Unique(),
		edge.From("vendor", Vendor.Type).
			Ref("products").
			Unique(),
	}
}

func (Product) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.Mutations(entgql.MutationCreate(), entgql.MutationUpdate()),
		EntRefine.Icon("FileOutlined"),
		EntRefine.Actions(
			EntRefine.ShowAction,
			EntRefine.EditAction,
			EntRefine.DeleteAction,
			EntRefine.Action{
				Operation: "MyCustomActionButton",
			},
		),
	}
}
