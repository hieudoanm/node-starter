import { DatabaseClient } from '@turtle/mongo';
import { MONGO_URL } from '../../configs';

const mongoClient = new DatabaseClient({
  url: MONGO_URL,
  databaseName: 'starter',
});

export default mongoClient;
