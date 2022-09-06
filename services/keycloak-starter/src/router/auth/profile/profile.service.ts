import http from '@turtle/http';
import { Request as ExpressRequest } from 'express';
import {
  KEY_CLOAK_ADMIN_HOST,
  KEY_CLOAK_STARTER_CLIENT_ID,
  KEY_CLOAK_STARTER_CLIENT_SECRET,
  KEY_CLOAK_STARTER_HOST,
} from '../../../configs';
import { CONTENT_TYPE, GRANT_TYPE } from '../../../constants';
import {
  getAdminToken,
  getAuthorization,
  getToken,
} from '../../../libs/keycloak';
import { KeyCloakTokenResponse } from '../../../libs/keycloak/keycloak.types';
import { SignInRequestBody, SignUpRequestBody } from './profile.types';

export const refreshAccessToken = async (
  request: ExpressRequest
): Promise<KeyCloakTokenResponse> => {
  const url = `${KEY_CLOAK_STARTER_HOST}/protocol/openid-connect/token`;
  const refreshToken = request.cookies['refresh-token'] || '';
  return getToken({
    url,
    clientId: KEY_CLOAK_STARTER_CLIENT_ID,
    clientSecret: KEY_CLOAK_STARTER_CLIENT_SECRET,
    grantType: GRANT_TYPE.REFRESH_TOKEN,
    refreshToken,
  });
};

export const signIn = async ({
  email,
  password,
}: SignInRequestBody): Promise<KeyCloakTokenResponse> => {
  const url = `${KEY_CLOAK_STARTER_HOST}/protocol/openid-connect/token`;
  return getToken({
    url,
    clientId: KEY_CLOAK_STARTER_CLIENT_ID,
    clientSecret: KEY_CLOAK_STARTER_CLIENT_SECRET,
    grantType: GRANT_TYPE.PASSWORD,
    username: email,
    password,
  });
};

export const signUp = async ({
  email,
  password,
  firstName,
  lastName,
}: SignUpRequestBody): Promise<KeyCloakTokenResponse> => {
  // Get Admin Access Token
  const adminToken: KeyCloakTokenResponse = await getAdminToken();
  const adminAuthorization: string = getAuthorization(adminToken);
  // Sign Up
  const signUpURL = `${KEY_CLOAK_ADMIN_HOST}/users`;
  const postData = {
    enabled: true,
    groups: [],
    email,
    emailVerified: true,
    firstName,
    lastName,
    username: email,
    requiredActions: [],
    credentials: [{ type: 'password', value: password, temporary: false }],
  };
  const headers = { authorization: adminAuthorization };
  await http.post(signUpURL, postData, { headers });
  // Get Access Token
  const url = `${KEY_CLOAK_STARTER_HOST}/protocol/openid-connect/token`;
  return getToken({
    url,
    clientId: KEY_CLOAK_STARTER_CLIENT_ID,
    clientSecret: KEY_CLOAK_STARTER_CLIENT_SECRET,
    grantType: GRANT_TYPE.PASSWORD,
    username: email,
    password,
  });
};

export const signOut = async (
  request: ExpressRequest
): Promise<{ isSignedOut: boolean }> => {
  const authorization = request.headers.authorization || '';
  const refreshToken = request.cookies['refresh-token'] || '';
  const url = `${KEY_CLOAK_STARTER_HOST}/protocol/openid-connect/logout`;
  const params = new URLSearchParams();
  params.append('client_id', KEY_CLOAK_STARTER_CLIENT_ID);
  params.append('client_secret', KEY_CLOAK_STARTER_CLIENT_SECRET);
  params.append('refresh_token', refreshToken);
  const headers = {
    authorization,
    'content-type': CONTENT_TYPE.APPLICATION_URLENCODED,
  };
  try {
    await http.post(url, params, { headers });
  } catch (error) {
    console.error(error);
  }
  return { isSignedOut: true };
};
