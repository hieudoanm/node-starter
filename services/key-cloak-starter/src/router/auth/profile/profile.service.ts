import { Request as ExpressRequest } from 'express';
import {
  KEY_CLOAK_ADMIN_HOST,
  KEY_CLOAK_EXPRESS_CLIENT_ID,
  KEY_CLOAK_EXPRESS_CLIENT_SECRET,
  KEY_CLOAK_EXPRESS_HOST,
} from '../../../configs';
import { CONTENT_TYPE, GRANT_TYPE } from '../../../constants';
import { axiosPost } from '../../../libs/axios';
import {
  getAdminToken,
  getAuthorization,
  getToken,
} from '../../../libs/key-cloak';
import { KeyCloakTokenResponse } from '../../../libs/key-cloak/key-cloak.types';
import { SignInRequestBody, SignUpRequestBody } from './profile.types';

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
