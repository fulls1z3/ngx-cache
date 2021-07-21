import { Inject, Injectable, InjectionToken, Injector, PLATFORM_ID } from '@angular/core';

import { Cache } from './cache';
import { CacheLoader } from './cache.loader';
import { CacheValue } from './models/cache-value';
import { LifeSpan } from './models/life-span';
import { ReturnType } from './models/return-type';

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
    if (CacheService.validateKey(key)) {
      throw new Error('Please provide a valid key to save in the CacheService');
    }

    return `${key}`;
  }

  private static validateKey(key: string | number): boolean {
    return !key || typeof key === 'boolean' || Number.isNaN(key as number);
  }

  private static validateValue(value: CacheValue): boolean {
    return value.lifeSpan.expiry && value.lifeSpan.expiry > Date.now();
  }

  constructor(
    readonly loader: CacheLoader,
    @Inject(PLATFORM_ID) private readonly platformId: any,
    private readonly injector: Injector
  ) {
    CacheService.instance = this;

    this.cache = this.injector.get(CACHE);
    this.lifeSpan = loader.lifeSpan;
  }

  get key(): string {
    return this.loader.key;
  }

  has(key: string | number): boolean {
    const normalized = CacheService.normalizeKey(key);

    return this.cache.keys.indexOf(normalized) !== -1 && CacheService.validateValue(this.cache.getItem(normalized));
  }

  set(key: string | number, value: any, returnType: ReturnType = ReturnType.Scalar, lifeSpan?: LifeSpan): boolean {
    const normalized = CacheService.normalizeKey(key);

    return this.cache.setItem(normalized, {
      data: value,
      returnType,
      lifeSpan: this.parseLifeSpan(lifeSpan ? lifeSpan : this.lifeSpan)
    });
  }

  get(key: string | number): any {
    const normalized = CacheService.normalizeKey(key);
    const cached = this.cache.getItem(normalized);

    if (Object.entries(cached).length !== 0 && cached.constructor === Object) {
      if (CacheService.validateValue(cached)) {
        return cached.data;
      }

      this.remove(normalized);
    }

    return undefined;
  }

  getWithMetadata(key: string | number): CacheValue | undefined {
    const normalized = CacheService.normalizeKey(key);
    const cached = this.cache.getItem(normalized);

    if (Object.entries(cached).length !== 0 && cached.constructor === Object) {
      if (CacheService.validateValue(cached)) {
        return cached;
      }

      this.remove(key);
    }

    return undefined;
  }

  remove(key: string | number, wild = false): void {
    const normalized = CacheService.normalizeKey(key);

    this.cache.removeItem(normalized, wild);
  }

  clear(): void {
    this.cache.clear();
  }

  dehydrate(): any {
    const keys = this.cache.keys.length ? this.cache.keys : [];
    const res = {};

    keys.forEach((key: string) => {
      res[key] = this.cache.getItem(key);
    });

    return res;
  }

  rehydrate(json: any): void {
    Object.keys(json).forEach((key: string) => {
      const normalized = CacheService.normalizeKey(key);
      this.cache.setItem(normalized, json[normalized]);
    });
  }

  private parseLifeSpan(lifeSpan: LifeSpan): LifeSpan {
    return {
      expiry: lifeSpan.expiry || (lifeSpan.TTL ? Date.now() + lifeSpan.TTL * 1000 : this.lifeSpan.expiry),
      TTL: lifeSpan.TTL || this.lifeSpan.TTL
    };
  }
}
