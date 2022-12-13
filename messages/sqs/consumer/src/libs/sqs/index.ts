import { SQS } from '../../aws/sqs';
import { SQS_API_VERSION, SQS_REGION } from '../../configs';

export const sqs = new SQS({ region: SQS_REGION, apiVersion: SQS_API_VERSION });
