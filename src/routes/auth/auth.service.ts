import { Request as ExpressRequest } from 'express';
import isNil from 'lodash/isNil';
import {
  KEY_CLOAK_ADMIN_CLI_CLIENT_ID,
  KEY_CLOAK_ADMIN_CLI_CLIENT_SECRET,
  KEY_CLOAK_ADMIN_CLI_HOST,
  KEY_CLOAK_ADMIN_HOST,
  KEY_CLOAK_EXPRESS_CLIENT_ID,
  KEY_CLOAK_EXPRESS_CLIENT_SECRET,
  KEY_CLOAK_EXPRESS_HOST,
} from '../../configs';
import { CONTENT_TYPE, GRANT_TYPE } from '../../constants';
import { axiosPost } from '../../libs/axios';
import {
  KeyCloakTokenRequest,
  KeyCloakTokenResponse,
  SignInRequestBody,
  SignUpRequestBody,
} from './auth.types';

const getToken = async ({
  url,
  clientId,
  clientSecret,
  grantType,
  username,
  password,
  refreshToken,
}: KeyCloakTokenRequest): Promise<KeyCloakTokenResponse> => {
  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  params.append('grant_type', grantType);
  if (!isNil(username)) params.append('username', username);
  if (!isNil(password)) params.append('password', password);
  if (!isNil(refreshToken)) params.append('refresh_token', refreshToken);
  const headers = { 'content-type': CONTENT_TYPE.APPLICATION_URLENCODED };
  return axiosPost<KeyCloakTokenResponse, URLSearchParams>(url, params, {
    headers,
    withCredentials: true,
  });
};

export const getAdminToken = async (): Promise<KeyCloakTokenResponse> => {
  const url = `${KEY_CLOAK_ADMIN_CLI_HOST}/protocol/openid-connect/token`;
  return getToken({
    url,
    clientId: KEY_CLOAK_ADMIN_CLI_CLIENT_ID,
    clientSecret: KEY_CLOAK_ADMIN_CLI_CLIENT_SECRET,
    grantType: GRANT_TYPE.CLIENT_CREDENTIALS,
  });
};

const getAuthorization = (token: KeyCloakTokenResponse): string => {
  const accessToken = token.access_token;
  const tokenType = token.token_type;
  const authorization: string = `${tokenType} ${accessToken}`.trim();
  return authorization;
};

export const refreshAccessToken = async (
  request: ExpressRequest
): Promise<KeyCloakTokenResponse> => {
  const url = `${KEY_CLOAK_EXPRESS_HOST}/protocol/openid-connect/token`;
  const refreshToken = request.cookies['refresh-token'] || '';
  return getToken({
    url,
    clientId: KEY_CLOAK_EXPRESS_CLIENT_ID,
    clientSecret: KEY_CLOAK_EXPRESS_CLIENT_SECRET,
    grantType: GRANT_TYPE.REFRESH_TOKEN,
    refreshToken,
  });
};

export const signIn = async ({
  email,
  password,
}: SignInRequestBody): Promise<KeyCloakTokenResponse> => {
  const url = `${KEY_CLOAK_EXPRESS_HOST}/protocol/openid-connect/token`;
  return getToken({
    url,
    clientId: KEY_CLOAK_EXPRESS_CLIENT_ID,
    clientSecret: KEY_CLOAK_EXPRESS_CLIENT_SECRET,
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
  const masterAdminToken: KeyCloakTokenResponse = await getAdminToken();
  const masterAuthorization: string = getAuthorization(masterAdminToken);
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
  const headers = { authorization: masterAuthorization };
  await axiosPost(signUpURL, postData, { headers });
  // Get Access Token
  const url = `${KEY_CLOAK_EXPRESS_HOST}/protocol/openid-connect/token`;
  return getToken({
    url,
    clientId: KEY_CLOAK_EXPRESS_CLIENT_ID,
    clientSecret: KEY_CLOAK_EXPRESS_CLIENT_SECRET,
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
  const url = `${KEY_CLOAK_EXPRESS_HOST}/protocol/openid-connect/logout`;
  const params = new URLSearchParams();
  params.append('client_id', KEY_CLOAK_EXPRESS_CLIENT_ID);
  params.append('client_secret', KEY_CLOAK_EXPRESS_CLIENT_SECRET);
  params.append('refresh_token', refreshToken);
  const headers = {
    authorization,
    'content-type': CONTENT_TYPE.APPLICATION_URLENCODED,
  };
  try {
    await axiosPost(url, params, { headers });
  } catch (error) {
    console.error(error);
  }
  return { isSignedOut: true };
};
