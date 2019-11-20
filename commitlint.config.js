module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      ['core', 'fs-storage', 'platform-browser', 'platform-server', 'package', 'npm', 'circle', 'lint', 'packaging', 'changelog']
    ]
  }
};
