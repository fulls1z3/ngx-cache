export class FsEvent {
  constructor(private readonly key: string,
              private readonly oldValue: any,
              private readonly newValue: any,
              private readonly pid: string,
              private readonly area: string = 'fs-storage') {
  }
}
