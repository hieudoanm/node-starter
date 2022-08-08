import { Cluster } from '@solana/web3.js';

export const SOLANA_CLUSTER: Cluster =
  (process.env.SOLANA_CLUSTER as Cluster) || 'testnet';
