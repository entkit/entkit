package entkit

import (
	"entgo.io/ent/entc/gen"
)

type Auth struct {
	Extension *Extension `json:"Extension,omitempty"`
	Enabled   *bool      `json:"Enabled,omitempty"`
	Keycloak  *Keycloak  `json:"Keycloak,omitempty"`
}

type AuthEnvironment struct {
	Keycloak *KeycloakEnvironment `json:"keycloak,omitempty"`
}

func (at *Auth) GetEnvironmentConfig() *AuthEnvironment {
	c := AuthEnvironment{}
	if PBool(at.Enabled) {
		if PBool(at.Keycloak.Enabled) {
			c.Keycloak = at.Keycloak.GetEnvironmentConfig()
		}
	}
	return &c
}

var (
	ActionReadScope     = "Read"
	ActionCreateScope   = "Create"
	ActionUpdateScope   = "Update"
	ActionDeleteScope   = "Delete"
	DefaultActionScopes = []string{
		ActionReadScope,
		ActionCreateScope,
		ActionUpdateScope,
		ActionDeleteScope,
	}
)

type AuthOption = func(auth *Auth) error

func NewAuth(ex *Extension, options ...AuthOption) *Auth {
	auth := &Auth{
		Extension: ex,
	}
	auth.Keycloak = NewKeycloak(auth)
	for _, opt := range options {
		if err := opt(auth); err != nil {
			panic(err)
		}
	}
	return auth
}

// AuthWithKeycloak configure authentication and authorization
func AuthWithKeycloak(keycloakOption ...KeycloakOption) AuthOption {
	return func(at *Auth) (err error) {
		at.Enabled = BoolP(true)
		kc := NewKeycloak(at, keycloakOption...)
		kc.Enabled = BoolP(true)
		at.Keycloak = kc
		return nil
	}
}

func GenerateAuthResourcesHook(ex *Extension) gen.Hook {
	return func(next gen.Generator) gen.Generator {
		return gen.GenerateFunc(func(g *gen.Graph) error {
			if !PBool(ex.Auth.Enabled) {
				return next.Generate(g)
			}

			if ex.Auth.Keycloak != nil && PBool(ex.Auth.Keycloak.Enabled) {
				ex.Auth.Keycloak.GenerateKeycloakResources(g)
			}

			return next.Generate(g)
		})
	}
}

var AuthContextKey = "entkit_auth_context"

type contextKey struct {
	name string
}

type Permission struct {
	Resource string
	Scopes   []string
}

type AuthContext struct {
	Roles       []string // Not supporting yet. TODO: create support
	Permissions []*Permission
}
