import { generateKeypair, getKeypairFromSecretKey } from '../../libs/solana';
import vault from '../../libs/vault';
import { Wallet, WalletResponse } from './wallet.types';

export const getWallet = async (path: string): Promise<WalletResponse> => {
  const { publicKey, secretKey } = await vault.getSecret<Wallet>(path);
  const keypair = getKeypairFromSecretKey(secretKey);
  if (publicKey !== keypair.publicKey.toString()) {
    throw new Error('Invalid Keys');
  }
  return { publicKey };
};

export const createWallet = async (path: string): Promise<WalletResponse> => {
  const keypair = generateKeypair();
  const publicKey: string = keypair.publicKey.toString();
  const secretKey: string = keypair.secretKey.toString();
  await vault.setSecret<Wallet>(path, {
    publicKey,
    secretKey,
  });
  return { publicKey };
};
