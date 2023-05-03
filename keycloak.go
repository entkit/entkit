package entkit

import (
	"context"
	"encoding/json"
	"entgo.io/ent/entc/gen"
	"errors"
	"github.com/Nerzal/gocloak/v12"
	"net/http"
	"strings"
)

type Keycloak struct {
	Auth                *Auth   `json:"Auth,omitempty"`
	Enabled             *bool   `json:"Enabled,omitempty"`
	Host                *string `json:"Host,omitempty"`
	Realm               *string `json:"Realm,omitempty"`
	MasterAdminUsername *string `json:"MasterAdminUsername,omitempty"`
	MasterAdminPassword *string `json:"MasterAdminPassword,omitempty"`
	MasterRealm         *string `json:"MasterRealm,omitempty"`

	AdminUsername        *string         `json:"AdminUsername,omitempty"`
	AdminPassword        *string         `json:"AdminPassword,omitempty"`
	BackendClientConfig  *gocloak.Client `json:"BackendClientConfig,omitempty"`
	FrontendClientConfig *gocloak.Client `json:"FrontendClientConfig,omitempty"`

	GoCloak *gocloak.GoCloak `json:"GoCloak,omitempty"`
}

type KeycloakEnvironment struct {
	URL             string `json:"url,omitempty"`
	Realm           string `json:"realm,omitempty"`
	ClientID        string `json:"clientId,omitempty"`
	BackendClientID string `json:"backendClientId,omitempty"`
}

func (kc *Keycloak) GetEnvironmentConfig() *KeycloakEnvironment {
	return &KeycloakEnvironment{
		URL:             PString(kc.Host),
		Realm:           PString(kc.Realm),
		ClientID:        PString(kc.FrontendClientConfig.ClientID),
		BackendClientID: PString(kc.BackendClientConfig.ClientID),
	}
}

type KeycloakOption = func(keycloak *Keycloak) error

func NewKeycloak(
	auth *Auth,
	options ...KeycloakOption,
) *Keycloak {
	prefix := PString(auth.Extension.Prefix)
	k := &Keycloak{
		Auth:                auth,
		Enabled:             BoolP(false),
		Host:                StringP("http://localhost:8080"),
		Realm:               StringP("entkit-realm"),
		MasterAdminUsername: StringP("admin"),
		MasterAdminPassword: StringP("admin"),
		MasterRealm:         StringP("master"),
		AdminUsername:       StringP("entadmin"),
		AdminPassword:       StringP("entadmin"),
		BackendClientConfig: &gocloak.Client{
			ClientID: gocloak.StringP(prefix + "-backend"),
			Secret:   gocloak.StringP(prefix + "-regenerate-me"),
		},
		FrontendClientConfig: &gocloak.Client{
			ClientID: gocloak.StringP(prefix + "-frontend"),
			RootURL:  gocloak.StringP("http://localhost"),
			RedirectURIs: &[]string{
				"http://localhost:3000/*",
				"http://localhost/*",
			},
			Attributes: &map[string]string{
				"post.logout.redirect.uris": "+",
			},
			WebOrigins: &[]string{
				"+",
			},
		},
	}
	for _, opt := range options {
		if err := opt(k); err != nil {
			panic(err)
		}
	}

	k.GoCloak = gocloak.NewClient(*k.Host)
	return k
}

func KeycloakHost(host string) KeycloakOption {
	return func(kc *Keycloak) (err error) {
		kc.Host = StringP(host)
		return nil
	}
}

func KeycloakRealm(realm string) KeycloakOption {
	return func(kc *Keycloak) (err error) {
		kc.Realm = StringP(realm)
		return nil
	}
}

func KeycloakMasterAdminCredentials(username string, password string) KeycloakOption {
	return func(kc *Keycloak) (err error) {
		kc.MasterAdminUsername = StringP(username)
		kc.MasterAdminPassword = StringP(password)
		return nil
	}
}

func KeycloakMasterRealm(realm string) KeycloakOption {
	return func(kc *Keycloak) (err error) {
		kc.MasterRealm = StringP(realm)
		return nil
	}
}

func KeycloakGeneratedAdminCredentials(username string, password string) KeycloakOption {
	return func(kc *Keycloak) (err error) {
		kc.AdminUsername = StringP(username)
		kc.AdminPassword = StringP(password)
		return nil
	}
}

func KeycloakBackendClientConfig(clientConfig gocloak.Client) KeycloakOption {
	return func(kc *Keycloak) (err error) {
		kc.BackendClientConfig = &clientConfig
		return nil
	}
}

func KeycloakFrontendClientConfig(clientConfig gocloak.Client) KeycloakOption {
	return func(kc *Keycloak) (err error) {
		kc.FrontendClientConfig = &clientConfig
		return nil
	}
}

func NewBackendKeycloak(host string, realm string, clientId string, secret string) *Keycloak {
	k := Keycloak{
		Host:  StringP(host),
		Realm: StringP(realm),
		BackendClientConfig: &gocloak.Client{
			ClientID: StringP(clientId),
			Secret:   StringP(secret),
		},
	}
	k.GoCloak = gocloak.NewClient(*k.Host)
	return &k
}

func (kc *Keycloak) MiddlewareReqHandlerFunc(w http.ResponseWriter, r *http.Request) (*http.Request, error) {
	auth := r.Header.Get("Authorization")
	if !strings.HasPrefix(auth, "Bearer ") {
		http.Error(w, "\"Invalid Authorization Header\"", http.StatusBadRequest)
		return r, errors.New("stop")
	}
	token := strings.TrimPrefix(auth, "Bearer ")

	_permissions, err := kc.getResourcesPermissions(token)
	if err != nil {
		http.Error(w, "\"Unauthorized\"", http.StatusUnauthorized)
		return r, errors.New("stop")
	}

	var permissions []*Permission
	for _, p := range *_permissions {
		permissions = append(permissions, &Permission{
			Resource: *p.ResourceName,
			Scopes:   *p.Scopes,
		})
	}

	authContext := &AuthContext{Permissions: permissions}
	ctx := context.WithValue(r.Context(), AuthContextKey, authContext)
	return r.WithContext(ctx), nil
}

func (kc *Keycloak) getResourcesPermissions(token string) (*[]gocloak.RequestingPartyPermission, error) {
	return kc.GoCloak.GetRequestingPartyPermissions(
		context.Background(),
		token,
		PString(kc.Realm),
		gocloak.RequestingPartyTokenOptions{
			Audience:                    kc.BackendClientConfig.ClientID,
			ResponseIncludeResourceName: gocloak.BoolP(true),
			ResponseMode:                gocloak.StringP("permissions"),
		},
	)
}

func (kc *Keycloak) getAdminToken(ctx context.Context) string {
	token, err := kc.GoCloak.LoginAdmin(
		ctx,
		PString(kc.MasterAdminUsername),
		PString(kc.MasterAdminPassword),
		PString(kc.MasterRealm),
	)
	if err != nil {
		panic(err)
	}
	return token.AccessToken
}

func (kc *Keycloak) GenerateKeycloakResources(g *gen.Graph) {
	ctx := context.Background()
	token := kc.getAdminToken(ctx)

	kc.prepareRealm(ctx, token)

	backendClient := kc.prepareBackendClient(ctx, token)

	kc.prepareFrontendClient(ctx, token)

	scopesMap := map[string]*gocloak.ScopeRepresentation{}

	for _, action := range DefaultActionScopes {
		scope := kc.prepareResourcesScopes(ctx, *backendClient.ID, token, action)
		scopesMap[action] = scope
	}
	var adminRoles []gocloak.Role
	var readerRoles []gocloak.Role

	for _, node := range g.Nodes {
		var resScopes []gocloak.ScopeRepresentation
		ant := kc.Auth.Extension.GetNodeAnnotations(node)

		for _, a := range ant.Actions {
			name := a.Scope
			if name == nil {
				name = a.Name
			}

			scope := kc.prepareResourcesScopes(ctx, *backendClient.ID, token, kc.Auth.Extension.Pascal(PString(name)))
			resScopes = append(resScopes, *scope)
		}

		resource := kc.prepareResource(ctx, *backendClient.ID, token, node.Name, &resScopes)

		adminRole := kc.prepareRole(ctx, *backendClient.ID, token, node.Name+" Admin", nil)
		adminRoles = append(adminRoles, adminRole)

		readerRole := kc.prepareRole(ctx, *backendClient.ID, token, node.Name+" Reader", nil)
		readerRoles = append(readerRoles, readerRole)

		adminPolicy := kc.preparePolicy(ctx, token, *backendClient.ID, node.Name+"OnlyAdminPermission", []gocloak.Role{adminRole})
		readerPolicy := kc.preparePolicy(ctx, token, *backendClient.ID, node.Name+"OnlyReaderPermission", []gocloak.Role{readerRole})

		_ = kc.preparePermission(ctx, token, *backendClient.ID, node.Name+"AdminPermission",
			"resource",
			&[]string{*resource.ID},
			nil,
			[]string{*adminPolicy.ID},
		)

		_ = kc.preparePermission(ctx, token, *backendClient.ID, node.Name+"ReaderPermission",
			"scope",
			&[]string{*resource.ID},
			&[]string{
				PString(scopesMap["Read"].ID),
			},
			[]string{*readerPolicy.ID},
		)
	}

	adminRole := kc.prepareRole(ctx, *backendClient.ID, token, "Admin", &adminRoles)
	kc.prepareRole(ctx, *backendClient.ID, token, "Reader", &readerRoles)

	kc.prepareUser(ctx, token, map[string][]gocloak.Role{
		*backendClient.ID: {
			adminRole,
		},
	})
}

func (kc *Keycloak) prepareUser(ctx context.Context, token string, clientRoles map[string][]gocloak.Role) *gocloak.User {
	var user *gocloak.User
	users, err := kc.GoCloak.GetUsers(ctx, token, PString(kc.Realm), gocloak.GetUsersParams{
		Username: kc.AdminUsername,
	})
	if err != nil {
		panic(err)
	}
	if len(users) == 0 {
		userId, err := kc.GoCloak.CreateUser(ctx, token, PString(kc.Realm), gocloak.User{
			Enabled:  gocloak.BoolP(true),
			Username: kc.AdminUsername,
			Credentials: &[]gocloak.CredentialRepresentation{
				{
					Type:  gocloak.StringP("password"),
					Value: kc.AdminPassword,
				},
			},
		})
		if err != nil {
			panic(err)
		}
		user, err = kc.GoCloak.GetUserByID(ctx, token, PString(kc.Realm), userId)
		if err != nil {
			panic(err)
		}
	} else {
		user = users[0]
	}

	for idOfClient, clientRoles := range clientRoles {
		err := kc.GoCloak.AddClientRolesToUser(ctx, token, PString(kc.Realm), idOfClient, *user.ID, clientRoles)
		if err != nil {
			panic(err)
		}
	}
	return user
}

func (kc *Keycloak) prepareRealm(ctx context.Context, token string) *gocloak.RealmRepresentation {
	realm, _ := kc.GoCloak.GetRealm(ctx, token, PString(kc.Realm))
	if realm == nil {
		_, err := kc.GoCloak.CreateRealm(ctx, token, gocloak.RealmRepresentation{
			Realm:   kc.Realm,
			Enabled: gocloak.BoolP(true),
		})
		if err != nil {
			panic(err)
		}
		realm, err := kc.GoCloak.GetRealm(ctx, token, PString(kc.Realm))
		if err != nil {
			panic(err)
		}
		return realm
	} else {
		realm.Enabled = gocloak.BoolP(true)
		err := kc.GoCloak.UpdateRealm(ctx, token, *realm)
		if err != nil {
			panic(err)
		}
	}
	return realm
}

func (kc *Keycloak) prepareFrontendClient(ctx context.Context, token string) *gocloak.Client {
	var client *gocloak.Client
	clients, err := kc.GoCloak.GetClients(ctx, token, PString(kc.Realm), gocloak.GetClientsParams{
		ClientID: kc.FrontendClientConfig.ClientID,
	})
	if err != nil {
		panic(err)
	}
	if len(clients) == 0 {
		client = kc.FrontendClientConfig
	} else {
		var m map[string]any

		ja, _ := json.Marshal(clients[0])
		err := json.Unmarshal(ja, &m)
		if err != nil {
			panic(err)
		}

		jb, _ := json.Marshal(kc.FrontendClientConfig)
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
		clientID, err := kc.GoCloak.CreateClient(ctx, token, PString(kc.Realm), *client)
		if err != nil {
			panic(err)
		}
		client, err = kc.GoCloak.GetClient(ctx, token, PString(kc.Realm), clientID)
		if err != nil {
			panic(err)
		}
	} else {
		err := kc.GoCloak.UpdateClient(ctx, token, PString(kc.Realm), *client)
		if err != nil {
			panic(err)
		}
	}
	return client
}

func (kc *Keycloak) prepareBackendClient(ctx context.Context, token string) *gocloak.Client {
	clientConfig := kc.BackendClientConfig
	var client *gocloak.Client
	clients, err := kc.GoCloak.GetClients(ctx, token, PString(kc.Realm), gocloak.GetClientsParams{
		ClientID: clientConfig.ClientID,
	})
	if err != nil {
		panic(err)
	}
	if len(clients) == 0 {
		client = clientConfig
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

	if client.AuthorizationSettings == nil {
		client.AuthorizationSettings = &gocloak.ResourceServerRepresentation{}
	}

	client.ServiceAccountsEnabled = gocloak.BoolP(true)
	client.AuthorizationSettings.DecisionStrategy = gocloak.AFFIRMATIVE
	client.DirectAccessGrantsEnabled = gocloak.BoolP(true)

	if client.ID == nil {
		clientID, err := kc.GoCloak.CreateClient(ctx, token, PString(kc.Realm), *client)
		if err != nil {
			panic(err)
		}
		client, err = kc.GoCloak.GetClient(ctx, token, PString(kc.Realm), clientID)
		if err != nil {
			panic(err)
		}
	} else {
		err := kc.GoCloak.UpdateClient(ctx, token, PString(kc.Realm), *client)
		if err != nil {
			panic(err)
		}
	}

	// Delete default authorization entities
	defaultPermissions, _ := kc.GoCloak.GetPermissions(ctx, token, PString(kc.Realm), *client.ID, gocloak.GetPermissionParams{
		Name: gocloak.StringP("Default Permission"),
	})
	if len(defaultPermissions) > 0 {
		_ = kc.GoCloak.DeletePermission(ctx, token, PString(kc.Realm), *client.ID, *defaultPermissions[0].ID)
	}

	defaultPolicies, _ := kc.GoCloak.GetPolicies(ctx, token, PString(kc.Realm), *client.ID, gocloak.GetPolicyParams{
		Name: gocloak.StringP("Default Policy"),
	})
	if len(defaultPolicies) > 0 {
		_ = kc.GoCloak.DeletePermission(ctx, token, PString(kc.Realm), *client.ID, *defaultPolicies[0].ID)
	}

	return client
}

func (kc *Keycloak) preparePermission(ctx context.Context, token string, idOfClient string, name string, permissionType string, resourcesIDs *[]string, scopesIDs *[]string, policies []string) *gocloak.PermissionRepresentation {
	name = kc.Auth.Extension.PrepareName(name)
	permission := &gocloak.PermissionRepresentation{}
	permissions, err := kc.GoCloak.GetPermissions(ctx, token, PString(kc.Realm), idOfClient, gocloak.GetPermissionParams{
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
		permission, err = kc.GoCloak.CreatePermission(ctx, token, PString(kc.Realm), idOfClient, *permission)
	} else {
		err = kc.GoCloak.UpdatePermission(ctx, token, PString(kc.Realm), idOfClient, *permission)
	}
	if err != nil {
		panic(err)
	}
	return permission
}

func (kc *Keycloak) preparePolicy(ctx context.Context, token string, idOfClient string, name string, roles []gocloak.Role) *gocloak.PolicyRepresentation {
	name = kc.Auth.Extension.PrepareName(name)
	policy := &gocloak.PolicyRepresentation{}

	policies, err := kc.GoCloak.GetPolicies(ctx, token, PString(kc.Realm), idOfClient, gocloak.GetPolicyParams{
		Name: gocloak.StringP(name),
	})
	if err != nil {
		panic(err)
	}
	if len(policies) > 0 {
		err := kc.GoCloak.DeletePolicy(ctx, token, PString(kc.Realm), idOfClient, *policies[0].ID)
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

	policy, err = kc.GoCloak.CreatePolicy(ctx, token, PString(kc.Realm), idOfClient, *policy)

	if err != nil {
		panic(err)
	}
	return policy
}

func (kc *Keycloak) prepareRole(ctx context.Context, idOfClient string, token string, name string, compositeRoles *[]gocloak.Role) gocloak.Role {
	name = kc.Auth.Extension.PrepareName(name)
	role, err := kc.GoCloak.GetClientRole(ctx, token, PString(kc.Realm), idOfClient, name)
	if err != nil {
	}
	if role == nil {
		role = &gocloak.Role{}
	}
	role.Name = gocloak.StringP(name)

	if role.ID == nil {
		_, err := kc.GoCloak.CreateClientRole(ctx, token, PString(kc.Realm), idOfClient, *role)
		if err != nil {
			panic(err)
		}
		role, err = kc.GoCloak.GetClientRole(ctx, token, PString(kc.Realm), idOfClient, name)
		if err != nil {
			panic(err)
		}
	} else {
		err = kc.GoCloak.UpdateRole(ctx, token, PString(kc.Realm), idOfClient, *role)
		if err != nil {
			panic(err)
		}
	}

	if compositeRoles != nil {

		err = kc.GoCloak.AddClientRoleComposite(ctx, token, PString(kc.Realm), *role.ID, *compositeRoles)
		if err != nil {
			panic(err)
		}
	}

	return *role
}

func (kc *Keycloak) prepareResourcesScopes(ctx context.Context, idOfClient string, token string, name string) *gocloak.ScopeRepresentation {
	name = kc.Auth.Extension.PrepareName(name)
	var scope *gocloak.ScopeRepresentation
	scopes, err := kc.GoCloak.GetScopes(ctx, token, PString(kc.Realm), idOfClient, gocloak.GetScopeParams{
		Name: &name,
	})
	if err != nil {
		panic(err)
	}
	if len(scopes) > 0 {
		scope = scopes[0]
		err = kc.GoCloak.UpdateScope(ctx, token, PString(kc.Realm), idOfClient, *scope)
		if err != nil {
			panic(err)
		}
	} else {
		scope, err = kc.GoCloak.CreateScope(ctx, token, PString(kc.Realm), idOfClient, gocloak.ScopeRepresentation{
			Name: &name,
		})
		if err != nil {
			panic(err)
		}
	}
	return scope
}

func (kc *Keycloak) prepareResource(ctx context.Context, idOfClient string, token string, name string, scopes *[]gocloak.ScopeRepresentation) *gocloak.ResourceRepresentation {
	name = kc.Auth.Extension.PrepareName(name)
	var resource gocloak.ResourceRepresentation
	resources, err := kc.GoCloak.GetResources(ctx, token, PString(kc.Realm), idOfClient, gocloak.GetResourceParams{Name: gocloak.StringP(name)})
	if err != nil {
		panic(err)
	}

	if len(resources) > 0 {
		resource = *resources[0]
	}

	resource.Name = gocloak.StringP(name)
	resource.URIs = &[]string{"/*"}
	resource.Scopes = scopes
	resource.Type = gocloak.StringP("urn:" + PString(kc.BackendClientConfig.ClientID) + ":resources:entity")

	if resource.ID == nil {
		var r *gocloak.ResourceRepresentation
		r, err = kc.GoCloak.CreateResource(ctx, token, PString(kc.Realm), idOfClient, resource)
		resource = *r
	} else {
		err = kc.GoCloak.UpdateResource(ctx, token, PString(kc.Realm), idOfClient, resource)
	}

	if err != nil {
		println(name, err.Error())
		panic(err)
	}

	return &resource
}
