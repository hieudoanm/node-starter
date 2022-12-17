import axios from 'axios';
import { AirVisualClient } from '..';

describe('AirVisualClient', () => {
  const airVisualClient = new AirVisualClient({ apiKey: '' });

  describe('getCountries', () => {
    it('success', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
      const data = await airVisualClient.getCountries();
      expect(data).toEqual({});
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await airVisualClient.getCountries();
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });

  describe('getStates', () => {
    it('success', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
      const data = await airVisualClient.getStates('country');
      expect(data).toEqual({});
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await airVisualClient.getStates('country');
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });

  describe('getCities', () => {
    it('success', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
      const data = await airVisualClient.getCities('country', 'state');
      expect(data).toEqual({});
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await airVisualClient.getCities('country', 'state');
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });

  describe('getAirQuality', () => {
    it('success', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
      const data = await airVisualClient.getAirQuality(
        'country',
        'state',
        'city'
      );
      expect(data).toEqual({});
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await airVisualClient.getAirQuality('country', 'state', 'city');
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });
});
