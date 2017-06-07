# Change Log
All notable changes to this project will be documented in this file.

## v0.4.0-beta.2 - 2017-06-07
### Added
- Added wildcard support to remove items (closes [#6](https://github.com/ngx-cache/core/issues/6))

### Fixed
- Resolved cacheKey doesn't handle optional (undefined) or null parameters (closes [#5](https://github.com/ngx-cache/core/issues/5))

### Changed
- Updated deps, gulp tasks, webpack config, tslint
- Some refactoring

## v0.4.0-beta.1 - 2017-04-28
### Added
- Added abstract storage (closes [#4](https://github.com/ngx-cache/core/issues/4))

### Fixed
- Resolved add `yarn.lock` to npmignore (closes [#2](https://github.com/ngx-cache/core/issues/2))
- Resolved cannot get instance of CacheService (closes [#3](https://github.com/ngx-cache/core/issues/3))
- Resolved error on AoT compilation (closes [#1](https://github.com/ngx-cache/core/issues/1))

### Changed
- Updated README.md
- Updated deps, ignorers
