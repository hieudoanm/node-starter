import {
  Body,
  Controller,
  Get,
  Patch,
  Path,
  Post,
  Request,
  Route,
  SuccessResponse,
  Tags,
} from '@hieudoanm/express';
import { Request as ExpressRequest } from 'express';
import {
  KeyCloakAddUserResponse,
  KeyCloakTokenResponse,
} from '../../common/libs/keycloak';
import {
  changePassword,
  getUserInfo,
  refreshToken,
  signIn,
  signOut,
  signUp,
} from './users.service';
import { SignInRequest, SignUpRequest } from './users.types';

@Tags('Users')
@Route('users')
export class HelloController extends Controller {
  @Get('info')
  @SuccessResponse('200', 'User Info')
  public async getUserInfo(@Request() request: ExpressRequest) {
    const authorization: string = request.headers.authorization || '';
    return getUserInfo(authorization);
  }

  @Post('sign-up')
  @SuccessResponse('201', 'New User Info')
  public async signUp(
    @Body() { username, password }: SignUpRequest
  ): Promise<KeyCloakAddUserResponse> {
    return signUp({ username, password });
  }

  @Post('sign-in')
  @SuccessResponse('200', 'User Token')
  public async signIn(
    @Body() { username, password }: SignInRequest
  ): Promise<KeyCloakTokenResponse> {
    return signIn({ username, password });
  }

  @Post('refresh-token')
  @SuccessResponse('200', 'User Token')
  public async refreshToken(
    @Request() request: ExpressRequest
  ): Promise<KeyCloakTokenResponse> {
    const refreshTokenString: string =
      request.headers['refresh_token']?.toString() || '';
    return refreshToken(refreshTokenString);
  }

  @Post('sign-out')
  @SuccessResponse('204', 'No Content')
  public async signOut(@Request() request: ExpressRequest): Promise<void> {
    const authorization = request.headers.authorization || '';
    const refreshToken: string =
      request.headers['refresh_token']?.toString() || '';
    return signOut({ authorization, refreshToken });
  }

  @Patch(':id/password')
  @SuccessResponse('204', 'No Content')
  public async changePassword(
    @Path() id: string,
    @Body() { password }: { password: string }
  ): Promise<void> {
    return changePassword({ userId: id, newPassword: password });
  }
}
