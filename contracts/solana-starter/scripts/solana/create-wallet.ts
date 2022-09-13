import infoger from '@turtle/logger';
import {
  generateKeypair,
  getKeypairFromSecretKey,
} from '../../src/libs/solana';

const main = async () => {
  const { publicKey, secretKey } = generateKeypair();
  infoger.info({ publicKey, secretKey });

  infoger.info('publicKey', publicKey);
  infoger.info('publicKey', publicKey.toString());
  infoger.info('publicKey', publicKey.toJSON());

  infoger.info('secretKey', secretKey);
  infoger.info('secretKey', secretKey.toString());

  const keypair = getKeypairFromSecretKey(secretKey.toString());

  infoger.info(keypair);

  process.exit(0);
};

main().catch((error) => infoger.error(error));
