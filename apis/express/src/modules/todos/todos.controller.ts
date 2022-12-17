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
  SuccessResponse,
  Tags,
} from '@hieudoanm/fast';
import { Request as ExRequest } from 'express';
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

type UserRequest = { user?: { userId?: string } };

@Tags('Todos')
@Route('todos')
export class TodosController extends Controller {
  @Security('jwt')
  @Get()
  @SuccessResponse('200', 'List of Todos')
  public async getTodos(
    @Request() request: ExRequest & UserRequest
  ): Promise<Todo[]> {
    const userId: string = request.user?.userId || '';
    return getTodos(userId);
  }

  @Security('jwt')
  @Post()
  @SuccessResponse('201', 'New Todo')
  public async createTodo(
    @Request() request: ExRequest & UserRequest,
    @Body() { title = '', description = '', completed = false }: TodoRequestBody
  ): Promise<CreateResponse> {
    const userId: string = request.user?.userId || '';
    return createTodo(userId, { title, description, completed });
  }

  @Security('jwt')
  @Get(':id')
  @SuccessResponse('200', 'Get Todo by ID')
  public async getTodo(
    @Request() request: ExRequest & UserRequest,
    @Path('id') id: string
  ): Promise<Todo> {
    const userId: string = request.user?.userId || '';
    return getTodo(userId, id);
  }

  @Security('jwt')
  @Patch(':id')
  @SuccessResponse('200', 'Updated Todo')
  public async updateTodo(
    @Request() request: ExRequest & UserRequest,
    @Path('id') id: string,
    @Body() todo: TodoRequestBody
  ): Promise<UpdateResponse> {
    const userId: string = request.user?.userId || '';
    return updateTodo(userId, id, todo);
  }

  @Security('jwt')
  @Put(':id')
  @SuccessResponse('200', 'Updated Todo')
  public async patchTodo(
    @Request() request: ExRequest & UserRequest,
    @Path('id') id: string,
    @Body() todo: TodoRequestBody
  ): Promise<UpdateResponse> {
    const userId: string = request.user?.userId || '';
    return updateTodo(userId, id, todo);
  }

  @Security('jwt')
  @Delete(':id')
  @SuccessResponse('200', 'Deleted Response')
  public async deleteTodo(
    @Request() request: ExRequest & UserRequest,
    @Path('id') id: string
  ): Promise<DeleteResponse> {
    const userId: string = request.user?.userId || '';
    return deleteTodo(userId, id);
  }
}
