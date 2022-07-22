import { Controller, Delete, Get, Post, Put } from 'tsoa';
import { get, create, update, remove } from './hello.service';

export class HelloController extends Controller {
  @Get()
  get() {
    return get();
  }

  @Post()
  create() {
    return create();
  }

  @Put()
  update() {
    return update();
  }

  @Delete()
  remove() {
    return remove();
  }
}
