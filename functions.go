package entrefine

import (
	"encoding/json"
	"entgo.io/ent/entc/gen"
)

func someField(node *gen.Type, field string) *gen.Field {
	for _, f := range node.Fields {
		_ant := f.Annotations["ENTREFINE"]
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

func getActionByName(node *gen.Type, name string) *Action {
	_ant, ok := node.Annotations["ENTREFINE"].(map[string]any)
	j, _ := json.Marshal(_ant)
	var ant RefineAnnotation
	_ = json.Unmarshal(j, &ant)

	if ok {
		for _, a := range ant.Actions {
			if a.Name == name {
				return a
			}
		}
	}
	return nil
}
