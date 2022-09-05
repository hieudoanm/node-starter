import { Request } from 'express';
import { KEY_CLOAK_STARTER_HOST } from '../../configs';
import { axiosGet } from '../../libs/axios';
import logger from '../../libs/logger';

export const expressAuthentication = async (
  request: Request,
  securityName: string,
  scopes: string[]
) => {
  logger.info(scopes, 'scopes');
  if (securityName !== 'jwt') {
    return;
  }

  const authorization: string =
    request.headers['authorization']?.toString() || '';
  const email = request.headers['email'] || '';
  if (!authorization || !email) {
    throw new Error('Missing Token');
  }

  const url = `${KEY_CLOAK_STARTER_HOST}/protocol/openid-connect/userinfo`;
  const headers = { authorization };
  let userInfo;
  try {
    userInfo = await axiosGet<{ email: string }>(url, { headers });
  } catch (error) {
    throw new Error((error as Error).message || 'Unauthorized');
  }

  if (userInfo?.email !== email) {
    throw new Error('Unauthorized');
  }

  logger.info(userInfo, 'email');
};
