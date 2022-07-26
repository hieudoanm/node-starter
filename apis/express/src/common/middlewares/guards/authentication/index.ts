import { Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { readFileSync } from 'fs';

export const expressAuthentication = (
  request: Request,
  securityName: string,
  scopes: string[] = []
): Promise<{ userId: string }> => {
  if (securityName !== 'jwt')
    return Promise.reject(new Error('Invalid security'));

  const authorization: string = request.headers.authorization || '';

  return new Promise((resolve, reject) => {
    if (!authorization) {
      reject(new Error('Missing authorization'));
    }

    try {
      const cert = readFileSync('./certs/public.pem');
      const token = authorization.replace('Bearer ', '');
      const decoded: JwtPayload = jwt.verify(token, cert) as JwtPayload;
      for (const scope of scopes) {
        if (!decoded.scopes.includes(scope)) {
          reject(new Error('JWT does not contain required scope.'));
        }
      }
      const { sub: userId = '' } = decoded;
      if (!userId) {
        reject(new Error('JWT does not contain required sub.'));
      }

      resolve({ userId });
    } catch (error) {
      reject(error);
    }
  });
};
