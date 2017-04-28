// module
import { CacheValue } from './models/cache-value';

export abstract class Cache {
  abstract get keys(): Array<string>;
  abstract getItem(key: string): CacheValue;
  abstract setItem(key: string, value: CacheValue): boolean;
  abstract removeItem(key: string): void;
  abstract clear(): void;
}
