package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/entc/gen"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/entkit/entkit/examples/ent-project/ent/schema/enums"
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
				entkit.TitleField(),
				entkit.FilterOperator(gen.Contains),
				entgql.OrderField("TITLE"),
			),
		field.String("description").
			MaxLen(512).
			Annotations(
				entkit.RichTextField(),
				entkit.FilterOperator(gen.Contains),
				entkit.HideOnList(),
				entgql.OrderField("DESCRIPTION"),
			),
		field.String("image").
			MaxLen(128).
			Annotations(
				entgql.OrderField("IMAGE"),
				entkit.MainImageField(),
			),
		field.String("url").
			MaxLen(128).
			Annotations(
				entkit.TitleField(),
				entkit.URLField(),
				entkit.FilterOperator(gen.Contains),
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
		entkit.Icon("FileOutlined"),
		entkit.Actions(
			entkit.ListAction,
			entkit.ShowAction,
			entkit.EditAction,
			entkit.DeleteAction,
			entkit.NewAction("MyCustomActionButton",
				entkit.ActionWithOperation(
					entkit.NewOperation("MyCustomActionButton"),
				),
			),
		),
	}
}
