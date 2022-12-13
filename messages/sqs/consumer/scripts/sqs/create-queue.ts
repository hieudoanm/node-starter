import logger from '@hieudoanm/pino';
import {} from '../../src/configs';
import { sqs } from '../../src/libs/sqs';

const main = async () => {
  await sqs.createQueue({
    QueueName: 'minh-message-queue-2',
    Attributes: {
      ReceiveMessageWaitTimeSeconds: '20',
    },
  });
};

main().catch((error) => logger.error(error));
