# @ngx-cache/platform-browser [![npm version](https://badge.fury.io/js/%40ngx-cache%2Fplatform-browser.svg)](https://www.npmjs.com/package/@ngx-cache/platform-browser) [![npm downloads](https://img.shields.io/npm/dm/%40ngx-cache%2Fplatform-browser.svg)](https://www.npmjs.com/package/@ngx-cache/platform-browser)

**SPA/Browser platform** implementation of [ngx-cache]

[![CircleCI](https://circleci.com/gh/fulls1z3/ngx-cache.svg?style=shield)](https://circleci.com/gh/fulls1z3/ngx-cache)
[![coverage](https://codecov.io/github/fulls1z3/ngx-cache/coverage.svg?branch=master)](https://codecov.io/gh/fulls1z3/ngx-cache)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)

> Please support this project by simply putting a Github star. Share this library with friends on Twitter and everywhere else you can.

## Table of contents:

- [Getting started](#getting-started)
  - [Installation](#installation) - [Examples](#examples) - [Related packages](#related-packages) - [Adding `@ngx-cache/platform-browser` to your project (SystemJS)](#adding-systemjs)
  - [app.module configuration](#appmodule-config)
    - [Angular (SPA) application](#spa)
    - [Angular Universal application](#universal)
- [Credits](#credits)
- [License](#license)

## <a name="getting-started"> Getting started

### <a name="installation"> Installation

You can install **`@ngx-cache/platform-browser`** using `npm`

```
npm install @ngx-cache/platform-browser --save
```

**Note**: You should have already installed [@ngx-cache/core].

### <a name="examples"></a> Examples

- [fulls1z3/universal] is an officially maintained seed project, showcasing common patterns and best practices for **`@ngx-cache/platform-browser`**.

### <a name="related-packages"></a> Related packages

The following packages may be used in conjunction with **`@ngx-cache/platform-browser`**:

- [@ngx-cache/core]

### <a name="adding-systemjs"></a> Adding `@ngx-cache/platform-browser` to your project (SystemJS)

Add `map` for **`@ngx-cache/platform-browser`** in your `systemjs.config`

```javascript
'@ngx-cache/platform-browser': 'node_modules/@ngx-cache/platform-browser/bundles/platform-browser.umd.min.js'
```

### <a name="appmodule-config"></a> app.module configuration

#### <a name="spa"></a> Angular (SPA) application

- Import `CacheModule` using the mapping `'@ngx-cache/core'` and append `CacheModule.forRoot({...})` within the imports
  property of **app.module** (_considering the app.module is the core module in Angular application_).
- Import `BrowserCacheModule` using the mapping `'@ngx-cache/platform-browser'` and append `BrowserCacheModule.forRoot({...})`
  within the imports property of **app.module**.
- Import `CACHE` injection token using the mapping `'@ngx-cache/core'`, `MemoryCacheService` or `LocalStorageCacheService`
  (_of your choice_) using the mapping `'@ngx-cache/platform-browser'`.
- Provide `CACHE` using `MemoryCacheService` or `LocalStorageCacheService` (_of your choice_), by calling the [forRoot]
  static method using the `BrowserCacheModule`.

#### app.module.ts

```TypeScript
...
import { CacheModule, CACHE } from '@ngx-cache/core';
import { BrowserCacheModule, MemoryCacheService } from '@ngx-cache/platform-browser';
// import { BrowserCacheModule, LocalStorageCacheService } from '@ngx-cache/platform-browser';
...

@NgModule({
  declarations: [
    AppComponent,
    ...
  ],
  ...
  imports: [
    ...
    CacheModule.forRoot(),
    BrowserCacheModule.forRoot([
      {
        provide: CACHE,
        useClass: MemoryCacheService // or, LocalStorageCacheService
      }
    ]),
  ],
  ...
  bootstrap: [AppComponent]
})
```

#### <a name="universal"></a> Angular Universal application

- Import `BrowserCacheModule` using the mapping `'@ngx-cache/platform-browser'` and append `BrowserCacheModule.forRoot({...})`
  within the imports property of **app.browser.module** (_considering the app.browser.module is the browser module in Angular
  Universal application_).
- Import `CACHE` injection token using the mapping `'@ngx-cache/core'`, `MemoryCacheService` or `LocalStorageCacheService`
  (_of your choice_) using the mapping `'@ngx-cache/platform-browser'`.
- Provide `CACHE` using `MemoryCacheService` or `LocalStorageCacheService` (_of your choice_), by calling the [forRoot]
  static method using the `BrowserCacheModule`.

#### app.browser.module.ts

```TypeScript
...
import { CACHE } from '@ngx-cache/core';
import { BrowserCacheModule, MemoryCacheService } from '@ngx-cache/platform-browser';
// import { BrowserCacheModule, LocalStorageCacheService } from '@ngx-cache/platform-browser';
...

@NgModule({
  declarations: [
    AppComponent,
    ...
  ],
  ...
  imports: [
    ...
    BrowserCacheModule.forRoot([
      {
        provide: CACHE,
        useClass: MemoryCacheService // or, LocalStorageCacheService
      }
    ]),
  ],
  ...
  bootstrap: [AppComponent]
})
```

> :+1: Yeah! **`@ngx-cache/platform-browser`** will now provide **browser platform** implementation to [@ngx-cache/core].

## <a name="credits"></a> Credits

- [universal-starter](https://github.com/angular/universal-starter): Angular 2 Universal starter kit by @AngularClass

## <a name="license"></a> License

The MIT License (MIT)

Copyright (c) 2021 [Burak Tasci]

[ngx-cache]: https://github.com/fulls1z3/ngx-cache
[fulls1z3/universal]: https://github.com/fulls1z3/universal
[@ngx-cache/core]: https://github.com/fulls1z3/ngx-cache/tree/master/packages/@ngx-cache/core
[forroot]: https://angular.io/docs/ts/latest/guide/ngmodule.html#!#core-for-root
[burak tasci]: https://github.com/fulls1z3
