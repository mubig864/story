const { chromium } = require('playwright'); const { spawn } = require('child_process');
const srv = spawn('python3', ['-m','http.server','8773','-d','app'], {stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{ await sleep(800); const b=await chromium.launch(); let fails=0;
 const ck=(n,o,x)=>{if(!o)fails++;console.log((o?'✓ ':'✗ ')+n+(x?' — '+x:''))};
 for (const lang of ['ko','en']) for (const pg of ['index.html','original.html','hexagram-list.html','about.html']) {
  const c=await b.newContext({serviceWorkers:'block',viewport:{width:400,height:800},permissions:['clipboard-read','clipboard-write']});
  await c.addInitScript(l=>localStorage.setItem('juyeok.settings.v1',JSON.stringify({lang:l})),lang);
  const p=await c.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(String(e))); await p.route(/google/,r=>r.abort());
  await p.goto('http://localhost:8773/'+pg); await sleep(500);
  await p.click('.menu-btn, #menuBtn, [aria-label*="메뉴"], [aria-label*="Menu"]',{timeout:3000}).catch(()=>{});
  await sleep(300);
  await p.evaluate(()=>{const li=[...document.querySelectorAll('.drawer button, .drawer a, #menuDrawer button')].find(x=>/공유|Share/.test(x.textContent)); li&&li.click();});
  await sleep(500);
  const st=await p.evaluate(()=>{const d=document.getElementById('shareQr');const dlg=d&&d.closest('dialog');return{open:!!dlg&&dlg.open,svg:!!(d&&d.querySelector('svg')),url:document.getElementById('shareUrl')&&document.getElementById('shareUrl').value,title:document.getElementById('shareTitle')&&document.getElementById('shareTitle').textContent,w:d&&Math.round(d.getBoundingClientRect().width)}});
  ck(`${pg} [${lang}] 공유 창 + QR`,st.open&&st.svg&&st.url==='https://mubig864.github.io/story/',JSON.stringify(st));
  await p.click('#shareCopy'); await sleep(300);
  const clip=await p.evaluate(()=>navigator.clipboard.readText()).catch(e=>'ERR '+e);
  const stat=await p.textContent('#shareStatus');
  ck(`${pg} [${lang}] 복사`,clip==='https://mubig864.github.io/story/'&&stat.length>3,clip+' | '+stat);
  if(pg==='index.html'&&lang==='ko'){ await p.screenshot({path:'shot-share.png'}); const svg=await p.$eval('#shareQr',e=>e.innerHTML); require('fs').writeFileSync('shot-share.svg',svg);}
  await p.keyboard.press('Escape'); await sleep(200);
  ck(`${pg} [${lang}] Esc 로 닫힘, 오류 없음`,!(await p.evaluate(()=>document.getElementById('shareQr').closest('dialog').open))&&errs.length===0,errs.join('|'));
  await c.close(); }
 console.log(fails?fails+' FAIL':'ALL PASS'); await b.close(); srv.kill(); })();
