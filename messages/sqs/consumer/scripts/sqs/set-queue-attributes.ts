import logger from '@hieudoanm/pino';
import { SQS_QUEUE_URL } from '../../src/configs';
import { sqs } from '../../src/libs/sqs';

const main = async () => {
  await sqs.setQueueAttributes({
    QueueUrl: SQS_QUEUE_URL,
    Attributes: {
      ReceiveMessageWaitTimeSeconds: '20',
    },
  });
};

main().catch((error) => logger.error(error));
