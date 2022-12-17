import logger from '.';

describe('logger', () => {
  it('info', () => {
    logger.info('info');
  });

  it('error', () => {
    logger.error('error');
  });

  it('debug', () => {
    logger.debug('debug');
  });

  it('warn', () => {
    logger.warn('warn');
  });
});
