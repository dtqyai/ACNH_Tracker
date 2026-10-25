import { value as first } from './dependency-a.js'
import { value as second } from './dependency-b.js';
const text = `import { absent } from './does-not-exist.js';
export const absent = 'text only';`;
globalThis.bundleFixture = {
  first, second, text,
  load: async () => (await import('./dependency-b.js')).value
};
