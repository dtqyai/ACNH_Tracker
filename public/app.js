import {
  CATEGORIES, CATEGORY_MAP, COLLECTIBLE_IDS, DATA_MAP,
  defaultFilters, defaultSort, filterItems, sortItems, getOptions,
  getItem, getOverallProgress, getProgress, isAvailableNow,
  formatMonths, monthsFor, timeDescription
} from './catalog.js';
import {
  CollectionStore, parseBackup, MAX_BACKUP_BYTES,
  HARV_ART_KEY, HARV_ART_LIMIT, getHarvArtWeek, readHarvArtCount
} from './store.js';
import { createTurnipCalculator } from './turnip-view.js';

const $ = selector => document.querySelector(selector);
const icon = (name, className = '') => `<svg class="${className}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));
const selected = (actual, expected) => actual === String(expected) ? 'selected' : '';
const checked = value => value ? 'checked' : '';
const PAGE_SIZE = 48;
const PREFS_KEY = 'island_atlas_preferences_v1';

const categoryDescriptions = {
  fish: '收录 80 种鱼类，出现时间按所选半球计算。',
  bug: '收录 80 种昆虫，出现时间按所选半球计算。',
  sea: '收录 40 种海洋生物，出现时间按所选半球计算。',
  art: '收录 43 件艺术品，只有真品计入收集进度。',
  music: '收录 107 张可收集唱片。',
  villager: '收录 417 位居民，名录不计入收集进度。'
};

function loadPreferences() {
  try {
    return JSON.parse(localStorage.getItem(PREFS_KEY) || '{}');
  } catch {
    return {};
  }
}

function restoreFilters(category, values = {}) {
  const defaults = defaultFilters(category);
  return Object.fromEntries(Object.entries(defaults).map(([key, fallback]) => [key, values[key] ?? fallback]));
}

const saved = loadPreferences();
const state = {
  category: CATEGORY_MAP[saved.category] || saved.category === 'turnip' ? saved.category : 'fish',
  hemisphere: ['north', 'south'].includes(saved.hemisphere) ? saved.hemisphere : 'north',
  filters: Object.fromEntries(CATEGORIES.map(category => [category.id,
    restoreFilters(category.id, saved.filters?.[category.id])
  ])),
  sorts: Object.fromEntries(CATEGORIES.map(category => [category.id,
    saved.sorts?.[category.id] || defaultSort(category.id)
  ])),
  todayUncollected: false,
  limit: PAGE_SIZE
};

let store;
let undoChanges = null;
let toastTimer;
let lastHour = new Date().getHours();
let detailItem = null;
try {
  store = new CollectionStore();
} catch (error) {
  // Keep the guide usable if browser storage is unavailable; edits will report the error.
  const memory = new Map();
  store = new CollectionStore({
    getItem: key => memory.get(key) || null,
    setItem: (key, value) => memory.set(key, value)
  });
  queueMicrotask(() => showToast(`浏览器存储不可用，本次记录无法持久保存`));
}

const turnipCalculator = createTurnipCalculator($('#turnip-panel'), showToast);

function savePreferences() {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify({
      category: state.category,
      hemisphere: state.hemisphere,
      filters: state.filters,
      sorts: state.sorts
    }));
  } catch {
    // Collection storage remains independent from optional UI preferences.
  }
}

function renderDate() {
  const now = new Date();
  const weekday = new Intl.DateTimeFormat('zh-CN', { weekday: 'long' }).format(now);
  $('#today-date').innerHTML = `<strong>${now.getMonth() + 1}月${now.getDate()}日</strong> · ${weekday}`;
}

function renderNavigation() {
  const markup = CATEGORIES.map(category => {
    const progress = getProgress(category.id, store.collected);
    const count = category.collectible ? `${progress.done}/${progress.total}` : progress.total;
    return `<button class="nav-item ${state.category === category.id ? 'active' : ''}"
      data-action="category" data-value="${category.id}" aria-current="${state.category === category.id ? 'page' : 'false'}">
      ${icon(category.icon)}<span class="nav-name">${category.name}</span><span class="nav-count">${count}</span>
    </button>`;
  }).join('') + `<button class="nav-item ${state.category === 'turnip' ? 'active' : ''}" data-action="category" data-value="turnip" aria-current="${state.category === 'turnip' ? 'page' : 'false'}">${icon('turnip')}<span class="nav-name">大头菜</span></button>`;
  $('#category-nav').innerHTML = markup;
  $('#mobile-category-nav').innerHTML = markup;
  document.querySelectorAll('[data-action="hemisphere"]').forEach(button => {
    const active = button.dataset.value === state.hemisphere;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function renderOverview() {
  const isTurnip = state.category === 'turnip';
  $('#overview').classList.toggle('turnip-overview', isTurnip);
  $('#overview').classList.toggle('overview-without-progress', !CATEGORY_MAP[state.category]?.collectible);
  if (isTurnip) {
    $('#overview').innerHTML = '<div class="overview-copy"><h1>大头菜计算器</h1><p>填写买入价与已知卖价，预测本周价格区间。</p></div>';
    return;
  }
  const category = CATEGORY_MAP[state.category];
  let progress = '';
  if (category.collectible) {
    const overall = getOverallProgress(store.collected);
    const current = getProgress(category.id, store.collected);
    progress = `<div class="overview-progress">
      <div class="progress-ring" style="--progress:${overall.percent * 3.6}deg">
        <div class="progress-ring-content"><strong>${overall.percent}%</strong><small>${overall.done} / ${overall.total}</small></div>
      </div>
      <div class="progress-label"><strong>总收集进度</strong><span>本类已收集 ${current.done} / ${current.total}</span></div>
    </div>`;
  }
  $('#overview').innerHTML = `
    <div class="overview-copy">
      <h1>${category.plural}</h1>
      <p>${categoryDescriptions[category.id]}</p>
    </div>${progress}`;
}

function renderToday() {
  const category = CATEGORY_MAP[state.category];
  if (!category?.seasonal) {
    $('#today-panel').innerHTML = '';
    return;
  }
  const now = new Date();
  const allAvailable = DATA_MAP[state.category].filter(item => isAvailableNow(item, state.hemisphere, now));
  const available = state.todayUncollected
    ? allAvailable.filter(item => !store.has(item.id))
    : allAvailable;
  const visible = available.slice(0, 8);
  const uncollectedCount = allAvailable.filter(item => !store.has(item.id)).length;
  const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const items = visible.length ? visible.map(item => `
    <article class="today-item ${store.has(item.id) ? 'is-collected' : ''}">
      <div class="today-thumb">${imageMarkup(item)}</div>
      <div class="today-info"><strong>${escapeHtml(item.name)}</strong><span>${item.price.toLocaleString()} 铃钱</span><span>${timeDescription(item, state.hemisphere, now.getMonth() + 1)}</span></div>
      <button class="mini-check" data-action="toggle" data-id="${item.id}" aria-pressed="${store.has(item.id)}" aria-label="${store.has(item.id) ? '取消收集' : '标记已收集'}${escapeHtml(item.name)}">${icon('check')}</button>
    </article>`).join('') : `<div class="today-empty">${state.todayUncollected && uncollectedCount === 0 ? '此刻能遇到的都已收齐，去看看别处吧。' : '这个时段没有符合当前条件的生物。'}</div>`;

  $('#today-panel').innerHTML = `<div class="today-card">
    <div class="section-head">
      <div class="section-title-wrap"><span class="section-icon">${icon('spark')}</span><div><h2>当前可收集</h2><p>${state.hemisphere === 'north' ? '北半球' : '南半球'} · ${now.getMonth() + 1}月${now.getDate()}日 ${time} · 当前 ${allAvailable.length} 种</p></div></div>
      <label class="today-toggle"><input type="checkbox" id="today-uncollected" ${checked(state.todayUncollected)}>只看未收集</label>
    </div>
    <div class="today-list">${items}</div>
    ${available.length ? `<div class="today-more"><button class="text-button" data-action="show-today-all">查看全部 ${available.length} 项 ${icon('arrow')}</button></div>` : ''}
  </div>`;
}

function renderHarvArtCounter() {
  const panel = $('#harv-art-counter');
  panel.hidden = state.category !== 'art';
  if (panel.hidden) return;

  const count = readHarvArtCount(getHarvArtWeek());
  const label = `${count} / ${HARV_ART_LIMIT}`;
  const output = $('#harv-art-count');
  if (output.textContent !== label) output.textContent = label;
  $('#harv-art-decrease').disabled = count === 0;
  $('#harv-art-increase').disabled = count === HARV_ART_LIMIT;
}

function optionControl(category, field, label, options, value = state.filters[category][field]) {
  return `<label class="control"><span class="control-label">${label}</span><select id="filter-${field}" data-filter="${field}">
    ${options.map(([optionValue, optionLabel]) => `<option value="${escapeHtml(optionValue)}" ${selected(value, optionValue)}>${escapeHtml(optionLabel)}</option>`).join('')}
  </select></label>`;
}

function renderFilters() {
  const category = state.category;
  const now = new Date();
  const controls = [];
  controls.push(optionControl(category, 'sort', '排列方式', sortOptions(category), state.sorts[category]));

  if (CATEGORY_MAP[category].collectible) {
    controls.push(optionControl(category, 'status', '收集状态', [
      ['all', '全部状态'], ['uncollected', '尚未收集'], ['collected', '已经收集']
    ]));
  }
  if (CATEGORY_MAP[category].seasonal) {
    controls.push(optionControl(category, 'month', '出现月份', [
      ['all', '不限月份'], ...Array.from({ length: 12 }, (_, index) => [String(index + 1), `${index + 1}月`])
    ]));
    controls.push(optionControl(category, 'hour', '出现时段', [
      ['current', `跟随当前 · ${String(now.getHours()).padStart(2, '0')}:00`],
      ['all', '不限时段'], ['allday', '仅全天出现'],
      ...Array.from({ length: 24 }, (_, hour) => [String(hour), `${String(hour).padStart(2, '0')}:00–${String((hour + 1) % 24).padStart(2, '0')}:00`])
    ]));
  }

  const labels = {
    location: '栖息场所', shadowSize: '鱼影大小', weather: '天气条件', artType: '作品类型',
    authenticity: '真伪情况', acquisition: '获取方式', species: '种族', gender: '性别',
    personality: '性格', birthdayMonth: '生日月份', hobby: '爱好', collaboration: '联动组合'
  };
  const fields = {
    fish: ['location', 'shadowSize'], bug: ['location', 'weather'], sea: ['shadowSize'],
    art: ['artType', 'authenticity'], music: ['acquisition'],
    villager: ['species', 'gender', 'personality', 'birthdayMonth', 'hobby', 'collaboration']
  };
  for (const field of fields[category]) {
    controls.push(optionControl(category, field, labels[field], [
      ['all', `不限${labels[field]}`], ...getOptions(category, field).map(value => [value, value])
    ]));
  }

  $('#filter-panel').innerHTML = `<div class="filter-row">
    ${controls.join('')}
    <button class="filter-reset" data-action="reset-filters">${icon('reset')}重置条件</button>
  </div>`;
}

function sortOptions(category) {
  if (category === 'villager') return [['name', '名称 · 升序'], ['name-desc', '名称 · 降序'], ['birthday', '生日先后']];
  const options = [['default', '默认顺序'], ['name', '名称 · 升序'], ['status', '已收集优先']];
  if (['fish', 'bug', 'sea'].includes(category)) {
    options.push(['price-asc', '价格 · 从低到高'], ['price-desc', '价格 · 从高到低']);
  }
  return options;
}

function currentResults() {
  return sortItems(filterItems(state.category, state.filters[state.category], {
    collected: store.collected, hemisphere: state.hemisphere
  }), state.category, state.sorts[state.category], store.collected);
}

function filterSummary() {
  const filters = state.filters[state.category];
  const parts = [];
  if (CATEGORY_MAP[state.category].seasonal) {
    parts.push(state.hemisphere === 'north' ? '北半球' : '南半球');
    if (filters.month !== 'all') parts.push(`${filters.month}月`);
    if (filters.hour === 'current') parts.push('当前时段');
    if (filters.hour === 'allday') parts.push('全天出现');
    if (!['all', 'current', 'allday'].includes(filters.hour)) parts.push(`${String(filters.hour).padStart(2, '0')}:00`);
  }
  if (filters.status === 'collected') parts.push('已收集');
  if (filters.status === 'uncollected') parts.push('未收集');
  for (const [key, value] of Object.entries(filters)) {
    if (!['status', 'month', 'hour'].includes(key) && value !== 'all') parts.push(value);
  }
  return parts.length ? parts.join(' · ') : '全部条目';
}

function renderList() {
  const results = currentResults();
  const visible = results.slice(0, state.limit);
  $('#result-count').innerHTML = `<strong>${results.length}</strong> 项结果`;
  $('#list-toolbar').innerHTML = `<div class="active-summary">${escapeHtml(filterSummary())} · 显示 ${visible.length} / ${results.length}</div>
    ${CATEGORY_MAP[state.category].collectible ? `<div class="bulk-actions">
      <button class="small-button" data-action="bulk" data-value="true" ${results.length ? '' : 'disabled'}>标记筛选结果</button>
      <button class="small-button" data-action="bulk" data-value="false" ${results.length ? '' : 'disabled'}>取消筛选结果</button>
    </div>` : ''}`;
  $('#item-grid').innerHTML = visible.length ? visible.map(item => cardMarkup(state.category, item)).join('') : `
    <div class="empty-state"><div class="empty-icon">${icon(CATEGORY_MAP[state.category].icon)}</div><h3>没有符合条件的条目</h3><p>请调整或重置筛选条件。</p><button class="button secondary" data-action="reset-filters">重置筛选条件</button></div>`;
  $('#load-more-wrap').innerHTML = results.length > visible.length
    ? `<button class="button secondary load-more" data-action="load-more">${icon('more')}再看 ${Math.min(PAGE_SIZE, results.length - visible.length)} 项</button>`
    : '';
}

function imageMarkup(item, alt = '') {
  return `<img src="${escapeHtml(item.image)}" data-src="${escapeHtml(item.image)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async">
    <div class="image-fallback" hidden>${icon('image' in item ? CATEGORY_MAP[state.category]?.icon || 'leaf' : 'leaf')}<span>图片暂未加载</span><button type="button" data-action="retry-image">重试</button></div>`;
}

function cardMarkup(category, item) {
  const isCollected = store.has(item.id);
  const collect = CATEGORY_MAP[category].collectible ? `<button class="collect-button" data-action="toggle" data-id="${item.id}" aria-pressed="${isCollected}" aria-label="${isCollected ? '取消收集' : '标记已收集'}${escapeHtml(item.name)}" title="${isCollected ? '已收集' : '标记已收集'}">${icon('check')}</button>` : '';
  let subtitle = '';
  let body = '';
  let tags = [];

  if (['fish', 'bug', 'sea'].includes(category)) {
    subtitle = item.location;
    body = `<div class="card-price">${item.price.toLocaleString()} <small>铃钱</small></div>
      <div class="card-availability">
        <div class="availability-line">${icon('calendar')}<span>${formatMonths(monthsFor(item, state.hemisphere))}</span></div>
        <div class="availability-line">${icon('clock')}<span>${timeDescription(item, state.hemisphere, state.filters[category].month)}</span></div>
      </div>`;
    tags = category === 'bug' ? [item.location, item.weather] : [item.location, item.shadowSize ? `鱼影 · ${item.shadowSize}` : ''];
  } else if (category === 'art') {
    subtitle = item.realName;
    tags = [item.artType, item.authenticity];
    body = `<p class="card-note">${escapeHtml(item.genuineNote)}</p><button class="card-detail-link" data-action="detail" data-id="${item.id}">查看真伪对照 ${icon('arrow')}</button>`;
  } else if (category === 'music') {
    subtitle = item.englishName;
    tags = [item.acquisition];
    body = `<div class="card-price">${item.buyPrice ? `${item.buyPrice.toLocaleString()} <small>铃钱</small>` : '非卖品'}</div><button class="card-detail-link" data-action="detail" data-id="${item.id}">获取说明 ${icon('arrow')}</button>`;
  } else if (category === 'villager') {
    subtitle = item.englishName;
    tags = [item.gender, item.personality, item.hobby];
    body = `<div class="card-availability"><div class="availability-line">${icon('calendar')}<span>生日 · ${item.birthdayMonth}${item.birthdayDay}日</span></div><div class="availability-line">${icon('spark')}<span>“${escapeHtml(item.catchphrase)}”</span></div></div>`;
  }

  return `<article class="item-card card-category-${category} ${isCollected ? 'is-collected' : ''}">
    ${collect}<div class="card-top">
      <div class="item-image-button">${imageMarkup(item, item.name)}</div>
      <div class="card-main">
        <button class="card-title-button" data-action="detail" data-id="${item.id}"><h3>${escapeHtml(item.name)}</h3></button>
        <p class="card-subtitle" title="${escapeHtml(subtitle)}">${escapeHtml(subtitle)}</p>
      </div>
    </div>
    ${category === 'art' ? `<div class="card-tags">${tags.map((tag, index) => `<span class="tag ${index ? 'warm' : ''}">${escapeHtml(tag)}</span>`).join('')}</div>${body}` : `${['fish', 'bug', 'sea'].includes(category) ? `<div class="card-tags">${tags.filter(Boolean).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div>` : ''}${body}${['music', 'villager'].includes(category) ? `<div class="card-tags">${tags.map((tag, index) => `<span class="tag ${index === 0 ? 'green' : ''}">${escapeHtml(tag)}</span>`).join('')}</div>` : ''}`}
  </article>`;
}

function renderDetail() {
  if (!detailItem) return;
  const { category, item } = detailItem;
  const isCollected = store.has(item.id);
  const collect = CATEGORY_MAP[category].collectible ? `<button class="button ${isCollected ? 'secondary' : 'primary'} detail-collect" data-action="toggle" data-id="${item.id}">${icon('check')}${isCollected ? '已收集 · 点击取消' : '标记为已收集'}</button>` : '';
  let facts = [];
  let extra = '';
  let subtitle = item.englishName || item.realName || item.location;

  if (['fish', 'bug', 'sea'].includes(category)) {
    facts = [['售价', `${item.price.toLocaleString()} 铃钱`], ['场所', item.location], ['出现月份', formatMonths(monthsFor(item, state.hemisphere))], ['出现时间', timeDescription(item, state.hemisphere)]];
    if (item.shadowSize) facts.push(['鱼影', item.shadowSize]);
    if (item.weather) facts.push(['天气', item.weather]);
  } else if (category === 'art') {
    facts = [['类型', item.artType], ['真伪情况', item.authenticity], ['原作', item.realName]];
    extra = `<div class="detail-section"><h3>鉴别要点</h3><div class="authenticity-notes"><div class="note-box real"><strong>真品</strong>${escapeHtml(item.genuineNote)}</div>${item.fakeNote ? `<div class="note-box fake"><strong>赝品</strong>${escapeHtml(item.fakeNote)}</div>` : ''}</div></div>
      <div class="detail-section"><h3>图片对照</h3><div class="comparison-grid">${item.comparisons.map(comparison => `<div class="comparison"><figure><div class="comparison-image">${imageMarkup({ image: comparison.url }, `${comparison.label}对照图`)}</div><figcaption>${comparison.label}</figcaption></figure></div>`).join('')}</div></div>`;
  } else if (category === 'music') {
    facts = [['英文名', item.englishName], ['获取方式', item.acquisition], ['购买价格', item.buyPrice ? `${item.buyPrice.toLocaleString()} 铃钱` : '无法购买']];
    extra = `<div class="detail-section"><h3>获取说明</h3><p class="card-note" style="-webkit-line-clamp:unset">${escapeHtml(item.note)}</p></div>`;
  } else {
    facts = [['种族', item.species], ['性别', item.gender], ['性格', item.personality], ['爱好', item.hobby], ['生日', `${item.birthdayMonth}${item.birthdayDay}日`], ['组合', item.collaboration]];
    extra = `<div class="detail-section"><h3>初始口头禅</h3><div class="catchphrase">“${escapeHtml(item.catchphrase)}”</div></div>`;
  }

  $('#detail-content').innerHTML = `<div class="detail-hero"><div class="detail-image ${category}">${imageMarkup(item, item.name)}</div><div class="detail-heading"><h2 id="detail-title">${escapeHtml(item.name)}</h2><p>${escapeHtml(subtitle)}</p></div></div>
    <div class="detail-section"><div class="detail-facts">${facts.map(([label, value]) => `<div class="fact"><span>${label}</span><strong>${escapeHtml(value)}</strong></div>`).join('')}</div></div>
    ${extra}${collect}${item.sourceUrl ? `<a class="source-link" href="${escapeHtml(item.sourceUrl)}" target="_blank" rel="noreferrer">查看原始资料 ${icon('arrow')}</a>` : ''}`;
}

function renderBackupSummary() {
  const progress = getOverallProgress(store.collected);
  $('#backup-summary').innerHTML = `<strong>${progress.done} <small>/ ${progress.total}</small></strong><span>已收集 ${progress.percent}% · 备份包含未知图鉴记录</span>`;
}

function render() {
  const active = document.activeElement;
  const focusId = active?.id;
  const selection = active && typeof active.selectionStart === 'number' ? [active.selectionStart, active.selectionEnd] : null;
  renderDate();
  renderNavigation();
  renderOverview();
  renderToday();
  renderHarvArtCounter();
  const isTurnip = state.category === 'turnip';
  $('.catalog-section').hidden = isTurnip;
  $('#today-panel').hidden = isTurnip;
  $('#turnip-panel').hidden = !isTurnip;
  $('.hemisphere-switch').hidden = isTurnip;
  if (isTurnip) {
    turnipCalculator.render();
  } else {
    renderFilters();
    renderList();
  }
  renderBackupSummary();
  if (focusId) {
    const next = document.getElementById(focusId);
    if (next) {
      next.focus({ preventScroll: true });
      if (selection && typeof next.setSelectionRange === 'function') next.setSelectionRange(...selection);
    }
  }
}

function showToast(message, withUndo = false) {
  clearTimeout(toastTimer);
  const toast = $('#toast');
  toast.innerHTML = `<span>${escapeHtml(message)}</span>${withUndo ? '<button data-action="undo">撤销</button>' : ''}`;
  toast.classList.add('visible');
  toastTimer = setTimeout(() => toast.classList.remove('visible'), withUndo ? 7000 : 3200);
}

function openDetail(id) {
  const item = getItem(state.category, id);
  if (!item) return;
  detailItem = { category: state.category, item };
  renderDetail();
  $('#detail-dialog').showModal();
}

function downloadBackup() {
  const blob = new Blob([store.export()], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const date = new Date();
  const stamp = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  link.href = url;
  link.download = `岛藏收集记录-${stamp}.json`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast('备份已导出');
}

async function importBackup(file) {
  try {
    if (!file) return;
    if (file.size > MAX_BACKUP_BYTES) throw new Error('备份文件不能超过 64 KB');
    const records = parseBackup(await file.text());
    if (store.collected.size && !window.confirm('导入会替换当前收集记录，确定继续吗？')) return;
    const unknown = [...records].filter(id => !COLLECTIBLE_IDS.has(id)).length;
    store.replace(records);
    undoChanges = null;
    $('#backup-dialog').close();
    showToast(`已导入 ${records.size} 项记录${unknown ? `，其中 ${unknown} 项属于其他图鉴版本` : ''}`);
  } catch (error) {
    showToast(error.message || '导入失败，请检查备份文件');
  } finally {
    $('#backup-file').value = '';
  }
}

function retryImage(button) {
  const container = button.closest('.item-image-button, .today-thumb, .detail-image, .comparison-image');
  const image = container?.querySelector('img[data-src]');
  if (!image) return;
  delete image.dataset.failed;
  image.hidden = false;
  container.querySelector('.image-fallback').hidden = true;
  image.src = image.dataset.src;
}

document.addEventListener('click', event => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const { action, id, value } = button.dataset;
  try {
    switch (action) {
      case 'category':
        state.category = value;
        state.limit = PAGE_SIZE;
        savePreferences();
        render();
        break;
      case 'hemisphere':
        state.hemisphere = value;
        savePreferences();
        render();
        break;
      case 'harv-art-count': {
        const week = getHarvArtWeek();
        const count = Math.min(HARV_ART_LIMIT, Math.max(0, readHarvArtCount(week) + Number(value)));
        localStorage.setItem(HARV_ART_KEY, JSON.stringify({ week, count }));
        renderHarvArtCounter();
        break;
      }
      case 'toggle': {
        store.set(id, !store.has(id));
        if (detailItem?.item.id === id) renderDetail();
        break;
      }
      case 'detail':
        openDetail(id);
        break;
      case 'close-detail':
        $('#detail-dialog').close();
        break;
      case 'reset-filters':
        state.filters[state.category] = defaultFilters(state.category);
        state.sorts[state.category] = defaultSort(state.category);
        state.limit = PAGE_SIZE;
        savePreferences();
        render();
        break;
      case 'show-today-all':
        state.filters[state.category].month = String(new Date().getMonth() + 1);
        state.filters[state.category].hour = 'current';
        if (state.todayUncollected) state.filters[state.category].status = 'uncollected';
        state.limit = PAGE_SIZE;
        savePreferences();
        render();
        $('.catalog-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      case 'load-more':
        state.limit += PAGE_SIZE;
        renderList();
        break;
      case 'bulk': {
        const desired = value === 'true';
        const changes = store.bulk(currentResults().map(item => item.id), desired);
        undoChanges = changes.length ? changes : null;
        showToast(changes.length ? `已${desired ? '标记' : '取消'} ${changes.length} 项` : '筛选结果无需修改', changes.length > 0);
        break;
      }
      case 'undo': {
        if (!undoChanges) break;
        const restored = store.undo(undoChanges);
        undoChanges = null;
        showToast(`已撤销 ${restored} 项修改`);
        break;
      }
      case 'open-backup':
        renderBackupSummary();
        $('#backup-dialog').showModal();
        break;
      case 'close-backup':
        $('#backup-dialog').close();
        break;
      case 'export':
        downloadBackup();
        break;
      case 'retry-image':
        retryImage(button);
        break;
      default:
        break;
    }
  } catch (error) {
    showToast(`操作未保存：${error.message || '请稍后重试'}`);
  }
});

document.addEventListener('input', event => {
  const field = event.target.dataset.filter;
  if (!field) return;
  if (field === 'sort') state.sorts[state.category] = event.target.value;
  else state.filters[state.category][field] = event.target.value;
  state.limit = PAGE_SIZE;
  savePreferences();
  render();
});

document.addEventListener('change', event => {
  if (event.target.id === 'today-uncollected') {
    state.todayUncollected = event.target.checked;
    renderToday();
  }
  if (event.target.id === 'backup-file') importBackup(event.target.files[0]);
});

document.addEventListener('error', event => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement) || !image.dataset.src) return;
  image.dataset.failed = 'true';
  image.hidden = true;
  const fallback = image.parentElement.querySelector('.image-fallback');
  if (fallback) fallback.hidden = false;
}, true);

window.addEventListener('online', () => {
  document.querySelectorAll('img[data-failed="true"]').forEach(image => {
    delete image.dataset.failed;
    image.hidden = false;
    const fallback = image.parentElement.querySelector('.image-fallback');
    if (fallback) fallback.hidden = true;
    image.src = image.dataset.src;
  });
});

store.addEventListener('change', () => {
  render();
  if (detailItem && $('#detail-dialog').open) renderDetail();
});

$('#detail-dialog').addEventListener('click', event => {
  if (event.target === $('#detail-dialog')) $('#detail-dialog').close();
});
$('#backup-dialog').addEventListener('click', event => {
  if (event.target === $('#backup-dialog')) $('#backup-dialog').close();
});
$('#backup-file').addEventListener('click', event => { event.target.value = ''; });

render();
setInterval(() => {
  const hour = new Date().getHours();
  if (hour !== lastHour) {
    lastHour = hour;
    render();
  } else {
    renderDate();
    renderToday();
    renderHarvArtCounter();
  }
}, 60_000);
