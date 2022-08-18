'use strict';

const repositoryProvider = require('..');
const assert = require('assert').strict;

assert.strictEqual(repositoryProvider(), 'Hello from repositoryProvider');
console.info("repositoryProvider tests passed");
