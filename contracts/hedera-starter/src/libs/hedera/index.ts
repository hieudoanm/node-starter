import {
  AccountCreateTransaction,
  AccountId,
  Client,
  Hbar,
  PrivateKey,
  Transaction,
  TransactionReceipt,
  TransactionResponse,
} from '@hashgraph/sdk';
import { TREASURY_ACCOUNT_ID, TREASURY_PRIVATE_KEY } from '../../configs';
import { Wallet } from '../../router/wallet/wallet.types';

let client: Client | null = null;

export const getClient = (): Client => {
  if (!TREASURY_ACCOUNT_ID || !TREASURY_PRIVATE_KEY) {
    throw new Error(
      'Environment variables TREASURY_ACCOUNT_ID and TREASURY_PRIVATE_KEY must be present'
    );
  }

  if (client !== null) {
    return client;
  }

  client = Client.forTestnet();
  client.setOperator(TREASURY_ACCOUNT_ID, TREASURY_PRIVATE_KEY);

  return client;
};

export default getClient;

export const createAccount = async (): Promise<Wallet> => {
  if (client === null) {
    client = getClient();
  }

  const privateKey = PrivateKey.generateED25519();
  const { publicKey } = privateKey;

  const transaction: Transaction = new AccountCreateTransaction()
    .setKey(publicKey)
    .setInitialBalance(Hbar.fromTinybars(0));

  const transactionResponse: TransactionResponse = await transaction.execute(
    client
  );

  const transactionReceipt: TransactionReceipt =
    await transactionResponse.getReceipt(client);

  const accountId: AccountId | string =
    transactionReceipt.accountId?.toString() || '';

  return {
    accountId: accountId.toString(),
    privateKey: privateKey.toStringRaw(),
    publicKey: publicKey.toStringRaw(),
  };
};
