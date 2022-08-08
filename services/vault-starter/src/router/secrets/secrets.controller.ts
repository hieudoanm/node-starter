import { Body, Controller, Post, Route, Tags } from 'tsoa';
import { getSecretAsString, setSecretAsString } from './secrets.service';
import { SecretResponse } from './secrets.types';

@Tags('Secrets')
@Route('secrets')
export class VaultController extends Controller {
  @Post('get')
  public async getSecret(
    @Body() { path }: { path: string }
  ): Promise<SecretResponse> {
    return getSecretAsString(path);
  }

  @Post('set')
  public async setSecret(
    @Body() { path, value }: { path: string; value: string }
  ): Promise<SecretResponse> {
    return setSecretAsString(path, value);
  }
}
