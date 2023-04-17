package entkit

import (
	"encoding/json"
	"entgo.io/ent/entc/gen"
	"golang.org/x/text/cases"
	"golang.org/x/text/language"
	"strings"
	"unicode"
)

func (ex *Extension) someField(node *gen.Type, field string) *gen.Field {
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

func (ex *Extension) someNode(graph *gen.Graph, field string) *gen.Type {
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

func (ex *Extension) GetNodeAction(node *gen.Type, name string) *Action {
	ant := ex.getNodeAnnotations(node)
	for _, action := range ant.Actions {
		if PString(action.Name) == name {
			return action
		}
	}
	return nil
}

func (ex *Extension) getNodeAnnotations(node *gen.Type) *EntkitAnnotation {
	_ant, ok := node.Annotations["ENTKIT"]
	if !ok {
		return nil
	}
	return ex._parseAnnotations(_ant)
}

func (ex *Extension) getFieldAnnotations(field *gen.Field) *EntkitAnnotation {
	_ant, ok := field.Annotations["ENTKIT"]
	if !ok || _ant == nil {
		return nil
	}
	return ex._parseAnnotations(_ant)
}

func (ex *Extension) NodeActionRoutePattern(node *gen.Type, actionName string) string {
	action := ex.GetNodeAction(node, actionName)
	ant := ex.getNodeAnnotations(node)
	rootPath := ex.Snake(node.Name)
	if ant.Route != nil {
		rootPath = PString(ant.Route)
	}

	return "/" + rootPath + "/" + PString(action.Route.Path)

}

func (ex *Extension) _parseAnnotations(data any) *EntkitAnnotation {
	j, err := json.Marshal(data)
	if err != nil {
		panic(err)
	}

	var ant EntkitAnnotation
	err = json.Unmarshal(j, &ant)
	if err != nil {
		panic(err)
	}
	return &ant
}

func (ex *Extension) IndexNode(graph *gen.Graph) *gen.Type {
	return ex.someNode(graph, "IndexRoute")
}

func (ex *Extension) TitleField(node *gen.Type) *gen.Field {
	f := ex.someField(node, "TitleField")
	if f != nil {
		return f
	}
	return node.ID
}

func (ex *Extension) MainImageField(node *gen.Type) *gen.Field {
	return ex.someField(node, "MainImageField")
}

func (ex *Extension) GetActionByName(node *gen.Type, name string) *Action {
	_ant, ok := node.Annotations["ENTKIT"].(map[string]any)
	j, _ := json.Marshal(_ant)
	var ant EntkitAnnotation
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

func (ex *Extension) Camel(s string) string {
	fn, ok := gen.Funcs["camel"].(func(s string) string)
	if !ok {
		panic("cannot reuse gen.Funcs[\"camel\"]")
	}
	return fn(s)
}

func (ex *Extension) Pascal(s string) string {
	fn, ok := gen.Funcs["pascal"].(func(s string) string)
	if !ok {
		panic("cannot reuse gen.Funcs[\"pascal\"]")
	}
	return fn(s)
}

func (ex *Extension) Snake(s string) string {
	fn, ok := gen.Funcs["snake"].(func(s string) string)
	if !ok {
		panic("cannot reuse gen.Funcs[\"snake\"]")
	}
	return fn(s)
}

func (ex *Extension) PrepareName(name string) string {
	return PString(ex.Prefix) + ex.Pascal(name)
}

func (ex *Extension) Replace(old string, new string, s string) string {
	return strings.Replace(s, old, new, -1)
}

func (ex *Extension) ToLabel(str string) string {
	s := strings.Replace(str, "_", " ", -1)
	s = cases.Title(language.Und, cases.NoLower).String(s)
	return s
}

func (ex *Extension) UcFirst(str string) string {
	for i, v := range str {
		return string(unicode.ToUpper(v)) + str[i+1:]
	}
	return ""
}

func (ex *Extension) LcFirst(str string) string {
	for i, v := range str {
		return string(unicode.ToLower(v)) + str[i+1:]
	}
	return ""
}

func (ex *Extension) TsType(gotype string, prefix string) string {
	unique := true
	if strings.HasPrefix(gotype, "[]") {
		unique = false
	}

	gotypeSingle := strings.TrimPrefix(gotype, "[]")

	var t string

	switch gotypeSingle {
	case "uuid.UUID":
		t = "UUID"
	case "uint8", "uint16", "uint32", "uint64", "int", "int8", "int16", "int32", "int64":
		t = "Number"
	case "time.Time":
		t = "Date"
	case "bool":
		t = "Boolean"
	default:
		t = "String"
	}

	if !unique {
		t = ex.UcFirst(t) + "List"
	}
	return prefix + t
}

func (ex *Extension) FieldTSType(field gen.Field) string {
	ant, ok := field.Annotations["ENTKIT"].(map[string]any)

	prefix := PString(ex.Prefix)
	if field.IsEnum() {
		return prefix + ex.UcFirst(strings.Replace(field.Type.String(), ".", "", -1))
	}

	if ok {
		isImage, ok := ant["ImageField"].(bool)
		if ok && isImage {
			return prefix + "Image"
		}
		isURLField, ok := ant["URLField"].(bool)
		if ok && isURLField {
			return prefix + "URL"
		}
		isRichTextField, ok := ant["RichTextField"].(bool)
		if ok && isRichTextField {
			return prefix + "RichText"
		}
		if ant["CodeField"] != nil {
			return prefix + "Code"
		}
	}

	return ex.TsType(field.Type.String(), prefix)
}

func Contains[T comparable](s []T, e T) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
}
