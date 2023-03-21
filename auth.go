package entrefine

var AuthContextKey = "entrefine_auth_context"

type contextKey struct {
	name string
}

type Permission struct {
	Resource string
	Scopes   []string
}

type Context struct {
	Roles       []string // Not supporting yet. TODO: create support
	Permissions []*Permission
}
