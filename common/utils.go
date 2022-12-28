package common

import (
	"golang.org/x/text/cases"
	"golang.org/x/text/language"
	"strings"
)

func ToLabel(str string) string {
	s := strings.Replace(str, "_", " ", -1)
	s = cases.Title(language.Und, cases.NoLower).String(s)
	return s
}
