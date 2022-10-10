import {
  Body,
  Controller,
  Get,
  Patch,
  Path,
  Post,
  Request,
  Route,
  Tags,
} from '@hieudoanm/express';
import { Request as ExpressRequest } from 'express';
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
  public async getUserInfo(@Request() request: ExpressRequest) {
    const authorization: string = request.headers.authorization || '';
    return getUserInfo(authorization);
  }

  @Post('sign-up')
  public async signUp(@Body() { username, password }: SignUpRequest) {
    return signUp({ username, password });
  }

  @Post('sign-in')
  public async signIn(@Body() { username, password }: SignInRequest) {
    return signIn({ username, password });
  }

  @Post('refresh-token')
  public async refreshToken(@Request() request: ExpressRequest) {
    const refreshTokenString: string =
      request.headers['refresh_token']?.toString() || '';
    return refreshToken(refreshTokenString);
  }

  @Post('sign-out')
  public async signOut(@Request() request: ExpressRequest) {
    const authorization = request.headers.authorization || '';
    const refreshToken: string =
      request.headers['refresh_token']?.toString() || '';
    return signOut({ authorization, refreshToken });
  }

  @Patch(':id/password')
  public async changePassword(
    @Path() id: string,
    @Body() { password }: { password: string }
  ) {
    return changePassword({ userId: id, newPassword: password });
  }
}
