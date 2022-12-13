import logger from '@hieudoanm/pino';
import AWS, { AWSError } from 'aws-sdk';
import { SQS_QUEUE_URL } from '../../configs';
import { sqs } from '../../libs/sqs';

export const receiveMessage = () => {
  sqs.receiveMessage(
    { QueueUrl: SQS_QUEUE_URL, WaitTimeSeconds: 10 },
    (error: AWSError, data: AWS.SQS.ReceiveMessageResult) => {
      if (error) {
        logger.error('receiveMessage error', error);
        return;
      }
      logger.info('receiveMessage data', data);

      const messages = data.Messages || [];

      for (const message of messages) {
        logger.info('receiveMessage message', message);
      }
    }
  );
};
