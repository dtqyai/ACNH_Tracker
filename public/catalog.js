import { DATA_MAP } from './data/data.js';

export const CATEGORIES = [
  { id: 'fish', name: '鱼类', plural: '鱼类图鉴', icon: 'fish', collectible: true, seasonal: true },
  { id: 'bug', name: '昆虫', plural: '昆虫图鉴', icon: 'bug', collectible: true, seasonal: true },
  { id: 'sea', name: '海洋生物', plural: '海洋生物图鉴', icon: 'shell', collectible: true, seasonal: true },
  { id: 'art', name: '艺术品', plural: '艺术品图鉴', icon: 'art', collectible: true },
  { id: 'music', name: '唱片', plural: '唱片图鉴', icon: 'music', collectible: true },
  { id: 'villager', name: '小动物', plural: '居民名录', icon: 'paw', collectible: false }
];

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map(category => [category.id, category]));
export const COLLECTIBLE_IDS = new Set(
  CATEGORIES.filter(category => category.collectible)
    .flatMap(category => DATA_MAP[category.id])
    .map(item => item.id)
);

export function defaultFilters(category) {
  const base = {};
  if (CATEGORY_MAP[category].collectible) base.status = 'all';
  if (CATEGORY_MAP[category].seasonal) {
    base.month = 'all';
    base.hour = 'current';
  }
  const fields = {
    fish: ['location', 'shadowSize'],
    bug: ['location', 'weather'],
    sea: ['shadowSize'],
    art: ['artType', 'authenticity'],
    music: ['acquisition'],
    villager: ['species', 'gender', 'personality', 'birthdayMonth', 'hobby', 'collaboration']
  };
  for (const field of fields[category]) base[field] = 'all';
  return base;
}

export function defaultSort(category) {
  return category === 'villager' ? 'name' : 'default';
}

export function getOptions(category, field) {
  if (field === 'birthdayMonth') return Array.from({ length: 12 }, (_, index) => `${index + 1}月`);
  return [...new Set(DATA_MAP[category].map(item => item[field]).filter(Boolean))];
}

export function monthsFor(item, hemisphere) {
  return hemisphere === 'south' ? item.southMonths : item.northMonths;
}

export function hoursForMonth(item, hemisphere, month) {
  if (month === null) return item.hours;
  const northMonth = hemisphere === 'south' ? ((month + 5) % 12) + 1 : month;
  if (!item.northMonths.includes(northMonth)) return [];
  if (!item.northSeasons) return item.hours;
  return item.northSeasons.find(season => season.months.includes(northMonth))?.hours || [];
}

function matchesHour(item, hemisphere, month, hourFilter, currentHour) {
  if (hourFilter === 'all') return true;
  const months = month === null ? monthsFor(item, hemisphere) : [month];
  return months.some(candidate => {
    const hours = hoursForMonth(item, hemisphere, candidate);
    if (hourFilter === 'allday') return hours.length === 24;
    const hour = hourFilter === 'current' ? currentHour : Number(hourFilter);
    return hours.includes(hour);
  });
}

export function isAvailableNow(item, hemisphere, date = new Date()) {
  const month = date.getMonth() + 1;
  return monthsFor(item, hemisphere).includes(month)
    && hoursForMonth(item, hemisphere, month).includes(date.getHours());
}

export function filterItems(category, filters, {
  collected = new Set(), hemisphere = 'north', now = new Date()
} = {}) {
  const seasonal = CATEGORY_MAP[category].seasonal;
  const selectedMonth = seasonal && filters.month !== 'all' ? Number(filters.month) : null;

  return DATA_MAP[category].filter(item => {
    if (filters.status === 'collected' && !collected.has(item.id)) return false;
    if (filters.status === 'uncollected' && collected.has(item.id)) return false;

    if (seasonal) {
      if (selectedMonth !== null && !monthsFor(item, hemisphere).includes(selectedMonth)) return false;
      if (!matchesHour(item, hemisphere, selectedMonth, filters.hour, now.getHours())) return false;
    }

    for (const [key, value] of Object.entries(filters)) {
      if (['status', 'month', 'hour'].includes(key) || value === 'all') continue;
      if (item[key] !== value) return false;
    }
    return true;
  });
}

export function sortItems(items, category, sort, collected) {
  const result = [...items];
  const compareText = (a, b) => a.localeCompare(b, 'zh-CN', { numeric: true });
  switch (sort) {
    case 'name':
      result.sort((a, b) => compareText(a.name, b.name));
      break;
    case 'name-desc':
      result.sort((a, b) => compareText(b.name, a.name));
      break;
    case 'price-asc':
      result.sort((a, b) => a.price - b.price || compareText(a.name, b.name));
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price || compareText(a.name, b.name));
      break;
    case 'status':
      result.sort((a, b) => Number(collected.has(b.id)) - Number(collected.has(a.id)) || compareText(a.name, b.name));
      break;
    case 'birthday':
      result.sort((a, b) => parseInt(a.birthdayMonth) - parseInt(b.birthdayMonth)
        || a.birthdayDay - b.birthdayDay || compareText(a.name, b.name));
      break;
    default:
      break;
  }
  return result;
}

export function formatHourRanges(hours) {
  if (!hours?.length) return '未知';
  if (hours.length === 24) return '全天';
  const values = [...new Set(hours)].sort((a, b) => a - b);
  const ranges = [];
  let start = values[0];
  let previous = values[0];
  for (let index = 1; index <= values.length; index += 1) {
    const current = values[index];
    if (current === previous + 1) {
      previous = current;
      continue;
    }
    ranges.push([start, previous + 1]);
    start = current;
    previous = current;
  }
  // Join ranges that touch across midnight.
  if (ranges.length > 1 && ranges[0][0] === 0 && ranges.at(-1)[1] === 24) {
    const first = ranges.shift();
    const last = ranges.pop();
    ranges.unshift([last[0], first[1] + 24]);
  }
  return ranges.map(([from, to]) => {
    const startLabel = `${String(from % 24).padStart(2, '0')}:00`;
    const endLabel = `${String(to % 24).padStart(2, '0')}:00`;
    return `${startLabel}–${to > 24 || (to === 24 && from !== 0) ? '次日' : ''}${endLabel}`;
  }).join(' / ');
}

export function formatMonths(months) {
  if (!months?.length) return '无';
  if (months.length === 12) return '全年';
  const values = [...months].sort((a, b) => a - b);
  const groups = [];
  let start = values[0];
  let previous = values[0];
  for (let index = 1; index <= values.length; index += 1) {
    const current = values[index];
    if (current === previous + 1) {
      previous = current;
      continue;
    }
    groups.push(start === previous ? `${start}月` : `${start}–${previous}月`);
    start = current;
    previous = current;
  }
  return groups.join('、');
}

export function timeDescription(item, hemisphere, selectedMonth = 'all') {
  if (selectedMonth !== 'all') return formatHourRanges(hoursForMonth(item, hemisphere, Number(selectedMonth)));
  if (!item.northSeasons) return formatHourRanges(item.hours);
  return item.northSeasons.map(season => {
    const months = hemisphere === 'south'
      ? season.months.map(month => ((month + 5) % 12) + 1)
      : season.months;
    return `${formatMonths(months)} ${formatHourRanges(season.hours)}`;
  }).join(' · ');
}

export function getProgress(category, collected) {
  const items = DATA_MAP[category];
  const done = items.reduce((total, item) => total + Number(collected.has(item.id)), 0);
  return { done, total: items.length, percent: items.length ? Math.round(done / items.length * 100) : 0 };
}

export function getOverallProgress(collected) {
  const done = [...COLLECTIBLE_IDS].reduce((total, id) => total + Number(collected.has(id)), 0);
  return { done, total: COLLECTIBLE_IDS.size, percent: Math.round(done / COLLECTIBLE_IDS.size * 100) };
}

export function getItem(category, id) {
  return DATA_MAP[category].find(item => item.id === id);
}

export { DATA_MAP };
