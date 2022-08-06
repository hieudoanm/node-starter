import { Controller, Get, Post, Route, Tags } from 'tsoa';
import { createWallet, getWallet } from './wallet.service';

@Tags('Wallet')
@Route('wallet')
export class WalletController extends Controller {
  @Get()
  public async getWallet() {
    return getWallet();
  }

  @Post()
  public async createWallet() {
    return createWallet();
  }
}
