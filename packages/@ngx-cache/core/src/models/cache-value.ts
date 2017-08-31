// module
import { LifeSpan } from './life-span';
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
   * cache life span
   */
  lifeSpan: LifeSpan;
}
