import { escapeHtml } from './ui.js';
import { hoursForMonth } from './schema.js';
import { getTimeRangeLabel } from './core.js';

// Reuse row nodes so a concurrent save cannot interrupt a label click or
// discard the latest checkbox intention while it waits for the write lock.
export function createTodayRows(collection) {
  const cache = new Map();

  function buildRow(item) {
    const row = document.createElement('div');
    row.className = 'today-item';
    row.dataset.todayId = item.id;
    const checkboxId = 'today-collected-' + item.id;
    row.innerHTML = `<input id="${checkboxId}" class="today-checkbox sr-only" type="checkbox" data-collection-id="${item.id}" aria-label="${escapeHtml(item.name)}，已收集">
      <label class="collect-toggle" for="${checkboxId}"><span class="check-box" aria-hidden="true"></span></label>
      <label class="today-name" for="${checkboxId}">${escapeHtml(item.name)}</label>`;
    for (const [value, className] of [
      [item.location === '海洋底部' ? null : item.location, 'tag-location'],
      [item.shadowSize, 'tag-shadow'],
      [item.weather === '无限制' ? null : item.weather, 'tag-weather'],
      [item.note, 'note']
    ]) {
      if (!value) continue;
      const tag = document.createElement('span');
      tag.className = className === 'note' ? className : 'tag ' + className;
      tag.textContent = value;
      row.appendChild(tag);
    }
    const hours = document.createElement('span');
    hours.className = 'today-hours';
    const price = document.createElement('span');
    price.className = 'today-price';
    price.textContent = item.price + ' 铃钱';
    row.append(hours, price);
    return row;
  }

  function render(container, items, { hemisphere, month, emptyText, fallback }) {
    const focused = container.contains(document.activeElement) ? document.activeElement : null;
    const previousRows = [...container.querySelectorAll('.today-item')];
    const focusedRow = focused?.closest('.today-item');
    const focusedIndex = previousRows.indexOf(focusedRow);
    const visibleIds = new Set(items.map(item => item.id));
    for (const child of [...container.children]) {
      if (!visibleIds.has(child.dataset.todayId)) child.remove();
    }
    let nextRow = container.firstChild;
    for (const item of items) {
      let row = cache.get(item.id);
      if (!row) {
        row = buildRow(item);
        cache.set(item.id, row);
      }
      const pending = collection.pendingValue(item.id);
      const collected = pending === undefined ? collection.collected.has(item.id) : pending;
      const input = row.querySelector('.today-checkbox');
      input.checked = collected;
      input.disabled = collection.loadFailed;
      row.classList.toggle('collected', collected);
      row.setAttribute('aria-busy', pending !== undefined);
      row.querySelector('.today-hours').textContent = getTimeRangeLabel(hoursForMonth(item, hemisphere, month));
      if (row !== nextRow) container.insertBefore(row, nextRow);
      nextRow = row.nextSibling;
    }
    if (!items.length) {
      const empty = document.createElement('div');
      empty.className = 'today-empty';
      empty.textContent = emptyText;
      container.appendChild(empty);
    }
    if (focused && (!focused.isConnected || focused.disabled)) {
      const inputs = container.querySelectorAll('.today-checkbox:not(:disabled)');
      const target = inputs[Math.min(Math.max(focusedIndex, 0), inputs.length - 1)] || fallback;
      target?.focus({ preventScroll: true });
    }
  }

  return { render };
}
