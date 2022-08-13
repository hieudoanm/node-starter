import { Body, Controller, Get, Post, Query, Route, Tags } from 'tsoa';

import { createWallet, getWallet } from './wallet.service';
import { WalletResponse } from './wallet.types';

@Tags('Wallet')
@Route('wallet')
export class WalletController extends Controller {
  @Get()
  public async getWallet(
    @Query('email') path: string
  ): Promise<WalletResponse> {
    return getWallet(path);
  }

  @Post()
  public async createWallet(
    @Body() { email }: { email: string }
  ): Promise<WalletResponse> {
    return createWallet(email);
  }
}
