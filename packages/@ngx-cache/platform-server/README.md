# @ngx-cache/platform-server
**Server platform** implementation of [ngx-cache]

[![npm version](https://badge.fury.io/js/%40ngx-cache%2Fplatform-server.svg)](https://www.npmjs.com/package/@ngx-cache/platform-server)
[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)

> Please support this project by simply putting a Github star. Share this library with friends on Twitter and everywhere else you can.

## Table of contents:
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
  - [Installation](#installation)
	- [Examples](#examples)
	- [Related packages](#related-packages)
	- [Adding `@ngx-cache/platform-server` to your project (SystemJS)](#adding-systemjs)
  - [app.module configuration](#appmodule-config)
- [Credits](#credits)
- [License](#license)

## <a name="prerequisites"></a> Prerequisites
This package depends on `Angular v4.0.0`.

Also, please ensure that you are using **`Typescript v2.3.4`** or higher.

## <a name="getting-started"> Getting started
### <a name="installation"> Installation
You can install **`@ngx-cache/platform-server`** using `npm`
```
npm install @ngx-cache/platform-server --save
```

**Note**: You should have already installed [@ngx-cache/core].

**Note**: You should have also installed [@ngx-cache/fs-storage] (*which is currently the only available storage on the
server platform*).

### <a name="examples"></a> Examples
- [ng-seed/universal] is an officially maintained seed project, showcasing common patterns and best practices for **`@ngx-cache/platform-server`**.

### <a name="related-packages"></a> Related packages
The following packages may be used in conjunction with **`@ngx-cache/platform-server`**:
- [@ngx-universal/state-transfer]
- [@ngx-cache/core]
- [@ngx-cache/fs-storage]

### <a name="adding-systemjs"></a> Adding `@ngx-cache/platform-server` to your project (SystemJS)
Add `map` for **`@ngx-cache/platform-server`** in your `systemjs.config`
```javascript
'@ngx-cache/platform-server': 'node_modules/@ngx-cache/platform-server/bundles/platform-server.umd.min.js'
```

### <a name="appmodule-config"></a> app.module configuration
- Import `ServerCacheModule`  using the mapping `'@ngx-cache/platform-server'` and append `ServerCacheModule.forRoot({...})`
within the imports property of **app.server.module** (*considering the app.server.module is the server module in Angular
Universal application*).
- Import `CACHE` injection token using the mapping `'@ngx-cache/core'`, `FsCacheService` using the mapping `'@ngx-cache/platform-server'`.
- Provide `CACHE` using `FsCacheService`, by calling the [forRoot] static method using the `ServerCacheModule`.
- Import `ServerStateTransferModule` using the mapping `'@ngx-universal/state-transfer'` and append `ServerStateTransferModule.forRoot({...})`
within the imports property of **app.server.module**.
- Import `STORAGE` injection token using the mapping `'@ngx-cache/core'`, `FsStorageService` using the mapping `'@ngx-cache/fs-storage'`.
- Provide `STORAGE` using `FsStorageService`, by calling the [forRoot] static method using the `ServerCacheModule`.
- Import `FsStorageLoader` and `fsStorageFactory` using the mapping `'@ngx-cache/fs-storage'`.
- Provide `FsStorageLoader` using `fsStorageFactory`, by calling the [forRoot] static method using the `ServerCacheModule`.
- Import `StateTransferService` using the mapping `'@ngx-universal/state-transfer'`, `CacheService` using the mapping `'@ngx-cache/core'`.
- Pass `StateTransferService` and `CacheService` as constructor params, and copy the implementation of `ngOnBootstrap` method
below.

#### app.server.module.ts
```TypeScript
...
import { ServerStateTransferModule, StateTransferService } from '@ngx-universal/state-transfer';
import { CacheService, CACHE, STORAGE } from '@ngx-cache/core';
import { ServerCacheModule, FsCacheService } from '@ngx-cache/platform-server';
import { fsStorageFactory, FsStorageLoader, FsStorageService } from '@ngx-cache/fs-storage';

...

@NgModule({
  declarations: [
    AppComponent,
    ...
  ],
  ...
  imports: [
    ...
    ServerStateTransferModule.forRoot(),
    // or, ServerStateTransferModule.forRoot('CUSTOM_STATE_ID'),
    ServerCacheModule.forRoot([
      {
        provide: CACHE,
        useClass: FsCacheService
      },
      {
        provide: STORAGE,
        useClass: FsStorageService
      },
      {
        provide: FsStorageLoader,
        useFactory: (fsStorageFactory)
      }
    ]),
  ],
  ...
  bootstrap: [AppComponent]
})
export class AppServerModule {
  constructor(private readonly stateTransfer: StateTransferService,
              private readonly cache: CacheService) {
  }

  ngOnBootstrap = () => {
    this.stateTransfer.set(this.cache.key, JSON.stringify(this.cache.dehydrate()));
    this.stateTransfer.inject();
  }
}
```

> :+1: Yeah! **`@ngx-cache/platform-server`** will now provide **server platform** implementation to [@ngx-cache/core].

## <a name="credits"></a> Credits
- [universal-starter](https://github.com/angular/universal-starter): Angular 2 Universal starter kit by @AngularClass

## <a name="license"></a> License
The MIT License (MIT)

Copyright (c) 2017 [Burak Tasci]

[ngx-cache]: https://github.com/fulls1z3/ngx-cache
[ng-seed/universal]: https://github.com/ng-seed/universal
[@ngx-universal/state-transfer]: https://github.com/fulls1z3/ngx-universal/tree/master/packages/@ngx-universal/state-transfer
[@ngx-cache/core]: https://github.com/fulls1z3/ngx-cache/tree/master/packages/@ngx-cache/core
[@ngx-cache/fs-storage]: https://github.com/fulls1z3/ngx-cache/tree/master/packages/@ngx-cache/fs-storage
[forRoot]: https://angular.io/docs/ts/latest/guide/ngmodule.html#!#core-for-root
[Burak Tasci]: https://github.com/fulls1z3
