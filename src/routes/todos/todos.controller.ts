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
} from 'tsoa';
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
export class MongoController extends Controller {
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
    @Body() todo: { todo: string; status: boolean }
  ) {
    return updateTodo(id, todo);
  }

  @Patch(':id')
  async patchTodo(
    @Path('id') id: string,
    @Body() todo: { todo?: string; status?: boolean }
  ) {
    return updateTodo(id, todo);
  }

  @Delete(':id')
  async deleteTodo(@Path('id') id: string): Promise<{ deleted: boolean }> {
    return deleteTodo(id);
  }
}
