import { addZero } from '.';

describe('addZero', () => {
  it('should add zero', () => {
    expect(addZero(0)).toEqual('00');
  });

  it('should not add zero', () => {
    expect(addZero(10)).toEqual('10');
  });
});
