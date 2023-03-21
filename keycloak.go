package entrefine

import (
	"context"
	"encoding/json"
	"entgo.io/ent/entc/gen"
	"errors"
	"github.com/Nerzal/gocloak/v12"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
)

type Keycloak struct {
	Host                  string
	Realm                 string
	BackendClientID       string
	BackendClientSecret   string
	AdminUsername         string
	AdminPassword         string
	FrontendClientConfigs []*gocloak.Client
	GoCloak               *gocloak.GoCloak
}

type KeycloakFrontendClientConfig struct {
	ClientID string
}

func NewKeycloakGenerator(
	host string,
	realm string,
	adminUsername string,
	adminPassword string,
	backendClientID string,
	backendClientSecret string,
	frontendClientConfigs []*gocloak.Client,
) *Keycloak {
	k := Keycloak{
		Host:                  host,
		Realm:                 realm,
		BackendClientID:       backendClientID,
		BackendClientSecret:   backendClientSecret,
		AdminUsername:         adminUsername,
		AdminPassword:         adminPassword,
		FrontendClientConfigs: frontendClientConfigs,
	}
	k.GoCloak = gocloak.NewClient(k.Host)
	return &k
}

func NewBackendKeycloak(host string, realm string, clientID string, secret string) *Keycloak {
	k := Keycloak{
		Host:                host,
		Realm:               realm,
		BackendClientID:     clientID,
		BackendClientSecret: secret,
	}
	k.GoCloak = gocloak.NewClient(k.Host)
	return &k
}

//func (k *Keycloak) Middleware(next http.Handler) http.Handler {
//	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
//		c := r.Header.Get("Authorization")
//		if !strings.HasPrefix(c, "Bearer ") {
//			http.Error(w, "Authentication required", http.StatusUnauthorized)
//		}
//		jwtStr := strings.TrimPrefix(c, "Bearer ")
//
//		introspect, err := k.ValidateToken(jwtStr)
//		if err != nil {
//			http.Error(w, "Invalid cookie", http.StatusForbidden)
//			return
//		}
//
//		println(introspect.Permissions)
//		// get the user from the database
//		//user := getUserByID(db, userId)
//
//		// put it in context
//		ctx := context.WithValue(r.Context(), AuthContextKey, introspect.Permissions)
//
//		// and call the next with our new context
//		r = r.WithContext(ctx)
//		next.ServeHTTP(w, r)
//	})
//}

func (k *Keycloak) GinMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		auth := c.GetHeader("Authorization")
		_permissions, err := k.getResourcesPermissions(auth)

		if err != nil {
			c.AbortWithStatusJSON(http.StatusForbidden, err.Error())
			return
		}

		var permissions []*Permission
		for _, p := range *_permissions {
			permissions = append(permissions, &Permission{
				Resource: *p.ResourceName,
				Scopes:   *p.Scopes,
			})
		}

		authContext := &Context{Permissions: permissions}
		ctx := context.WithValue(c.Request.Context(), AuthContextKey, authContext)
		c.Request = c.Request.WithContext(ctx)

		c.Next()
	}
}

func (k *Keycloak) getResourcesPermissions(auth string) (*[]gocloak.RequestingPartyPermission, error) {
	if !strings.HasPrefix(auth, "Bearer ") {
		return nil, errors.New("unauthorized")
	}
	token := strings.TrimPrefix(auth, "Bearer ")
	return k.GoCloak.GetRequestingPartyPermissions(
		context.Background(),
		token,
		k.Realm,
		gocloak.RequestingPartyTokenOptions{
			Audience:                    gocloak.StringP(k.BackendClientID),
			ResponseIncludeResourceName: gocloak.BoolP(true),
			ResponseMode:                gocloak.StringP("permissions"),
		},
	)
}

func GenerateKeycloakResources(ex *Extension) gen.Hook {
	return func(next gen.Generator) gen.Generator {
		return gen.GenerateFunc(func(g *gen.Graph) error {
			ctx := context.Background()
			token, err := ex.Keycloak.GoCloak.LoginAdmin(ctx, ex.Keycloak.AdminUsername, ex.Keycloak.AdminPassword, ex.Keycloak.Realm)
			if err != nil {
				panic(err)
			}
			backendClient := ex.Keycloak.prepareBackendClient(ctx, token.AccessToken)

			ex.Keycloak.prepareFrontendClients(ctx, token.AccessToken)

			actions := []string{"Read", "Create", "Update", "Delete"}
			scopesMap := map[string]*gocloak.ScopeRepresentation{}

			// region scopes
			for _, action := range actions {
				scope := ex.Keycloak.prepareResourcesScopes(ctx, *backendClient.ID, token.AccessToken, ex.Prefix+action)
				scopesMap[action] = scope
			}
			// endregion scopes

			var adminRoles []gocloak.Role
			var readerRoles []gocloak.Role
			var writerRoles []gocloak.Role

			for _, node := range g.Nodes {
				// region resource
				resource := ex.Keycloak.prepareResource(ctx, *backendClient.ID, token.AccessToken, ex.Prefix+node.Name, &[]gocloak.ScopeRepresentation{
					*scopesMap["Create"],
					*scopesMap["Read"],
					*scopesMap["Update"],
					*scopesMap["Delete"],
				})
				// endregion resource

				// region roles
				adminRole := ex.Keycloak.prepareRole(ctx, *backendClient.ID, token.AccessToken, ex.Prefix+node.Name+" Admin", nil)
				adminRoles = append(adminRoles, adminRole)

				readerRole := ex.Keycloak.prepareRole(ctx, *backendClient.ID, token.AccessToken, ex.Prefix+node.Name+" Reader", nil)
				readerRoles = append(readerRoles, readerRole)

				writerRole := ex.Keycloak.prepareRole(ctx, *backendClient.ID, token.AccessToken, ex.Prefix+node.Name+" Writer", nil)
				writerRoles = append(writerRoles, writerRole)
				// endregion roles

				// region policies
				adminPolicy := ex.Keycloak.preparePolicy(ctx, token.AccessToken, *backendClient.ID, ex.Prefix+" "+node.Name+" only admin permission", []gocloak.Role{adminRole})
				readerPolicy := ex.Keycloak.preparePolicy(ctx, token.AccessToken, *backendClient.ID, ex.Prefix+" "+node.Name+" only reader permission", []gocloak.Role{readerRole})
				writerPolicy := ex.Keycloak.preparePolicy(ctx, token.AccessToken, *backendClient.ID, ex.Prefix+" "+node.Name+" only writer permission", []gocloak.Role{writerRole})
				// endregion policies

				// region permissions
				/*adminPermission*/
				_ = ex.Keycloak.preparePermission(ctx, token.AccessToken, *backendClient.ID, ex.Prefix+" "+node.Name+" admin permission (resource based)",
					"resource",
					&[]string{*resource.ID},
					nil,
					[]string{*adminPolicy.ID},
				)

				/*readPermission*/
				_ = ex.Keycloak.preparePermission(ctx, token.AccessToken, *backendClient.ID, ex.Prefix+" "+node.Name+" read permission (scope based)",
					"scope",
					&[]string{*resource.ID},
					&[]string{
						*scopesMap["Read"].ID,
					},
					[]string{*readerPolicy.ID},
				)

				/*writerPermission*/
				_ = ex.Keycloak.preparePermission(ctx, token.AccessToken, *backendClient.ID, ex.Prefix+" "+node.Name+" write permission (scope based)",
					"scope",
					&[]string{*resource.ID},
					&[]string{
						*scopesMap["Read"].ID,
						*scopesMap["Create"].ID,
						*scopesMap["Update"].ID,
					},
					[]string{*writerPolicy.ID},
				)
				// endregion permissions
			}

			// region general roles
			ex.Keycloak.prepareRole(ctx, *backendClient.ID, token.AccessToken, ex.Prefix+"Admin", &adminRoles)
			ex.Keycloak.prepareRole(ctx, *backendClient.ID, token.AccessToken, ex.Prefix+"Reader", &readerRoles)
			ex.Keycloak.prepareRole(ctx, *backendClient.ID, token.AccessToken, ex.Prefix+"Writer", &writerRoles)
			// endregion general roles
			return next.Generate(g)
		})
	}
}

func (k *Keycloak) prepareFrontendClients(ctx context.Context, token string) []*gocloak.Client {
	var result []*gocloak.Client
	for _, config := range k.FrontendClientConfigs {
		result = append(result, k.prepareFrontendClient(ctx, token, *config))
	}
	return result
}

func (k *Keycloak) prepareFrontendClient(ctx context.Context, token string, clientConfig gocloak.Client) *gocloak.Client {
	var client *gocloak.Client
	clients, err := k.GoCloak.GetClients(ctx, token, k.Realm, gocloak.GetClientsParams{
		ClientID: clientConfig.ClientID,
	})
	if err != nil {
		panic(err)
	}
	if len(clients) == 0 {
		client = &clientConfig
	} else {

		var m map[string]any

		ja, _ := json.Marshal(clients[0])
		err := json.Unmarshal(ja, &m)
		if err != nil {
			panic(err)
		}

		jb, _ := json.Marshal(clientConfig)
		err = json.Unmarshal(jb, &m)
		if err != nil {
			panic(err)
		}

		jz, err := json.Marshal(m)
		if err != nil {
			panic(err)
		}

		_client := gocloak.Client{}
		err = json.Unmarshal(jz, &_client)
		if err != nil {
			panic(err)
		}
		client = &_client
	}

	client.StandardFlowEnabled = gocloak.BoolP(true)
	client.AuthorizationServicesEnabled = gocloak.BoolP(false)
	client.PublicClient = gocloak.BoolP(true)
	client.FrontChannelLogout = gocloak.BoolP(true)

	if client.ID == nil {
		clientID, err := k.GoCloak.CreateClient(ctx, token, k.Realm, *client)
		if err != nil {
			panic(err)
		}
		client, err = k.GoCloak.GetClient(ctx, token, k.Realm, clientID)
		if err != nil {
			panic(err)
		}
	} else {
		err := k.GoCloak.UpdateClient(ctx, token, k.Realm, *client)
		if err != nil {
			panic(err)
		}
	}
	return client
}

func (k *Keycloak) prepareBackendClient(ctx context.Context, token string) *gocloak.Client {
	var client *gocloak.Client
	clients, err := k.GoCloak.GetClients(ctx, token, k.Realm, gocloak.GetClientsParams{
		ClientID: &k.BackendClientID,
	})
	if err != nil {
		panic(err)
	}
	if len(clients) == 0 {
		client = &gocloak.Client{}
	} else {
		client = clients[0]
	}

	if client.AuthorizationSettings == nil {
		client.AuthorizationSettings = &gocloak.ResourceServerRepresentation{}
	}

	client.ClientID = gocloak.StringP(k.BackendClientID)
	client.Secret = gocloak.StringP(k.BackendClientSecret)
	client.ServiceAccountsEnabled = gocloak.BoolP(true)
	client.AuthorizationSettings.DecisionStrategy = gocloak.AFFIRMATIVE
	client.DirectAccessGrantsEnabled = gocloak.BoolP(true)

	if client.ID == nil {
		clientID, err := k.GoCloak.CreateClient(ctx, token, k.Realm, *client)
		if err != nil {
			panic(err)
		}
		client, err = k.GoCloak.GetClient(ctx, token, k.Realm, clientID)
		if err != nil {
			panic(err)
		}
	} else {
		err := k.GoCloak.UpdateClient(ctx, token, k.Realm, *client)
		if err != nil {
			panic(err)
		}
	}

	// Delete default authorization entities
	defaultPermissions, _ := k.GoCloak.GetPermissions(ctx, token, k.Realm, *client.ID, gocloak.GetPermissionParams{
		Name: gocloak.StringP("Default Permission"),
	})
	if len(defaultPermissions) > 0 {
		_ = k.GoCloak.DeletePermission(ctx, token, k.Realm, *client.ID, *defaultPermissions[0].ID)
	}

	defaultPolicies, _ := k.GoCloak.GetPolicies(ctx, token, k.Realm, *client.ID, gocloak.GetPolicyParams{
		Name: gocloak.StringP("Default Policy"),
	})
	if len(defaultPolicies) > 0 {
		_ = k.GoCloak.DeletePermission(ctx, token, k.Realm, *client.ID, *defaultPolicies[0].ID)
	}

	return client
}

func (k *Keycloak) preparePermission(ctx context.Context, token string, idOfClient string, name string, permissionType string, resourcesIDs *[]string, scopesIDs *[]string, policies []string) *gocloak.PermissionRepresentation {
	permission := &gocloak.PermissionRepresentation{}
	permissions, err := k.GoCloak.GetPermissions(ctx, token, k.Realm, idOfClient, gocloak.GetPermissionParams{
		Name: &name,
	})
	if err != nil {
	}
	if len(permissions) > 0 {
		permission = permissions[0]
	}
	permission.Name = gocloak.StringP(name)
	permission.Type = gocloak.StringP(permissionType)
	permission.Scopes = scopesIDs
	permission.Resources = resourcesIDs

	permission.Policies = &policies
	permission.DecisionStrategy = gocloak.UNANIMOUS

	if permission.ID == nil {
		permission, err = k.GoCloak.CreatePermission(ctx, token, k.Realm, idOfClient, *permission)
	} else {
		err = k.GoCloak.UpdatePermission(ctx, token, k.Realm, idOfClient, *permission)
	}
	if err != nil {
		panic(err)
	}
	return permission
}

func (k *Keycloak) preparePolicy(ctx context.Context, token string, idOfClient string, name string, roles []gocloak.Role) *gocloak.PolicyRepresentation {
	policy := &gocloak.PolicyRepresentation{}

	policies, err := k.GoCloak.GetPolicies(ctx, token, k.Realm, idOfClient, gocloak.GetPolicyParams{
		Name: gocloak.StringP(name),
	})
	if len(policies) > 0 {
		err := k.GoCloak.DeletePolicy(ctx, token, k.Realm, idOfClient, *policies[0].ID)
		if err != nil {
			panic(err)
		}
	}
	var rolesDefinitions []gocloak.RoleDefinition
	for _, r := range roles {
		rolesDefinitions = append(rolesDefinitions, gocloak.RoleDefinition{
			ID: r.ID,
		})
	}

	policy.Name = gocloak.StringP(name)
	policy.Type = gocloak.StringP("role")
	policy.RolePolicyRepresentation = gocloak.RolePolicyRepresentation{
		Roles: &rolesDefinitions,
	}

	policy, err = k.GoCloak.CreatePolicy(ctx, token, k.Realm, idOfClient, *policy)

	if err != nil {
		panic(err)
	}
	return policy
}

func (k *Keycloak) prepareRole(ctx context.Context, idOfClient string, token string, name string, compositeRoles *[]gocloak.Role) gocloak.Role {
	role, err := k.GoCloak.GetClientRole(ctx, token, k.Realm, idOfClient, name)
	if err != nil {
	}
	if role == nil {
		role = &gocloak.Role{}
	}
	role.Name = gocloak.StringP(name)

	if role.ID == nil {
		_, err := k.GoCloak.CreateClientRole(ctx, token, k.Realm, idOfClient, *role)
		if err != nil {
			panic(err)
		}
		role, err = k.GoCloak.GetClientRole(ctx, token, k.Realm, idOfClient, name)
		if err != nil {
			panic(err)
		}
	} else {
		err = k.GoCloak.UpdateRole(ctx, token, k.Realm, idOfClient, *role)
		if err != nil {
			panic(err)
		}
	}

	if compositeRoles != nil {

		err = k.GoCloak.AddClientRoleComposite(ctx, token, k.Realm, *role.ID, *compositeRoles)
		if err != nil {
			panic(err)
		}
	}

	return *role
}

func (k *Keycloak) prepareResourcesScopes(ctx context.Context, idOfClient string, token string, name string) *gocloak.ScopeRepresentation {
	var scope *gocloak.ScopeRepresentation
	scopes, err := k.GoCloak.GetScopes(ctx, token, k.Realm, idOfClient, gocloak.GetScopeParams{
		Name: &name,
	})
	if err != nil {
		panic(err)
	}
	if len(scopes) > 0 {
		scope = scopes[0]
		err = k.GoCloak.UpdateScope(ctx, token, k.Realm, idOfClient, *scope)
		if err != nil {
			panic(err)
		}
	} else {
		scope, err = k.GoCloak.CreateScope(ctx, token, k.Realm, idOfClient, gocloak.ScopeRepresentation{
			Name: &name,
		})
		if err != nil {
			panic(err)
		}
	}
	return scope
}

func (k *Keycloak) prepareResource(ctx context.Context, idOfClient string, token string, name string, scopes *[]gocloak.ScopeRepresentation) *gocloak.ResourceRepresentation {
	var resource gocloak.ResourceRepresentation
	resources, err := k.GoCloak.GetResources(ctx, token, k.Realm, idOfClient, gocloak.GetResourceParams{Name: gocloak.StringP(name)})
	if err != nil {
		panic(err)
	}

	if len(resources) > 0 {
		resource = *resources[0]
	}

	resource.Name = gocloak.StringP(name)
	resource.URIs = &[]string{"/*"}
	resource.Scopes = scopes
	resource.Type = gocloak.StringP("urn:" + k.BackendClientID + ":resources:entity")

	if resource.ID == nil {
		var r *gocloak.ResourceRepresentation
		r, err = k.GoCloak.CreateResource(ctx, token, k.Realm, idOfClient, resource)
		resource = *r
	} else {
		err = k.GoCloak.UpdateResource(ctx, token, k.Realm, idOfClient, resource)
	}

	if err != nil {
		println(name, err.Error())
		panic(err)
	}

	return &resource
}
