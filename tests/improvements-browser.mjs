import assert from 'node:assert/strict';

export async function testImprovementsBrowser(browser) {
  const failures = [];
  async function check(name, run) {
    const page = await browser.page();
    try {
      await page.blockUrls(['https://*']);
      await page.evaluate(`localStorage.clear();localStorage.setItem('acnh_ui',JSON.stringify({
        activeTab:'fish',todayOpen:true,filters:{fish:{hour:null,hourManual:true}}
      }));`);
      await page.reload();
      await setHour(page, 12);
      await run(page);
      console.log('PASS ' + name);
    } catch (error) { failures.push(new Error(name + ': ' + error.message)); }
    finally { await page.close(); }
  }

  async function setHour(page, hour) {
    await page.evaluate(`window.NativeDate ||= Date;
      window.Date = class extends NativeDate {constructor(...args) {super(...(args.length ? args : [2026,8,15,${hour}]));}};
      Object.defineProperty(document,'visibilityState',{value:'visible',configurable:true});
      document.dispatchEvent(new Event('visibilitychange'));`);
  }

  await check('hemisphere remains usable when preference storage fails', async page => {
    await page.evaluate(`window.originalSetItem=Storage.prototype.setItem;
      Storage.prototype.setItem=function(key,value) {
        if(key==='acnh_hemisphere') throw new Error('preference blocked');
        return originalSetItem.call(this,key,value);
      };`);
    await page.click('#filterToggle');
    await page.click('#filterBar [data-hemi="south"]');
    assert.equal(await page.evaluate(`document.querySelectorAll('[data-hemi="south"][aria-pressed="true"]').length`),2);
    assert.match(await page.evaluate(`document.querySelector('#filterSummary').textContent`),/南半球/);
    assert.deepEqual(await page.evaluate(`[...document.querySelectorAll('[data-id="fish_001"] .heat-cell.on')].map(x=>x.textContent)`),['5','6','7','8','9']);
    assert.match(await page.evaluate(`document.querySelector('#toast').textContent`),/设置未保存/);
    await page.click('#filterShowResults');
    await page.click('#todayPanel [data-hemi="north"]');
    assert.equal(await page.evaluate(`document.querySelectorAll('[data-hemi="north"][aria-pressed="true"]').length`),2);
    assert.equal(await page.evaluate(`localStorage.getItem('acnh_hemisphere')`),null);
  });

  await check('current time restores automatic following and preserves other filters and sorting', async page => {
    await page.click('#filterToggle');
    await page.click('[data-filter="location"][data-value="河流"]');
    await page.click('[data-filter="status"][data-value="uncollected"]');
    await page.click('[data-filter="month"][data-value="9"]');
    await page.click('[data-filter="hour"][data-value="7"]');
    await page.click('[data-sort="price"]');
    const before=await page.evaluate(`JSON.parse(localStorage.getItem('acnh_ui'))`);
    await page.click('[data-filter="hour"][data-value="now"]');
    const after=await page.evaluate(`JSON.parse(localStorage.getItem('acnh_ui'))`);
    assert.deepEqual(after.filters.fish,{...before.filters.fish,hour:12,hourManual:false});
    assert.deepEqual(after.sort,before.sort);
    assert.match(await page.evaluate(`document.querySelector('#filterSummary').textContent`),/当前时间.*12时/);
    assert.equal(await page.evaluate(`document.querySelectorAll('#hourGrid [aria-pressed="true"]').length`),1);
    await setHour(page,13);
    assert.equal(await page.evaluate(`JSON.parse(localStorage.getItem('acnh_ui')).filters.fish.hour`),13);
    await page.click('[data-filter="hour"][data-value="13"]');
    assert.match(await page.evaluate(`document.querySelector('#filterSummary').textContent`),/固定 13时/);
    await setHour(page,14);
    assert.equal(await page.evaluate(`JSON.parse(localStorage.getItem('acnh_ui')).filters.fish.hour`),13);
    await page.reload();
    assert.equal(await page.evaluate(`JSON.parse(localStorage.getItem('acnh_ui')).filters.fish.hourManual`),true);
    assert.match(await page.evaluate(`document.querySelector('#filterSummary').textContent`),/固定 13时/);
  });

  await check('today collection supports pending keyboard edits, cross-page sync and failed save rollback', async page => {
    await page.click('#todayUncollected');
    const id=await page.evaluate(`document.querySelector('#todayGroup-fish .today-checkbox').dataset.collectionId`);
    const selector=`#today-collected-${id}`;
    await page.evaluate(`window.lockHeld=false;
      window.lockDone=navigator.locks.request('acnh_collected:write',()=>new Promise(resolve=>{
        window.releaseLock=resolve;window.lockHeld=true;
      }));void 0;`);
    await page.waitFor('window.lockHeld');
    try {
      await page.click(`#todayGroup-fish [data-today-id="${id}"] .today-name`);
      assert.equal(await page.evaluate(`document.querySelector('${selector}').checked`),true);
      assert.equal(await page.evaluate(`document.querySelector('${selector}').closest('.today-item').getAttribute('aria-busy')`),'true');
      await page.evaluate(`window.originalTodayInput=document.querySelector('${selector}');
        dispatchEvent(new StorageEvent('storage',{key:'acnh_collected',storageArea:localStorage}));
        document.querySelector('${selector}').focus();`);
      await page.press('Space');
      assert.equal(await page.evaluate(`document.querySelector('${selector}').checked`),false);
      await page.press('Space');
      assert.equal(await page.evaluate(`document.querySelector('${selector}')===originalTodayInput && originalTodayInput.checked`),true);
    } finally { await page.evaluate('releaseLock();lockDone'); }
    await page.waitFor(`!document.querySelector('${selector}')`);
    assert.equal(await page.evaluate(`document.querySelector('#collected-${id}').checked`),true);
    assert.equal(await page.evaluate(`document.activeElement.matches('.today-checkbox,.today-group-header')`),true);
    assert.ok((await page.evaluate(`JSON.parse(localStorage.getItem('acnh_collected'))`)).includes(id));
    const other=await browser.page();
    try {
      await other.click(`[data-id="${id}"] .check-box`);
      await page.waitFor(`document.querySelector('${selector}') && !document.querySelector('${selector}').checked`);
    } finally {await other.close();}
    await page.evaluate(`window.originalSetItem=Storage.prototype.setItem;
      Storage.prototype.setItem=function(key,value){
        if(key==='acnh_collected') throw new Error('today save failed');
        return originalSetItem.call(this,key,value);
      };`);
    await page.click(`[data-today-id="${id}"] .today-name`);
    await page.waitFor(`document.querySelector('#toast')?.textContent.includes('today save failed')`);
    assert.equal(await page.evaluate(`document.querySelector('${selector}').checked`),false);
    assert.equal(await page.evaluate(`document.querySelector('#collected-${id}').checked`),false);
    assert.equal(await page.evaluate(`JSON.parse(localStorage.getItem('acnh_collected')).includes('${id}')`),false);
  });

  await check('today all-collected state reports remaining collection rather than availability', async page => {
    await page.evaluate(`(async()=>{
      const {DATA_MAP}=await import('/data.js');
      localStorage.setItem('acnh_collected',JSON.stringify(['fish','bug','sea'].flatMap(k=>DATA_MAP[k].map(x=>x.id))));
      dispatchEvent(new StorageEvent('storage',{key:'acnh_collected',storageArea:localStorage}));
    })()`);
    assert.ok(await page.evaluate(`document.querySelectorAll('.today-checkbox:checked').length>0`));
    await page.click('#todayUncollected');
    assert.equal(await page.evaluate(`document.querySelector('.today-count').textContent`),'未收集 0 种');
    for(const type of ['fish','bug','sea']) assert.match(await page.evaluate(`document.querySelector('#todayGroup-${type}').textContent`),/均已收集/);
    await page.click('#todayUncollected');
    assert.ok(await page.evaluate(`document.querySelectorAll('.today-checkbox:checked').length>0`));
    await page.evaluate(`localStorage.setItem('acnh_collected','broken');dispatchEvent(new StorageEvent('storage',{key:'acnh_collected',storageArea:localStorage}));`);
    assert.equal(await page.evaluate(`document.querySelectorAll('.today-checkbox:not(:disabled)').length`),0);
  });

  await check('today label survives refresh during pointer input and fits phone layouts', async page => {
    const id=await page.evaluate(`document.querySelector('#todayGroup-fish .today-checkbox').dataset.collectionId`);
    await page.evaluate(`document.addEventListener('mousedown',()=>{
      localStorage.setItem('acnh_collected','["future_001"]');
      dispatchEvent(new StorageEvent('storage',{key:'acnh_collected',storageArea:localStorage}));
    },{once:true});`);
    await page.click(`[data-today-id="${id}"] .today-name`);
    await page.waitFor(`JSON.parse(localStorage.getItem('acnh_collected')).includes('${id}')`);
    assert.ok((await page.evaluate(`JSON.parse(localStorage.getItem('acnh_collected'))`)).includes('future_001'));
    for(const width of [320,375,760,1280]) {
      await page.setViewport(width,812);
      await page.evaluate('scrollTo(0,0)');
      assert.equal(await page.evaluate('document.documentElement.scrollWidth>innerWidth'),false,'today overflow '+width);
    }
  });

  if(failures.length) throw new AggregateError(failures,failures.map(error=>error.message).join('\n'));
}
