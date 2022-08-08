import { Cluster, clusterApiUrl, Connection, Keypair } from '@solana/web3.js';

export const generateKeypair = (): Keypair => {
  return Keypair.generate();
};

export const getKeypairFromSecretKey = (secretKey: string): Keypair => {
  const secretKeyNumbers: number[] = secretKey
    .split(',')
    .map((number) => parseInt(number, 10));
  return Keypair.fromSecretKey(Uint8Array.from(secretKeyNumbers));
};

export const getConnection = (cluster: Cluster) => {
  return new Connection(clusterApiUrl(cluster));
};
