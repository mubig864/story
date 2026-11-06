const { chromium } = require('playwright');
const { spawn } = require('child_process');
const dir = process.argv[2] || 'app', port = process.argv[3] || '8767';
const srv = spawn('python3', ['-m', 'http.server', port, '-d', dir], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  await sleep(800);
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ serviceWorkers: 'block', viewport: { width: 480, height: 900 } });
  await ctx.addInitScript(() => { try { localStorage.setItem('juyeok.settings.v1', JSON.stringify({ lang: 'ko' })); } catch (e) {} });
  const page = await ctx.newPage(); const errs = [];
  page.on('pageerror', e => errs.push(String(e)));
  await page.route(/googletagmanager|google-analytics/, r => r.abort());
  await page.goto(`http://localhost:${port}/original.html`); await sleep(700);
  const drag = async (fx) => {
    await page.evaluate(() => document.getElementById('stalkPreview').scrollIntoView({ block: 'center' }));
    const b = await page.locator('#stalkPreview').boundingBox();
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
    await page.mouse.down();
    await page.mouse.move(b.x + b.width * fx - 10, b.y + b.height / 2, { steps: 5 });
    await page.mouse.move(b.x + b.width * fx, b.y + b.height / 2, { steps: 5 });
    await page.mouse.up();
  };
  await drag(0.4);
  // 6효 모두 완료될 때까지: 대기 상태(waiting-split)가 되면 다시 드래그, 결과 카드가 보이면 종료
  let drags = 1, t0 = Date.now(), done = false;
  while (Date.now() - t0 < 150000) {
    await sleep(700);
    const st = await page.evaluate(() => ({ wait: document.getElementById('tapZone').classList.contains('waiting-split'), res: !document.getElementById('resultCard').classList.contains('hidden'), lines: lines.length, busy }));
    if (st.res) { done = true; console.log('결과 카드 표시, 드래그 횟수', drags, 'lines', st.lines); break; }
    if (st.wait || (!st.busy && st.lines < 6)) { await drag(0.3 + (drags % 5) * 0.1); drags++; console.log('drag', drags, 'lines', st.lines, st.wait ? 'wait' : 'first'); }
  }
  console.log(done ? 'PASS' : 'FAIL: 진행 안 됨', 'drags', drags, '오류', JSON.stringify(errs));
  await browser.close(); srv.kill();
})().catch(e => { console.error(e); srv.kill(); process.exit(1); });
