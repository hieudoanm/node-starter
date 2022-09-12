import { Controller, Get, Post, Route, Tags } from 'tsoa';
import {
  getUserInfo,
  refreshToken,
  signIn,
  signOut,
  signUp,
} from './users.service';
import { HelloWorldResponse } from './users.types';

@Tags('Users')
@Route('users')
export class HelloController extends Controller {
  @Get('info')
  public getUserInfo(): HelloWorldResponse {
    return getUserInfo();
  }

  @Post('sign-up')
  public signUp(): HelloWorldResponse {
    return signUp();
  }

  @Post('sign-in')
  public signIn(): HelloWorldResponse {
    return signIn();
  }

  @Post('refresh-token')
  public refreshToken(): HelloWorldResponse {
    return refreshToken();
  }

  @Post('sign-out')
  public signOut(): HelloWorldResponse {
    return signOut();
  }
}
