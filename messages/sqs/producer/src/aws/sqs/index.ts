import AWS, { AWSError } from 'aws-sdk';

type SQSConfigs = {
  apiVersion: string;
  region: string;
};

export class SQS {
  private client: AWS.SQS;

  constructor({ apiVersion, region }: SQSConfigs) {
    this.client = new AWS.SQS({ apiVersion, region });
  }

  public async listQueues(
    params: AWS.SQS.ListQueuesRequest
  ): Promise<AWS.SQS.ListQueuesResult> {
    return new Promise((resolve, reject) => {
      this.client.listQueues(
        params,
        (error: AWSError, data: AWS.SQS.ListQueuesResult) => {
          if (error) return reject(error);
          return resolve(data);
        }
      );
    });
  }

  public async sendMessage(
    params: AWS.SQS.SendMessageRequest
  ): Promise<AWS.SQS.SendMessageResult> {
    return new Promise((resolve, reject) => {
      this.client.sendMessage(
        params,
        (error: AWSError, data: AWS.SQS.SendMessageResult) => {
          if (error) return reject(error);
          return resolve(data);
        }
      );
    });
  }

  public async receiveMessage(
    params: AWS.SQS.ReceiveMessageRequest
  ): Promise<AWS.SQS.ReceiveMessageResult> {
    return new Promise((resolve, reject) => {
      this.client.receiveMessage(
        params,
        (error: AWSError, data: AWS.SQS.ReceiveMessageResult) => {
          if (error) reject(error);
          resolve(data);
        }
      );
    });
  }

  public async deleteMessage(
    params: AWS.SQS.DeleteMessageRequest
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.client.deleteMessage(params, (error: AWSError, data) => {
        if (error) return reject(error);
        return resolve(data);
      });
    });
  }
}
