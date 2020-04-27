import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { CacheService } from '@ngx-cache/core';

@NgModule()
export class BrowserCacheModule {
  static forRoot(configuredProviders?: Array<any>): ModuleWithProviders<BrowserCacheModule> {
    return {
      ngModule: BrowserCacheModule,
      providers: configuredProviders
    };
  }

  constructor(
    @Optional() @SkipSelf() parentModule?: BrowserCacheModule,
    private readonly transferState?: TransferState,
    private readonly cache?: CacheService
  ) {
    if (parentModule) {
      throw new Error('BrowserCacheModule already loaded; import in BROWSER module only.');
    }

    const serverCache = this.getCacheValue();
    cache.rehydrate(serverCache);
  }

  private getCacheValue(): any {
    const stateKey = makeStateKey(this.cache.key);
    const state = this.transferState.get<any>(stateKey, {});

    if (state) {
      try {
        const serverCache = JSON.parse(state);
        this.transferState.remove<any>(stateKey);

        return serverCache;
      } catch (e) {
        /**/
      }
    }

    return {};
  }
}
