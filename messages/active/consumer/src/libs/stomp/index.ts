import { Stomp } from '../../clients/stomp';
import {
  ACTIVE_MQ_HOST,
  ACTIVE_MQ_PASSWORD,
  ACTIVE_MQ_PORT,
  ACTIVE_MQ_USERNAME,
} from '../../environments';

const connectOptions = {
  host: ACTIVE_MQ_HOST,
  port: ACTIVE_MQ_PORT,
  connectHeaders: {
    host: '/',
    login: ACTIVE_MQ_USERNAME,
    passcode: ACTIVE_MQ_PASSWORD,
    'heart-beat': '5000,5000',
  },
};

export const stomp = new Stomp(connectOptions);

export default stomp;
