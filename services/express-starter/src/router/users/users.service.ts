import keyCloakClient from '../../clients/keycloak';
import {
  KeyCloakAddUserResponse,
  KeyCloakTokenResponse,
  KeyCloakUserInfoResponse,
} from '../../libs/keycloak';
import { SignInRequest, SignUpRequest } from './users.types';

export const getUserInfo = async (
  authorization: string
): Promise<KeyCloakUserInfoResponse> => {
  return keyCloakClient.getUserInfo(authorization);
};

export const signUp = async ({
  username,
  password,
}: SignUpRequest): Promise<KeyCloakAddUserResponse> => {
  return keyCloakClient.addUser({ username, password });
};

export const signIn = async ({
  username,
  password,
}: SignInRequest): Promise<KeyCloakTokenResponse> => {
  return keyCloakClient.getUserToken({ username, password });
};

export const refreshToken = async (
  refreshTokenString: string
): Promise<KeyCloakTokenResponse> => {
  return keyCloakClient.refreshToken(refreshTokenString);
};

export const signOut = async ({
  authorization,
  refreshToken,
}: {
  authorization: string;
  refreshToken: string;
}) => {
  return keyCloakClient.logOut({ authorization, refreshToken });
};

export const changePassword = async ({
  userId,
  newPassword,
}: {
  userId: string;
  newPassword: string;
}) => {
  return keyCloakClient.resetPassword({ userId, newPassword });
};
