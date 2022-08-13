import { Body, Controller, Post, Route, Tags } from 'tsoa';
import { getCache, setCache } from './cache.service';
import { CacheResponse } from './cache.types';

@Tags('Cache')
@Route('cache')
export class RedisController extends Controller {
  @Post('get')
  public async getCache(
    @Body() { key }: { key: string }
  ): Promise<CacheResponse> {
    return getCache(key);
  }

  @Post('set')
  public async setCache(
    @Body() { key, value }: { key: string; value: string }
  ): Promise<CacheResponse> {
    return setCache(key, value);
  }
}
