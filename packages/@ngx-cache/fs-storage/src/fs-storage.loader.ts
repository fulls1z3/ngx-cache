import { FsStorageSettings } from './models/fs-storage-settings';

export abstract class FsStorageLoader {
  abstract get path(): string;

  abstract get quota(): number;
}

export class FsStorageStaticLoader implements FsStorageLoader {
  get path(): string {
    return this.providedSettings.path;
  }

  get quota(): number {
    return this.providedSettings.quota;
  }

  constructor(
    private readonly providedSettings: FsStorageSettings = {
      path: './.cache',
      quota: 5 * 1024 * 1024
    }
  ) {}
}
