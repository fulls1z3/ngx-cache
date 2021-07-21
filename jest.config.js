module.exports = {
  displayName: 'ngx-cache',
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/tools/test/jest.setup.ts'],
  testResultsProcessor: './node_modules/jest-junit-reporter',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
      astTransformers: {
        before: ['jest-preset-angular/build/InlineFilesTransformer', 'jest-preset-angular/build/StripStylesTransformer']
      }
    }
  },
  moduleNameMapper: {
    '^@ngx-cache/core': '<rootDir>/packages/@ngx-cache/core/src/index.ts',
    '^@ngx-cache/platform-browser': '<rootDir>/packages/@ngx-cache/platform-browser/src/index.ts',
    '^@ngx-cache/platform-server': '<rootDir>/packages/@ngx-cache/platform-server/src/index.ts',
    '^@ngx-cache/fs-storage': '<rootDir>/packages/@ngx-cache/fs-storage/src/index.ts'
  },
  cache: false,
  silent: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'packages/@ngx-cache/core/src/**.ts',
    'packages/@ngx-cache/platform-browser/src/**.ts',
    'packages/@ngx-cache/platform-server/src/**.ts'
  ],
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
