// module
import { CacheOptions } from './cache-options';
import { ReturnType } from './return-type';

export interface CacheValue {
  /**
   * cached data
   */
  data: any;
  /**
   * return type
   */
  returnType: ReturnType;
  /**
   * cache options
   */
  options: CacheOptions;
}
