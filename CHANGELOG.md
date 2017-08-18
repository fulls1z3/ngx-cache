# Change Log
All notable changes to this project will be documented in this file.

## Current iteration
### Breaking changes
- **packaging:** merge public API into a single repository

## v0.4.0-beta.2 - 2017-06-07
### Breaking changes
- **packaging:** `@ngx-storage/fs` has been renamed to `@ngx-cache/fs-storage`

### Bug fixes
- **core:** cacheKey doesn't handle optional (undefined) or null parameters (closes [#5](https://github.com/fulls1z3/ngx-cache/issues/5))
- **fs-storage:** `fs.mkdir` fails while creating `./temp/cache`

### Features
- **core:** wildcard support to remove items (closes [#6](https://github.com/fulls1z3/ngx-cache/issues/6))
- **platform-browser:** wildcard support to remove items (closes [#6](https://github.com/fulls1z3/ngx-cache/issues/6))
- **platform-server:** wildcard support to remove items (closes [#6](https://github.com/fulls1z3/ngx-cache/issues/6))

## v0.4.0-beta.1 - 2017-04-28
### Bug fixes
- **core:** add `yarn.lock` to npmignore (closes [#2](https://github.com/fulls1z3/ngx-cache/issues/2))
- **core:** cannot get instance of CacheService (closes [#3](https://github.com/fulls1z3/ngx-cache/issues/3))
- **core:** error on AoT compilation (closes [#1](https://github.com/fulls1z3/ngx-cache/issues/1))
- **platform-browser:** add `yarn.lock` to npmignore (closes [#2](https://github.com/fulls1z3/ngx-cache/issues/2))
- **platform-browser:** cannot get instance of CacheService
- **platform-server:** add `yarn.lock` to npmignore (closes [#2](https://github.com/fulls1z3/ngx-cache/issues/2))
- **platform-server:** cannot get instance of CacheService
- **fs-storage:** add `yarn.lock` to npmignore (closes [#2](https://github.com/fulls1z3/ngx-cache/issues/2))

### Features
- **core:** abstract storage (closes [#4](https://github.com/fulls1z3/ngx-cache/issues/4))
- **platform-browser:** prevent rehydrate without STATE_ID
- **platform-browser:** import STORAGE from `@ngx-config/core`
