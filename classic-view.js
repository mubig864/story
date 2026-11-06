'use strict';
/* classic-view.js — 결과 카드의 "주역 원문으로 읽기" 영역 (화면 표시 전용)
   - 해석 규칙·계산은 divination.js, 해설 데이터는 yijing-data.js 에 있고, 여기서는 그 결과를 DOM 으로 그리기만 합니다.
   - yijing-data.js(약 220KB)는 결과가 처음 필요할 때 한 번만 늦게 불러옵니다(첫 화면 로딩에 영향 없음).
   - 로드 순서: ... core.js → divination.js → classic-view.js → (페이지별 js)
   - core.js 의 setResultCardText() 끝에서 renderClassicBlock(info) 를 호출합니다. */

const YIJING_DATA_SRC = 'yijing-data.js?v=20261105';
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
  if (en) { card.appendChild(yjEl('p', 'classic-note', t('classic.koOnly'))); return card; }
  card.appendChild(yjEl('p', 'classic-reading', d.reading));
  card.appendChild(yjEl('p', 'classic-modern', d.modern));

  const rows = p.type === 'gua'
    ? [['symbol', d.symbol], ['situation', d.situation], ['positive', d.positive], ['caution', d.caution], ['direction', d.direction]]
    : [['meaning', d.meaning], ['positive', d.positive], ['caution', d.caution], ['advice', d.advice]];
  const dl = yjEl('dl', 'classic-dl');
  rows.forEach(([k, v]) => { dl.append(yjEl('dt', '', t('classic.f.' + k)), yjEl('dd', '', v)); });
  card.appendChild(dl);
  card.appendChild(yjEl('p', 'classic-message', d.message));
  return card;
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
