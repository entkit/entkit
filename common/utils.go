package common

import (
	"entgo.io/ent/entc/gen"
	"github.com/stoewer/go-strcase"
	"golang.org/x/text/cases"
	"golang.org/x/text/language"
	"strings"
	"unicode"
)

func ToLabel(str string) string {
	s := strings.Replace(str, "_", " ", -1)
	s = cases.Title(language.Und, cases.NoLower).String(s)
	return s
}

func UcFirst(str string) string {
	for i, v := range str {
		return string(unicode.ToUpper(v)) + str[i+1:]
	}
	return ""
}

func LcFirst(str string) string {
	for i, v := range str {
		return string(unicode.ToLower(v)) + str[i+1:]
	}
	return ""
}

func TSType(gotype string, prefix string) string {
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
		t = UcFirst(t) + "List"
	}
	return prefix + t
}

func FieldTSType(field gen.Field, prefix string) string {
	ant, ok := field.Annotations["REFINE"].(map[string]any)

	if field.IsEnum() {
		return prefix + UcFirst(strings.Replace(field.Type.String(), ".", "_", -1))
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

	return TSType(field.Type.String(), prefix)
}

func ResourceAlias(node gen.Type) string {
	return strcase.SnakeCase(node.Name)
}
