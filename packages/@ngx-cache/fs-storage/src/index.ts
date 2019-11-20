import { FsStorageStaticLoader } from './fs-storage.loader';

export * from './models/fs-storage-settings';
export * from './fs-storage.loader';
export * from './fs-storage.service';

export const fsStorageFactory = () => new FsStorageStaticLoader();
