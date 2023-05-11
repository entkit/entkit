package entkit

import (
	"encoding/json"
	"entgo.io/ent/entc/gen"
	"golang.org/x/text/cases"
	"golang.org/x/text/language"
	"strings"
	"unicode"
)

// someField returns first field with annotation field
func (ex *Extension) someField(node *gen.Type, field string) *gen.Field {
	for _, f := range node.Fields {
		_ant := f.Annotations[AnnotationKey]
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

// someNode returns first node with annotation field
func (ex *Extension) someNode(graph *gen.Graph, field string) *gen.Type {
	for _, n := range graph.Nodes {
		_ant := n.Annotations[AnnotationKey]
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

// GetNodeAction returns action by name
func (ex *Extension) GetNodeAction(node *gen.Type, name string) *Action {
	ant := ex.GetNodeAnnotations(node)
	actions := ant.Actions

	for _, action := range actions {
		if PString(action.Name) == name {
			return action
		}
	}
	return nil
}

// applyNodeDefaultAnnotations applies default values to node annotations
func applyNodeDefaultAnnotations(ant *Annotation) {
	if len(ant.Actions) == 0 {
		ant.Actions = DefaultActions
	}
}

// GetNodeAnnotations returns node annotations
func (ex *Extension) GetNodeAnnotations(node *gen.Type) *Annotation {
	ants := &Annotation{}
	rawAnts, ok := node.Annotations[AnnotationKey]
	if ok && rawAnts != nil {
		ants = ex._parseAnnotations(rawAnts)
	}

	applyNodeDefaultAnnotations(ants)

	return ants
}

// GetFieldAnnotations returns field annotations
func (ex *Extension) GetFieldAnnotations(field *gen.Field) *Annotation {
	ant, ok := field.Annotations[AnnotationKey]
	if !ok || ant == nil {
		return &Annotation{}
	}
	return ex._parseAnnotations(ant)
}

// GetEdgeAnnotations returns edge annotations
func (ex *Extension) GetEdgeAnnotations(field *gen.Edge) *Annotation {
	ant, ok := field.Annotations[AnnotationKey]
	if !ok || ant == nil {
		return &Annotation{}
	}
	return ex._parseAnnotations(ant)
}

// NodeActionRoutePattern returns route pattern for node action
func (ex *Extension) NodeActionRoutePattern(node *gen.Type, actionName string) *string {
	action := ex.GetNodeAction(node, actionName)
	if action == nil {
		return nil
	}
	ant := ex.GetNodeAnnotations(node)
	rootPath := ex.Snake(node.Name)
	if ant.Route != nil {
		rootPath = PString(ant.Route)
	}

	return StringP(rootPath + "/" + PString(action.Route.Path))
}

// _parseAnnotations parses annotations from any type
func (ex *Extension) _parseAnnotations(data any) *Annotation {
	j, err := json.Marshal(data)
	if err != nil {
		panic(err)
	}

	var ant Annotation
	err = json.Unmarshal(j, &ant)
	if err != nil {
		panic(err)
	}
	return &ant
}

// IndexNode returns index node
func (ex *Extension) IndexNode(graph *gen.Graph) *gen.Type {
	return ex.someNode(graph, "IndexRoute")
}

// TitleField returns title field
func (ex *Extension) TitleField(node *gen.Type) *gen.Field {
	f := ex.someField(node, "TitleField")
	if f != nil {
		return f
	}
	return node.ID
}

// MainImageField returns main image field
func (ex *Extension) MainImageField(node *gen.Type) *gen.Field {
	return ex.someField(node, "MainImageField")
}

// GetActionByName returns action by name
func (ex *Extension) GetActionByName(node *gen.Type, name string) *Action {
	ant := ex.GetNodeAnnotations(node)
	for _, a := range ant.Actions {
		if PString(a.Name) == name {
			return a
		}
	}
	return nil
}

// Camel returns camel case string
func (ex *Extension) Camel(s string) string {
	fn, ok := gen.Funcs["camel"].(func(s string) string)
	if !ok {
		panic("cannot reuse gen.Funcs[\"camel\"]")
	}
	return fn(s)
}

// Pascal returns pascal case string
func (ex *Extension) Pascal(s string) string {
	fn, ok := gen.Funcs["pascal"].(func(s string) string)
	if !ok {
		panic("cannot reuse gen.Funcs[\"pascal\"]")
	}
	return fn(s)
}

// Snake returns snake case string
func (ex *Extension) Snake(s string) string {
	fn, ok := gen.Funcs["snake"].(func(s string) string)
	if !ok {
		panic("cannot reuse gen.Funcs[\"snake\"]")
	}
	return fn(s)
}

// PrepareName returns prepared name
func (ex *Extension) PrepareName(name string) string {
	return PString(ex.Prefix) + ex.Pascal(name)
}

// Replace replaces old with new in string
func (ex *Extension) Replace(old string, new string, s string) string {
	return strings.Replace(s, old, new, -1)
}

// ToLabel converts string to label
func (ex *Extension) ToLabel(str string) string {
	s := strings.Replace(str, "_", " ", -1)
	s = cases.Title(language.Und, cases.NoLower).String(s)
	return s
}

// UcFirst converts first letter to upper case
func (ex *Extension) UcFirst(str string) string {
	for i, v := range str {
		return string(unicode.ToUpper(v)) + str[i+1:]
	}
	return ""
}

// LcFirst converts first letter to lower case
func (ex *Extension) LcFirst(str string) string {
	for i, v := range str {
		return string(unicode.ToLower(v)) + str[i+1:]
	}
	return ""
}

// TsType returns typescript type
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

// FieldTSType returns typescript type for field
func (ex *Extension) FieldTSType(field *gen.Field) string {
	ant := ex.GetFieldAnnotations(field)

	prefix := PString(ex.Prefix)

	if field.IsEnum() {
		return prefix + ex.UcFirst(strings.Replace(field.Type.String(), ".", "", -1))
	}

	if ant.ImageField != nil && *ant.ImageField {
		return prefix + "Image"
	}

	if ant.URLField != nil && *ant.URLField {
		return prefix + "URL"
	}

	if ant.RichTextField != nil && *ant.RichTextField {
		return prefix + "RichText"
	}

	if ant.CodeField != nil {
		return prefix + "Code"
	}

	return ex.TsType(field.Type.String(), prefix)
}

// Contains checks if slice contains element
func Contains[T comparable](s []T, e T) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
}
