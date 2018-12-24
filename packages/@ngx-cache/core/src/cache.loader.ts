import { CacheSettings } from './models/cache-settings';
import { LifeSpan } from './models/life-span';

export abstract class CacheLoader {
  abstract get key(): string;

  abstract get lifeSpan(): LifeSpan;
}

export class CacheStaticLoader implements CacheLoader {
  get key(): string {
    return this.providedSettings.key;
  }

  get lifeSpan(): LifeSpan {
    return this.providedSettings.lifeSpan;
  }

  constructor(
    private readonly providedSettings: CacheSettings = {
      key: 'NGX_CACHE',
      lifeSpan: {
        expiry: Number.MAX_VALUE,
        TTL: Number.MAX_VALUE
      }
    }
  ) {}
}
