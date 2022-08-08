import logger from '.';

describe('logger', () => {
  it('info', () => {
    logger.info('info');
  });

  it('error', () => {
    logger.error('error');
  });
});
