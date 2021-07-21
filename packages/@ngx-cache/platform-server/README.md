# @ngx-cache/platform-server [![npm version](https://badge.fury.io/js/%40ngx-cache%2Fplatform-server.svg)](https://www.npmjs.com/package/@ngx-cache/platform-server) [![npm downloads](https://img.shields.io/npm/dm/%40ngx-cache%2Fplatform-server.svg)](https://www.npmjs.com/package/@ngx-cache/platform-server)

**Server platform** implementation of [ngx-cache]

[![CircleCI](https://circleci.com/gh/fulls1z3/ngx-cache.svg?style=shield)](https://circleci.com/gh/fulls1z3/ngx-cache)
[![coverage](https://codecov.io/github/fulls1z3/ngx-cache/coverage.svg?branch=master)](https://codecov.io/gh/fulls1z3/ngx-cache)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)

> Please support this project by simply putting a Github star. Share this library with friends on Twitter and everywhere else you can.

## Table of contents:

- [Getting started](#getting-started)
  - [Installation](#installation) - [Examples](#examples) - [Related packages](#related-packages) - [Adding `@ngx-cache/platform-server` to your project (SystemJS)](#adding-systemjs)
  - [app.module configuration](#appmodule-config)
- [Credits](#credits)
- [License](#license)

## <a name="getting-started"> Getting started

### <a name="installation"> Installation

You can install **`@ngx-cache/platform-server`** using `npm`

```
npm install @ngx-cache/platform-server --save
```

**Note**: You should have already installed [@ngx-cache/core].

**Note**: You should have also installed [@ngx-cache/fs-storage] (_which is currently the only available storage on the
server platform_).

### <a name="examples"></a> Examples

- [fulls1z3/universal] is an officially maintained seed project, showcasing common patterns and best practices for **`@ngx-cache/platform-server`**.

### <a name="related-packages"></a> Related packages

The following packages may be used in conjunction with **`@ngx-cache/platform-server`**:

- [@ngx-cache/core]
- [@ngx-cache/fs-storage]

### <a name="adding-systemjs"></a> Adding `@ngx-cache/platform-server` to your project (SystemJS)

Add `map` for **`@ngx-cache/platform-server`** in your `systemjs.config`

```javascript
'@ngx-cache/platform-server': 'node_modules/@ngx-cache/platform-server/bundles/platform-server.umd.min.js'
```

### <a name="appmodule-config"></a> app.module configuration

- Import `ServerCacheModule` using the mapping `'@ngx-cache/platform-server'` and append `ServerCacheModule.forRoot({...})`
  within the imports property of **app.server.module** (_considering the app.server.module is the server module in Angular
  Universal application_).
- Import `CACHE` injection token using the mapping `'@ngx-cache/core'`, `FsCacheService` using the mapping `'@ngx-cache/platform-server'`.
- Provide `CACHE` using `FsCacheService`, by calling the [forRoot] static method using the `ServerCacheModule`.
- Import `STORAGE` injection token using the mapping `'@ngx-cache/core'`, `FsStorageService` using the mapping `'@ngx-cache/fs-storage'`.
- Provide `STORAGE` using `FsStorageService`, by calling the [forRoot] static method using the `ServerCacheModule`.
- Import `FsStorageLoader` and `fsStorageFactory` using the mapping `'@ngx-cache/fs-storage'`.
- Provide `FsStorageLoader` using `fsStorageFactory`, by calling the [forRoot] static method using the `ServerCacheModule`.
- Pass `CacheService` together with `ApplicationRef` and `TransferState` to the implementation of `bootstrapFactory` method
  below.

#### app.server.module.ts

```TypeScript
...
import { CacheService, CACHE, STORAGE } from '@ngx-cache/core';
import { ServerCacheModule, FsCacheService } from '@ngx-cache/platform-server';
import { fsStorageFactory, FsStorageLoader, FsStorageService } from '@ngx-cache/fs-storage';

...


export function bootstrapFactory(appRef: ApplicationRef,
                                 transferState: TransferState,
                                 cache: CacheService): () => Subscription {
  return () => appRef.isStable
    .filter(stable => stable)
    .first()
    .subscribe(() => {
      transferState.set<any>(makeStateKey(cache.key), JSON.stringify(cache.dehydrate()));
    });
}


@NgModule({
  declarations: [
    AppComponent,
    ...
  ],
  ...
  imports: [
    ...
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
  providers: [
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: (bootstrapFactory),
      multi: true,
      deps: [
        ApplicationRef,
        TransferState,
        CacheService
      ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {
}
```

> :+1: Yeah! **`@ngx-cache/platform-server`** will now provide **server platform** implementation to [@ngx-cache/core].

## <a name="credits"></a> Credits

- [universal-starter](https://github.com/angular/universal-starter): Angular 2 Universal starter kit by @AngularClass

## <a name="license"></a> License

The MIT License (MIT)

Copyright (c) 2021 [Burak Tasci]

[ngx-cache]: https://github.com/fulls1z3/ngx-cache
[fulls1z3/universal]: https://github.com/fulls1z3/universal
[@ngx-cache/core]: https://github.com/fulls1z3/ngx-cache/tree/master/packages/@ngx-cache/core
[@ngx-cache/fs-storage]: https://github.com/fulls1z3/ngx-cache/tree/master/packages/@ngx-cache/fs-storage
[forroot]: https://angular.io/docs/ts/latest/guide/ngmodule.html#!#core-for-root
[burak tasci]: https://github.com/fulls1z3
