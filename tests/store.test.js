import assert from 'node:assert/strict';
import test from 'node:test';
import { makeChanges, parseBackup, serializeBackup } from '../public/store.js';

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

test('bulk changes exclude no-ops and retain before and after states', () => {
  const changes = makeChanges(new Set(['already']), ['already', 'new', 'other'], true);
  assert.deepEqual(changes, [
    { id: 'new', before: false, after: true },
    { id: 'other', before: false, after: true }
  ]);
});
