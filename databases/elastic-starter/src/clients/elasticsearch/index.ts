import { ElasticSearchClient } from '@turtle/elasticsearch';

const ELASTIC_SEARCH_NODES = process.env.ELASTIC_SEARCH_NODES || '';

const esClient = new ElasticSearchClient({
  nodes: ELASTIC_SEARCH_NODES.split(','),
});

export default esClient;
