# @ngx-cache/fs-storage [![npm version](https://badge.fury.io/js/%40ngx-cache%2Ffs-storage.svg)](https://www.npmjs.com/package/@ngx-cache/fs-storage) [![npm downloads](https://img.shields.io/npm/dm/%40ngx-cache%2Ffs-storage.svg)](https://www.npmjs.com/package/@ngx-cache/fs-storage)
**Fs storage** for [ngx-cache] (server platform)

[![CircleCI](https://circleci.com/gh/fulls1z3/ngx-cache.svg?style=shield)](https://circleci.com/gh/fulls1z3/ngx-cache)
[![coverage](https://codecov.io/github/fulls1z3/ngx-cache/coverage.svg?branch=master)](https://codecov.io/gh/fulls1z3/ngx-cache)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)

> Please support this project by simply putting a Github star. Share this library with friends on Twitter and everywhere else you can.

#### NOTICE
> This *[6.x.x] branch* is intented to work with `Angular v6.x.x`. If you're developing on a later release of **Angular**
than `v6.x.x`, then you should probably choose the appropriate version of this library by visiting the *[master] branch*.

## Table of contents:
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
  - [Installation](#installation)
	- [Examples](#examples)
	- [Related packages](#related-packages)
	- [Adding `@ngx-cache/fs-storage` to your project (SystemJS)](#adding-systemjs)
  - [app.module configuration](#appmodule-config)
- [Settings](#settings)
	- [Setting up `ServerCacheModule` to use `FsStorageStaticLoader`](#setting-up-staticloader)
- [Credits](#credits)
- [License](#license)

## <a name="prerequisites"></a> Prerequisites
This library depends on `Angular v6.0.0`. Older versions contain outdated dependencies, might produce errors.

Also, please ensure that you are using **`Typescript v2.7.2`** or higher.

## <a name="getting-started"> Getting started
### <a name="installation"> Installation
You can install **`@ngx-cache/fs-storage`** using `npm`
```
npm install @ngx-cache/fs-storage --save
```

**Note**: You should have already installed [@ngx-cache/core] and [@ngx-cache/platform-server].

### <a name="examples"></a> Examples
- [ng-seed/universal] is an officially maintained seed project, showcasing common patterns and best practices for **`@ngx-cache/fs-storage`**.

### <a name="related-packages"></a> Related packages
The following packages may be used in conjunction with **`@ngx-cache/fs-storage`**:
- [@ngx-cache/core]
- [@ngx-cache/platform-server]

### <a name="adding-systemjs"></a> Adding `@ngx-cache/fs-storage` to your project (SystemJS)
Add `map` for **`@ngx-cache/fs-storage`** in your `systemjs.config`
```javascript
'@ngx-cache/fs-storage': 'node_modules/@ngx-cache/fs-storage/bundles/fs-storage.umd.min.js'
```

### <a name="appmodule-config"></a> app.module configuration
- Repeat the `app.module configuration` steps at [@ngx-cache/platform-server].
- Import `FsStorageStaticLoader` using the mapping `'@ngx-cache/fs-storage'`, and proceed to [settings](#settings).

## <a name="settings"></a> Settings
You can call the [forRoot] static method using `FsStorageStaticLoader`. By default, it is configured to have the `storagePath`
as `'./.temp/cache'`, and `storageQuota` is set to 5 MB.

> You can customize this behavior (*and ofc other settings*) by supplying **storagePath** and **storageQuota** to `FsStorageStaticLoader`.

The following examples show the use of an exported function (*instead of an inline function*) for [AoT compilation].

### <a name="setting-up-staticloader"></a> Setting up `ServerCacheModule` to use `FsStorageStaticLoader`
#### app.server.module.ts
```TypeScript
...
import { CacheService, CACHE, STORAGE } from '@ngx-cache/core';
import { ServerCacheModule, FsCacheService } from '@ngx-cache/platform-server';
import { FsStorageLoader, FsStorageStaticLoader, FsStorageService } from '@ngx-cache/fs-storage';

...

export function fsStorageFactory(): FsStorageLoader {
  return new FsStorageStaticLoader({
    path: './.temp/cache',
    quota: 5 * 1024 * 1024
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
    ServerStateTransferModule.forRoot(),
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
}
```

`FsStorageStaticLoader` has one parameter:
- **providedSettings**: `FsStorageSettings` : fs storage settings
  - **path**: `string` : storage path for cache files (*by default, `'./.temp/cache'`*)
  - **quota**: `number` : disk quota for cache files (*by default, `5242880`*)

> :+1: Yeah! **`@ngx-cache/fs-storage`** will now provide **storage settings** to [@ngx-cache/platform-server].

## <a name="credits"></a> Credits
- [node-localstorage](https://github.com/lmaccherone/node-localstorage): A drop-in substitute for the browser native localStorage
API that runs on node.js

## <a name="license"></a> License
The MIT License (MIT)

Copyright (c) 2018 [Burak Tasci]

[master]: https://github.com/fulls1z3/ngx-cache/core/tree/master
[6.x.x]: https://github.com/fulls1z3/ngx-cache/core/tree/6.x.x
[ngx-cache]: https://github.com/fulls1z3/ngx-cache
[ng-seed/universal]: https://github.com/ng-seed/universal
[@ngx-cache/core]: https://github.com/fulls1z3/ngx-cache/tree/master/packages/@ngx-cache/core
[@ngx-cache/platform-server]: https://github.com/fulls1z3/ngx-cache/tree/master/packages/@ngx-cache/platform-server
[forRoot]: https://angular.io/docs/ts/latest/guide/ngmodule.html#!#core-for-root
[AoT compilation]: https://angular.io/docs/ts/latest/cookbook/aot-compiler.html
[Burak Tasci]: https://github.com/fulls1z3
