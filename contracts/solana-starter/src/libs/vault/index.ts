import { Vault } from '@turtle/vault';
import { VAULT_ENDPOINT, VAULT_TOKEN } from '../../configs';

const vault = new Vault({ endpoint: VAULT_ENDPOINT, token: VAULT_TOKEN });

export default vault;
