import axios from 'axios';
import { WeatherClient } from '..';

describe('WeatherClient', () => {
  const weatherClient = new WeatherClient({ apiKey: '' });

  describe('getWeather', () => {
    it('success', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
      const data = await weatherClient.getWeather('city');
      expect(data).toEqual({});
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await weatherClient.getWeather('city');
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });
});
