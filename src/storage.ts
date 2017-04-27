// libs
import { EventEmitter } from 'events';

export abstract class Storage extends EventEmitter {
  abstract length: number;
  abstract keys: Array<string>;
  abstract setItem(key: string, value: any): boolean;
  abstract getItem(key: string): any;
  abstract removeItem(key: string): boolean;
  abstract key(index: number): string;
  abstract clear(): boolean;
}
