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
