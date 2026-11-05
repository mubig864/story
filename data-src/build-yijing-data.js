#!/usr/bin/env node
/* 64괘·384효 데이터 빌드 스크립트
   입력 : data-src/gua_01.json ~ gua_64.json (괘별 원문·독음·번역·해설), data-src/table.json (번호·이름·상하괘·효 구성)
   출력 : yijing-data.js  (브라우저에서 전역 YIJING_DATA 로 읽음)
   사용 : node data-src/build-yijing-data.js   (앱 루트에서 실행)
   해설을 고치려면 gua_NN.json 만 수정하고 이 스크립트를 다시 실행하세요. 해석 규칙(divination.js)과는 분리되어 있습니다. */
const fs = require('fs'), path = require('path');
const dir = __dirname;
const table = JSON.parse(fs.readFileSync(path.join(dir, 'table.json'), 'utf8'));
const TRI_HAN = { '건': '乾', '태': '兌', '리': '離', '진': '震', '손': '巽', '감': '坎', '간': '艮', '곤': '坤' };
const GUA_FIELDS = ['text', 'reading', 'modern', 'symbol', 'situation', 'positive', 'caution', 'direction', 'message'];
const YAO_FIELDS = ['text', 'reading', 'modern', 'meaning', 'positive', 'caution', 'advice', 'message'];
const pick = (o, keys) => Object.fromEntries(keys.map(k => [k, o[k]]));
const POS = ['初', '二', '三', '四', '五', '上'];

const guas = {};
for (const row of table) {
  const f = path.join(dir, 'gua_' + String(row.n).padStart(2, '0') + '.json');
  const src = JSON.parse(fs.readFileSync(f, 'utf8'));
  if (src.n !== row.n) throw new Error(f + ': n 불일치');
  const bits = row.bits.split('').map(Number);               // 초효 → 상효, 1=양 0=음
  const label = (i, yang) => (i === 0 ? '初' : i === 5 ? '上' : '') + (yang ? '九' : '六') + (i === 0 || i === 5 ? '' : POS[i]);
  const yao = src.yao.map((y, i) => {
    const yang = bits[i] === 1;
    return {
      guaN: row.n, guaName: row.ko, pos: i + 1, label: label(i, yang), yinyang: yang ? 'yang' : 'yin',
      ...pick(y, YAO_FIELDS)
    };
  });
  const entry = {
    n: row.n, name: row.ko, han: row.han,
    upper: row.upper, lower: row.lower, upperHan: TRI_HAN[row.upper], lowerHan: TRI_HAN[row.lower],
    bits, binary: row.bits,
    gua: pick(src.gua, GUA_FIELDS),
    yao,
    yong: null
  };
  if (src.yong) {
    const yang = row.n === 1;     // 건 用九 / 곤 用六
    entry.yong = { guaN: row.n, guaName: row.ko, label: yang ? '用九' : '用六', yinyang: yang ? 'yang' : 'yin', ...pick(src.yong, YAO_FIELDS) };
  }
  guas[row.n] = entry;
}
const out = '/* 자동 생성 파일 — 직접 수정하지 마세요. data-src/gua_NN.json 을 고친 뒤 node data-src/build-yijing-data.js */\n' +
  'const YIJING_DATA = ' + JSON.stringify({ version: 1, guas }) + ';\n';
fs.writeFileSync(path.join(dir, '..', 'yijing-data.js'), out);
console.log('yijing-data.js 생성:', Math.round(out.length / 1024) + 'KB, 괘', Object.keys(guas).length);
