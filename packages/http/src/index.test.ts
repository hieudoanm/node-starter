import axios from 'axios';
import http from '.';

jest.mock('axios');

describe('axios', () => {
  describe('get', () => {
    it('should return success', async () => {
      jest
        .spyOn(axios, 'get')
        .mockResolvedValueOnce({ data: { status: 'success' } });
      const data = await http.get('https://example.com');
      expect(data).toEqual({ status: 'success' });
    });

    it('should return error', async () => {
      jest
        .spyOn(axios, 'get')
        .mockRejectedValueOnce({ message: 'error message' });
      try {
        await http.get('https://example.com', {}, { max: 1 });
      } catch (error) {
        expect((error as Error).message).toEqual('error message');
      }
    });
  });

  describe('post', () => {
    it('should return success', async () => {
      jest
        .spyOn(axios, 'post')
        .mockResolvedValueOnce({ data: { status: 'success' } });
      const data = await http.post('https://example.com');
      expect(data).toEqual({ status: 'success' });
    });

    it('should return error', async () => {
      jest
        .spyOn(axios, 'post')
        .mockRejectedValueOnce({ message: 'error message' });
      try {
        await http.post('https://example.com', {}, {}, { max: 1 });
      } catch (error) {
        expect((error as Error).message).toEqual('error message');
      }
    });
  });

  describe('patch', () => {
    it('should return success', async () => {
      jest
        .spyOn(axios, 'patch')
        .mockResolvedValueOnce({ data: { status: 'success' } });
      const data = await http.patch('https://example.com');
      expect(data).toEqual({ status: 'success' });
    });

    it('should return error', async () => {
      jest
        .spyOn(axios, 'patch')
        .mockRejectedValueOnce({ message: 'error message' });
      try {
        await http.patch('https://example.com', {}, {}, { max: 1 });
      } catch (error) {
        expect((error as Error).message).toEqual('error message');
      }
    });
  });

  describe('put', () => {
    it('should return success', async () => {
      jest
        .spyOn(axios, 'put')
        .mockResolvedValueOnce({ data: { status: 'success' } });
      const data = await http.put('https://example.com');
      expect(data).toEqual({ status: 'success' });
    });

    it('should return error', async () => {
      jest
        .spyOn(axios, 'put')
        .mockRejectedValueOnce({ message: 'error message' });
      try {
        await http.put('https://example.com', {}, {}, { max: 1 });
      } catch (error) {
        expect((error as Error).message).toEqual('error message');
      }
    });
  });

  describe('delete', () => {
    it('should return success', async () => {
      jest
        .spyOn(axios, 'delete')
        .mockResolvedValueOnce({ data: { status: 'success' } });
      const data = await http.delete('https://example.com');
      expect(data).toEqual({ status: 'success' });
    });

    it('should return error', async () => {
      jest
        .spyOn(axios, 'delete')
        .mockRejectedValueOnce({ message: 'error message' });
      try {
        await http.delete('https://example.com', {}, { max: 1 });
      } catch (error) {
        expect((error as Error).message).toEqual('error message');
      }
    });
  });
});
