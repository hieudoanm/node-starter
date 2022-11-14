import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Put,
  Route,
  Tags,
} from '@hieudoanm/express';
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from './todos.service';
import { TodoType } from './todos.types';

@Tags('Todos')
@Route('todos')
export class PostgresController extends Controller {
  @Get()
  async getTodos(): Promise<TodoType[]> {
    return getTodos();
  }

  @Post()
  async createTodo(@Body() { todo }: { todo: string }): Promise<TodoType> {
    return createTodo(todo);
  }

  @Get(':id')
  async getTodo(@Path('id') id: string): Promise<TodoType> {
    return getTodo(id);
  }

  @Put(':id')
  async updateTodo(
    @Path('id') id: string,
    @Body() { todo, status }: { todo: string; status: boolean }
  ): Promise<TodoType> {
    return updateTodo(id, { todo, status });
  }

  @Patch(':id')
  async patchTodo(
    @Path('id') id: string,
    @Body() { todo, status }: { todo?: string; status?: boolean }
  ): Promise<TodoType> {
    return updateTodo(id, { todo, status });
  }

  @Delete(':id')
  async deleteTodo(@Path('id') id: string): Promise<TodoType> {
    return deleteTodo(id);
  }
}
