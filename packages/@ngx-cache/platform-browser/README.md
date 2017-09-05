# @ngx-cache/platform-browser [![npm version](https://badge.fury.io/js/%40ngx-cache%2Fplatform-browser.svg)](https://www.npmjs.com/package/@ngx-cache/platform-browser) [![npm downloads](https://img.shields.io/npm/dm/%40ngx-cache%2Fplatform-browser.svg)](https://www.npmjs.com/package/@ngx-cache/platform-browser)
**SPA/Browser platform** implementation of [ngx-cache]

[![CircleCI](https://circleci.com/gh/fulls1z3/ngx-cache.svg?style=shield)](https://circleci.com/gh/fulls1z3/ngx-cache)
[![coverage](https://codecov.io/github/fulls1z3/ngx-cache/coverage.svg?branch=master)](https://codecov.io/gh/fulls1z3/ngx-cache)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)

> Please support this project by simply putting a Github star. Share this library with friends on Twitter and everywhere else you can.

## Table of contents:
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
  - [Installation](#installation)
	- [Examples](#examples)
	- [Related packages](#related-packages)
	- [Recommended packages](#recommended-packages)
	- [Adding `@ngx-cache/platform-browser` to your project (SystemJS)](#adding-systemjs)
  - [app.module configuration](#appmodule-config)
    - [Angular (SPA) application](#spa)
    - [Angular Universal application](#universal)
- [Credits](#credits)
- [License](#license)

## <a name="prerequisites"></a> Prerequisites
This package depends on `Angular v4.0.0`.

Also, please ensure that you are using **`Typescript v2.3.4`** or higher.

## <a name="getting-started"> Getting started
### <a name="installation"> Installation
You can install **`@ngx-cache/platform-browser`** using `npm`
```
npm install @ngx-cache/platform-browser --save
```

**Note**: You should have already installed [@ngx-cache/core].

**Note**: If you're developing an **Angular Universal** app, you should have already installed [@ngx-universal/state-transfer]
also.

### <a name="examples"></a> Examples
- [ng-seed/universal] is an officially maintained seed project, showcasing common patterns and best practices for **`@ngx-cache/platform-browser`**.

### <a name="related-packages"></a> Related packages
The following packages may be used in conjunction with **`@ngx-cache/platform-browser`**:
- [@ngx-cache/core]

### <a name="recommended-packages"></a> Recommended packages
The following package(s) have no dependency for **`@ngx-cache/platform-browser`**, however may provide supplementary/shorthand
functionality:
- [@ngx-universal/state-transfer]: provides state transferring features from the **server platform** to the **browser platform**

### <a name="adding-systemjs"></a> Adding `@ngx-cache/platform-browser` to your project (SystemJS)
Add `map` for **`@ngx-cache/platform-browser`** in your `systemjs.config`
```javascript
'@ngx-cache/platform-browser': 'node_modules/@ngx-cache/platform-browser/bundles/platform-browser.umd.min.js'
```

### <a name="appmodule-config"></a> app.module configuration
#### <a name="spa"></a> Angular (SPA) application
- Import `CacheModule` using the mapping `'@ngx-cache/core'` and append `CacheModule.forRoot({...})` within the imports
property of **app.module** (*considering the app.module is the core module in Angular application*).
- Import `BrowserCacheModule` using the mapping `'@ngx-cache/platform-browser'` and append `BrowserCacheModule.forRoot({...})`
within the imports property of **app.module**.
- Import `CACHE` injection token using the mapping `'@ngx-cache/core'`, `MemoryCacheService` or `LocalStorageCacheService`
(*of your choice*) using the mapping `'@ngx-cache/platform-browser'`.
- Provide `CACHE` using `MemoryCacheService` or `LocalStorageCacheService` (*of your choice*), by calling the [forRoot]
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
within the imports property of **app.browser.module** (*considering the app.browser.module is the browser module in Angular
Universal application*).
- Import `CACHE` injection token using the mapping `'@ngx-cache/core'`, `MemoryCacheService` or `LocalStorageCacheService`
(*of your choice*) using the mapping `'@ngx-cache/platform-browser'`.
- Provide `CACHE` using `MemoryCacheService` or `LocalStorageCacheService` (*of your choice*), by calling the [forRoot]
static method using the `BrowserCacheModule`.
- Import `BrowserStateTransferModule` and `DEFAULT_STATE_ID` using the mapping `'@ngx-universal/state-transfer'` and append
`BrowserStateTransferModule.forRoot({...})` within the imports property of **app.browser.module**.
- Import `STATE_ID` injection token using the mapping `'@ngx-cache/platform-browser'`.
- Provide `STATE_ID` using the const value`DEFAULT_STATE_ID` (*you can replace this default value with a custom `string`
value*), by calling the [forRoot] static method using the `BrowserCacheModule`.

#### app.browser.module.ts
```TypeScript
...
import { BrowserStateTransferModule, DEFAULT_STATE_ID } from '@ngx-universal/state-transfer';
import { CACHE } from '@ngx-cache/core';
import { BrowserCacheModule, MemoryCacheService, STATE_ID } from '@ngx-cache/platform-browser';
// import { BrowserCacheModule, LocalStorageCacheService, STATE_ID } from '@ngx-cache/platform-browser';
...

@NgModule({
  declarations: [
    AppComponent,
    ...
  ],
  ...
  imports: [
    ...
    BrowserStateTransferModule.forRoot(),
    // or, BrowserStateTransferModule.forRoot('CUSTOM_STATE_ID'),
    BrowserCacheModule.forRoot([
      {
        provide: CACHE,
        useClass: MemoryCacheService // or, LocalStorageCacheService
      },
      {
        provide: STATE_ID,
        useValue: DEFAULT_STATE_ID // or, 'CUSTOM_STATE_ID'
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

Copyright (c) 2017 [Burak Tasci]

[ngx-cache]: https://github.com/fulls1z3/ngx-cache
[ng-seed/universal]: https://github.com/ng-seed/universal
[@ngx-cache/core]: https://github.com/fulls1z3/ngx-cache/tree/master/packages/@ngx-cache/core
[@ngx-universal/state-transfer]: https://github.com/fulls1z3/ngx-universal/tree/master/packages/@ngx-universal/state-transfer
[forRoot]: https://angular.io/docs/ts/latest/guide/ngmodule.html#!#core-for-root
[Burak Tasci]: https://github.com/fulls1z3
