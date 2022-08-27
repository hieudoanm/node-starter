import axios from 'axios';
import { axiosGet } from './index';

jest.mock('axios');

describe('axios', () => {
  describe('get', () => {
    it('should return success', async () => {
      jest
        .spyOn(axios, 'get')
        .mockResolvedValueOnce({ data: { status: 'success' } });
      const data = await axiosGet('https://example.com');
      expect(data).toEqual({ status: 'success' });
    });

    it('should return error', async () => {
      jest
        .spyOn(axios, 'get')
        .mockRejectedValueOnce({ response: { data: { status: 'error' } } });
      try {
        await axiosGet('https://example.com');
      } catch (error) {
        expect(error).toEqual({ status: 'error' });
      }
    });

    it('should return undefined', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce({
        status: 400,
        message: 'error message',
      });
      try {
        await axiosGet('https://example.com');
      } catch (error) {
        expect(error).toEqual({
          status: 400,
          message: 'error message',
        });
      }
    });
  });
});
