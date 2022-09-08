import logger from '@turtle/logger';
import mongoose from 'mongoose';
import { MONGO_URI } from '../../configs';

export const connect = async () => {
  await mongoose.connect(MONGO_URI);
  logger.info('Mongo is connected');
};
