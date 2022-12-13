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

  public receiveMessage(
    params: AWS.SQS.ReceiveMessageRequest,
    callback: (error: AWSError, data: AWS.SQS.ReceiveMessageResult) => void
  ): void {
    this.client.receiveMessage(params, callback);
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

  public async setQueueAttributes(params: AWS.SQS.SetQueueAttributesRequest) {
    return new Promise((resolve, reject) => {
      this.client.setQueueAttributes(params, (error: AWSError, data) => {
        if (error) return reject(error);
        return resolve(data);
      });
    });
  }

  public async createQueue(
    params: AWS.SQS.CreateQueueRequest
  ): Promise<AWS.SQS.CreateQueueResult> {
    return new Promise((resolve, reject) => {
      this.client.createQueue(
        params,
        (error: AWSError, data: AWS.SQS.CreateQueueResult) => {
          if (error) return reject(error);
          return resolve(data);
        }
      );
    });
  }
}
