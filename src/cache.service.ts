// angular
import { Inject, Injectable, Injector, InjectionToken, PLATFORM_ID } from '@angular/core';

// module
import { CacheOptions } from './models/cache-options';
import { CacheValue } from './models/cache-value';
import { ReturnType } from './models/return-type';
import { Cache } from './cache';
import { CacheLoader } from './cache.loader';

export const CACHE = new InjectionToken<Cache>('CACHE');

@Injectable()
export class CacheService {
  private static instance: CacheService = undefined;

  private readonly cache: Cache;
  private readonly options: CacheOptions;

  public static getInstance(loader?: CacheLoader, platformId?: any, injector?: Injector): CacheService {
    return CacheService.instance;
  }

  public static normalizeKey(key: string | number): string {
    if (CacheService.validateKey(key))
      throw new Error('Please provide a valid key to save in the CacheService');

    return key + '';
  }

  private static validateKey(key: string | number): boolean {
    return !key
      || typeof key === 'boolean'
      || Number.isNaN(<number>key);
  }

  private static validateValue(value: CacheValue): boolean {
    return !!value.options.expiry && value.options.expiry > Date.now();
  }

  constructor(public loader: CacheLoader,
              @Inject(PLATFORM_ID) private readonly platformId: any,
              private readonly injector: Injector) {
    CacheService.instance = this;

    this.cache = this.injector.get(CACHE);
    this.options = loader.options;
  }

  get key(): string {
    return this.loader.key;
  }

  has(key: string | number): boolean {
    key = CacheService.normalizeKey(key);

    return this.cache.keys.indexOf(key) !== -1;
  }

  set(key: string | number, value: any, returnType: ReturnType = ReturnType.Scalar, options?: CacheOptions): boolean {
    key = CacheService.normalizeKey(key);
    options = options || this.options;

    return this.cache.setItem(key, {
      data: value,
      returnType: returnType,
      options: this.parseOptions(options)
    });
  }

  get(key: string | number): any {
    key = CacheService.normalizeKey(key);
    const cached = this.cache.getItem(key);
    let res = undefined;

    if (!!cached)
      if (CacheService.validateValue(cached))
        res = cached.data;
      else
        this.remove(key);

    return res;
  }

  getWithMetadata(key: string | number): CacheValue {
    key = CacheService.normalizeKey(key);
    const cached = this.cache.getItem(key);
    let res = undefined;

    if (!!cached)
      if (CacheService.validateValue(cached))
        res = cached;
      else
        this.remove(key);

    return res;
  }

  remove(key: string | number): void {
    key = CacheService.normalizeKey(key);

    this.cache.removeItem(key);
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

  private parseOptions(options: CacheOptions): CacheOptions {
    return {
      expiry: options.expiry || (options.TTL ? Date.now() + (options.TTL * 1000) : this.options.expiry),
      TTL: options.TTL || this.options.TTL
    };
  }
}
