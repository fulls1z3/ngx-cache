export abstract class FsStorageLoader {
  abstract get path(): string;

  abstract get quota(): number;
}

export class FsStorageStaticLoader implements FsStorageLoader {
  constructor(private readonly storagePath: string = './.cache',
              private readonly storageQuota: number = 5 * 1024 * 1024) {
  }

  get path(): string {
    return this.storagePath;
  }

  get quota(): number {
    return this.storageQuota;
  }
}
