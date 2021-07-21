import {
  InjectionToken,
  Injector,
  ModuleWithProviders,
  NgModule,
  Optional,
  PLATFORM_ID,
  SkipSelf
} from '@angular/core';

import { CacheLoader, CacheStaticLoader } from './cache.loader';
import { CacheService } from './cache.service';
import { Storage } from './storage';

export const STORAGE = new InjectionToken<Storage>('STORAGE');

export const cacheFactory = () => new CacheStaticLoader();

export const cacheServiceFactory = (loader: CacheLoader, platformId: any, injector: Injector) =>
  new CacheService(loader, platformId, injector);

// @dynamic
@NgModule()
export class CacheModule {
  static forRoot(
    configuredProvider: any = {
      provide: CacheLoader,
      useFactory: cacheFactory
    }
  ): ModuleWithProviders<CacheModule> {
    return {
      ngModule: CacheModule,
      providers: [
        configuredProvider,
        {
          provide: CacheService,
          useFactory: cacheServiceFactory,
          deps: [CacheLoader, PLATFORM_ID, Injector]
        }
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule?: CacheModule) {
    if (parentModule) {
      throw new Error('CacheModule already loaded; import in root module only.');
    }
  }
}
