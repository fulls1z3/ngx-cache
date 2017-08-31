// module
import { FsStorageLoader, FsStorageStaticLoader } from './src/fs-storage.loader';

export * from './src/models/fs-storage-settings';
export * from './src/fs-storage.loader';
export * from './src/fs-storage.service';

// for AoT compilation
export function fsStorageFactory(): FsStorageLoader {
  return new FsStorageStaticLoader();
}
