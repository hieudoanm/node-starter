import { v4 } from 'uuid';
import mongoClient from '../../common/clients/mongo';
import redisClient from '../../common/clients/redis';
import {
  CreateResponse,
  DeleteResponse,
  Todo,
  TodoRequestBody,
  UpdateResponse,
} from './todos.types';

const COLLECTION_NAME = 'todos';
const REDIS_KEY = 'todos';

export const getTodos = async (userId: string): Promise<Todo[]> => {
  const redisKey = `${REDIS_KEY}-${userId}`;
  const cacheTodos = await redisClient.get<Todo[]>(redisKey);
  if (cacheTodos) {
    return cacheTodos;
  }
  const todos = await mongoClient.findMany<Todo>(COLLECTION_NAME, { userId });
  await redisClient.set<Todo[]>(redisKey, todos);
  return todos;
};

export const createTodo = async (
  userId: string,
  todo: Todo
): Promise<CreateResponse> => {
  todo.id = v4();
  const { acknowledged } = await mongoClient.insertOne(COLLECTION_NAME, {
    ...todo,
    userId,
  });
  const redisKey = `${REDIS_KEY}-${userId}`;
  await redisClient.delete(redisKey);
  return { acknowledged };
};

export const getTodo = async (userId: string, id: string): Promise<Todo> => {
  const todo = await mongoClient.findOne<Todo>(COLLECTION_NAME, { userId, id });
  if (todo === null) {
    throw new Error(`${COLLECTION_NAME} Not Found`);
  }
  return todo;
};

export const updateTodo = async (
  userId: string,
  id: string,
  todo: TodoRequestBody
): Promise<UpdateResponse> => {
  const { acknowledged, matchedCount, modifiedCount, upsertedCount } =
    await mongoClient.updateOne<Todo>(COLLECTION_NAME, { userId, id }, todo);
  const redisKey = `${REDIS_KEY}-${userId}`;
  await redisClient.delete(redisKey);
  return { acknowledged, matchedCount, modifiedCount, upsertedCount };
};

export const deleteTodo = async (
  userId: string,
  id: string
): Promise<DeleteResponse> => {
  const { acknowledged, deletedCount } = await mongoClient.deleteOne<Todo>(
    COLLECTION_NAME,
    { userId, id }
  );
  const redisKey = `${REDIS_KEY}-${userId}`;
  await redisClient.delete(redisKey);
  return { acknowledged, deletedCount };
};
