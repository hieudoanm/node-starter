import axios from 'axios';
import { VaultClient } from '.';

describe('VaultClient', () => {
  const vaultClient = new VaultClient({ endpoint: '', token: '' });

  describe('getSecret', () => {
    it('success', async () => {
      jest
        .spyOn(axios, 'get')
        .mockResolvedValueOnce({ data: { data: 'secret' } });
      const secret = await vaultClient.getSecret<string>('path');
      expect(secret).toEqual('secret');
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await vaultClient.getSecret('path');
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });

  describe('setSecret', () => {
    it('success', async () => {
      jest
        .spyOn(axios, 'post')
        .mockResolvedValueOnce({ data: { destroyed: true } });
      const destroyed = await vaultClient.setSecret('path', { data: 'secret' });
      expect(destroyed).toEqual(true);
    });

    it('error', async () => {
      jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('error'));
      try {
        await vaultClient.setSecret('path', { data: 'secret' });
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });
});
