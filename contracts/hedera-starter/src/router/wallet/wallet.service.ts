import { createAccount } from '../../libs/hedera';
import { getVaultSecret, setVaultSecret } from '../../clients/vault';
import { Wallet, WalletResponse } from './wallet.types';
import logger from '../../libs/logger';

export const getWallet = async (path: string): Promise<WalletResponse> => {
  const { accountId, publicKey, privateKey } = await getVaultSecret<Wallet>(
    path
  );
  logger.info({ privateKey }, 'privateKey');
  // const keypair = getKeypairFromSecretKey(secretKey);
  // if (publicKey !== keypair.publicKey.toString()) {
  //   throw new Error('Invalid Keys');
  // }
  return { accountId, publicKey };
};

export const createWallet = async (path: string): Promise<WalletResponse> => {
  const { accountId, publicKey, privateKey } = await createAccount();

  await setVaultSecret<Wallet>(path, { accountId, publicKey, privateKey });
  return { accountId, publicKey };
};
