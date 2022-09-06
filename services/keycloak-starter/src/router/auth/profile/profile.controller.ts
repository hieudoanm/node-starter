import { CookieOptions, Request as ExpressRequest } from 'express';
import { Body, Controller, Post, Request, Route, Tags } from 'tsoa';
import { NODE_ENV } from '../../../configs';
import { KeyCloakTokenResponse } from '../../../libs/keycloak/keycloak.types';
import { refreshAccessToken, signIn, signOut, signUp } from './profile.service';
import {
  RefreshTokenResponse,
  SignInRequestBody,
  SignInResponse,
  SignUpRequestBody,
  SignUpResponse,
} from './profile.types';

@Route('auth/profile')
@Tags('Authentication', 'Profile')
export class ProfileController extends Controller {
  private setCookie(key: string, value: string, options: CookieOptions) {
    let cookieOptions = '';
    if (options.secure) cookieOptions += `; Secure`;
    if (options.httpOnly) cookieOptions += '; HttpOnly';
    if (options.path) cookieOptions += `; Path=${options.path}`;
    if (options.maxAge) cookieOptions += `; Max-Age=${options.maxAge}`;
    if (options.sameSite) cookieOptions += `; SameSite=${options.sameSite}`;
    const headerValue = `${key}=${value}${cookieOptions}`;
    this.setHeader('Set-Cookie', headerValue);
  }

  private setRefreshToken(keyCloakResponse: KeyCloakTokenResponse) {
    const refreshToken = keyCloakResponse.refresh_token;
    const refreshExpiresIn = keyCloakResponse.refresh_expires_in;

    this.setCookie('refresh-token', refreshToken, {
      path: '/',
      secure: true,
      httpOnly: true,
      maxAge: refreshExpiresIn,
      sameSite: NODE_ENV === 'production' ? 'strict' : 'none',
    });
  }

  private clearRefreshToken(): void {
    this.setCookie('refresh-token', '', {
      path: '/',
      secure: true,
      httpOnly: true,
      maxAge: 0,
      sameSite: NODE_ENV === 'production' ? 'strict' : 'none',
    });
  }

  @Post('refresh')
  public async refreshAccessToken(
    @Request() request: ExpressRequest
  ): Promise<RefreshTokenResponse> {
    const refreshTokenData = await refreshAccessToken(request);
    const accessToken = refreshTokenData.access_token;
    const expiresIn = refreshTokenData.expires_in;
    const tokenType = refreshTokenData.token_type;
    this.setRefreshToken(refreshTokenData);
    return { accessToken, expiresIn, tokenType };
  }

  @Post('sign-in')
  public async signIn(
    @Body() authRequestBody: SignInRequestBody
  ): Promise<SignInResponse> {
    const signInData: KeyCloakTokenResponse = await signIn(authRequestBody);
    const accessToken = signInData.access_token;
    const expiresIn = signInData.expires_in;
    const tokenType = signInData.token_type;
    this.setRefreshToken(signInData);
    return { accessToken, expiresIn, tokenType };
  }

  @Post('sign-up')
  public async signUp(
    @Body() authRequestBody: SignUpRequestBody
  ): Promise<SignUpResponse> {
    const signUpData: KeyCloakTokenResponse = await signUp(authRequestBody);
    const accessToken = signUpData.access_token;
    const expiresIn = signUpData.expires_in;
    const tokenType = signUpData.token_type;
    this.setRefreshToken(signUpData);
    return { accessToken, expiresIn, tokenType };
  }

  @Post('sign-out')
  public async signOut(
    @Request() request: ExpressRequest
  ): Promise<{ isSignedOut: boolean }> {
    this.clearRefreshToken();
    return signOut(request);
  }
}
