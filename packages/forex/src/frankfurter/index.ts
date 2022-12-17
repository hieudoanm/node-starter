import axios from 'axios';
import {
  CurrenciesResponse,
  FrankfurterLatestRequest,
  FrankfurterLatestResponse,
} from './types';

const BASE_URL = 'https://api.frankfurter.app';

export class FrankfurterClient {
  private async get<T>(url: string): Promise<T> {
    const response = await axios.get<T>(url);
    return response.data;
  }

  public async getLatest(
    { amount = 1, base = 'EUR', to = [] }: FrankfurterLatestRequest = {
      amount: 1,
      base: 'EUR',
      to: [],
    }
  ): Promise<FrankfurterLatestResponse> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('amount', amount.toString());
    urlSearchParams.set('from', base);
    if (to.length > 0) urlSearchParams.set('to', to.join(','));
    const url = `${BASE_URL}/latest?${urlSearchParams.toString()}`;
    return this.get(url);
  }

  public async getCurrencies(): Promise<CurrenciesResponse> {
    const url = `${BASE_URL}/currencies`;
    return this.get(url);
  }
}

export * from './constants';
export * from './types';

export default FrankfurterClient;
