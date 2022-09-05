import {
  generateKeypair,
  getKeypairFromSecretKey,
} from '../../src/libs/solana';

const main = async () => {
  const { publicKey, secretKey } = generateKeypair();
  console.log({ publicKey, secretKey });

  console.log('publicKey', publicKey);
  console.log('publicKey', publicKey.toString());
  console.log('publicKey', publicKey.toJSON());

  console.log('secretKey', secretKey);
  console.log('secretKey', secretKey.toString());

  const keypair = getKeypairFromSecretKey(secretKey.toString());

  console.log(keypair);

  process.exit(0);
};

main().catch((error) => console.error(error));
