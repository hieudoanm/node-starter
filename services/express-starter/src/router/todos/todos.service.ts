import { v4 } from 'uuid';
import mongoClient from '../../clients/mongo';
import redisClient from '../../clients/redis';
import {
  CreateResponse,
  DeleteResponse,
  Todo,
  TodoRequestBody,
  UpdateResponse,
} from './todos.types';

const COLLECTION_NAME = 'todos';
const REDIS_KEY = 'todos';

export const getTodos = async (): Promise<Todo[]> => {
  const cacheTodos = await redisClient.get<Todo[]>(REDIS_KEY);
  if (cacheTodos) {
    return cacheTodos;
  }
  const todos = await mongoClient.findMany<Todo>(COLLECTION_NAME);
  await redisClient.set<Todo[]>(REDIS_KEY, todos);
  return todos;
};

export const createTodo = async (todo: Todo): Promise<CreateResponse> => {
  todo.id = v4();
  const { acknowledged } = await mongoClient.insertOne(COLLECTION_NAME, todo);
  await redisClient.delete(REDIS_KEY);
  return { acknowledged };
};

export const getTodo = async (id: string): Promise<Todo> => {
  const todo = await mongoClient.findOne<Todo>(COLLECTION_NAME, { id });
  if (todo === null) {
    throw new Error(`${COLLECTION_NAME} Not Found`);
  }
  return todo;
};

export const updateTodo = async (
  id: string,
  todo: TodoRequestBody
): Promise<UpdateResponse> => {
  const { acknowledged, matchedCount, modifiedCount, upsertedCount } =
    await mongoClient.updateOne<Todo>(COLLECTION_NAME, { id }, todo);
  await redisClient.delete(REDIS_KEY);
  return { acknowledged, matchedCount, modifiedCount, upsertedCount };
};

export const deleteTodo = async (id: string): Promise<DeleteResponse> => {
  const { acknowledged, deletedCount } = await mongoClient.deleteOne<Todo>(
    COLLECTION_NAME,
    { id }
  );
  await redisClient.delete(REDIS_KEY);
  return { acknowledged, deletedCount };
};
