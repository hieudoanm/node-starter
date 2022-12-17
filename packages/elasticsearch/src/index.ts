import { Client, ClientOptions } from '@elastic/elasticsearch';
import {
  ClusterHealthResponse,
  IndexResponse,
  IndicesCreateResponse,
  IndicesDeleteResponse,
  QueryDslQueryContainer,
  SearchResponse,
} from '@elastic/elasticsearch/lib/api/types';

class ElasticSearchClient {
  private client: Client;

  constructor(options: ClientOptions) {
    this.client = new Client(options);
  }

  public async healthCheck(): Promise<ClusterHealthResponse> {
    return this.client.cluster.health();
  }

  public async createIndex(index: string): Promise<IndicesCreateResponse> {
    return this.client.indices.create({ index });
  }

  public async deleteIndex(index: string): Promise<IndicesDeleteResponse> {
    return this.client.indices.delete({ index });
  }

  public async addItemToIndex<T>(
    index: string,
    document: T
  ): Promise<IndexResponse> {
    return this.client.index({ index, document });
  }

  public async deleteItemFromIndex(index: string, id: string) {
    return this.client.delete({ index, id });
  }

  public async refresh(index: string) {
    return this.client.indices.refresh({ index });
  }

  public async search(
    index: string,
    query: QueryDslQueryContainer
  ): Promise<SearchResponse> {
    return this.client.search({ index, query });
  }
}

export * from '@elastic/elasticsearch';
export * from '@elastic/elasticsearch/lib/api/types';
export default ElasticSearchClient;
