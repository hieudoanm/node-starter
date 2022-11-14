import { v4 } from 'uuid';
import prisma from '../../libs/prisma';
import { TodoType } from './todos.types';

export const getTodos = async (): Promise<TodoType[]> => {
  return prisma.todo.findMany();
};

export const createTodo = async (todo: string): Promise<TodoType> => {
  const id = v4();
  return prisma.todo.create({ data: { id, todo, status: false } });
};

export const getTodo = async (id: string): Promise<TodoType> => {
  const todo = await prisma.todo.findFirst({ where: { id } });
  if (!todo) {
    throw new Error('Fail to getTodo');
  }
  return todo;
};

export const updateTodo = async (
  id: string,
  { todo, status }: { todo?: string; status?: boolean }
): Promise<TodoType> => {
  return prisma.todo.update({ data: { todo, status }, where: { id } });
};

export const deleteTodo = async (id: string): Promise<TodoType> => {
  return prisma.todo.delete({ where: { id } });
};
