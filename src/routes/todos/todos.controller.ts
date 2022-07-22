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
import { TodoType } from './todos.model';
import { deleteTodo, getTodo, getTodos, updateTodo } from './todos.service';

@Tags('Todos')
@Route('todos')
export class MongoController extends Controller {
  @Get()
  async getTodos(): Promise<TodoType[]> {
    return getTodos();
  }

  @Post()
  async createTodo() {
    return getTodos();
  }

  @Get(':id')
  async getTodo(@Path('id') id: string) {
    return getTodo(id);
  }

  @Put(':id')
  async updateTodo(@Path('id') id: string, @Body() todo: TodoType) {
    return updateTodo(id, todo);
  }

  @Patch(':id')
  async patchTodo(
    @Path('id') id: string,
    @Body() todo: { todo?: string; boolean?: boolean }
  ) {
    return updateTodo(id, todo);
  }

  @Delete(':id')
  async deleteTodo(@Path('id') id: string) {
    return deleteTodo(id);
  }
}
