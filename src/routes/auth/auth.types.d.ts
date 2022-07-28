export type KeyCloakTokenRequest = {
  url: string;
  clientId: string;
  clientSecret: string;
  grantType: GRANT_TYPE;
  username?: string;
  password?: string;
  refreshToken?: string;
};

export type KeyCloakTokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  session_state: string;
  scope: string;
};

export type SignUpRequestBody = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type SignInRequestBody = {
  email: string;
  password: string;
};

export type SignUpResponse = {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
};

export type SignInResponse = {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
};

export type RefreshTokenResponse = SignInResponse;
