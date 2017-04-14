// module
import { CacheOptions } from './models/cache-options';

export abstract class CacheLoader {
  abstract get key(): string;
  abstract get options(): CacheOptions;
}

export class CacheStaticLoader implements CacheLoader {
  constructor(private readonly cacheKey: string = 'NGX_CACHE',
              private readonly cacheOptions: CacheOptions = {
                expiry: Number.MAX_VALUE,
                TTL: Number.MAX_VALUE
              }) {
  }

  get key(): string {
    return this.cacheKey;
  }

  get options(): CacheOptions {
    return this.cacheOptions;
  }
}
