// 사용: node data-src/test-divination.js  (앱 루트에서)  — 해석 엔진 전수 검증
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = path.join(__dirname, '..');
const ctx = {}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'yijing-data.js'), 'utf8') + ';this.D=YIJING_DATA', ctx);
const D = ctx.D, Div = require(path.join(root, 'divination.js'));
const I = Div.createInterpreter(D);
let fail = 0; const bad = m => { fail++; if (fail < 30) console.log('✗', m); };

// 1) 독립 계산: 원본 core.js 와 같은 방식으로 본괘·지괘 이진값을 구해 비교
let old = null; try { old = require(path.join(root, '..', 'hex.json')); } catch (e) { console.log('(기존 앱 데이터 대조 파일 없음 — 이름 대조 생략)'); }
const rules = {};
let total = 0;
const vals = [6, 7, 8, 9];
for (let k = 0; k < 4096; k++) {
  const v = []; let x = k; for (let i = 0; i < 6; i++) { v.push(vals[x & 3]); x >>= 2; }
  total++;
  const r = I.interpret(v);
  const ben = v.map(a => (a === 7 || a === 9 ? 1 : 0)).join('');
  const zhi = v.map(a => (a === 7 || a === 8 ? (a === 7 ? 1 : 0) : (a === 6 ? 1 : 0))).join('');
  if (r.binary !== ben) bad('본괘 ' + v + ' ' + r.binary + ' ' + ben);
  if (r.changedBinary !== zhi) bad('지괘 ' + v);
  if (old && (!old.H[ben] || !old.H[zhi])) bad('앱 기존 데이터에 없음');
  const ch = v.map((a, i) => (a === 6 || a === 9 ? i + 1 : 0)).filter(Boolean);
  if (JSON.stringify(ch) !== JSON.stringify(r.changing)) bad('동효 ' + v);
  // 기존 앱 괘 이름과 일치
  if (old && old.H[ben].name.split(' (')[0] !== r.ben.name) bad('본괘 이름 불일치 ' + ben);
  if (old && old.H[zhi].name.split(' (')[0] !== r.zhi.name) bad('지괘 이름 불일치 ' + zhi);
  // 규칙별 기대값
  const P = r.passages, pr = P.filter(p => p.role === 'primary');
  if (pr.length !== 1) bad('primary 1개 아님 ' + v);
  const n = ch.length; rules[r.ruleId] = (rules[r.ruleId] || 0) + 1;
  const un = [1, 2, 3, 4, 5, 6].filter(p => !ch.includes(p));
  const p0 = P[0];
  if (n === 0 && !(p0.type === 'gua' && p0.guaN === r.ben.n && P.length === 1)) bad('0개 ' + v);
  if (n === 1 && !(p0.type === 'yao' && p0.side === 'ben' && p0.pos === ch[0] && P.length === 1)) bad('1개 ' + v);
  if (n === 2 && !(p0.pos === ch[1] && P[1].pos === ch[0] && P.every(p => p.side === 'ben' && p.type === 'yao'))) bad('2개 ' + v);
  if (n === 3) {
    const front = ch.includes(1);
    if (!(P.length === 2 && P.every(p => p.type === 'gua'))) bad('3개 구성 ' + v);
    if (front && !(p0.side === 'ben' && p0.tag === '貞' && P[1].side === 'zhi' && P[1].tag === '悔')) bad('3개 前十 ' + v);
    if (!front && !(p0.side === 'zhi' && p0.tag === '悔' && P[1].side === 'ben' && P[1].tag === '貞')) bad('3개 後十 ' + v);
  }
  if (n === 4 && !(p0.side === 'zhi' && p0.pos === un[0] && P[1].pos === un[1] && P.length === 2)) bad('4개 ' + v);
  if (n === 5 && !(p0.side === 'zhi' && p0.pos === un[0] && P.length === 1)) bad('5개 ' + v);
  if (n === 6) {
    if (r.ben.n === 1 && !(p0.type === 'yong' && p0.label === '用九')) bad('용구');
    else if (r.ben.n === 2 && !(p0.type === 'yong' && p0.label === '用六')) bad('용육');
    else if (r.ben.n > 2 && !(p0.type === 'gua' && p0.side === 'zhi')) bad('6개 일반');
  }
  // 모든 passage 데이터가 실제로 채워져 있는가, 효 음양이 해당 괘의 구성과 일치하는가
  P.forEach(p => {
    if (!p.data || !p.data.text || !p.data.modern) bad('빈 데이터 ' + v);
    if (p.type === 'yao') {
      const g = p.side === 'ben' ? r.ben : r.zhi;
      const yang = g.bits[p.pos - 1] === 1;
      if ((p.data.yinyang === 'yang') !== yang) bad('효 음양 불일치 ' + g.n + '-' + p.pos);
      if (p.guaN !== g.n) bad('효 괘 번호');
    }
  });
}
console.log('경우의 수', total, '규칙별', rules);

// 2) 삼효변 20가지 구분 (초효 포함 10 / 불포함 10, 서로 여집합)
const combos = []; for (let a = 1; a <= 6; a++) for (let b = a + 1; b <= 6; b++) for (let c = b + 1; c <= 6; c++) combos.push([a, b, c]);
const front = combos.filter(c => Div.threeChangeGroup(c) === 'front'), back = combos.filter(c => Div.threeChangeGroup(c) === 'back');
console.log('삼효변', combos.length, '前十', front.length, '後十', back.length);
if (front.length !== 10 || back.length !== 10) bad('삼효변 10/10 아님');
const comp = c => [1, 2, 3, 4, 5, 6].filter(x => !c.includes(x)).join('');
front.forEach(c => { if (!back.some(b => b.join('') === comp(c))) bad('여집합 아님 ' + c); });

// 3) 데이터 완결성: 64괘·384효·용구/용육
let yao = 0; for (const n in D.guas) { const g = D.guas[n]; yao += g.yao.length; if (g.yao.some((y, i) => y.pos !== i + 1 || !y.label)) bad('효 위치 ' + n); }
console.log('괘', Object.keys(D.guas).length, '효', yao, '용구', !!D.guas[1].yong, '용육', !!D.guas[2].yong);
if (yao !== 384) bad('효 수');
// 4) 오류 입력
['x', [1, 2], [6, 7, 8, 9, 6, 5]].forEach(b => { try { I.interpret(b); bad('오류 입력 허용'); } catch (e) {} });
console.log(fail ? '실패 ' + fail : '전부 통과 ✓');
process.exit(fail ? 1 : 0);
