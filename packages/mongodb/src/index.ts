import {
  BulkWriteOptions,
  Collection,
  DeleteOptions,
  DeleteResult,
  Document,
  Filter,
  FindOptions,
  InsertManyResult,
  InsertOneOptions,
  InsertOneResult,
  MatchKeysAndValues,
  MongoClient,
  MongoClientOptions,
  OptionalUnlessRequiredId,
  UpdateOptions,
  UpdateResult,
  WithId,
} from 'mongodb';

class MongoDBCLient {
  private client: MongoClient;
  private databaseName: string;

  constructor(url: string, databaseName: string, options?: MongoClientOptions) {
    this.client = new MongoClient(url, options);
    this.databaseName = databaseName;
  }

  public async connect(): Promise<MongoClient> {
    return this.client.connect();
  }

  private getCollection<T extends Document = Document>(
    name: string
  ): Collection<T> {
    const db = this.client.db(this.databaseName);
    return db.collection<T>(name);
  }

  public async findOne<T extends Document = Document>(
    collectionName: string,
    query: Filter<T> = {},
    options: FindOptions<T> = {}
  ): Promise<WithId<T> | null> {
    const collection = this.getCollection<T>(collectionName);
    return collection.findOne(query, options);
  }

  public async findMany<T extends Document = Document>(
    collectionName: string,
    query: Filter<T> = {},
    options: FindOptions<T> = {}
  ): Promise<WithId<T>[]> {
    const collection = this.getCollection<T>(collectionName);
    return collection.find(query, options).toArray();
  }

  public async insertOne<T extends Document = Document>(
    collectionName: string,
    doc: OptionalUnlessRequiredId<T>,
    options: InsertOneOptions = {}
  ): Promise<InsertOneResult<T>> {
    const collection = this.getCollection<T>(collectionName);
    return collection.insertOne(doc, options);
  }

  public async insertMany<T extends Document = Document>(
    collectionName: string,
    docs: OptionalUnlessRequiredId<T>[],
    options: BulkWriteOptions = {}
  ): Promise<InsertManyResult<T>> {
    const collection = this.getCollection<T>(collectionName);
    return collection.insertMany(docs, options);
  }

  public async updateOne<T extends Document = Document>(
    collectionName: string,
    query: Filter<T> = {},
    updateBody: MatchKeysAndValues<T>,
    options: UpdateOptions = {}
  ): Promise<Document | UpdateResult> {
    const collection = this.getCollection<T>(collectionName);
    return collection.updateOne(query, { $set: updateBody }, options);
  }

  public async updateMany<T extends Document = Document>(
    collectionName: string,
    query: Filter<T> = {},
    updateBody: MatchKeysAndValues<T>,
    options: UpdateOptions = {}
  ): Promise<Document | UpdateResult> {
    const collection = this.getCollection<T>(collectionName);
    return collection.updateMany(query, { $set: updateBody }, options);
  }

  public async deleteOne<T extends Document = Document>(
    collectionName: string,
    query: Filter<T> = {},
    options: DeleteOptions = {}
  ): Promise<DeleteResult> {
    const collection = this.getCollection(collectionName);
    return collection.deleteOne(query, options);
  }

  public async deleteMany<T extends Document = Document>(
    collectionName: string,
    query: Filter<T> = {},
    options: DeleteOptions = {}
  ): Promise<DeleteResult> {
    const collection = this.getCollection(collectionName);
    return collection.deleteMany(query, options);
  }
}

export * from 'mongodb';
export default MongoDBCLient;
