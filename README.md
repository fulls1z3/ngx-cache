# @ngx-cache/core
Cache utility for **Angular**

[![npm version](https://badge.fury.io/js/%40ngx-cache%2Fcore.svg)](https://www.npmjs.com/package/@ngx-cache/core)

> Please support this project by simply putting a Github star. Share this library with friends on Twitter and everywhere else you can.

## Table of contents:
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
  - [Installation](#installation)
	- [Examples](#examples)
	- [Related packages](#related-packages)
	- [Recommended packages](#recommended-packages)
	- [Adding `@ngx-cache/core` to your project (SystemJS)](#adding-ngx-cachecore-to-your-project-systemjs)
  - [app.module configuration](#appmodule-configuration)
- [Settings](#settings)
	- [Setting up `CacheModule` to use `CacheStaticLoader`](#setting-up-cachemodule-to-use-cachestaticloader)
- [SPA/Browser platform implementation](#spabrowser-platform-implementation)
- [Server platform implementation](#server-platform-implementation)
- [Usage](#usage)
- [Decorators](#decorators)
  - [`Cached` method decorator](#cached-method-decorator)
  - [`CacheKey` parameter decorator](#cachekey-parameter-decorator)
- [License](#license)

## Prerequisites
This package depends on `@angular v4.0.0`.

Also, please ensure that you are using **`Typescript v2.1.6`** or higher.

## Getting started
### Installation
You can install **`@ngx-cache/core`** using `npm`
```
npm install @ngx-cache/core --save
```

### Examples
- [ng-seed/universal] is an officially maintained seed project, showcasing common patterns and best practices for **`@ngx-cache/core`**.

### Related packages
The following packages may be used in conjunction with **`@ngx-cache/core`**:
- [@ngx-cache/platform-browser]
- [@ngx-cache/platform-server]
- [@ngx-cache/fs-storage]

### Recommended packages
The following package(s) have no dependency for **`@ngx-cache/core`**, however may provide supplementary/shorthand functionality:
- [@ngx-universal/state-transfer]: provides state transferring features from the **server platform** to the **browser platform**
- [@ngx-config/core]: provides cache settings from the application settings loaded during application initialization

### Adding `@ngx-cache/core` to your project (SystemJS)
Add `map` for **`@ngx-cache/core`** in your `systemjs.config`
```javascript
'@ngx-cache/core': 'node_modules/@ngx-cache/core/bundles/core.umd.min.js'
```

### app.module configuration
Import `CacheModule` using the mapping `'@ngx-cache/core'` and append `CacheModule.forRoot({...})` within the imports property of **app.module** (*considering the app.module is the core module in Angular application*).

#### app.module.ts
```TypeScript
...
import { CacheModule } from '@ngx-cache/core';
...

@NgModule({
  declarations: [
    AppComponent,
    ...
  ],
  ...
  imports: [
    ...
    CacheModule.forRoot()
  ],
  ...
  bootstrap: [AppComponent]
})
```

## Settings
You can call the [forRoot] static method using `CacheStaticLoader`. By default, it is configured to have the `cacheKey` as `'NGX_CACHE'`, and both `expiry` and `TTL` are set to `Number.MAX_VALUE`.

> You can customize this behavior (*and ofc other settings*) by supplying **cache key** and **cache options** to `CacheStaticLoader`.

The following examples show the use of an exported function (*instead of an inline function*) for [AoT compilation].

### Setting up `CacheModule` to use `CacheStaticLoader`
```TypeScript
...
import { CacheModule, CacheLoader, CacheStaticLoader } from '@ngx-cache/core';
...

export function cacheFactory(): CacheLoader {
  return new CacheStaticLoader('NGX_CACHE', {
    "expiry": Number.MAX_VALUE,
    "TTL":  Number.MAX_VALUE
  });
}

@NgModule({
  declarations: [
    AppComponent,
    ...
  ],
  ...
  imports: [
    CacheModule.forRoot({
      provide: CacheLoader,
      useFactory: (cacheFactory)
    }),
    ...
  ],
  ...
  bootstrap: [AppComponent]
})
```

`CacheStaticLoader` has two parameters:
- **cacheKey**: `string` : cache key, used as object identifier while transferring between **server** and **browser** platforms (*by default, `'NGX_CACHE'`*)
- **cacheOptions**: `CacheOptions` : cache options (*by default, both `expiry` and `TTL` are set to `Number.MAX_VALUE`*) 

> :+1: Good! **`@ngx-cache/core`** is now ready to provide caching features.

**Note**: You need to perform **browser** ([@ngx-cache/platform-browser]), and (*for Angular Universal*) **server** ([@ngx-cache/platform-server]) platform implementations to begin using caching features.

## SPA/Browser platform implementation
[@ngx-cache/platform-browser] provides the **SPA/Browser platform** implementation (*ex: `MemoryCacheService`, `LocalStorageCacheService`*).

You can find detailed information about the usage guidelines for the **SPA/Browser platform** [here](https://github.com/ngx-cache/platform-browser).

## Server platform implementation
[@ngx-cache/platform-server] provides the **server platform** implementation (*ex: `FsCacheService`*).

You can find detailed information about the usage guidelines for the **server platform** [here](https://github.com/ngx-cache/platform-server).

## Usage
`CacheService` has the following properties:
- `key`: gets the `KEY` of `CacheService`, provided by `CacheLoader`, used as a key during [state transferring](https://github.com/ngx-universal/state-transfer)
 
`CacheService` has the following methods:
- `getInstance(loader?: CacheLoader, platformId?: any, injector?: Injector)`: gets the current instance of `CacheService` 
- `normalizeKey(key: string | number)`: normalizes the given key
- `has(key: string | number)`: checks if an object is stored in `CACHE`, by key
- `get(key: string | number)`: gets some object from `CACHE`, with `ReturnType` (*`Scalar`, `Observable` or `Promise`*) and `CacheOptions`, by key
- `getWithMetadata(key: string | number)`: gets some object from `CACHE`, by key
- `set(key: string | number, value: any, returnType: ReturnType = ReturnType.Scalar, options?: CacheOptions)`: puts some object to `CACHE` 
- `remove(key: string | number, wild = false)`: removes some object from `CACHE`, by key
- `clear()`: removes all objects from `CACHE`
- `dehydrate()`: converts the data from `CACHE` to JSON (*ex: transferring `CACHE` data from the **server platform** to the **client platform** using [@ngx-universal/state-transfer]*)
- 'rehydrate(json: any)': converts the given JSON value to `CACHE` data

The following example shows simple usage of the `CacheService`. 

#### anyclass.ts
```TypeScript
...
import { CacheService } from '@ngx-cache/core';

@Injectable()
export class AnyClass {
  constructor(private readonly cache: CacheService) {
    // note that CacheService is injected into a private property of AnyClass
  }
  
  // will retrieve 'some string value'
  getSomeStringValue(): string {
    if (this.cache.has('some-string'))
      return this.cache.get('some-string');
    
    this.cache.set('some-string', 'some string value');
    return 'some string value';
  }
}
```

## Decorators
> To enable experimental support for decorators, you must enable the **experimentalDecorators** compiler option in your **tsconfig.json**:

#### tsconfig.json
```JSON
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true
  }
}
```

### `Cached` method decorator
`Cached` method decorator allows you to **cache** the an entire method (*with less amount of code, as well as without injecting the `CacheService`*), by putting the **return value** to `CACHE` on the first execution, and retrieve it from `CACHE` on the further executions.

`Cached` method has one parameter:
- **key**: `string` : obviously used as a **key** when putting/getting the method's value  

### `CacheKey` parameter decorator
You can place `CacheKey` parameter decorator just before the parameter, and its value will be appended to the **cache key**.
 
The following example shows simple usage of the `Cached` and `CacheKey` decorators.

#### anyclass.ts
```TypeScript
...
import { Cached, CacheKey } from '@ngx-cache/core';

export class AnyClass { 
  // will retrieve 'some string value'
  @Cached('some-string')
  getSomeStringValue(): string {
    return 'some string value';
  }

  @Cached('some-string')
  getSomeStringValue2(@CacheKey param1: string): string {
    return 'some string value: ' + param1;
  }
}

...
// these are the first executions
console.log(anyClass.getSomeStringValue2('p1'));
console.log(anyClass.getSomeStringValue2('p2'));
...
// will retrieve 'some string value: p1' from `CACHE`
console.log(anyClass.getSomeStringValue2('p1'));

// will retrieve 'some string value: p1' from `CACHE`
console.log(anyClass.getSomeStringValue2('p2'));
```

## Credits
- [ng2-cache](https://github.com/Jackson88/ng2-cache): Client side caching service for Angular2
- [angular2-cache](https://github.com/apoterenko/angular2-cache): An implementation of cache at Angular2
- [universal-starter](https://github.com/angular/universal-starter): Angular 2 Universal starter kit by @AngularClass

## License
The MIT License (MIT)

Copyright (c) 2017 [Burak Tasci]

[ng-seed/universal]: https://github.com/ng-seed/universal
[@ngx-cache/platform-browser]: https://github.com/ngx-cache/platform-browser
[@ngx-cache/platform-server]: https://github.com/ngx-cache/platform-server
[@ngx-cache/fs-storage]: https://github.com/ngx-cache/fs-storage
[@ngx-universal/state-transfer]: https://github.com/ngx-universal/state-transfer
[@ngx-config/core]: https://github.com/ngx-config/core
[forRoot]: https://angular.io/docs/ts/latest/guide/ngmodule.html#!#core-for-root
[AoT compilation]: https://angular.io/docs/ts/latest/cookbook/aot-compiler.html
[Burak Tasci]: https://github.com/fulls1z3
