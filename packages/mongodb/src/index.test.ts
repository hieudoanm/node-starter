import MongoClient from '.';

describe('MongoClient', () => {
  const mongoClient = new MongoClient(
    'mongodb://localhost:27017',
    'databaseName'
  );
  it('init', async () => {
    expect(mongoClient).toBeTruthy();
  });
});
