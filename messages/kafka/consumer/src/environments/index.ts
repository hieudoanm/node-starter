const KAFKA_USERNAME: string = process.env.KAFKA_USERNAME || '';
const KAFKA_PASSWORD: string = process.env.KAFKA_PASSWORD || '';
const KAFKA_BROKERS: string[] = process.env.KAFKA_BROKERS?.split(',') || [];
const KAFKA_CLIENT_ID: string = process.env.KAFKA_CLIENT_ID || '';
const KAFKA_GROUP_ID: string = process.env.KAFKA_GROUP_ID || '';
const KAFKA_TOPIC: string = process.env.KAFKA_TOPIC || '';

export default {
  kafka: {
    username: KAFKA_USERNAME,
    password: KAFKA_PASSWORD,
    brokers: KAFKA_BROKERS,
    clientId: KAFKA_CLIENT_ID,
    groupId: KAFKA_GROUP_ID,
    topic: KAFKA_TOPIC,
  },
};
