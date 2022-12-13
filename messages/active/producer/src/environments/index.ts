export const ACTIVE_MQ_HOST: string = process.env.ACTIVE_MQ_HOST || 'localhost';
export const ACTIVE_MQ_USERNAME: string =
  process.env.ACTIVE_MQ_USERNAME || 'username';
export const ACTIVE_MQ_PASSWORD: string =
  process.env.ACTIVE_MQ_PASSWORD || 'password';
export const ACTIVE_MQ_PORT: number =
  parseInt(process.env.ACTIVE_MQ_PORT || '61613', 10) || 61613;

export const ACTIVE_MQ_DESTINATION: string =
  process.env.ACTIVE_MQ_DESTINATION || '/queue/starter';
