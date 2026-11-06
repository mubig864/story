/* 괘 메타 표(hexmeta.js) 일관성 테스트: node data-src/test-meta.js
   hexmeta.js ↔ yijing-data.js ↔ hexagrams.js ↔ hexagram-list.js ↔ hexagrams_en.js 의 번호·이름·한자·상하괘·키가 어긋나지 않는지 확인 */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const ctx = {}; vm.createContext(ctx);
const load = f => vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8').replace(/^'use strict';/, ''), ctx, { filename: f });
let errors = 0; const bad = m => { errors++; console.log('✗', m); };
['hexmeta.js', 'hexagrams.js', 'yijing-data.js', 'hexagrams_en.js'].forEach(load);
// hexagram-list.js 는 DOM 을 쓰므로 데이터 줄만 실행
const listSrc = fs.readFileSync(path.join(root, 'hexagram-list.js'), 'utf8');
const m = listSrc.match(/^const HEX_LIST = .*$/m);
vm.runInContext(m[0] + ';this.HEX_LIST = HEX_LIST', ctx);
const META = vm.runInContext('HEX_META', ctx), H = vm.runInContext('HEXAGRAMS', ctx);
const Y = vm.runInContext('YIJING_DATA', ctx), EN = vm.runInContext('HEXAGRAMS_EN', ctx), L = ctx.HEX_LIST;
if (META.length !== 64) bad('메타 개수 ' + META.length);
const seen = new Set(META.map(x => x.bits)); if (seen.size !== 64) bad('bits 중복');
META.forEach(x => {
  if (!/^[01]{6}$/.test(x.bits)) bad(x.n + ' bits 형식');
  const h = H[x.bits], y = Y.guas[x.n], l = L[x.n - 1], e = EN[x.bits];
  if (!h) return bad(x.n + ' HEXAGRAMS 없음');
  if (h.name !== x.ko + ' (' + x.han + ')') bad(x.n + ' hexagrams 이름 ' + h.name);
  if (h.n !== x.n) bad(x.n + ' hexagrams n');
  if (!y || y.name !== x.ko || y.han !== x.han || y.upper !== x.upper || y.lower !== x.lower || y.binary !== x.bits) bad(x.n + ' yijing-data 불일치');
  if (!l || l.n !== x.n || l.name !== x.ko || l.han !== x.han || l.upper !== x.upper || l.lower !== x.lower || l.bits.join('') !== x.bits) bad(x.n + ' 목록 불일치');
  if (!e) bad(x.n + ' 영어 데이터 없음');
  // 상·하괘와 bits 의 대응(아래 3효=하괘, 위 3효=상괘)
  const TRI = { '111': '건', '110': '태', '101': '리', '100': '진', '011': '손', '010': '감', '001': '간', '000': '곤' };
  const lo = TRI[x.bits.slice(0, 3)], up = TRI[x.bits.slice(3)];
  const norm = s => (s === '이' ? '리' : s);
  if (norm(x.lower) !== lo || norm(x.upper) !== up) bad(x.n + ' 상하괘-bits 불일치 ' + x.lower + '/' + x.upper + ' vs ' + lo + '/' + up);
});
console.log(errors ? errors + '건 오류' : '메타 표 일관성 OK (64괘)');
process.exit(errors ? 1 : 0);
