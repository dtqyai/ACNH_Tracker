import assert from 'node:assert/strict';
import test from 'node:test';
import {
  CATEGORIES, COLLECTIBLE_IDS, DATA_MAP, defaultFilters, filterItems, sortItems,
  formatHourRanges, formatMonths, hoursForMonth, isAvailableNow, getOverallProgress
} from '../public/catalog.js';

const run = (category, overrides = {}, collected = new Set(), hemisphere = 'north') => filterItems(
  category, { ...defaultFilters(category), ...overrides },
  { collected, hemisphere, now: new Date(2026, 10, 2, 12) }
);

test('catalogue contains every collectible and browse-only category', () => {
  assert.deepEqual(Object.fromEntries(CATEGORIES.map(({ id }) => [id, DATA_MAP[id].length])), {
    fish: 80, bug: 80, sea: 40, art: 43, music: 107, villager: 417
  });
  assert.equal(COLLECTIBLE_IDS.size, 350);
  assert.equal(getOverallProgress(new Set(COLLECTIBLE_IDS)).percent, 100);
});

test('month and hour filters compose with both hemispheres', () => {
  for (const category of ['fish', 'bug', 'sea']) {
    for (const item of DATA_MAP[category]) {
      for (const hemisphere of ['north', 'south']) {
        for (let month = 1; month <= 12; month += 1) {
          const expectedMonths = hemisphere === 'north' ? item.northMonths : item.southMonths;
          const hours = hoursForMonth(item, hemisphere, month);
          assert.equal(expectedMonths.includes(month), hours.length > 0, item.id);
          for (let hour = 0; hour < 24; hour += 1) {
            const result = filterItems(category, { ...defaultFilters(category), month: String(month), hour: String(hour) }, { hemisphere });
            assert.equal(result.some(candidate => candidate.id === item.id), hours.includes(hour), `${item.id} ${hemisphere} ${month} ${hour}`);
          }
        }
      }
    }
  }
});

test('all-day, unrestricted and current availability use month-specific seasons', () => {
  const fish = DATA_MAP.fish.find(item => item.id === 'fish_027');
  assert.equal(isAvailableNow(fish, 'north', new Date(2026, 2, 1, 12)), false);
  assert.equal(isAvailableNow(fish, 'north', new Date(2026, 8, 1, 12)), true);
  assert.equal(isAvailableNow(fish, 'south', new Date(2026, 2, 1, 12)), true);
  assert.ok(run('fish', { month: 'all', hour: '12' }).some(item => item.id === fish.id));
  assert.ok(run('fish', { month: 'all', hour: 'allday' }).every(item => {
    return item.northMonths.some(month => hoursForMonth(item, 'north', month).length === 24);
  }));
});

test('collection and category-specific filters work together', () => {
  const collected = new Set(['fish_001', 'art_001', 'music_001']);
  assert.ok(run('fish', { status: 'collected' }, collected).every(item => collected.has(item.id)));
  assert.ok(run('fish', { status: 'uncollected', location: '河流' }, collected).every(item => item.location === '河流' && !collected.has(item.id)));
  assert.deepEqual(run('art', { artType: '雕塑', authenticity: '仅真品' }).map(item => item.name).sort(), ['伟大的雕塑', '似曾相识的雕塑']);
  assert.equal(run('music', { acquisition: '隐藏点播' }).length, 3);
  assert.equal(run('music', { status: 'collected' }, collected)[0].id, 'music_001');
  assert.equal(run('villager', { species: '猫', gender: '♂', personality: '自恋B型', birthdayMonth: '10月', hobby: '自然' })[0].name, '杰克');
});

test('sort options do not mutate catalogue order', () => {
  const original = DATA_MAP.fish.map(item => item.id);
  const sorted = sortItems(DATA_MAP.fish, 'fish', 'price-desc', new Set());
  assert.ok(sorted.every((item, index) => index === 0 || sorted[index - 1].price >= item.price));
  assert.deepEqual(DATA_MAP.fish.map(item => item.id), original);
});

test('hour and month labels use readable exclusive boundaries', () => {
  assert.equal(formatHourRanges([0, 1, 2, 21, 22, 23]), '21:00–次日03:00');
  assert.equal(formatHourRanges([23]), '23:00–次日00:00');
  assert.equal(formatHourRanges([9, 10, 16]), '09:00–11:00 / 16:00–17:00');
  assert.equal(formatHourRanges(Array.from({ length: 24 }, (_, index) => index)), '全天');
  assert.equal(formatMonths([1, 2, 3, 11, 12]), '1–3月、11–12月');
});
