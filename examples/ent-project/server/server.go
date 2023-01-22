package main

import (
	"context"
	example "github.com/diazoxide/ent-refine/examples/ent-project"
	"github.com/diazoxide/ent-refine/examples/ent-project/ent"
	"time"

	"entgo.io/contrib/entgql"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/debug"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/alecthomas/kong"
	"go.uber.org/zap"

	_ "github.com/diazoxide/ent-refine/examples/ent-project/ent/runtime"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	var cli struct {
		Addr  string `name:"address" default:":8081" help:"Address to listen on."`
		Debug bool   `name:"debug" help:"Enable debugging mode."`
	}
	kong.Parse(&cli)

	log, _ := zap.NewDevelopment()
	r := gin.New()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization", "accept", "origin", "Cache-Control", "X-Requested-With"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	client, err := ent.Open(
		"sqlite3",
		"file:examples/example.db?mode=rwc&cache=shared&_fk=1",
	)
	if err != nil {
		log.Fatal("opening ent client", zap.Error(err))
	}
	if err := client.Schema.Create(
		context.Background(),
		//migrate.WithGlobalUniqueID(true),
	); err != nil {
		log.Fatal("running schema migration", zap.Error(err))
	}

	r.GET("/", gin.WrapF(playground.Handler("Example", "/query")))

	srv := handler.NewDefaultServer(example.NewSchema(client))

	srv.Use(entgql.Transactioner{TxOpener: client})

	srv.Use(&debug.Tracer{})

	r.Any("/query", gin.WrapH(srv))

	panic(r.Run(":8081"))
}
