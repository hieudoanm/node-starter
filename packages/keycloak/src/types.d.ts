export interface KeyCloakTokenResponseDto {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  session_state: string;
  scope: string;
}

export type KeyCloakUserInfoResponseDto = {
  sub: string;
  email_verified: boolean;
  preferred_username: string;
  email: string;
};
