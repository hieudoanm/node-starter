import pino, { Logger } from 'pino';
import pretty from 'pino-pretty';

class LoggerClient {
  private logger: Logger;

  constructor() {
    const stream = pretty({ colorize: true });
    this.logger = pino(stream);
  }

  info(message: string, object: unknown = {}) {
    this.logger.info(object, message);
  }

  error(message: string, object: unknown = {}) {
    this.logger.error(object, message);
  }

  debug(message: string, object: unknown = {}) {
    this.logger.debug(object, message);
  }

  warn(message: string, object: unknown = {}) {
    this.logger.warn(object, message);
  }
}

const logger = new LoggerClient();

export default logger;
