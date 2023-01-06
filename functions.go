package EntRefine

import (
	"entgo.io/ent/entc/gen"
)

func someField(node *gen.Type, field string) *gen.Field {
	for _, f := range node.Fields {
		_ant := f.Annotations["REFINE"]
		ant, ok := _ant.(map[string]any)

		if !ok {
			continue
		}

		is, ok := ant[field].(bool)
		if ok && is {
			return f
		}
	}
	return nil
}

func titleField(node *gen.Type) *gen.Field {
	f := someField(node, "TitleField")
	if f != nil {
		return f
	}
	return node.ID
}

func mainImageField(node *gen.Type) *gen.Field {
	return someField(node, "MainImageField")
}
