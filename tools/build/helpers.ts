import * as path from 'path';

export const NODE_MODULES = 'node_modules';

export function root(args: any = ''): string {
  const ROOT = path.resolve(__dirname, '../..');
  args = [].slice.call(arguments, 0);

  return path.join.apply(path, [ROOT].concat(args));
}
