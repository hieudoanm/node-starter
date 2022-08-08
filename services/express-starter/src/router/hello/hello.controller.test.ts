import { HelloController } from './hello.controller';

describe('Hello Controller', () => {
  const helloController = new HelloController();

  it('get', () => {
    expect(helloController.get()).toEqual({ hello: 'world' });
  });

  it('create', () => {
    expect(helloController.create()).toEqual({ hello: 'world' });
  });

  it('update', () => {
    expect(helloController.update()).toEqual({ hello: 'world' });
  });

  it('patch', () => {
    expect(helloController.patch()).toEqual({ hello: 'world' });
  });

  it('remove', () => {
    expect(helloController.remove()).toEqual({ hello: 'world' });
  });
});
