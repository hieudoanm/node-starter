import ElasticSearchClient from '@hieudoanm/elasticsearch';

const ELASTIC_SEARCH_NODE: string = process.env.ELASTIC_SEARCH_NODE || '';

const esClient = new ElasticSearchClient({ node: ELASTIC_SEARCH_NODE });

export default esClient;
