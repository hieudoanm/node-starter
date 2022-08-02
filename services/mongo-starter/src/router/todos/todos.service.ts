import { v4 } from 'uuid';
import { TodoModel } from './todos.model';
import { TodoType } from './todos.types';

export const getTodos = async (): Promise<TodoType[]> => {
  return TodoModel.find<TodoType>();
};

export const createTodo = async (todo: string): Promise<TodoType> => {
  const id = v4();
  const newTodo = new TodoModel({ id, todo, status: false });
  await newTodo.save();
  return newTodo as TodoType;
};

export const getTodo = async (id: string): Promise<TodoType> => {
  const todo = await TodoModel.findOne<TodoType>({ id });
  if (!todo) {
    throw new Error('Fail to getTodo');
  }
  return todo;
};

export const updateTodo = async (
  id: string,
  todo: { todo?: string; status?: boolean }
): Promise<TodoType> => {
  const updatedTodo = await TodoModel.findOneAndUpdate<TodoType>(
    { id },
    { $set: todo },
    { new: true }
  );
  if (!updatedTodo) {
    throw new Error('Fail to updateTodo');
  }
  return updatedTodo;
};

export const deleteTodo = async (id: string): Promise<{ deleted: boolean }> => {
  await TodoModel.findOneAndDelete<TodoType>({ id });
  return { deleted: true };
};
