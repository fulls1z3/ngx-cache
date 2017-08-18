// angular
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

// module
export * from './src/fs-cache.service';

@NgModule()
export class ServerCacheModule {
  static forRoot(configuredProviders?: Array<any>): ModuleWithProviders {
    return {
      ngModule: ServerCacheModule,
      providers: configuredProviders
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: ServerCacheModule) {
    if (parentModule)
      throw new Error('ServerCacheModule already loaded; import in SERVER module only.');
  }
}
