import { Controller, Delete, Get, Post, Put, Route, Tags } from 'tsoa';
import { get, create, update, remove } from './hello.service';
import { HelloWorldResponse } from './hello.types';

@Route('hello')
@Tags('Hello World')
export class HelloController extends Controller {
  @Get()
  public get(): HelloWorldResponse {
    return get();
  }

  @Post()
  public create(): HelloWorldResponse {
    return create();
  }

  @Put()
  public update(): HelloWorldResponse {
    return update();
  }

  @Delete()
  public remove(): HelloWorldResponse {
    return remove();
  }
}
