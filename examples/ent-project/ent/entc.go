// Copyright 2019-present Facebook Inc. All rights reserved.
// This source code is licensed under the Apache 2.0 license found
// in the LICENSE file in the root directory of this source tree.

//go:build ignore
// +build ignore

package main

import (
	"log"

	"entgo.io/contrib/entgql"
	"entgo.io/ent/entc"
	"entgo.io/ent/entc/gen"

	"github.com/diazoxide/ent-refine"

	"path/filepath"
)

func main() {
	// The codegen is executed from internal/todo/gen.go.
	// So the path for the config file, ent schema, and the GQL schema
	// starts from internal/todo.
	gqlEx, err := entgql.NewExtension(
		EntRefine.EntgqlExtensionOptionsWrapper(
			entgql.WithConfigPath("./gqlgen.yml"),
			entgql.WithSchemaGenerator(),
			entgql.WithSchemaPath("./ent.graphql"),
			entgql.WithWhereInputs(true),
		)...,
	)
	if err != nil {
		log.Fatalf("creating entgql extension: %v", err)
	}
	err = entc.Generate("./ent/schema", &gen.Config{
		Header: `
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
		`,
	}, entc.Extensions(
		gqlEx,
		EntRefine.New().AppPath(filepath.Join("..", "refine-project")),
	))
	if err != nil {
		log.Fatalf("running ent codegen: %v", err)
	}
}
