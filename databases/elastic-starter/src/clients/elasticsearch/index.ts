import { ElasticSearchClient } from '@turtle/elasticsearch';

const ELASTIC_SEARCH_HOSTS = process.env.ELASTIC_SEARCH_HOSTS || '';

const esClient = new ElasticSearchClient({
  hosts: ELASTIC_SEARCH_HOSTS.split(','),
});

export default esClient;
