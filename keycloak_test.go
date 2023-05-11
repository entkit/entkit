package entkit

import (
	"github.com/Nerzal/gocloak/v12"
	"github.com/stretchr/testify/assert"
	"net/http"
	"testing"
)

// test for entkit.NewKeycloak()
func TestNewKeycloak(t *testing.T) {
	assert := assert.New(t)
	auth := &Auth{Extension: &Extension{}}
	assert.Equal(
		*NewKeycloak(auth, KeycloakHost("host")).Host,
		"host",
	)
}

// test for entkit.KeycloakHost()
func TestKeycloakHost(t *testing.T) {
	assert := assert.New(t)
	keycloak := &Keycloak{}
	assert.Nil(KeycloakHost("host")(keycloak))
	assert.Equal(*keycloak.Host, "host")
}

// test for entkit.KeycloakRealm()
func TestKeycloakRealm(t *testing.T) {
	assert := assert.New(t)
	keycloak := &Keycloak{}
	assert.Nil(KeycloakRealm("realm")(keycloak))
	assert.Equal(*keycloak.Realm, "realm")
}

// test for entkit.KeycloakMasterAdminCredentials()
func TestKeycloakMasterAdminCredentials(t *testing.T) {
	assert := assert.New(t)
	keycloak := &Keycloak{}
	assert.Nil(KeycloakMasterAdminCredentials("user", "pass")(keycloak))
	assert.Equal(*keycloak.MasterAdminUsername, "user")
	assert.Equal(*keycloak.MasterAdminPassword, "pass")
}

// test for entkit.KeycloakMasterRealm()
func TestKeycloakMasterRealm(t *testing.T) {
	assert := assert.New(t)
	keycloak := &Keycloak{}
	assert.Nil(KeycloakMasterRealm("realm")(keycloak))
	assert.Equal(*keycloak.MasterRealm, "realm")
}

// test for entkit.KeycloakGeneratedAdminCredentials()
func TestKeycloakGeneratedAdminCredentials(t *testing.T) {
	assert := assert.New(t)
	keycloak := &Keycloak{}
	assert.Nil(KeycloakGeneratedAdminCredentials("admin", "pass")(keycloak))
	assert.Equal(*keycloak.AdminUsername, "admin")
	assert.Equal(*keycloak.AdminPassword, "pass")
}

// unit test for entkit.KeycloakBackendClientConfig
func TestKeycloakBackendClientConfig(t *testing.T) {
	assert := assert.New(t)
	keycloak := &Keycloak{}
	cConfig := gocloak.Client{ClientID: StringP("test")}
	assert.Nil(KeycloakBackendClientConfig(cConfig)(keycloak))
	assert.Equal(*keycloak.BackendClientConfig.ClientID, "test")
}

// unit test for entkit.KeycloakFrontendClientConfig
func TestKeycloakFrontendClientConfig(t *testing.T) {
	assert := assert.New(t)
	keycloak := &Keycloak{}
	cConfig := gocloak.Client{ClientID: StringP("test")}
	assert.Nil(KeycloakFrontendClientConfig(cConfig)(keycloak))
	assert.Equal(*keycloak.FrontendClientConfig.ClientID, "test")
}

// unit test for entkit.NewBackendKeycloak
func TestNewBackendKeycloak(t *testing.T) {
	assert := assert.New(t)
	assert.Equal(*NewBackendKeycloak("test", "realm", "cid", "secret").Host, "test")
}

// unit test for Keycloak.getTokenFromRequest
func TestKeycloak_getTokenFromRequest(t *testing.T) {
	assert := assert.New(t)
	keycloak := &Keycloak{}
	token, err := keycloak.getTokenFromRequest(nil)
	assert.Equal(token, "")
	assert.EqualError(err, "request is nil")
}

// unit test for Keycloak.getTokenFromRequest when token is not found
func TestKeycloak_getTokenFromRequest_EmptyBearerToken(t *testing.T) {
	assert := assert.New(t)
	keycloak := &Keycloak{}
	token, err := keycloak.getTokenFromRequest(&http.Request{Header: map[string][]string{
		"Authorization": {"Bearer "},
	}})
	assert.Equal(token, "")
	assert.EqualError(err, "empty bearer token")
}

// unit test for Keycloak.getTokenFromRequest when token is not found
func TestKeycloak_getTokenFromRequest_BearerPrefixNotFoundInAuthorizationHeader(t *testing.T) {
	assert := assert.New(t)
	keycloak := &Keycloak{}
	token, err := keycloak.getTokenFromRequest(&http.Request{Header: map[string][]string{
		"Authorization": {"Bea___ "},
	}})
	assert.Equal(token, "")
	assert.EqualError(err, "invalid authorization header")
}
