import apollo, { mergeResolvers, mergeTypeDefs } from '.';

describe('apollo', () => {
  it('should be truthy', () => {
    const apolloServer = apollo();
    expect(apolloServer).toBeTruthy();
  });

  it('should be truthy for production', () => {
    const apolloServer = apollo({ environment: 'production' });
    expect(apolloServer).toBeTruthy();
  });

  describe('merge', () => {
    it('should be truthy', () => {
      expect(mergeResolvers).toBeTruthy();
      expect(mergeTypeDefs).toBeTruthy();
    });
  });
});
