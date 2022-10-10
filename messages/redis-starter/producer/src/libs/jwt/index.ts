import JWT from '@hieudoanm/jwt';
import { readFileSync } from 'fs';

const cert = readFileSync('./certs/public.pem');
const jwt = new JWT({ secretKey: cert });

export default jwt;
