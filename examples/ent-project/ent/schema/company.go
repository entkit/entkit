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

type Company struct {
	ent.Schema
}

func (Company) Fields() []ent.Field {
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
				EntRefine.FieldView("MyCustomTitle"),
				entgql.OrderField("TITLE"),
			),
		field.String("description").
			MaxLen(512).
			Annotations(
				EntRefine.RichTextField(),
				EntRefine.FilterOperator(gen.Contains),
				entgql.OrderField("DESCRIPTION"),
			),
	}
}

func (Company) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("product", Product.Type).Ref("company").
			Unique(),
		edge.To("countries", Country.Type).
			Annotations(entgql.RelayConnection()),
		edge.To("phones", Phone.Type).
			Annotations(entgql.RelayConnection()),
		edge.To("emails", Email.Type).
			Annotations(entgql.RelayConnection()),
		edge.To("websites", Website.Type).
			Annotations(entgql.RelayConnection()),
		edge.To("locations", Location.Type).
			Annotations(entgql.RelayConnection()),
		edge.To("logo_image", Image.Type).
			Unique(),
		edge.To("gallery_images", Image.Type).
			Annotations(entgql.RelayConnection()),
	}
}
func (Company) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.Mutations(entgql.MutationCreate(), entgql.MutationUpdate()),
		EntRefine.Icon("ShopOutlined"),
		EntRefine.ListActions(
			EntRefine.ShowAction,
			EntRefine.DeleteAction,
			EntRefine.EditAction,
		),
	}
}
