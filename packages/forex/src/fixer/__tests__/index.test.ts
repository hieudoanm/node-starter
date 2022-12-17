import axios from 'axios';
import { FixerClient } from '..';

describe('FixerClient', () => {
  const fixerClient = new FixerClient({ accessKey: 'accessKey' });

  describe('getLatest', () => {
    it('success', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
      const data = await fixerClient.getLatest();
      expect(data).toEqual({});
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await fixerClient.getLatest();
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });

  describe('getSymbols', () => {
    it('success', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
      const data = await fixerClient.getSymbols();
      expect(data).toEqual({});
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await fixerClient.getSymbols();
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });
});
