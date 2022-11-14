import { VaultClient } from '@hieudoanm/vault';
import { VAULT_ENDPOINT, VAULT_TOKEN } from '../../environments';

const vault = new VaultClient({ endpoint: VAULT_ENDPOINT, token: VAULT_TOKEN });

export default vault;
