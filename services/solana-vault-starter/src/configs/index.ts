import { Cluster } from '@solana/web3.js';

export const SOLANA_CLUSTER: Cluster =
  (process.env.SOLANA_CLUSTER as Cluster) || 'testnet';

export const VAULT_ENDPOINT = process.env.VAULT_ENDPOINT || '';
export const VAULT_TOKEN = process.env.VAULT_TOKEN || '';
