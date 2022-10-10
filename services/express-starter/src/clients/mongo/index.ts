import MongoClient from '@hieudoanm/mongodb';
import { MONGO_URL } from '../../environments';

const mongoClient = new MongoClient(MONGO_URL, 'starter');

export default mongoClient;
