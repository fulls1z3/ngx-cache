import { CacheValue } from './models/cache-value';

export abstract class Cache {
  abstract get keys(): Array<string> | undefined;

  abstract getItem(key: string): CacheValue | undefined;

  abstract setItem(key: string, value: CacheValue): boolean;

  abstract removeItem(key: string, wild: boolean): void;

  abstract clear(): void;
}
