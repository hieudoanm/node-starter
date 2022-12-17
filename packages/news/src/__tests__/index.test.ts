import axios from 'axios';
import { NewsClient, SearchIn } from '..';

describe('NewsClient', () => {
  const newsClient = new NewsClient({ apiKey: '' });

  describe('getSources', () => {
    it('success', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
      const data = await newsClient.getSources({});
      expect(data).toEqual({});
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await newsClient.getSources({});
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });

  describe('getEverything', () => {
    it('success', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
      const data = await newsClient.getEverything();
      expect(data).toEqual({});
    });

    it('success with paramters', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
      const data = await newsClient.getEverything({
        q: 'query',
        domains: ['cnn.com'],
        excludeDomains: ['foxnews.com'],
        sources: ['cnn'],
        from: '2000-01-01',
        to: '2020-01-01',
        searchIn: [SearchIn.TITLE],
      });
      expect(data).toEqual({});
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await newsClient.getEverything({});
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });

  describe('getTopHeadlines', () => {
    it('success', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
      const data = await newsClient.getTopHeadlines({});
      expect(data).toEqual({});
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await newsClient.getTopHeadlines({});
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });
});
