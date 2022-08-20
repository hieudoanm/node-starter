// Global
export const NODE_ENV = process.env.NODE_ENV || 'development';
// Database
export const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/test';
// KeyCloak Host
export const KEY_CLOAK_ADMIN_HOST = process.env.KEY_CLOAK_ADMIN_HOST || '';
// KeyCloak Admin CLI
export const KEY_CLOAK_ADMIN_CLI_HOST =
  process.env.KEY_CLOAK_ADMIN_CLI_HOST || '';
export const KEY_CLOAK_ADMIN_CLI_CLIENT_ID =
  process.env.KEY_CLOAK_ADMIN_CLI_CLIENT_ID || '';
export const KEY_CLOAK_ADMIN_CLI_CLIENT_SECRET =
  process.env.KEY_CLOAK_ADMIN_CLI_CLIENT_SECRET || '';
// KeyCloak Starter Client
export const KEY_CLOAK_STARTER_HOST = process.env.KEY_CLOAK_STARTER_HOST || '';
export const KEY_CLOAK_STARTER_CLIENT_ID =
  process.env.KEY_CLOAK_STARTER_CLIENT_ID || '';
export const KEY_CLOAK_STARTER_CLIENT_SECRET =
  process.env.KEY_CLOAK_STARTER_CLIENT_SECRET || '';
