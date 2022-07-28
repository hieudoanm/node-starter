import isNil from 'lodash/isNil';
import {
  KEY_CLOAK_ADMIN_CLI_HOST,
  KEY_CLOAK_ADMIN_CLI_CLIENT_ID,
  KEY_CLOAK_ADMIN_CLI_CLIENT_SECRET,
} from '../../configs';
import { CONTENT_TYPE, GRANT_TYPE } from '../../constants';
import { axiosPost } from '../axios';
import { KeyCloakTokenRequest, KeyCloakTokenResponse } from './key-cloak.types';

export const getToken = async ({
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

export const getAuthorization = (token: KeyCloakTokenResponse): string => {
  const accessToken = token.access_token;
  const tokenType = token.token_type;
  const authorization: string = `${tokenType} ${accessToken}`.trim();
  return authorization;
};
