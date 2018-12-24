module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'project-wide',
        'core',
        'fs-storage',
        'platform-browser',
        'platform-server',
        'package',
        'npm',
        'webpack',
        'circle',
        'lint',
        'packaging',
        'changelog'
      ]
    ]
  }
};
