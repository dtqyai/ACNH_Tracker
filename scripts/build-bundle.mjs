import { readFile, writeFile } from 'node:fs/promises';
import { buildBrowserBundle } from './browser-bundle.mjs';

const outputUrl = new URL('../bundle.js', import.meta.url);
const bundle = await buildBrowserBundle();

if (process.argv.includes('--check')) {
  const current = await readFile(outputUrl, 'utf8').catch(() => '');
  if (current !== bundle) {
    console.error('bundle.js is out of date. Run npm run build.');
    process.exitCode = 1;
  }
} else {
  await writeFile(outputUrl, bundle);
  console.log('Generated bundle.js.');
}
