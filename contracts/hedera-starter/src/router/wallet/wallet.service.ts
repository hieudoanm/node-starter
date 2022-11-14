import logger from '@hieudoanm/pino';
import { createAccount } from '../../libs/hedera';
import vault from '../../libs/vault';
import { Wallet, WalletResponse } from './wallet.types';

export const getWallet = async (path: string): Promise<WalletResponse> => {
  const { accountId, publicKey, privateKey } = await vault.getSecret<Wallet>(
    path
  );
  logger.info('privateKey', { privateKey });
  // const keypair = getKeypairFromSecretKey(secretKey);
  // if (publicKey !== keypair.publicKey.toString()) {
  //   throw new Error('Invalid Keys');
  // }
  return { accountId, publicKey };
};

export const createWallet = async (path: string): Promise<WalletResponse> => {
  const { accountId, publicKey, privateKey } = await createAccount();

  await vault.setSecret<Wallet>(path, {
    accountId,
    publicKey,
    privateKey,
  });
  return { accountId, publicKey };
};
