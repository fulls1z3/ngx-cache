// libs
import { ngPackagr } from 'ng-packagr';

// module
import { root } from './helpers';

ngPackagr()
  .forProject(root(`./packages/@ngx-cache/${process.argv[2]}/ng-package.json`))
  .withTsConfig(root('./tools/build/tsconfig.package.json'))
  .build()
  .catch(() => process.exitCode = 1);
