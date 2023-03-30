package entkit

import (
	"encoding/json"
	"entgo.io/ent/entc/gen"
)

func someField(node *gen.Type, field string) *gen.Field {
	for _, f := range node.Fields {
		_ant := f.Annotations["ENTKIT"]
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

func someNode(graph *gen.Graph, field string) *gen.Type {
	for _, n := range graph.Nodes {
		_ant := n.Annotations["ENTKIT"]
		ant, ok := _ant.(map[string]any)

		if !ok {
			continue
		}

		is, ok := ant[field].(bool)
		if ok && is {
			return n
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
	_ant, ok := node.Annotations["ENTKIT"].(map[string]any)
	j, _ := json.Marshal(_ant)
	var ant RefineAnnotation
	_ = json.Unmarshal(j, &ant)

	if ok {
		for _, a := range ant.Actions {
			if PString(a.Name) == name {
				return a
			}
		}
	}
	return nil
}

func camel(s string) string {
	fn, ok := gen.Funcs["camel"].(func(s string) string)
	if !ok {
		panic("cannot reuse gen.Funcs[\"camel\"]")
	}
	return fn(s)
}

func pascal(s string) string {
	fn, ok := gen.Funcs["pascal"].(func(s string) string)
	if !ok {
		panic("cannot reuse gen.Funcs[\"pascal\"]")
	}
	return fn(s)
}

func snake(s string) string {
	fn, ok := gen.Funcs["snake"].(func(s string) string)
	if !ok {
		panic("cannot reuse gen.Funcs[\"snake\"]")
	}
	return fn(s)
}

func PrepareName(prefix string, name string) string {
	return prefix + pascal(name)
}
