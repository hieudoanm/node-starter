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
  MongoServerError,
  OptionalUnlessRequiredId,
  UpdateOptions,
  UpdateResult,
  WithId,
} from 'mongodb';

export class DatabaseClient {
  private client: MongoClient;
  private databaseName: string;

  constructor({ url, databaseName }: { url: string; databaseName: string }) {
    this.client = new MongoClient(url);
    this.databaseName = databaseName;
  }

  public async connect(): Promise<void> {
    try {
      await this.client.connect();
      console.info('MongoDB connect successfully');
    } catch (error) {
      if (error instanceof MongoServerError) {
        console.error('MongoServerError', error);
      }
      throw error;
    }
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
    try {
      const collection = this.getCollection<T>(collectionName);
      return collection.findOne(query, options);
    } catch (error) {
      if (error instanceof MongoServerError) {
        console.error('MongoServerError', error);
      }
      throw error;
    }
  }

  public async findMany<T extends Document = Document>(
    collectionName: string,
    query: Filter<T> = {},
    options: FindOptions<T> = {}
  ): Promise<WithId<T>[]> {
    try {
      const collection = this.getCollection<T>(collectionName);
      return collection.find(query, options).toArray();
    } catch (error) {
      if (error instanceof MongoServerError) {
        console.error('MongoServerError find', error);
      }
      throw error;
    }
  }

  public async insertOne<T extends Document = Document>(
    collectionName: string,
    doc: OptionalUnlessRequiredId<T>,
    options: InsertOneOptions = {}
  ): Promise<InsertOneResult<T>> {
    try {
      const collection = this.getCollection<T>(collectionName);
      return collection.insertOne(doc, options);
    } catch (error) {
      if (error instanceof MongoServerError) {
        console.error('MongoServerError insertOne', error);
      }
      throw error;
    }
  }

  public async insertMany<T extends Document = Document>(
    collectionName: string,
    docs: OptionalUnlessRequiredId<T>[],
    options: BulkWriteOptions = {}
  ): Promise<InsertManyResult<T>> {
    try {
      const collection = this.getCollection<T>(collectionName);
      return collection.insertMany(docs, options);
    } catch (error) {
      if (error instanceof MongoServerError) {
        console.error('MongoServerError insertMany', error);
      }
      throw error;
    }
  }

  public async updateOne<T extends Document = Document>(
    collectionName: string,
    query: Filter<T> = {},
    updateBody: MatchKeysAndValues<T>,
    options: UpdateOptions = {}
  ): Promise<Document | UpdateResult> {
    try {
      const collection = this.getCollection<T>(collectionName);
      return collection.updateOne(query, { $set: updateBody }, options);
    } catch (error) {
      if (error instanceof MongoServerError) {
        console.error('MongoServerError updateOne', error);
      }
      throw error;
    }
  }

  public async updateMany<T extends Document = Document>(
    collectionName: string,
    query: Filter<T> = {},
    updateBody: MatchKeysAndValues<T>,
    options: UpdateOptions = {}
  ): Promise<Document | UpdateResult> {
    try {
      const collection = this.getCollection<T>(collectionName);
      return collection.updateMany(query, { $set: updateBody }, options);
    } catch (error) {
      if (error instanceof MongoServerError) {
        console.error('MongoServerError updateMany', error);
      }
      throw error;
    }
  }

  public async deleteOne<T extends Document = Document>(
    collectionName: string,
    query: Filter<T> = {},
    options: DeleteOptions = {}
  ): Promise<DeleteResult> {
    try {
      const collection = this.getCollection(collectionName);
      return collection.deleteOne(query, options);
    } catch (error) {
      if (error instanceof MongoServerError) {
        console.error('MongoServerError deleteOne', error);
      }
      throw error;
    }
  }

  public async deleteMany<T extends Document = Document>(
    collectionName: string,
    query: Filter<T> = {},
    options: DeleteOptions = {}
  ): Promise<DeleteResult> {
    try {
      const collection = this.getCollection(collectionName);
      return collection.deleteMany(query, options);
    } catch (error) {
      if (error instanceof MongoServerError) {
        console.error('MongoServerError deleteMany', error);
      }
      throw error;
    }
  }
}
