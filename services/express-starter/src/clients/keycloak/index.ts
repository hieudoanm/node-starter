import { KeyCloakClient } from '@turtle/keycloak';
import {
  KEYCLOAK_ADMIN_CLIENT_ID,
  KEYCLOAK_ADMIN_CLIENT_SECRET,
  KEYCLOAK_ADMIN_HOST,
  KEYCLOAK_REALM_CLIENT_ID,
  KEYCLOAK_REALM_CLIENT_SECRET,
  KEYCLOAK_REALM_HOST,
  KEYCLOAK_REDIRECT_URI,
} from '../../environments';

const keyCloakClient: KeyCloakClient = new KeyCloakClient({
  host: KEYCLOAK_REALM_HOST,
  clientId: KEYCLOAK_REALM_CLIENT_ID,
  clientSecret: KEYCLOAK_REALM_CLIENT_SECRET,

  adminHost: KEYCLOAK_ADMIN_HOST,
  adminClientId: KEYCLOAK_ADMIN_CLIENT_ID,
  adminClientSecret: KEYCLOAK_ADMIN_CLIENT_SECRET,

  redirectUri: KEYCLOAK_REDIRECT_URI,
});

export default keyCloakClient;
