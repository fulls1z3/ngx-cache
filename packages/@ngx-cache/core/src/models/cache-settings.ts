// module
import { LifeSpan } from './life-span';

export interface CacheSettings {
  key: string;
  lifeSpan: LifeSpan;
}
