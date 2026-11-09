'use strict';
/* classic-view.js — 결과 카드의 "주역 원문으로 읽기" 영역 (화면 표시 전용)
   - 해석 규칙·계산은 divination.js, 해설 데이터는 yijing-data.js 에 있고, 여기서는 그 결과를 DOM 으로 그리기만 합니다.
   - yijing-data.js(약 220KB)는 결과가 처음 필요할 때 한 번만 늦게 불러옵니다(첫 화면 로딩에 영향 없음).
   - 로드 순서: ... core.js → divination.js → classic-view.js → (페이지별 js)
   - core.js 의 setResultCardText() 끝에서 renderClassicBlock(info) 를 호출합니다. */

const YIJING_DATA_SRC = 'yijing-data.js?v=20261109';
let yjInterpreter = null, yjLoading = null, yjFailed = false, yjLastInfo = null;

function loadYijingData() {
  if (yjInterpreter) return Promise.resolve(yjInterpreter);
  if (yjLoading) return yjLoading;
  yjLoading = new Promise((resolve, reject) => {
    const done = () => {
      try { yjInterpreter = YijingDivination.createInterpreter(YIJING_DATA); resolve(yjInterpreter); }
      catch (e) { reject(e); }
    };
    if (typeof YIJING_DATA !== 'undefined') return done();
    const s = document.createElement('script');
    s.src = YIJING_DATA_SRC;
    s.onload = done;
    s.onerror = () => reject(new Error('yijing-data.js load failed'));
    document.head.appendChild(s);
  }).catch(e => { yjLoading = null; throw e; });
  return yjLoading;
}

function yjEl(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}

// 하나의 대목(괘사·효사·용구/용육)을 카드로 그린다
function yjPassageCard(p, en, plain) {
  const card = yjEl('article', 'classic-card' + (p.role === 'primary' ? ' is-primary' : ''));
  const name = p.gua.name;
  const head = yjEl('header', 'classic-card-head');
  if (p.tag) head.appendChild(yjEl('span', 'classic-tag', t(p.side === 'ben' ? 'classic.tag.ben' : 'classic.tag.zhi')));
  const title = plain ? yjPlainTitle(p) : yjPassageTitle(p);
  head.appendChild(yjEl('h4', '', title));
  card.appendChild(head);

  const d = p.data;
  card.appendChild(yjEl('p', 'classic-han', d.text));
  if (en) {
    card.appendChild(yjEl('p', 'classic-note', t('classic.koOnly')));
    const xbEn = yjXiangBox(p, true);
    if (xbEn) card.appendChild(xbEn);
    const posBox = yjPositionBox(p);
    if (posBox) card.appendChild(posBox);
    return card;
  }
  card.appendChild(yjEl('p', 'classic-reading', d.reading));
  card.appendChild(yjEl('p', 'classic-modern', d.modern));
  const xb = yjXiangBox(p, false);
  if (xb) card.appendChild(xb);

  const rows = p.type === 'gua'
    ? [['symbol', d.symbol], ['situation', d.situation], ['positive', d.positive], ['caution', d.caution], ['direction', d.direction]]
    : [['meaning', d.meaning], ['positive', d.positive], ['caution', d.caution], ['advice', d.advice]];
  const dl = yjEl('dl', 'classic-dl');
  rows.forEach(([k, v]) => { dl.append(yjEl('dt', '', t('classic.f.' + k)), yjEl('dd', '', v)); });
  card.appendChild(dl);
  card.appendChild(yjEl('p', 'classic-message', d.message));
  const posBox = yjPositionBox(p);
  if (posBox) card.appendChild(posBox);
  return card;
}

// 상전(象傳) 한 줄: 괘사 카드에는 대상(大象), 효사·용구·용육 카드에는 소상(小象)을 붙인다.
// 십익(十翼)의 하나인 상전은 괘·효의 "이미지"를 군자의 행동이나 효의 사정으로 풀어 주는 전통적 보조 해설이다. (데이터: data-src/xiang_NN.json)
function yjXiangBox(p, hanOnly) {
  const x = p.type === 'gua' ? p.data.daxiang : p.data.xiang;
  if (!x) return null;
  const box = yjEl('div', 'classic-xiang');
  box.appendChild(yjEl('p', 'classic-xiang-label', t(p.type === 'gua' ? 'classic.xiang.da' : 'classic.xiang.xiao')));
  box.appendChild(yjEl('p', 'classic-han', x.text));
  if (!hanOnly) {
    box.appendChild(yjEl('p', 'classic-reading', x.reading));
    box.appendChild(yjEl('p', 'classic-modern', x.modern));
  }
  return box;
}

// 효사(yao) 카드 끝에 붙는 "효의 자리 살펴보기"(정·중·응·비). 계산은 divination.js 의 analyzeLine, 문구는 i18n.
// 길흉을 정하지 않는 보조 설명이며, 접어 두어 처음 읽는 사람에게 부담을 주지 않는다.
function yjPositionBox(p) {
  if (p.type !== 'yao' || !p.gua || !p.gua.binary || typeof YijingDivination === 'undefined') return null;
  const a = YijingDivination.analyzeLine(p.gua.binary, p.pos);
  const yy = b => t(b ? 'classic.pos.yangWord' : 'classic.pos.yinWord');
  const lines = [];
  lines.push(t(a.proper ? 'classic.pos.proper' : 'classic.pos.improper', { pos: t('classic.pos.' + a.pos), slot: yy(a.slotYang), line: yy(a.yang) }));
  if (a.central) {
    lines.push(t('classic.pos.center.' + a.centerOf));
    if (a.zhongzheng) lines.push(t('classic.pos.zhongzheng'));
  }
  lines.push(t(a.ying.matched ? 'classic.pos.ying' : 'classic.pos.noYing', { partner: t('classic.pos.' + a.ying.pos), pl: yy(a.ying.yang) }));
  a.neighbors.forEach(nb => lines.push(t(nb.bi ? 'classic.pos.bi' : 'classic.pos.noBi', { side: t('classic.pos.side.' + nb.side), q: t('classic.pos.' + nb.pos), pl: yy(nb.yang) })));
  const det = yjEl('details', 'classic-pos');
  det.appendChild(yjEl('summary', '', t('classic.pos.summary')));
  const ul = yjEl('ul', 'classic-pos-list');
  lines.forEach(s => ul.appendChild(yjEl('li', '', s)));
  det.append(ul, yjEl('p', 'classic-note', t('classic.pos.note')));
  return det;
}

// 괘 목록 페이지용: 본괘/지괘 접두어 없이 "괘사", "初九 (초효)" 처럼 표시
function yjPlainTitle(p) {
  if (p.type === 'gua') return t('classic.list.gua');
  if (p.type === 'yong') return p.label;
  return t('classic.list.yao', { label: p.label, pos: t('classic.pos.' + p.pos) });
}

function yjPassageTitle(p) {
  const name = p.gua.name;
  if (p.type === 'gua') return t('classic.title.gua.' + p.side, { name });
  if (p.type === 'yong') return t('classic.title.yong', { name, label: p.label });
  return t('classic.title.yao.' + p.side, { name, label: p.label, pos: t('classic.pos.' + p.pos) });
}

// 변효가 4개 이상이면 규칙상 지괘(또는 용구·용육)가 중심이라, 본괘 기준의 위 해설과 읽는 순서가 달라짐을 알린다.
function updateShiftNote(values) {
  const el = document.getElementById('classicShiftNote');
  if (!el) return;
  const n = values.filter(v => v === 6 || v === 9).length;
  let key = null;
  if (n === 6 && values.every(v => v === 9)) key = 'classic.shift.qian';
  else if (n === 6 && values.every(v => v === 6)) key = 'classic.shift.kun';
  else if (n >= 4) key = 'classic.shift';
  if (key) el.textContent = t(key, { n });
  el.classList.toggle('hidden', !key);
}

function renderClassicBlock(info) {
  const body = document.getElementById('classicBody');
  if (!body || !info) return;
  yjLastInfo = info;
  const values = info.lineList.map(l => l.value);
  updateShiftNote(values);
  if (!yjInterpreter) {
    const status = yjEl('p', 'classic-status', t(yjFailed ? 'classic.loadFail' : 'classic.loading'));
    if (yjFailed) {   // 실패 후에도 다시 시도할 수 있게 한다
      const retry = yjEl('button', 'secondary', t('classic.retry'));
      retry.type = 'button';
      retry.addEventListener('click', () => { yjFailed = false; renderClassicBlock(info); });
      body.replaceChildren(status, retry);
    } else body.replaceChildren(status);
    if (!yjFailed) {
      loadYijingData().then(() => { if (yjLastInfo === info) renderClassicBlock(info); })
        .catch(e => { console.error(e); yjFailed = true; if (yjLastInfo === info) renderClassicBlock(info); });
    }
    return;
  }
  let r;
  try { r = yjInterpreter.interpret(values); }
  catch (e) { console.error(e); body.replaceChildren(yjEl('p', 'classic-status', t('classic.loadFail'))); return; }
  const en = getLang() === 'en';

  const nodes = [yjEl('p', 'classic-intro', t('classic.intro'))];

  // 적용한 규칙 + 근거
  const rule = yjEl('div', 'classic-rule');
  const count = r.count ? t('classic.countSome', { n: r.count, list: r.changing.join('·') }) : t('classic.countNone');
  const rh = yjEl('p', 'classic-rule-head'); rh.append(yjEl('b', '', t('classic.ruleTitle')), document.createTextNode(' · ' + count));
  rule.append(rh, yjEl('p', '', t('classic.rule.' + r.ruleId)));
  const basis = yjEl('details', 'more');
  basis.append(yjEl('summary', '', t('classic.basisSummary')), yjEl('p', 'classic-basis', t('classic.basis')));
  rule.appendChild(basis);
  nodes.push(rule);

  // 중심 대목 / 참고 대목
  const primary = r.passages.filter(p => p.role === 'primary');
  const reference = r.passages.filter(p => p.role === 'reference');
  nodes.push(yjEl('h4', 'classic-sub', t('classic.primary')));
  primary.forEach(p => nodes.push(yjPassageCard(p, en)));
  if (reference.length) {
    nodes.push(yjEl('h4', 'classic-sub', t('classic.reference')));
    reference.forEach(p => {
      const det = yjEl('details', 'classic-ref');
      det.append(yjEl('summary', '', yjPassageTitle(p) + ' — ' + p.data.text), yjPassageCard(p, en));
      nodes.push(det);
    });
  }
  body.replaceChildren(...nodes);
}

/* ===== 64괘 목록 페이지(hexagram-list.html): 괘별 괘사·효사 펼침 =====
   container 에 해당 괘의 괘사 1개 + 효사 6개(건·곤은 용구·용육 포함)를 그린다. 데이터는 처음 펼칠 때 한 번만 불러온다. */
function renderGuaReference(n, container) {
  container.replaceChildren(yjEl('p', 'classic-status', t('classic.loading')));
  loadYijingData().then(interp => {
    const gua = interp.byBinary && Object.values(interp.byBinary).find(g => g.n === n);
    if (!gua) throw new Error('gua not found: ' + n);
    const en = getLang() === 'en';
    const mk = (type, data, pos, label) => ({ type, role: 'reference', side: 'ben', guaN: gua.n, pos, tag: null, label, gua, data });
    const nodes = [yjPassageCard(mk('gua', gua.gua, null, gua.name), en, true)];
    gua.yao.forEach(y => {
      const p = mk('yao', y, y.pos, y.label);
      const det = yjEl('details', 'classic-ref');
      det.append(yjEl('summary', '', yjPlainTitle(p) + ' — ' + y.text), yjPassageCard(p, en, true));
      nodes.push(det);
    });
    if (gua.yong) {
      const p = mk('yong', gua.yong, 7, gua.yong.label);
      const det = yjEl('details', 'classic-ref');
      det.append(yjEl('summary', '', gua.yong.label + ' — ' + gua.yong.text), yjPassageCard(p, en, true));
      nodes.push(det);
    }
    container.replaceChildren(...nodes);
  }).catch(e => { console.error(e); container.replaceChildren(yjEl('p', 'classic-status', t('classic.loadFail'))); });
}
