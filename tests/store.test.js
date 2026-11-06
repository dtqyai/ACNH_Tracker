import assert from 'node:assert/strict';
import test from 'node:test';
import { getHarvArtWeek, parseBackup, readHarvArtCount, serializeBackup } from '../public/store.js';

test('Harv’s Island art count starts a new week on Monday at 05:00 local time', () => {
  const storage = { getItem: () => JSON.stringify({ week: '2024-12-30', count: 2 }) };
  assert.equal(readHarvArtCount(getHarvArtWeek(new Date(2025, 0, 6, 4, 59)), storage), 2);
  assert.equal(readHarvArtCount(getHarvArtWeek(new Date(2025, 0, 6, 5, 0)), storage), 0);
});

test('versioned and legacy backup round trips preserve unknown records', () => {
  for (const records of [[], ['fish_001'], ['fish_001', 'art_001', 'music_107', 'future_001']]) {
    const restored = parseBackup(serializeBackup(new Set(records)));
    assert.deepEqual([...restored], records);
  }
  assert.deepEqual([...parseBackup('["fish_001","bug_001"]')], ['fish_001', 'bug_001']);
});

test('invalid and oversized backups are rejected', () => {
  assert.throws(() => parseBackup('not json'), /JSON/);
  assert.throws(() => parseBackup('{"version":2,"collected":[]}'), /版本/);
  assert.throws(() => parseBackup('{"version":1,"collected":[42]}'), /字符串数组/);
  assert.throws(() => parseBackup(JSON.stringify(['x'.repeat(64 * 1024)])), /64 KB/);
});
