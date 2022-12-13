import logger from '@hieudoanm/pino';
import stompit, { Client } from 'stompit';
import { ConnectOptions } from 'stompit/lib/connect';

export class Stomp {
  private connectOptions: ConnectOptions;
  private client: Client | null = null;

  constructor(connectOptions: ConnectOptions) {
    this.connectOptions = connectOptions;
  }

  public async connect(): Promise<void> {
    this.client = await this.stompConnect();

    this.client.on('error', async (error) => {
      logger.error('STOMP onError', error);
      if (
        error.message === 'connection timed out' ||
        error.message === 'connection ended unexpectedly'
      ) {
        this.client = await this.stompConnect();
      }
    });
  }

  public async stompConnect(): Promise<Client> {
    const { connectOptions } = this;
    return new Promise((resolve, reject) => {
      stompit.connect(connectOptions, (error: Error | null, client: Client) => {
        if (error) {
          logger.error('STOMP Connect Error', error);
          return reject(error);
        }
        logger.info('STOMP is connected');
        resolve(client);
      });
    });
  }

  public async send(
    destination: string,
    message: string,
    contentType = 'text/plain'
  ) {
    if (this.client === null) throw new Error('StompClient is null');

    const sendHeaders = {
      destination,
      'content-type': contentType,
    };

    const frame = this.client.send(sendHeaders);
    frame.write(message);
    frame.end();
  }

  public async subscribe(
    destination: string,
    callback: (body: string) => void
  ) {
    const { client } = this;
    if (client === null) throw new Error('StompClient is null');

    const subscribeHeaders = {
      destination,
      ack: 'client-individual',
    };

    client.subscribe(subscribeHeaders, (error, message) => {
      if (error) {
        logger.error('STOMP Subscribe Error', error);
        return;
      }

      message.readString(
        'utf-8',
        (error: Error | null, body: string | undefined) => {
          if (error) {
            logger.error('STOMP readString Error', error);
            return;
          }
          logger.info('STOMP readString body', body);

          if (body) {
            callback(body);
          }

          client.ack(message);
        }
      );
    });
  }
}

export default Stomp;
