import { Controller, Delete, Get, Patch, Post, Put, Route, Tags } from 'tsoa';
import { create, get, patch, remove, update } from './hello.service';
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

  @Patch()
  public patch(): HelloWorldResponse {
    return patch();
  }

  @Delete()
  public remove(): HelloWorldResponse {
    return remove();
  }
}
