// Scoring and weights adapted from elxris/Turnip-Calculator (MIT).
import { calculate } from './vendor/turnip-calculator/patterns.js';

export const TURNIP_STORAGE_KEY = 'island_atlas_turnip_v1';
export const DAY_NAMES = ['周一', '周二', '周三', '周四', '周五', '周六'];
export const PERIOD_NAMES = DAY_NAMES.flatMap(day => [day + '上午', day + '下午']);
export const PATTERN_NAMES = ['波动型', '大涨型', '递减型', '小涨型'];
const PATTERN_WEIGHTS = [140, 105, 55, 100];

export function emptyPrices() {
  return Array(13).fill('');
}

export function loadPrices(storage) {
  try {
    const prices = JSON.parse((storage || window.localStorage).getItem(TURNIP_STORAGE_KEY));
    if (Array.isArray(prices) && prices.length === 13 && prices.every(value => typeof value === 'string')) {
      return prices;
    }
  } catch {
    // Start with empty inputs when saved data cannot be read.
  }
  return emptyPrices();
}

export function validatePrices(prices) {
  for (let index = 0; index < prices.length; index += 1) {
    const value = prices[index];
    if (value === '') continue;
    const min = index === 0 ? 90 : 9;
    const max = index === 0 ? 110 : 660;
    if (!/^\d+$/.test(value) || !Number.isSafeInteger(Number(value)) || Number(value) < min || Number(value) > max) {
      return { index, message: `${index === 0 ? '买入价' : PERIOD_NAMES[index - 1]}请输入 ${min}–${max} 之间的整数；未知价格留空。` };
    }
  }
  return null;
}

function scorePattern(prices, pattern) {
  return pattern.reduce((score, [min, max], index) => {
    const value = Number(prices[index + 1]);
    return score + (value ? Math.max(min - value, value - max, 0) : 0);
  }, 0);
}

export function predictTurnips(prices) {
  const invalid = validatePrices(prices);
  if (invalid) throw new Error(invalid.message);
  if (prices.every(value => value === '')) return null;

  const candidates = JSON.parse(calculate(prices.join('-'))).map(([type, ...ranges]) => ({
    type, ranges, score: scorePattern(prices, ranges)
  }));
  const bestScore = Math.min(...candidates.map(pattern => pattern.score));
  // Preserve the upstream heuristic: retain scores within 10% of the best match.
  const patterns = candidates.filter(pattern => pattern.score <= bestScore * 1.1);
  const counts = PATTERN_NAMES.map((_, type) => patterns.filter(pattern => pattern.type === type).length);
  const totalWeight = counts.reduce((total, count, type) => total + (count ? PATTERN_WEIGHTS[type] : 0), 0);
  const probabilities = counts.map((count, type) => count ? PATTERN_WEIGHTS[type] / totalWeight : 0);
  const ranges = PERIOD_NAMES.map((_, index) => [
    Math.min(...patterns.map(pattern => pattern.ranges[index][0])),
    Math.max(...patterns.map(pattern => pattern.ranges[index][1]))
  ]);

  return {
    patterns,
    probabilities,
    ranges,
    approximate: bestScore > 0,
    peakMin: Math.min(...patterns.map(pattern => Math.max(...pattern.ranges.map(([min]) => min)))),
    peakMax: Math.max(...ranges.map(([, max]) => max))
  };
}
