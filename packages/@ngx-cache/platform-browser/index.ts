// angular
import { Inject, InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

// libs
import { CacheService } from '@ngx-cache/core';

// module
export * from './src/local-storage-cache.service';
export * from './src/memory-cache.service';

export const STATE_ID = new InjectionToken<string>('STATE_ID');

@NgModule()
export class BrowserCacheModule {
  static forRoot(configuredProviders?: Array<any>): ModuleWithProviders {
    return {
      ngModule: BrowserCacheModule,
      providers: configuredProviders
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: BrowserCacheModule,
              @Optional() @Inject(STATE_ID) private readonly stateId: string,
              private readonly cache: CacheService) {
    if (parentModule)
      throw new Error('BrowserCacheModule already loaded; import in BROWSER module only.');

    // TODO: refactor into a lifecycle hook (APP_INITIALIZER)
    if (stateId) {
      const defaultValue = {};
      const serverCache = this.getCacheValue(defaultValue);
      cache.rehydrate(serverCache);
    }
  }

  private getCacheValue(defaultValue: any): any {
    const win: any = window;

    if (!win)
      return defaultValue;

    if (!win[this.stateId])
      return defaultValue;

    if (win[this.stateId][this.cache.key]) {
      let serverCache = defaultValue;

      try {
        serverCache = JSON.parse(win[this.stateId][this.cache.key]);

        if (typeof serverCache !== typeof defaultValue)
          serverCache = defaultValue;
      } catch (e) {
        serverCache = defaultValue;
      }

      return serverCache;
    }

    return defaultValue;
  }
}
