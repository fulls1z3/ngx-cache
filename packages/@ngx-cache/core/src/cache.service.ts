// angular
import { Inject, Injectable, InjectionToken, Injector, PLATFORM_ID } from '@angular/core';

// module
import { LifeSpan } from './models/life-span';
import { CacheValue } from './models/cache-value';
import { ReturnType } from './models/return-type';
import { Cache } from './cache';
import { CacheLoader } from './cache.loader';

export const CACHE = new InjectionToken<Cache>('CACHE');

@Injectable()
export class CacheService {
  private static instance: CacheService = undefined;

  protected readonly cache: Cache;
  protected readonly lifeSpan: LifeSpan;

  static getInstance(loader?: CacheLoader, platformId?: any, injector?: Injector): CacheService {
    return CacheService.instance;
  }

  static normalizeKey(key: string | number): string {
    if (CacheService.validateKey(key))
      throw new Error('Please provide a valid key to save in the CacheService');

    return `${key}`;
  }

  private static validateKey(key: string | number): boolean {
    return !key
      || typeof key === 'boolean'
      || Number.isNaN(key as number);
  }

  private static validateValue(value: CacheValue): boolean {
    return value.lifeSpan.expiry && value.lifeSpan.expiry > Date.now();
  }

  constructor(public readonly loader: CacheLoader,
              @Inject(PLATFORM_ID) private readonly platformId: any,
              private readonly injector: Injector) {
    CacheService.instance = this;

    this.cache = this.injector.get(CACHE);
    this.lifeSpan = loader.lifeSpan;
  }

  get key(): string {
    return this.loader.key;
  }

  has(key: string | number): boolean {
    key = CacheService.normalizeKey(key);

    return this.cache.keys.indexOf(key) !== -1;
  }

  set(key: string | number, value: any, returnType: ReturnType = ReturnType.Scalar, lifeSpan?: LifeSpan): boolean {
    key = CacheService.normalizeKey(key);
    lifeSpan = lifeSpan || this.lifeSpan;

    return this.cache.setItem(key, {
      data: value,
      returnType,
      lifeSpan: this.parseLifeSpan(lifeSpan)
    });
  }

  get(key: string | number): any {
    key = CacheService.normalizeKey(key);
    const cached = this.cache.getItem(key);
    let res;

    if (cached)
      if (CacheService.validateValue(cached))
        res = cached.data;
      else
        this.remove(key);

    return res;
  }

  getWithMetadata(key: string | number): CacheValue {
    key = CacheService.normalizeKey(key);
    const cached = this.cache.getItem(key);
    let res;

    if (cached)
      if (CacheService.validateValue(cached))
        res = cached;
      else
        this.remove(key);

    return res;
  }

  remove(key: string | number, wild = false): void {
    key = CacheService.normalizeKey(key);

    this.cache.removeItem(key, wild);
  }

  clear(): void {
    this.cache.clear();
  }

  dehydrate(): any {
    const keys = this.cache.keys || [];
    const res = {};

    keys.forEach((key: string) => {
      res[key] = this.cache.getItem(key);
    });

    return res;
  }

  rehydrate(json: any): void {
    Object.keys(json).forEach((key: string) => {
      key = CacheService.normalizeKey(key);
      this.cache.setItem(key, json[key]);
    });
  }

  private parseLifeSpan(lifeSpan: LifeSpan): LifeSpan {
    return {
      expiry: lifeSpan.expiry || (lifeSpan.TTL ? Date.now() + (lifeSpan.TTL * 1000) : this.lifeSpan.expiry),
      TTL: lifeSpan.TTL || this.lifeSpan.TTL
    };
  }
}
