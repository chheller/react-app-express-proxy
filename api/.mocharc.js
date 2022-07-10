module.exports = {
  'allow-uncaught': false,
  'async-only': false,
  bail: false,
  'check-leaks': false,
  color: true,
  delay: false,
  diff: true,
  exit: false, // could be expressed as "'no-exit': true"
  extension: ['ts'],
  'fail-zero': true,
  'forbid-only': false,
  'forbid-pending': false,
  'full-trace': false,
  global: ['jQuery', '$'],
  growl: false,
  'inline-diffs': false,
  jobs: 1,
  'node-option': ['unhandled-rejections=strict'], // without leading "--", also V8 flags
  package: './package.json',
  parallel: false,
  recursive: false,
  reporter: 'spec',

  require: [
    'ts-node/register',
    './src/test/mocha.setup.ts',
    './src/test/mocha.teardown.ts',
  ],
  retries: 1,
  slow: '75',
  sort: false,
  spec: ['**/*.test.ts'], // the positional arguments!
  timeout: '35000', // same as "timeout: '2s'"
  // timeout: false, / same as "timeout: 0"
  'trace-warnings': true, // node flags ok
  ui: 'bdd',
  'v8-stack-trace-limit': 100, // V8 flags are prepended with "v8-"
  watch: false,
  'watch-files': ['src/**/*.ts', 'src/**/*.test.ts'],
};
