import JWT from '.';

describe('JWT', () => {
  const jwt = new JWT({ secretKey: 'secretKey' });

  it('should work', () => {
    const token = jwt.sign({ username: 'username' });

    const verified = jwt.verify(token);
    expect(verified).toEqual(
      expect.objectContaining({
        username: 'username',
      })
    );

    const decoded = jwt.decode<{ username: string }>(token);
    expect(decoded).toEqual(
      expect.objectContaining({
        username: 'username',
      })
    );
  });
});
