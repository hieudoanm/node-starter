import { TodoModel, TodoType } from './todos.model';

export const getTodos = async (): Promise<TodoType[]> => {
  const todos: TodoType[] = await TodoModel.find();
  return todos;
};

export const createTodo = async ({
  todo,
  status,
}: {
  todo: string;
  status: string;
}) => {
  const newTodo = new TodoModel({ todo, status });
  await newTodo.save();
  return newTodo as TodoType;
};

export const getTodo = async (id: string) => {
  return TodoModel.findById(id);
};

export const updateTodo = async (
  id: string,
  todo: { todo?: string; status?: boolean }
) => {
  const updatedTodo = await TodoModel.findByIdAndUpdate(id, { $set: todo });
  return updatedTodo;
};

export const deleteTodo = async (id: string) => {
  await TodoModel.findByIdAndDelete(id);
  return '';
};
