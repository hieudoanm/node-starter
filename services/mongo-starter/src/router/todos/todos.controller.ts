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
  Security,
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
  @Security('jwt')
  @Get()
  async getTodos(): Promise<TodoType[]> {
    return getTodos();
  }

  @Security('jwt')
  @Post()
  async createTodo(@Body() { todo }: { todo: string }): Promise<TodoType> {
    return createTodo(todo);
  }

  @Security('jwt')
  @Get(':id')
  async getTodo(@Path('id') id: string): Promise<TodoType> {
    return getTodo(id);
  }

  @Security('jwt')
  @Put(':id')
  async updateTodo(
    @Path('id') id: string,
    @Body() todo: { todo: string; status: boolean }
  ) {
    return updateTodo(id, todo);
  }

  @Security('jwt')
  @Patch(':id')
  async patchTodo(
    @Path('id') id: string,
    @Body() todo: { todo?: string; status?: boolean }
  ) {
    return updateTodo(id, todo);
  }

  @Security('jwt')
  @Delete(':id')
  async deleteTodo(@Path('id') id: string): Promise<{ deleted: boolean }> {
    return deleteTodo(id);
  }
}
