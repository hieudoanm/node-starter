import jwt, {
  DecodeOptions,
  Jwt,
  JwtPayload,
  Secret,
  SignOptions,
  VerifyOptions,
} from 'jsonwebtoken';

class JWT {
  private secretKey: Secret;

  constructor({ secretKey = '' }: { secretKey: Secret } = { secretKey: '' }) {
    this.secretKey = secretKey;
  }

  sign(
    payload: string | object | Buffer,
    options?: SignOptions | undefined
  ): string {
    return jwt.sign(payload, this.secretKey, options);
  }

  public verify(
    token: string,
    options?: VerifyOptions
  ): string | Jwt | JwtPayload {
    return jwt.verify(token, this.secretKey, options);
  }

  public decode<T>(
    token: string,
    options?: DecodeOptions
  ): T | string | JwtPayload | T | null {
    return jwt.decode(token, options);
  }
}

export * from 'jsonwebtoken';
export default JWT;
