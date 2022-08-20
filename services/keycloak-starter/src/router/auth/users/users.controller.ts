import { Body, Controller, Post, Route, Tags } from 'tsoa';
import { getUser } from './users.service';
import { User } from './users.types';

@Route('auth/users')
@Tags('Authentication', 'Users')
export class UsersController extends Controller {
  @Post()
  public async getUser(
    @Body() { email }: { email: string }
  ): Promise<{ user: User | null }> {
    return getUser(email);
  }
}
