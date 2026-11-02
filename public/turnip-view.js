import { initialize } from './vendor/turnip-calculator/patterns.js';
import {
  TURNIP_STORAGE_KEY, DAY_NAMES, PERIOD_NAMES, PATTERN_NAMES,
  emptyPrices, loadPrices, validatePrices, predictTurnips
} from './turnip.js';

const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

function priceInput(index, label, value) {
  return `<label class="control turnip-price"><span class="control-label">${label}</span>
    <input id="turnip-price-${index}" data-turnip-price="${index}" type="text" inputmode="numeric"
      pattern="[0-9]*" maxlength="3" autocomplete="off" aria-label="${index ? PERIOD_NAMES[index - 1] + '卖价' : '周日买入价'}"
      aria-describedby="turnip-input-hint turnip-status" placeholder="未知" value="${escapeHtml(value)}"></label>`;
}

function chartMarkup(result, prices) {
  const top = Math.ceil(Math.max(result.peakMax, ...prices.map(Number)) / 100) * 100;
  const x = index => 60 + index * 55;
  const y = value => 220 - value / top * 190;
  const ticks = Array.from({ length: 5 }, (_, index) => top * index / 4);
  return `<div class="turnip-chart-scroll"><svg class="turnip-chart" viewBox="0 0 720 270" role="img" aria-labelledby="turnip-chart-title turnip-chart-desc">
    <title id="turnip-chart-title">本周大头菜价格预测</title>
    <desc id="turnip-chart-desc">绿色竖线表示各时段预测最低价至最高价，橙色圆点表示已录入卖价。详细数值见下方价格表。</desc>
    ${ticks.map(tick => `<line class="turnip-gridline" x1="42" x2="690" y1="${y(tick)}" y2="${y(tick)}"/>
      <text x="30" y="${y(tick) + 4}" text-anchor="end">${Math.round(tick)}</text>`).join('')}
    ${prices[0] ? `<line class="turnip-buy-line" x1="42" x2="690" y1="${y(Number(prices[0]))}" y2="${y(Number(prices[0]))}"/>` : ''}
    ${result.ranges.map(([min, max], index) => `<g><title>${PERIOD_NAMES[index]}：预测 ${min}–${max} 铃钱${prices[index + 1] ? '，已录入 ' + Number(prices[index + 1]) + ' 铃钱' : ''}</title>
      <line class="turnip-range" x1="${x(index)}" x2="${x(index)}" y1="${y(min)}" y2="${y(max)}"/>
      <line class="turnip-cap" x1="${x(index) - 6}" x2="${x(index) + 6}" y1="${y(min)}" y2="${y(min)}"/>
      <line class="turnip-cap" x1="${x(index) - 6}" x2="${x(index) + 6}" y1="${y(max)}" y2="${y(max)}"/>
      ${prices[index + 1] ? `<circle class="turnip-known" cx="${x(index)}" cy="${y(Number(prices[index + 1]))}" r="5"/>` : ''}
      <text x="${x(index)}" y="243" text-anchor="middle">${index % 2 ? '下午' : '上午'}</text>
      ${index % 2 === 0 ? `<text x="${x(index) + 27.5}" y="263" text-anchor="middle">${DAY_NAMES[index / 2]}</text>` : ''}
    </g>`).join('')}
  </svg></div>`;
}

function resultsMarkup(result, prices) {
  const recorded = prices.slice(1).filter(Boolean).length;
  const types = result.probabilities.filter(Boolean).length;
  return `${result.approximate ? '<p class="turnip-warning" role="status">没有完全匹配的走势，以下为最接近的估计，请核对已录入价格。</p>' : ''}
    <div class="turnip-stats">
      <div><span>本周最高价范围</span><strong>${result.peakMin}–${result.peakMax}<small> 铃钱</small></strong></div>
      <div><span>已记录卖价</span><strong>${recorded}<small> / 12</small></strong></div>
      <div><span>可能走势</span><strong>${types}<small> 种</small></strong></div>
    </div>
    <section class="turnip-card" aria-labelledby="turnip-pattern-heading">
      <div class="section-head"><h2 id="turnip-pattern-heading">走势参考概率</h2><span class="turnip-muted">${result.patterns.length} 条${result.approximate ? '近似' : '匹配'}走势</span></div>
      <div class="turnip-patterns">${PATTERN_NAMES.map((name, index) => {
        const percent = result.probabilities[index] * 100;
        return `<div class="turnip-pattern ${percent ? '' : 'is-unlikely'}"><div><span>${name}</span><strong>${percent.toFixed(1)}%</strong></div>
          <div class="turnip-probability" aria-hidden="true"><span style="width:${percent}%"></span></div></div>`;
      }).join('')}</div>
    </section>
    <section class="turnip-card" aria-labelledby="turnip-forecast-heading">
      <div class="section-head"><h2 id="turnip-forecast-heading">价格预测</h2><span class="turnip-muted">单位：铃钱</span></div>
      <div class="turnip-legend"><span><i class="range-key"></i>预测区间</span><span><i class="known-key"></i>已录入卖价</span>${prices[0] ? '<span><i class="buy-key"></i>买入价</span>' : ''}</div>
      ${chartMarkup(result, prices)}
      <table class="turnip-table"><caption class="turnip-sr-only">周一至周六各时段已录入价格及预测区间</caption>
        <thead><tr><th scope="col">时段</th><th scope="col">已录入</th><th scope="col">预测最低</th><th scope="col">预测最高</th></tr></thead>
        <tbody>${result.ranges.map(([min, max], index) => `<tr class="${index % 2 === 0 ? 'turnip-day-start' : ''}"><th scope="row">${DAY_NAMES[Math.floor(index / 2)]}<span>${index % 2 ? '下午' : '上午'}</span></th>
          <td class="${prices[index + 1] ? 'turnip-recorded' : ''}">${prices[index + 1] ? Number(prices[index + 1]) : '—'}</td><td>${min}</td><td>${max}</td></tr>`).join('')}</tbody>
      </table>
    </section>
    <p class="turnip-note">参考概率沿用原项目的走势权重，预测区间不保证实际售价。${prices[0] ? '' : '买入价未知，按 90–110 铃钱估算。'}</p>`;
}

export function createTurnipCalculator(root, showToast) {
  let prices = loadPrices();
  let ready = false;
  let loadingError = false;

  function updateResults() {
    const status = root.querySelector('#turnip-status');
    const results = root.querySelector('#turnip-results');
    const invalid = validatePrices(prices);
    root.querySelectorAll('[data-turnip-price]').forEach(input => {
      input.setAttribute('aria-invalid', String(Number(input.dataset.turnipPrice) === invalid?.index));
    });
    results.innerHTML = '';
    status.classList.toggle('turnip-warning', Boolean(invalid || loadingError));
    if (invalid) {
      status.textContent = invalid.message;
    } else if (loadingError) {
      status.textContent = '计算器加载失败，请刷新页面重试。';
    } else if (prices.every(value => value === '')) {
      status.textContent = '填写买入价或至少一个卖价后显示预测。';
    } else if (!ready) {
      status.textContent = '正在加载计算器…';
    } else {
      try {
        const result = predictTurnips(prices);
        status.textContent = '';
        results.innerHTML = resultsMarkup(result, prices);
      } catch {
        status.textContent = '计算失败，请核对价格后重试。';
        status.classList.add('turnip-warning');
      }
    }
    status.hidden = !status.textContent;
  }

  function save() {
    try {
      localStorage.setItem(TURNIP_STORAGE_KEY, JSON.stringify(prices));
    } catch {
      showToast('价格未能保存到浏览器，刷新后将丢失本次修改');
    }
  }

  function render() {
    if (root.childElementCount) return;
    root.innerHTML = `<section class="turnip-card" aria-labelledby="turnip-input-heading">
      <div class="section-head"><h2 id="turnip-input-heading">本周价格</h2><button type="button" class="small-button" data-turnip-reset>清空价格</button></div>
      <p class="turnip-note" id="turnip-input-hint">未知价格留空，上午与下午以 12:00 为界。价格自动保存在此浏览器。</p>
      <div class="turnip-buy">${priceInput(0, '周日买入价 · 铃钱', prices[0])}</div>
      <div class="turnip-days">${DAY_NAMES.map((day, index) => `<fieldset class="turnip-day"><legend>${day}</legend>
        ${priceInput(index * 2 + 1, '上午', prices[index * 2 + 1])}
        ${priceInput(index * 2 + 2, '下午', prices[index * 2 + 2])}</fieldset>`).join('')}</div>
    </section>
    <p id="turnip-status" class="turnip-status" role="status" aria-live="polite"></p>
    <div id="turnip-results"></div>
    <p class="turnip-attribution">算法来源：<a href="https://github.com/elxris/Turnip-Calculator" target="_blank" rel="noreferrer">elxris/Turnip-Calculator</a> · <a href="./vendor/turnip-calculator/LICENSE" target="_blank" rel="noreferrer">MIT License</a></p>`;
    root.addEventListener('input', event => {
      const index = event.target.dataset.turnipPrice;
      if (index === undefined) return;
      prices[Number(index)] = event.target.value;
      save();
      updateResults();
    });
    root.querySelector('[data-turnip-reset]').addEventListener('click', () => {
      if (prices.every(value => value === '') || !window.confirm('清空本周买入价和全部卖价？')) return;
      prices = emptyPrices();
      root.querySelectorAll('[data-turnip-price]').forEach(input => { input.value = ''; });
      save();
      updateResults();
      root.querySelector('#turnip-price-0').focus();
    });
    updateResults();
    fetch(new URL('./vendor/turnip-calculator/patterns_bg.wasm', import.meta.url))
      .then(response => {
        if (!response.ok) throw new Error('无法加载预测算法');
        return response.arrayBuffer();
      })
      .then(initialize)
      .then(() => { ready = true; updateResults(); })
      .catch(() => { loadingError = true; updateResults(); });
  }

  return { render };
}
