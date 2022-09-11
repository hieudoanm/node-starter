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
import {
  CreateResponse,
  DeleteResponse,
  Todo,
  TodoRequestBody,
  UpdateResponse,
} from './todos.types';

@Tags('Todos')
@Route('todos')
export class CacheController extends Controller {
  @Get()
  public async getTodos(): Promise<Todo[]> {
    return getTodos();
  }

  @Post()
  public async createTodo(
    @Body() todo: TodoRequestBody
  ): Promise<CreateResponse> {
    return createTodo(todo);
  }

  @Get(':id')
  public async getTodo(@Path('id') id: string): Promise<Todo> {
    return getTodo(id);
  }

  @Patch(':id')
  public async updateTodo(
    @Path('id') id: string,
    @Body() todo: TodoRequestBody
  ): Promise<UpdateResponse> {
    return updateTodo(id, todo);
  }

  @Put(':id')
  public async patchTodo(
    @Path('id') id: string,
    @Body() todo: TodoRequestBody
  ): Promise<UpdateResponse> {
    return updateTodo(id, todo);
  }

  @Delete(':id')
  public async deleteTodo(@Path('id') id: string): Promise<DeleteResponse> {
    return deleteTodo(id);
  }
}
