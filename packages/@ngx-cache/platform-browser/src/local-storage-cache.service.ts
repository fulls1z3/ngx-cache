// angular
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

// libs
import { Cache, CacheValue } from '@ngx-cache/core';

export class LocalStorageCacheService implements Cache {
  private get isEnabled(): boolean {
    if (!isPlatformBrowser(this.platformId))
      return false;

    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');

      return true;
    } catch (e) {
      return false;
    }
  }

  constructor(@Inject(PLATFORM_ID) private readonly platformId: any) {
    if (!isPlatformBrowser(platformId))
      throw new Error('LocalStorageCacheService is not supported outside `browser` platform!');
  }

  get keys(): Array<string> {
    if (!this.isEnabled)
      return undefined;

    const res: Array<string> = [];

    Object.keys(localStorage)
      .forEach((key: string) => {
        res.push(key);
      });

    return res;
  }

  setItem(key: string, value: CacheValue): boolean {
    if (!this.isEnabled)
      return false;

    try {
      localStorage.setItem(key, JSON.stringify(value));

      return true;
    } catch (e) {
      return false;
    }
  }

  getItem(key: string): CacheValue {
    if (!this.isEnabled)
      return undefined;

    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : undefined;
  }

  removeItem(key: string, wild = false): void {
    if (!this.isEnabled)
      return;

    localStorage.removeItem(key);

    if (wild)
      for (const item of this.keys)
        if (item.indexOf(key) === 0)
          localStorage.removeItem(item);
  }

  clear(): void {
    if (!this.isEnabled)
      return;

    localStorage.clear();
  }
}
