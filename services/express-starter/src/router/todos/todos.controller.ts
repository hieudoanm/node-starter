import { Request as ExRequest } from 'express';
import get from 'lodash/get';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Put,
  Request,
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
import {
  CreateResponse,
  DeleteResponse,
  Todo,
  TodoRequestBody,
  UpdateResponse,
} from './todos.types';

@Tags('Todos')
@Route('todos')
export class TodosController extends Controller {
  @Security('jwt')
  @Get()
  public async getTodos(@Request() request: ExRequest): Promise<Todo[]> {
    const userId: string = get(request, 'user.userId', '');
    return getTodos(userId);
  }

  @Security('jwt')
  @Post()
  public async createTodo(
    @Request() request: ExRequest,
    @Body() { title = '', description = '', completed = false }: TodoRequestBody
  ): Promise<CreateResponse> {
    const userId: string = get(request, 'user.userId', '');
    return createTodo(userId, { title, description, completed });
  }

  @Security('jwt')
  @Get(':id')
  public async getTodo(
    @Request() request: ExRequest,
    @Path('id') id: string
  ): Promise<Todo> {
    const userId: string = get(request, 'user.userId', '');
    return getTodo(userId, id);
  }

  @Security('jwt')
  @Patch(':id')
  public async updateTodo(
    @Request() request: ExRequest,
    @Path('id') id: string,
    @Body() todo: TodoRequestBody
  ): Promise<UpdateResponse> {
    const userId: string = get(request, 'user.userId', '');
    return updateTodo(userId, id, todo);
  }

  @Security('jwt')
  @Put(':id')
  public async patchTodo(
    @Request() request: ExRequest,
    @Path('id') id: string,
    @Body() todo: TodoRequestBody
  ): Promise<UpdateResponse> {
    const userId: string = get(request, 'user.userId', '');
    return updateTodo(userId, id, todo);
  }

  @Security('jwt')
  @Delete(':id')
  public async deleteTodo(
    @Request() request: ExRequest,
    @Path('id') id: string
  ): Promise<DeleteResponse> {
    const userId: string = get(request, 'user.userId', '');
    return deleteTodo(userId, id);
  }
}
