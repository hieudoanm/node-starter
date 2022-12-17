import ElasticSearchClient from '.';

describe('ElasticSearchClient', () => {
  const esClient = new ElasticSearchClient({ node: 'https://localhost:9200' });
  it('init', async () => {
    expect(esClient).toBeTruthy();
  });
});
