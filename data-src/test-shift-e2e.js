const { chromium } = require('playwright'); const { spawn } = require('child_process');
const srv = spawn('python3', ['-m','http.server','8775','-d','app'], {stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{ await sleep(800); const b=await chromium.launch(); let fails=0;
 const ck=(n,o,x)=>{if(!o)fails++;console.log((o?'✓ ':'✗ ')+n+(x?' — '+x:''))};
 for (const lang of ['ko','en']) for (const pg of ['index.html','original.html']) {
  const c=await b.newContext({serviceWorkers:'block',viewport:{width:420,height:900}});
  await c.addInitScript(l=>localStorage.setItem('juyeok.settings.v1',JSON.stringify({lang:l})),lang);
  const p=await c.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(String(e))); await p.route(/google/,r=>r.abort());
  await p.goto('http://localhost:8775/'+pg); await sleep(500);
  for (const [vals,exp] of [[[9,7,8,8,7,8],true],[[7,7,7,7,7,7],false],[[9,9,7,7,7,7],true],[[9,9,9,9,9,9],true],[[6,6,6,6,8,6],true]]) {
   await p.evaluate(v=>{lines.length=0;v.forEach(x=>lines.push(mapValueToLine(x)));showResult();},vals); await sleep(1300);
   const s=await p.evaluate(()=>{const e=document.getElementById('shiftSummary');return{hidden:e.classList.contains('hidden'),t:e.innerText.replace(/\n+/g,' | ').slice(0,260),term:document.querySelector('.term-note').innerText.slice(0,90)}});
   ck(`${pg} [${lang}] ${vals.join('')} 요약 ${exp?'표시':'숨김'}`,s.hidden===!exp,s.hidden?'(hidden)':s.t);
   if(vals.join('')==='978878'&&pg==='index.html') ck(`[${lang}] termNote`,/변효|changing line/.test(s.term),s.term);
  }
  if(pg==='index.html'&&lang==='ko'){ await p.evaluate(v=>{lines.length=0;[9,7,8,8,7,8].forEach(x=>lines.push(mapValueToLine(x)));showResult();}); await sleep(1300); await p.evaluate(()=>document.getElementById('shiftSummary').scrollIntoView()); await p.screenshot({path:'shot-shift.png'});
    await p.click('.shift-summary-more'); await sleep(800); ck('자세히 보기 이동',await p.evaluate(()=>document.getElementById('classicBlock').getBoundingClientRect().top<300)); }
  ck(`${pg} [${lang}] 오류 없음`,errs.length===0,errs.join('|'));
  await c.close(); }
 console.log(fails?fails+' FAIL':'ALL PASS'); await b.close(); srv.kill(); })();
