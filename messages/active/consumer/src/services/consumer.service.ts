import logger from '@hieudoanm/pino';
import { Stomp } from '../clients/stomp';
import { ACTIVE_MQ_DESTINATION } from '../environments';

export const consumer = (stomp: Stomp) => {
  stomp.subscribe(ACTIVE_MQ_DESTINATION, (message: string) => {
    logger.info(`Message: ${message}`);
  });
};
