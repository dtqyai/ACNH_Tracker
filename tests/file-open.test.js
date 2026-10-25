import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

import { buildBrowserBundle } from '../scripts/browser-bundle.mjs';

const root = new URL('../', import.meta.url);

test('index loads a browser-classic bundle for direct file opening', async () => {
  const index = await readFile(new URL('index.html', root), 'utf8');
  const bundle = await readFile(new URL('bundle.js', root), 'utf8');

  assert.match(index, /<script src="bundle\.js" defer><\/script>/);
  assert.doesNotMatch(index, /<script[^>]+type="module"/);
  assert.doesNotMatch(bundle, /^\s*(?:import|export)\s/m);
  assert.doesNotThrow(() => new vm.Script(bundle, { filename: 'bundle.js' }));
});

test('browser bundle supports standard module syntax and isolates private bindings', async () => {
  const bundle = await buildBrowserBundle('tests/fixtures/bundle/entry.js');
  const context = vm.createContext({});
  new vm.Script(bundle).runInContext(context);
  assert.equal(context.bundleFixture.first, 'a:template');
  assert.equal(context.bundleFixture.second, 'b');
  assert.match(context.bundleFixture.text, /import.*does-not-exist/);
  assert.match(context.bundleFixture.text, /export const absent/);
  assert.equal(await context.bundleFixture.load(), 'b');
});

test('browser bundle reports missing import bindings', async () => {
  await assert.rejects(buildBrowserBundle('tests/fixtures/bundle/invalid-entry.js'), /No matching export.*missing/s);
});
