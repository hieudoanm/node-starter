// Database
export const MONGO_URL = process.env.MONGO_URL || '';
export const REDIS_URL = process.env.REDIS_URL || '';
// KeyCloak - Host
export const KEYCLOAK_ADMIN_HOST = process.env.KEYCLOAK_ADMIN_HOST || '';
export const KEYCLOAK_REALM_HOST = process.env.KEYCLOAK_REALM_HOST || '';

// KeyCloak - Client ID / Secret
export const KEYCLOAK_ADMIN_CLIENT_ID =
  process.env.KEYCLOAK_ADMIN_CLIENT_ID || '';
export const KEYCLOAK_ADMIN_CLIENT_SECRET =
  process.env.KEYCLOAK_ADMIN_CLIENT_SECRET || '';

export const KEYCLOAK_REALM_CLIENT_ID =
  process.env.KEYCLOAK_REALM_CLIENT_ID || '';
export const KEYCLOAK_REALM_CLIENT_SECRET =
  process.env.KEYCLOAK_REALM_CLIENT_SECRET || '';

export const KEYCLOAK_REDIRECT_URI = process.env.KEYCLOAK_REDIRECT_URI || '';
