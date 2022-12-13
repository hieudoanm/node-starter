import logger from '@hieudoanm/pino';
import AWS from 'aws-sdk';
import { SQS_QUEUE_URL } from '../../configs';
import { sqs } from '../../libs/sqs';

export const sendMessage = async (
  message: string
): Promise<AWS.SQS.SendMessageResult> => {
  const result = await sqs.sendMessage({
    MessageBody: message,
    QueueUrl: SQS_QUEUE_URL,
  });
  logger.info('sendMessage result', result);
  return result;
};
