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

type Image struct {
	ent.Schema
}

func (Image) Fields() []ent.Field {
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
		field.String("original_url").
			Annotations(
				entgql.OrderField("ORIGINAL_URL"),
				EntRefine.MainImageField(),
			).
			MaxLen(128),
	}
}

func (Image) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("gallery_company", Company.Type).
			Ref("gallery_images").
			Unique(),
		edge.From("logo_company", Company.Type).
			Ref("logo_image").
			Unique(),
		edge.From("cover_company", Company.Type).
			Ref("cover_image").
			Unique(),
	}
}

func (Image) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.Mutations(entgql.MutationCreate(), entgql.MutationUpdate()),
		EntRefine.Icon("CameraOutlined"),
		EntRefine.Actions(
			EntRefine.ShowAction,
			EntRefine.DeleteAction,
			EntRefine.EditAction,
		),
	}
}
