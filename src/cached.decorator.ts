// libs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

// module
import { ReturnType } from './models/return-type';
import { CacheService } from './cache.service';
import { isObservable, isPromise } from './util';

export function CacheKey(target: any, propertyKey: string, index: number): void {
  const metadataKey = `__cache_${propertyKey}_keys`;

  Array.isArray(target[metadataKey])
    ? target[metadataKey].push(index)
    : target[metadataKey] = [index];
}

export function Cached(key: string): any | Observable<any> | Promise<any> {
  return function (target: Function, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): any | Observable<any> | Promise<any> {
    const method: Function = descriptor.value;
    descriptor.value = function (...args: Array<any>): any | Observable<any> | Promise<any> {
      const cache = CacheService.getInstance();

      const metadataKey = `__cache_${propertyKey}_keys`;
      const indices = target[metadataKey];

      let keyParts = '';

      if (Array.isArray(indices))
        for (let i = 0; i < args.length; i++)
          if (indices.indexOf(i) !== -1)
            keyParts = !keyParts
              ? args[i].toString()
              : `${keyParts}_${args[i].toString()}`;

      let cacheKey = !keyParts
        ? key
        : `${key}_${keyParts}`;

      cacheKey = CacheService.normalizeKey(cacheKey);

      if (!cacheKey || !cache)
        return method.apply(this, args);

      if (cache.has(cacheKey)) {
        const cached = cache.getWithMetadata(cacheKey);

        if (!!cached && !!cached.data) {
          switch (cached.returnType) {
            case ReturnType.Observable:
              return Observable.of(cached.data);
            case ReturnType.Promise:
              return Promise.resolve(cached.data);
            default:
              return cached.data;
          }
        }
      }

      const value = method.apply(this, args);

      if (isObservable(value))
        return value.map((res: any) => {
          cache.set(cacheKey, res, ReturnType.Observable);
          return res;
        });
      else if (isPromise(value))
        return value.then((res: any) => {
          cache.set(cacheKey, res, ReturnType.Promise);
          return res;
        });

      cache.set(cacheKey, value);
      return value;
    };

    return descriptor;
  };
}
