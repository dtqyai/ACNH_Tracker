import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import { initialize } from '../public/vendor/turnip-calculator/patterns.js';
import {
  TURNIP_STORAGE_KEY, emptyPrices, loadPrices, validatePrices, predictTurnips
} from '../public/turnip.js';

await initialize(await fs.readFile(new URL('../public/vendor/turnip-calculator/patterns_bg.wasm', import.meta.url)));

function pricesFrom(values) {
  const prices = emptyPrices();
  values.forEach((value, index) => { prices[index] = String(value); });
  return prices;
}

test('empty prices have no prediction; buy-only input preserves the upstream four pattern weights', () => {
  assert.equal(predictTurnips(emptyPrices()), null);
  const result = predictTurnips(pricesFrom([100]));
  assert.equal(result.approximate, false);
  assert.equal(result.patterns.length, 72);
  assert.deepEqual(result.probabilities, [0.35, 0.2625, 0.1375, 0.25]);
  assert.equal(result.peakMax, 600);
  assert.equal(result.ranges.length, 12);
});

test('a recorded large spike identifies the large-spike pattern and keeps the entered prices in range', () => {
  const prices = pricesFrom([100, 90, 85, 80, 75, 120, 180, 500]);
  const result = predictTurnips(prices);
  assert.equal(result.approximate, false);
  assert.deepEqual(result.probabilities, [0, 1, 0, 0]);
  assert.equal(result.patterns.length, 1);
  prices.slice(1).forEach((value, index) => {
    if (!value) return;
    assert.ok(result.ranges[index][0] <= Number(value));
    assert.ok(result.ranges[index][1] >= Number(value));
  });
  assert.ok(result.ranges[7][0] >= 140);
  assert.ok(result.ranges[7][1] <= 200);
});

test('a full declining week identifies the declining pattern', () => {
  const result = predictTurnips(pricesFrom([100, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35]));
  assert.equal(result.approximate, false);
  assert.deepEqual(result.probabilities, [0, 0, 1, 0]);
});

test('unknown buy price is evaluated without substituting a made-up purchase price', () => {
  const unknown = predictTurnips(pricesFrom(['', 91, 85]));
  const known = predictTurnips(pricesFrom([100, 91, 85]));
  assert.equal(unknown.approximate, false);
  assert.ok(unknown.patterns.length > known.patterns.length);
  assert.ok(unknown.peakMax > 600);
  assert.ok(Math.abs(unknown.probabilities.reduce((sum, value) => sum + value, 0) - 1) < 1e-10);
});

test('contradictory but valid prices are explicitly marked as approximate', () => {
  const result = predictTurnips(pricesFrom([100, 660, 660]));
  assert.equal(result.approximate, true);
  assert.ok(result.patterns.length > 0);
});

test('price validation accepts game boundaries and rejects invalid values without silently clamping', () => {
  for (const buy of ['90', '110']) assert.equal(validatePrices(pricesFrom([buy, 9, 660])), null);
  for (const buy of ['0', '89', '111', '100.5', 'abc', '1e2', '-90']) {
    const prices = pricesFrom([buy]);
    assert.equal(validatePrices(prices).index, 0);
    assert.throws(() => predictTurnips(prices), /买入价/);
  }
  for (const sell of ['0', '8', '661', '99.5', '-10', 'abc']) {
    assert.equal(validatePrices(pricesFrom([100, sell])).index, 1);
  }
});

test('turnip prices use a separate storage key and tolerate missing, malformed, or unavailable saved data', () => {
  const prices = pricesFrom([100, 90, '', 85]);
  const storage = {
    getItem(key) {
      assert.equal(key, TURNIP_STORAGE_KEY);
      assert.notEqual(key, 'acnh_collected');
      return JSON.stringify(prices);
    }
  };
  assert.deepEqual(loadPrices(storage), prices);
  for (const value of [null, 'invalid JSON', '{}', '[]', JSON.stringify(Array(13).fill(100))]) {
    assert.deepEqual(loadPrices({ getItem: () => value }), emptyPrices());
  }
  assert.deepEqual(loadPrices({ getItem() { throw new Error('Storage unavailable'); } }), emptyPrices());
});
