export class FsItemMetadata {
  size: number;

  constructor(private readonly key: string,
              private readonly index: number) {
  }
}
