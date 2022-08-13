import mongoose from 'mongoose';
import { MONGO_URI } from '../../configs';
import logger from '../logger';

export const connect = async () => {
  await mongoose.connect(MONGO_URI);
  logger.info('Mongo is connected');
};
