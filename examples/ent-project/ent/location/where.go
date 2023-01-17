// Copyright 2019-present Facebook
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// Code generated by entc, DO NOT EDIT.

package location

import (
	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"github.com/diazoxide/ent-refine/examples/ent-project/ent/predicate"
	"github.com/google/uuid"
)

// ID filters vertices based on their ID field.
func ID(id uuid.UUID) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldID), id))
	})
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id uuid.UUID) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldID), id))
	})
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id uuid.UUID) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldID), id))
	})
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...uuid.UUID) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		v := make([]any, len(ids))
		for i := range v {
			v[i] = ids[i]
		}
		s.Where(sql.In(s.C(FieldID), v...))
	})
}

// IDNotIn applies the NotIn predicate on the ID field.
func IDNotIn(ids ...uuid.UUID) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		v := make([]any, len(ids))
		for i := range v {
			v[i] = ids[i]
		}
		s.Where(sql.NotIn(s.C(FieldID), v...))
	})
}

// IDGT applies the GT predicate on the ID field.
func IDGT(id uuid.UUID) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldID), id))
	})
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id uuid.UUID) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldID), id))
	})
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id uuid.UUID) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldID), id))
	})
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id uuid.UUID) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldID), id))
	})
}

// Title applies equality check predicate on the "title" field. It's identical to TitleEQ.
func Title(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldTitle), v))
	})
}

// Description applies equality check predicate on the "description" field. It's identical to DescriptionEQ.
func Description(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldDescription), v))
	})
}

// Latitude applies equality check predicate on the "latitude" field. It's identical to LatitudeEQ.
func Latitude(v float64) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldLatitude), v))
	})
}

// Longitude applies equality check predicate on the "longitude" field. It's identical to LongitudeEQ.
func Longitude(v float64) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldLongitude), v))
	})
}

// Address applies equality check predicate on the "address" field. It's identical to AddressEQ.
func Address(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldAddress), v))
	})
}

// Postcode applies equality check predicate on the "postcode" field. It's identical to PostcodeEQ.
func Postcode(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldPostcode), v))
	})
}

// Type applies equality check predicate on the "type" field. It's identical to TypeEQ.
func Type(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldType), v))
	})
}

// State applies equality check predicate on the "state" field. It's identical to StateEQ.
func State(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldState), v))
	})
}

// Suburb applies equality check predicate on the "suburb" field. It's identical to SuburbEQ.
func Suburb(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldSuburb), v))
	})
}

// StreetType applies equality check predicate on the "street_type" field. It's identical to StreetTypeEQ.
func StreetType(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldStreetType), v))
	})
}

// StreetName applies equality check predicate on the "street_name" field. It's identical to StreetNameEQ.
func StreetName(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldStreetName), v))
	})
}

// TitleEQ applies the EQ predicate on the "title" field.
func TitleEQ(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldTitle), v))
	})
}

// TitleNEQ applies the NEQ predicate on the "title" field.
func TitleNEQ(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldTitle), v))
	})
}

// TitleIn applies the In predicate on the "title" field.
func TitleIn(vs ...string) predicate.Location {
	v := make([]any, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.In(s.C(FieldTitle), v...))
	})
}

// TitleNotIn applies the NotIn predicate on the "title" field.
func TitleNotIn(vs ...string) predicate.Location {
	v := make([]any, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.NotIn(s.C(FieldTitle), v...))
	})
}

// TitleGT applies the GT predicate on the "title" field.
func TitleGT(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldTitle), v))
	})
}

// TitleGTE applies the GTE predicate on the "title" field.
func TitleGTE(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldTitle), v))
	})
}

// TitleLT applies the LT predicate on the "title" field.
func TitleLT(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldTitle), v))
	})
}

// TitleLTE applies the LTE predicate on the "title" field.
func TitleLTE(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldTitle), v))
	})
}

// TitleContains applies the Contains predicate on the "title" field.
func TitleContains(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldTitle), v))
	})
}

// TitleHasPrefix applies the HasPrefix predicate on the "title" field.
func TitleHasPrefix(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldTitle), v))
	})
}

// TitleHasSuffix applies the HasSuffix predicate on the "title" field.
func TitleHasSuffix(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldTitle), v))
	})
}

// TitleEqualFold applies the EqualFold predicate on the "title" field.
func TitleEqualFold(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldTitle), v))
	})
}

// TitleContainsFold applies the ContainsFold predicate on the "title" field.
func TitleContainsFold(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldTitle), v))
	})
}

// DescriptionEQ applies the EQ predicate on the "description" field.
func DescriptionEQ(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldDescription), v))
	})
}

// DescriptionNEQ applies the NEQ predicate on the "description" field.
func DescriptionNEQ(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldDescription), v))
	})
}

// DescriptionIn applies the In predicate on the "description" field.
func DescriptionIn(vs ...string) predicate.Location {
	v := make([]any, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.In(s.C(FieldDescription), v...))
	})
}

// DescriptionNotIn applies the NotIn predicate on the "description" field.
func DescriptionNotIn(vs ...string) predicate.Location {
	v := make([]any, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.NotIn(s.C(FieldDescription), v...))
	})
}

// DescriptionGT applies the GT predicate on the "description" field.
func DescriptionGT(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldDescription), v))
	})
}

// DescriptionGTE applies the GTE predicate on the "description" field.
func DescriptionGTE(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldDescription), v))
	})
}

// DescriptionLT applies the LT predicate on the "description" field.
func DescriptionLT(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldDescription), v))
	})
}

// DescriptionLTE applies the LTE predicate on the "description" field.
func DescriptionLTE(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldDescription), v))
	})
}

// DescriptionContains applies the Contains predicate on the "description" field.
func DescriptionContains(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldDescription), v))
	})
}

// DescriptionHasPrefix applies the HasPrefix predicate on the "description" field.
func DescriptionHasPrefix(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldDescription), v))
	})
}

// DescriptionHasSuffix applies the HasSuffix predicate on the "description" field.
func DescriptionHasSuffix(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldDescription), v))
	})
}

// DescriptionEqualFold applies the EqualFold predicate on the "description" field.
func DescriptionEqualFold(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldDescription), v))
	})
}

// DescriptionContainsFold applies the ContainsFold predicate on the "description" field.
func DescriptionContainsFold(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldDescription), v))
	})
}

// LatitudeEQ applies the EQ predicate on the "latitude" field.
func LatitudeEQ(v float64) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldLatitude), v))
	})
}

// LatitudeNEQ applies the NEQ predicate on the "latitude" field.
func LatitudeNEQ(v float64) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldLatitude), v))
	})
}

// LatitudeIn applies the In predicate on the "latitude" field.
func LatitudeIn(vs ...float64) predicate.Location {
	v := make([]any, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.In(s.C(FieldLatitude), v...))
	})
}

// LatitudeNotIn applies the NotIn predicate on the "latitude" field.
func LatitudeNotIn(vs ...float64) predicate.Location {
	v := make([]any, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.NotIn(s.C(FieldLatitude), v...))
	})
}

// LatitudeGT applies the GT predicate on the "latitude" field.
func LatitudeGT(v float64) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldLatitude), v))
	})
}

// LatitudeGTE applies the GTE predicate on the "latitude" field.
func LatitudeGTE(v float64) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldLatitude), v))
	})
}

// LatitudeLT applies the LT predicate on the "latitude" field.
func LatitudeLT(v float64) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldLatitude), v))
	})
}

// LatitudeLTE applies the LTE predicate on the "latitude" field.
func LatitudeLTE(v float64) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldLatitude), v))
	})
}

// LongitudeEQ applies the EQ predicate on the "longitude" field.
func LongitudeEQ(v float64) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldLongitude), v))
	})
}

// LongitudeNEQ applies the NEQ predicate on the "longitude" field.
func LongitudeNEQ(v float64) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldLongitude), v))
	})
}

// LongitudeIn applies the In predicate on the "longitude" field.
func LongitudeIn(vs ...float64) predicate.Location {
	v := make([]any, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.In(s.C(FieldLongitude), v...))
	})
}

// LongitudeNotIn applies the NotIn predicate on the "longitude" field.
func LongitudeNotIn(vs ...float64) predicate.Location {
	v := make([]any, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.NotIn(s.C(FieldLongitude), v...))
	})
}

// LongitudeGT applies the GT predicate on the "longitude" field.
func LongitudeGT(v float64) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldLongitude), v))
	})
}

// LongitudeGTE applies the GTE predicate on the "longitude" field.
func LongitudeGTE(v float64) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldLongitude), v))
	})
}

// LongitudeLT applies the LT predicate on the "longitude" field.
func LongitudeLT(v float64) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldLongitude), v))
	})
}

// LongitudeLTE applies the LTE predicate on the "longitude" field.
func LongitudeLTE(v float64) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldLongitude), v))
	})
}

// AddressEQ applies the EQ predicate on the "address" field.
func AddressEQ(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldAddress), v))
	})
}

// AddressNEQ applies the NEQ predicate on the "address" field.
func AddressNEQ(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldAddress), v))
	})
}

// AddressIn applies the In predicate on the "address" field.
func AddressIn(vs ...string) predicate.Location {
	v := make([]any, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.In(s.C(FieldAddress), v...))
	})
}

// AddressNotIn applies the NotIn predicate on the "address" field.
func AddressNotIn(vs ...string) predicate.Location {
	v := make([]any, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.NotIn(s.C(FieldAddress), v...))
	})
}

// AddressGT applies the GT predicate on the "address" field.
func AddressGT(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldAddress), v))
	})
}

// AddressGTE applies the GTE predicate on the "address" field.
func AddressGTE(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldAddress), v))
	})
}

// AddressLT applies the LT predicate on the "address" field.
func AddressLT(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldAddress), v))
	})
}

// AddressLTE applies the LTE predicate on the "address" field.
func AddressLTE(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldAddress), v))
	})
}

// AddressContains applies the Contains predicate on the "address" field.
func AddressContains(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldAddress), v))
	})
}

// AddressHasPrefix applies the HasPrefix predicate on the "address" field.
func AddressHasPrefix(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldAddress), v))
	})
}

// AddressHasSuffix applies the HasSuffix predicate on the "address" field.
func AddressHasSuffix(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldAddress), v))
	})
}

// AddressEqualFold applies the EqualFold predicate on the "address" field.
func AddressEqualFold(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldAddress), v))
	})
}

// AddressContainsFold applies the ContainsFold predicate on the "address" field.
func AddressContainsFold(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldAddress), v))
	})
}

// PostcodeEQ applies the EQ predicate on the "postcode" field.
func PostcodeEQ(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldPostcode), v))
	})
}

// PostcodeNEQ applies the NEQ predicate on the "postcode" field.
func PostcodeNEQ(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldPostcode), v))
	})
}

// PostcodeIn applies the In predicate on the "postcode" field.
func PostcodeIn(vs ...string) predicate.Location {
	v := make([]any, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.In(s.C(FieldPostcode), v...))
	})
}

// PostcodeNotIn applies the NotIn predicate on the "postcode" field.
func PostcodeNotIn(vs ...string) predicate.Location {
	v := make([]any, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.NotIn(s.C(FieldPostcode), v...))
	})
}

// PostcodeGT applies the GT predicate on the "postcode" field.
func PostcodeGT(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldPostcode), v))
	})
}

// PostcodeGTE applies the GTE predicate on the "postcode" field.
func PostcodeGTE(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldPostcode), v))
	})
}

// PostcodeLT applies the LT predicate on the "postcode" field.
func PostcodeLT(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldPostcode), v))
	})
}

// PostcodeLTE applies the LTE predicate on the "postcode" field.
func PostcodeLTE(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldPostcode), v))
	})
}

// PostcodeContains applies the Contains predicate on the "postcode" field.
func PostcodeContains(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldPostcode), v))
	})
}

// PostcodeHasPrefix applies the HasPrefix predicate on the "postcode" field.
func PostcodeHasPrefix(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldPostcode), v))
	})
}

// PostcodeHasSuffix applies the HasSuffix predicate on the "postcode" field.
func PostcodeHasSuffix(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldPostcode), v))
	})
}

// PostcodeEqualFold applies the EqualFold predicate on the "postcode" field.
func PostcodeEqualFold(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldPostcode), v))
	})
}

// PostcodeContainsFold applies the ContainsFold predicate on the "postcode" field.
func PostcodeContainsFold(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldPostcode), v))
	})
}

// TypeEQ applies the EQ predicate on the "type" field.
func TypeEQ(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldType), v))
	})
}

// TypeNEQ applies the NEQ predicate on the "type" field.
func TypeNEQ(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldType), v))
	})
}

// TypeIn applies the In predicate on the "type" field.
func TypeIn(vs ...string) predicate.Location {
	v := make([]any, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.In(s.C(FieldType), v...))
	})
}

// TypeNotIn applies the NotIn predicate on the "type" field.
func TypeNotIn(vs ...string) predicate.Location {
	v := make([]any, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.NotIn(s.C(FieldType), v...))
	})
}

// TypeGT applies the GT predicate on the "type" field.
func TypeGT(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldType), v))
	})
}

// TypeGTE applies the GTE predicate on the "type" field.
func TypeGTE(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldType), v))
	})
}

// TypeLT applies the LT predicate on the "type" field.
func TypeLT(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldType), v))
	})
}

// TypeLTE applies the LTE predicate on the "type" field.
func TypeLTE(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldType), v))
	})
}

// TypeContains applies the Contains predicate on the "type" field.
func TypeContains(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldType), v))
	})
}

// TypeHasPrefix applies the HasPrefix predicate on the "type" field.
func TypeHasPrefix(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldType), v))
	})
}

// TypeHasSuffix applies the HasSuffix predicate on the "type" field.
func TypeHasSuffix(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldType), v))
	})
}

// TypeEqualFold applies the EqualFold predicate on the "type" field.
func TypeEqualFold(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldType), v))
	})
}

// TypeContainsFold applies the ContainsFold predicate on the "type" field.
func TypeContainsFold(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldType), v))
	})
}

// StateEQ applies the EQ predicate on the "state" field.
func StateEQ(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldState), v))
	})
}

// StateNEQ applies the NEQ predicate on the "state" field.
func StateNEQ(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldState), v))
	})
}

// StateIn applies the In predicate on the "state" field.
func StateIn(vs ...string) predicate.Location {
	v := make([]any, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.In(s.C(FieldState), v...))
	})
}

// StateNotIn applies the NotIn predicate on the "state" field.
func StateNotIn(vs ...string) predicate.Location {
	v := make([]any, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.NotIn(s.C(FieldState), v...))
	})
}

// StateGT applies the GT predicate on the "state" field.
func StateGT(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldState), v))
	})
}

// StateGTE applies the GTE predicate on the "state" field.
func StateGTE(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldState), v))
	})
}

// StateLT applies the LT predicate on the "state" field.
func StateLT(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldState), v))
	})
}

// StateLTE applies the LTE predicate on the "state" field.
func StateLTE(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldState), v))
	})
}

// StateContains applies the Contains predicate on the "state" field.
func StateContains(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldState), v))
	})
}

// StateHasPrefix applies the HasPrefix predicate on the "state" field.
func StateHasPrefix(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldState), v))
	})
}

// StateHasSuffix applies the HasSuffix predicate on the "state" field.
func StateHasSuffix(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldState), v))
	})
}

// StateEqualFold applies the EqualFold predicate on the "state" field.
func StateEqualFold(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldState), v))
	})
}

// StateContainsFold applies the ContainsFold predicate on the "state" field.
func StateContainsFold(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldState), v))
	})
}

// SuburbEQ applies the EQ predicate on the "suburb" field.
func SuburbEQ(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldSuburb), v))
	})
}

// SuburbNEQ applies the NEQ predicate on the "suburb" field.
func SuburbNEQ(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldSuburb), v))
	})
}

// SuburbIn applies the In predicate on the "suburb" field.
func SuburbIn(vs ...string) predicate.Location {
	v := make([]any, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.In(s.C(FieldSuburb), v...))
	})
}

// SuburbNotIn applies the NotIn predicate on the "suburb" field.
func SuburbNotIn(vs ...string) predicate.Location {
	v := make([]any, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.NotIn(s.C(FieldSuburb), v...))
	})
}

// SuburbGT applies the GT predicate on the "suburb" field.
func SuburbGT(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldSuburb), v))
	})
}

// SuburbGTE applies the GTE predicate on the "suburb" field.
func SuburbGTE(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldSuburb), v))
	})
}

// SuburbLT applies the LT predicate on the "suburb" field.
func SuburbLT(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldSuburb), v))
	})
}

// SuburbLTE applies the LTE predicate on the "suburb" field.
func SuburbLTE(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldSuburb), v))
	})
}

// SuburbContains applies the Contains predicate on the "suburb" field.
func SuburbContains(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldSuburb), v))
	})
}

// SuburbHasPrefix applies the HasPrefix predicate on the "suburb" field.
func SuburbHasPrefix(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldSuburb), v))
	})
}

// SuburbHasSuffix applies the HasSuffix predicate on the "suburb" field.
func SuburbHasSuffix(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldSuburb), v))
	})
}

// SuburbEqualFold applies the EqualFold predicate on the "suburb" field.
func SuburbEqualFold(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldSuburb), v))
	})
}

// SuburbContainsFold applies the ContainsFold predicate on the "suburb" field.
func SuburbContainsFold(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldSuburb), v))
	})
}

// StreetTypeEQ applies the EQ predicate on the "street_type" field.
func StreetTypeEQ(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldStreetType), v))
	})
}

// StreetTypeNEQ applies the NEQ predicate on the "street_type" field.
func StreetTypeNEQ(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldStreetType), v))
	})
}

// StreetTypeIn applies the In predicate on the "street_type" field.
func StreetTypeIn(vs ...string) predicate.Location {
	v := make([]any, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.In(s.C(FieldStreetType), v...))
	})
}

// StreetTypeNotIn applies the NotIn predicate on the "street_type" field.
func StreetTypeNotIn(vs ...string) predicate.Location {
	v := make([]any, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.NotIn(s.C(FieldStreetType), v...))
	})
}

// StreetTypeGT applies the GT predicate on the "street_type" field.
func StreetTypeGT(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldStreetType), v))
	})
}

// StreetTypeGTE applies the GTE predicate on the "street_type" field.
func StreetTypeGTE(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldStreetType), v))
	})
}

// StreetTypeLT applies the LT predicate on the "street_type" field.
func StreetTypeLT(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldStreetType), v))
	})
}

// StreetTypeLTE applies the LTE predicate on the "street_type" field.
func StreetTypeLTE(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldStreetType), v))
	})
}

// StreetTypeContains applies the Contains predicate on the "street_type" field.
func StreetTypeContains(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldStreetType), v))
	})
}

// StreetTypeHasPrefix applies the HasPrefix predicate on the "street_type" field.
func StreetTypeHasPrefix(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldStreetType), v))
	})
}

// StreetTypeHasSuffix applies the HasSuffix predicate on the "street_type" field.
func StreetTypeHasSuffix(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldStreetType), v))
	})
}

// StreetTypeEqualFold applies the EqualFold predicate on the "street_type" field.
func StreetTypeEqualFold(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldStreetType), v))
	})
}

// StreetTypeContainsFold applies the ContainsFold predicate on the "street_type" field.
func StreetTypeContainsFold(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldStreetType), v))
	})
}

// StreetNameEQ applies the EQ predicate on the "street_name" field.
func StreetNameEQ(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldStreetName), v))
	})
}

// StreetNameNEQ applies the NEQ predicate on the "street_name" field.
func StreetNameNEQ(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldStreetName), v))
	})
}

// StreetNameIn applies the In predicate on the "street_name" field.
func StreetNameIn(vs ...string) predicate.Location {
	v := make([]any, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.In(s.C(FieldStreetName), v...))
	})
}

// StreetNameNotIn applies the NotIn predicate on the "street_name" field.
func StreetNameNotIn(vs ...string) predicate.Location {
	v := make([]any, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.NotIn(s.C(FieldStreetName), v...))
	})
}

// StreetNameGT applies the GT predicate on the "street_name" field.
func StreetNameGT(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldStreetName), v))
	})
}

// StreetNameGTE applies the GTE predicate on the "street_name" field.
func StreetNameGTE(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldStreetName), v))
	})
}

// StreetNameLT applies the LT predicate on the "street_name" field.
func StreetNameLT(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldStreetName), v))
	})
}

// StreetNameLTE applies the LTE predicate on the "street_name" field.
func StreetNameLTE(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldStreetName), v))
	})
}

// StreetNameContains applies the Contains predicate on the "street_name" field.
func StreetNameContains(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldStreetName), v))
	})
}

// StreetNameHasPrefix applies the HasPrefix predicate on the "street_name" field.
func StreetNameHasPrefix(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldStreetName), v))
	})
}

// StreetNameHasSuffix applies the HasSuffix predicate on the "street_name" field.
func StreetNameHasSuffix(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldStreetName), v))
	})
}

// StreetNameEqualFold applies the EqualFold predicate on the "street_name" field.
func StreetNameEqualFold(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldStreetName), v))
	})
}

// StreetNameContainsFold applies the ContainsFold predicate on the "street_name" field.
func StreetNameContainsFold(v string) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldStreetName), v))
	})
}

// HasCompany applies the HasEdge predicate on the "company" edge.
func HasCompany() predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(CompanyTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, CompanyTable, CompanyColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasCompanyWith applies the HasEdge predicate on the "company" edge with a given conditions (other predicates).
func HasCompanyWith(preds ...predicate.Company) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(CompanyInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, CompanyTable, CompanyColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasCountry applies the HasEdge predicate on the "country" edge.
func HasCountry() predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(CountryTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, CountryTable, CountryColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasCountryWith applies the HasEdge predicate on the "country" edge with a given conditions (other predicates).
func HasCountryWith(preds ...predicate.Country) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(CountryInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, CountryTable, CountryColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups predicates with the AND operator between them.
func And(predicates ...predicate.Location) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s1 := s.Clone().SetP(nil)
		for _, p := range predicates {
			p(s1)
		}
		s.Where(s1.P())
	})
}

// Or groups predicates with the OR operator between them.
func Or(predicates ...predicate.Location) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		s1 := s.Clone().SetP(nil)
		for i, p := range predicates {
			if i > 0 {
				s1.Or()
			}
			p(s1)
		}
		s.Where(s1.P())
	})
}

// Not applies the not operator on the given predicate.
func Not(p predicate.Location) predicate.Location {
	return predicate.Location(func(s *sql.Selector) {
		p(s.Not())
	})
}