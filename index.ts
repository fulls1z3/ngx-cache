// angular
import { Injector, ModuleWithProviders, NgModule, Optional, PLATFORM_ID, SkipSelf } from '@angular/core';

// module
import { CacheLoader, CacheStaticLoader } from './src/cache.loader';
import { CacheService } from './src/cache.service';

export * from './src/cache';
export * from './src/cached.decorator';
export * from './src/cache.loader';
export * from './src/cache.service';
export * from './src/models/cache-value';

// for AoT compilation
export function cacheFactory(): CacheLoader {
  return new CacheStaticLoader();
}

@NgModule()
export class CacheModule {
  static forRoot(configuredProvider: any = {
    provide: CacheLoader,
    useFactory: (cacheFactory)
  }): ModuleWithProviders {
    return {
      ngModule: CacheModule,
      providers: [
        configuredProvider,
        {
          provide: CacheService,
          useFactory: (CacheService.getInstance),
          deps: [CacheLoader, PLATFORM_ID, Injector]
        }
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: CacheModule) {
    if (parentModule)
      throw new Error('CacheModule already loaded; import in root module only.');
  }
}
