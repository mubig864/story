'use strict';
/* qr.js — 의존성 없는 아주 작은 QR 코드 생성기 (공유하기 창에서 사용)
   - 오프라인(PWA)에서도 동작해야 해서 외부 라이브러리·서비스 없이 이 파일 안에서 직접 만듭니다.
   - 규격: ISO/IEC 18004 QR 모델 2, 바이트 모드(UTF-8), 오류정정 수준 M(약 15% 복원), 버전 1~6(최대 106바이트).
     짧은 주소(URL) 전용이며, 더 긴 글자는 오류를 냅니다. 버전 7 이상(버전 정보 영역)은 구현하지 않았습니다.
   - 사용법: QRCodeLite.toSvg('https://…') → SVG 문자열 (흰 배경 + 검은 모듈 + 조용한 영역 4칸, 테마와 무관하게 항상 흑백)
   - 검증: 만든 이미지를 OpenCV QRCodeDetector 로 다시 읽어 원래 문자열과 일치하는지 data-src/test-qr.py 로 확인합니다. */
(function (root) {
  // 오류정정 M 수준: [버전] → { 블록 수, 블록당 데이터 바이트, 블록당 오류정정 바이트 }
  const EC_M = { 1: [1, 16, 10], 2: [1, 28, 16], 3: [1, 44, 26], 4: [2, 32, 18], 5: [2, 43, 24], 6: [4, 27, 16] };
  const ALIGN = { 1: [], 2: [6, 18], 3: [6, 22], 4: [6, 26], 5: [6, 30], 6: [6, 34] };

  // ----- GF(256) 와 Reed-Solomon (원시다항식 0x11D) -----
  const EXP = new Array(512), LOG = new Array(256);
  (function () { let x = 1; for (let i = 0; i < 255; i++) { EXP[i] = x; LOG[x] = i; x <<= 1; if (x & 256) x ^= 0x11d; } for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255]; })();
  const gmul = (a, b) => (a === 0 || b === 0) ? 0 : EXP[LOG[a] + LOG[b]];
  function rsEncode(data, ecLen) {
    let gen = [1];
    for (let i = 0; i < ecLen; i++) {
      const next = new Array(gen.length + 1).fill(0);
      gen.forEach((c, j) => { next[j] ^= gmul(c, 1); next[j + 1] ^= gmul(c, EXP[i]); });
      gen = next;
    }
    const res = new Array(ecLen).fill(0);
    data.forEach(b => {
      const f = b ^ res[0];
      res.shift(); res.push(0);
      for (let i = 0; i < ecLen; i++) res[i] ^= gmul(gen[i + 1], f);
    });
    return res;
  }

  function utf8(str) { return Array.from(new TextEncoder().encode(str)); }

  // ----- 데이터 코드워드(바이트 모드) -----
  function pickVersion(len) {
    for (let v = 1; v <= 6; v++) { const e = EC_M[v]; if (len <= e[0] * e[1] - 2) return v; }   // 모드 4비트+길이 8비트+종결 ≈ 2바이트
    throw new Error('QR: 주소가 너무 깁니다 (최대 약 100바이트)');
  }
  function dataCodewords(bytes, version) {
    const cap = EC_M[version][0] * EC_M[version][1];
    const bits = [];
    const put = (val, n) => { for (let i = n - 1; i >= 0; i--) bits.push((val >>> i) & 1); };
    put(4, 4); put(bytes.length, 8); bytes.forEach(b => put(b, 8));
    put(0, Math.min(4, cap * 8 - bits.length));
    while (bits.length % 8) bits.push(0);
    const out = [];
    for (let i = 0; i < bits.length; i += 8) { let b = 0; for (let j = 0; j < 8; j++) b = (b << 1) | bits[i + j]; out.push(b); }
    for (let pad = 0xec; out.length < cap; pad ^= 0xec ^ 0x11) out.push(pad);
    return out;
  }
  // 블록으로 나누어 오류정정을 붙이고 번갈아 끼워 넣는다
  function finalCodewords(data, version) {
    const [nb, dlen, elen] = EC_M[version];
    const blocks = [], ecs = [];
    for (let i = 0; i < nb; i++) { const d = data.slice(i * dlen, (i + 1) * dlen); blocks.push(d); ecs.push(rsEncode(d, elen)); }
    const out = [];
    for (let i = 0; i < dlen; i++) blocks.forEach(b => out.push(b[i]));
    for (let i = 0; i < elen; i++) ecs.forEach(e => out.push(e[i]));
    return out;
  }

  // ----- 행렬 -----
  function build(codewords, version) {
    const size = 17 + 4 * version;
    const mod = Array.from({ length: size }, () => new Array(size).fill(false));
    const fn = Array.from({ length: size }, () => new Array(size).fill(false));   // 기능 패턴(데이터가 들어가지 않는 칸)
    const setFn = (x, y, dark) => { if (x >= 0 && x < size && y >= 0 && y < size) { mod[y][x] = dark; fn[y][x] = true; } };

    for (let i = 0; i < size; i++) { setFn(6, i, i % 2 === 0); setFn(i, 6, i % 2 === 0); }          // 타이밍
    [[3, 3], [size - 4, 3], [3, size - 4]].forEach(([cx, cy]) => {                                   // 찾기 패턴 + 분리띠
      for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
        const d = Math.max(Math.abs(dx), Math.abs(dy)); setFn(cx + dx, cy + dy, d !== 2 && d !== 4);
      }
    });
    const al = ALIGN[version];                                                                        // 정렬 패턴
    al.forEach((ay, i) => al.forEach((ax, j) => {
      if ((i === 0 && j === 0) || (i === 0 && j === al.length - 1) || (i === al.length - 1 && j === 0)) return;
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) setFn(ax + dx, ay + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
    }));
    const drawFormat = mask => {                                                                      // 형식 정보 (수준 M = 00)
      const data = (0 << 3) | mask;
      let rem = data;
      for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
      const bits = ((data << 10) | rem) ^ 0x5412;
      const bit = i => ((bits >>> i) & 1) !== 0;
      for (let i = 0; i <= 5; i++) setFn(8, i, bit(i));
      setFn(8, 7, bit(6)); setFn(8, 8, bit(7)); setFn(7, 8, bit(8));
      for (let i = 9; i < 15; i++) setFn(14 - i, 8, bit(i));
      for (let i = 0; i < 8; i++) setFn(size - 1 - i, 8, bit(i));
      for (let i = 8; i < 15; i++) setFn(8, size - 15 + i, bit(i));
      setFn(8, size - 8, true);                                                                       // 항상 어두운 칸
    };
    drawFormat(0);   // 자리만 먼저 잡아 둔다

    // 데이터 배치: 오른쪽 아래부터 두 칸 폭으로 지그재그
    let k = 0;
    for (let right = size - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;
      for (let v = 0; v < size; v++) for (let j = 0; j < 2; j++) {
        const x = right - j, upward = ((right + 1) & 2) === 0, y = upward ? size - 1 - v : v;
        if (!fn[y][x] && k < codewords.length * 8) { mod[y][x] = ((codewords[k >>> 3] >>> (7 - (k & 7))) & 1) !== 0; k++; }
      }
    }
    return { size, mod, fn, drawFormat };
  }
  const MASKS = [
    (x, y) => (x + y) % 2 === 0, (x, y) => y % 2 === 0, (x, y) => x % 3 === 0, (x, y) => (x + y) % 3 === 0,
    (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0, (x, y) => x * y % 2 + x * y % 3 === 0,
    (x, y) => (x * y % 2 + x * y % 3) % 2 === 0, (x, y) => ((x + y) % 2 + x * y % 3) % 2 === 0
  ];
  function applyMask(m, mask) {
    for (let y = 0; y < m.size; y++) for (let x = 0; x < m.size; x++) if (!m.fn[y][x] && MASKS[mask](x, y)) m.mod[y][x] = !m.mod[y][x];
  }
  function penalty(m) {   // 규격의 4가지 감점 규칙으로 읽기 좋은 마스크를 고른다
    const n = m.size, g = m.mod; let p = 0;
    const runs = line => {
      let s = 0, run = 1;
      for (let i = 1; i <= n; i++) { if (i < n && line[i] === line[i - 1]) run++; else { if (run >= 5) s += 3 + run - 5; run = 1; } }
      const str = line.map(b => (b ? 1 : 0)).join('');
      if (str.indexOf('10111010000') !== -1) s += 40 * (str.split('10111010000').length - 1);
      if (str.indexOf('00001011101') !== -1) s += 40 * (str.split('00001011101').length - 1);
      return s;
    };
    for (let i = 0; i < n; i++) { p += runs(g[i]); p += runs(g.map(r => r[i])); }
    for (let y = 0; y < n - 1; y++) for (let x = 0; x < n - 1; x++) if (g[y][x] === g[y][x + 1] && g[y][x] === g[y + 1][x] && g[y][x] === g[y + 1][x + 1]) p += 3;
    let dark = 0; g.forEach(r => r.forEach(b => { if (b) dark++; }));
    p += Math.max(0, Math.ceil(Math.abs(dark * 20 - n * n * 10) / (n * n)) - 1) * 10;
    return p;
  }

  /** text → { size, modules[y][x] (true = 어두움) } */
  function encode(text) {
    const bytes = utf8(text), version = pickVersion(bytes.length);
    const cw = finalCodewords(dataCodewords(bytes, version), version);
    let best = null, bestScore = Infinity;
    for (let mask = 0; mask < 8; mask++) {
      const m = build(cw, version);
      applyMask(m, mask); m.drawFormat(mask);
      const s = penalty(m);
      if (s < bestScore) { bestScore = s; best = m; }
    }
    return { size: best.size, modules: best.mod, version };
  }

  /** text → SVG 문자열 (모듈은 하나의 path 로 합쳐 가볍게, 조용한 영역 4칸) */
  function toSvg(text, opts) {
    const q = encode(text), quiet = 4, total = q.size + quiet * 2;
    let d = '';
    q.modules.forEach((row, y) => { let x = 0; while (x < q.size) { if (row[x]) { let w = 1; while (x + w < q.size && row[x + w]) w++; d += 'M' + (x + quiet) + ' ' + (y + quiet) + 'h' + w + 'v1h-' + w + 'z'; x += w; } else x++; } });
    const label = (opts && opts.label) ? ' role="img" aria-label="' + String(opts.label).replace(/"/g, '&quot;') + '"' : ' aria-hidden="true"';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + total + ' ' + total + '" shape-rendering="crispEdges"' + label + '>' +
      '<rect width="100%" height="100%" fill="#fff"/><path d="' + d + '" fill="#000"/></svg>';
  }

  const api = { encode, toSvg };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.QRCodeLite = api;
})(typeof window !== 'undefined' ? window : globalThis);
