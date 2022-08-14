import { get, create, update, patch, remove } from './hello.service';

describe('Hello Service', () => {
  it('get', () => {
    expect(get()).toEqual({ hello: 'world' });
  });

  it('create', () => {
    expect(create()).toEqual({ hello: 'world' });
  });

  it('update', () => {
    expect(update()).toEqual({ hello: 'world' });
  });

  it('patch', () => {
    expect(patch()).toEqual({ hello: 'world' });
  });

  it('remove', () => {
    expect(remove()).toEqual({ hello: 'world' });
  });
});
