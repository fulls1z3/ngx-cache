import { Observable, of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';

import { CacheService } from './cache.service';
import { ReturnType } from './models/return-type';
import { isObservable, isPromise } from './util';

// tslint:disable-next-line
export function CacheKey(target: any, propertyKey: string, index: number): void {
  const metadataKey = `__cache_${propertyKey}_keys`;

  Array.isArray(target[metadataKey]) ? target[metadataKey].push(index) : (target[metadataKey] = [index]);
}

// tslint:disable-next-line
export function Cached(key: string): any | Observable<any> | Promise<any> {
  // tslint:disable-next-line
  return function(target: Function, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): any | Observable<any> | Promise<any> {
    const method: Function = descriptor.value;
    descriptor.value = function(...args: Array<any>): any | Observable<any> | Promise<any> {
      const cache = CacheService.getInstance();

      const metadataKey = `__cache_${propertyKey}_keys`;
      const indices = target[metadataKey];

      let keyParts = '';

      if (Array.isArray(indices)) {
        for (let i = 0; i < args.length; i++) {
          if (indices.indexOf(i) !== -1) {
            keyParts = !keyParts ? String(args[i]) : `${keyParts}_${String(args[i])}`;
          }
        }
      }

      let cacheKey = !keyParts ? key : `${key}_${keyParts}`;

      cacheKey = CacheService.normalizeKey(cacheKey);

      // tslint:disable-next-line
      if (!cache || !cacheKey) {
        // tslint:disable-next-line
        return method.apply(this, args);
      }

      if (cache.has(cacheKey)) {
        const cached = cache.getWithMetadata(cacheKey);

        if (cached && cached.data) {
          switch (cached.returnType) {
            case ReturnType.Observable:
              return observableOf(cached.data);
            case ReturnType.Promise:
              return Promise.resolve(cached.data);
            default:
              return cached.data;
          }
        }
      }

      // tslint:disable-next-line
      const value = method.apply(this, args);

      if (isObservable(value)) {
        return value.pipe(
          map((res: any) => {
            cache.set(cacheKey, res, ReturnType.Observable);

            return res;
          })
        );
      } else if (isPromise(value)) {
        return (value).then((res: any) => {
          cache.set(cacheKey, res, ReturnType.Promise);

          return res;
        });
      }

      cache.set(cacheKey, value);

      return value;
    };

    return descriptor;
  };
}
