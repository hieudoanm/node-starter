import { deleteTodo, getTodo, getTodos, updateTodo } from './todos.service';

const mockTodo = { id: 'id', todo: 'todo', status: false };

jest.mock('./todos.model', () => {
  const mockTodo = { id: 'id', todo: 'todo', status: false };
  const TodoModel = {
    find: jest.fn().mockResolvedValueOnce([mockTodo]),
    findOne: jest.fn().mockResolvedValueOnce(mockTodo),
    findOneAndUpdate: jest.fn().mockResolvedValueOnce(mockTodo),
    findOneAndDelete: jest.fn().mockResolvedValueOnce(mockTodo),
  };
  return { TodoModel };
});

describe('Todos Service', () => {
  describe('getTodos', () => {
    it('should return todos', async () => {
      const todos = await getTodos();
      expect(todos).toEqual([mockTodo]);
    });
  });

  describe('createTodo', () => {
    return;
  });

  describe('getTodo', () => {
    it('should return todo', async () => {
      const todo = await getTodo('id');
      expect(todo).toEqual(mockTodo);
    });
  });

  describe('updateTodo', () => {
    it('should return updated todo', async () => {
      const todo = await updateTodo('id', { todo: 'todo', status: false });
      expect(todo).toEqual(mockTodo);
    });
  });

  describe('deleteTodo', () => {
    it('should delete todo', async () => {
      const { deleted } = await deleteTodo('id');
      expect(deleted).toEqual(true);
    });
  });
});
