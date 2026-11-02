const STORAGE_KEY = 'acnh_collected';
const MAX_BACKUP_BYTES = 64 * 1024;

function byteLength(text) {
  return new TextEncoder().encode(text).byteLength;
}

export function parseBackup(text) {
  if (byteLength(text) > MAX_BACKUP_BYTES) throw new Error('备份文件不能超过 64 KB');
  let value;
  try {
    value = JSON.parse(text);
  } catch {
    throw new Error('这不是有效的 JSON 备份文件');
  }
  const records = Array.isArray(value) ? value : value?.collected;
  if (!Array.isArray(value) && value?.version !== 1) throw new Error('不支持的备份版本');
  if (!Array.isArray(records) || records.some(id => typeof id !== 'string')) {
    throw new Error('收集记录必须是字符串数组');
  }
  return new Set(records);
}

export function serializeBackup(collected) {
  return JSON.stringify({ version: 1, collected: [...collected] });
}

export function makeChanges(collected, ids, value) {
  return ids.reduce((changes, id) => {
    const before = collected.has(id);
    if (before !== value) changes.push({ id, before, after: value });
    return changes;
  }, []);
}

export class CollectionStore extends EventTarget {
  constructor(storage = window.localStorage) {
    super();
    this.storage = storage;
    this.collected = this.read();
    this.handleStorage = this.handleStorage.bind(this);
    window.addEventListener('storage', this.handleStorage);
  }

  read() {
    const raw = this.storage.getItem(STORAGE_KEY);
    return raw ? parseBackup(raw) : new Set();
  }

  has(id) {
    return this.collected.has(id);
  }

  notify() {
    this.dispatchEvent(new Event('change'));
  }

  commit(next) {
    const previous = this.collected;
    this.collected = next;
    try {
      this.storage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      this.notify();
    } catch (error) {
      this.collected = previous;
      throw error;
    }
  }

  set(id, value) {
    const next = new Set(this.collected);
    if (value) next.add(id);
    else next.delete(id);
    this.commit(next);
  }

  bulk(ids, value) {
    const changes = makeChanges(this.collected, ids, value);
    if (!changes.length) return changes;
    const next = new Set(this.collected);
    for (const change of changes) {
      if (value) next.add(change.id);
      else next.delete(change.id);
    }
    this.commit(next);
    return changes;
  }

  undo(changes) {
    const next = new Set(this.collected);
    let restored = 0;
    for (const change of changes) {
      if (next.has(change.id) !== change.after) continue;
      if (change.before) next.add(change.id);
      else next.delete(change.id);
      restored += 1;
    }
    if (restored) this.commit(next);
    return restored;
  }

  replace(records) {
    this.commit(new Set(records));
  }

  export() {
    return serializeBackup(this.collected);
  }

  handleStorage(event) {
    if (event.key !== STORAGE_KEY) return;
    try {
      this.collected = event.newValue ? parseBackup(event.newValue) : new Set();
      this.notify();
    } catch {
      // Ignore an incomplete write from another tab and retain the last valid state.
    }
  }
}

export { STORAGE_KEY, MAX_BACKUP_BYTES };
