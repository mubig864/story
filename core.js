'use strict';
/* 공통 로직 — index.html(간편)·original.html(서시법)·준비중 페이지 공용.
   로드 순서: hexagrams.js → hexagrams_en.js → i18n.js → store.js → core.js → divination.js → classic-view.js → menu.js → (페이지별 js) */

// ===== DOM =====
const $ = id => document.getElementById(id);
const tapZone = $('tapZone');
const autoBtn = $('autoBtn');
const resetBtn = $('resetBtn');
const progressText = $('progressText');
const tapInfo = $('tapInfo');
const tapCount = $('tapCount');
const hexagramStack = $('hexagramStack');
const resultCard = $('resultCard');
const resultBadge = $('resultBadge');
const hexagramName = $('hexagramName');
const trigramNote = $('trigramNote');
const hexagramKeyword = $('hexagramKeyword');
const hexCompare = $('hexCompare');
const exampleQuestion = $('exampleQuestion');
const resultIntro = $('resultIntro');
const coreReading = $('coreReading');
const situationMeaning = $('situationMeaning');
const practicalList = $('practicalList');
const actionList = $('actionList');
const exampleText = $('exampleText');
const changeText = $('changeText');
const questionInput = $('question');
const livePreview = $('livePreview');
const liveLinePreview = $('liveLinePreview');
const liveLineText = $('liveLineText');
const saveBtn = $('saveBtn');
const langNote = $('langNote');
const savedBanner = $('savedBanner');

// ===== 공유 상태 =====
let lines = [];       // 아래(1효)부터 위(6효) 순서
let drawRun = 0;      // 리셋 시 진행 중인 연출을 취소하기 위한 토큰
let busy = false;     // 연출 진행 중 중복 입력 방지
let PAGE_METHOD = 'simple';   // 'simple'(index.html) | 'yarrow'(original.html) — 보관함 기록에 쓰임
let tapDefaultKey = 'tap.info';  // 안내 문구 번역 키 (original.js가 바꿈)
let autoMode = false;       // 자동 뽑기 중에는 '터치/가르기' 안내 문구를 숨긴다
let currentResult = null;    // 지금 화면에 보이는 결과 { values, question, method, savedId, savedAt }

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
function vibrate(pattern) {
  try { if (navigator.vibrate) navigator.vibrate(pattern); } catch (e) {}
}

// ===== 오류 복구 =====
// 연출 도중 예상 못 한 오류가 나도 버튼이 잠긴 채 멈추지 않도록 상태를 되돌리고 안내한다.
function recoverFromError(err, myRun) {
  console.error(err);
  if (myRun !== undefined && myRun !== drawRun) return;   // 이미 리셋된 이전 연출의 오류는 무시
  busy = false;
  if (autoBtn) autoBtn.disabled = false;
  try { if (typeof stopDrawEffects === 'function') stopDrawEffects(); } catch (e) {}
  if (tapZone) tapZone.classList.remove('finale', 'waiting-split', 'stage-on');
  try { showToast(t('err.generic')); } catch (e) {}
}
// 전역 안전망: 우리 코드에서 난 오류만 로그 + 안내 (확장 프로그램·외부 스크립트 오류는 무시)
let lastGlobalToastAt = 0;
function notifyUnexpected(err) {
  console.error(err);
  const now = Date.now();
  if (now - lastGlobalToastAt < 5000) return;
  lastGlobalToastAt = now;
  try { showToast(t('err.generic')); } catch (e) {}
}
window.addEventListener('error', e => {
  if (e.filename && e.filename.indexOf(location.origin) === 0) notifyUnexpected(e.error || e.message);
});
window.addEventListener('unhandledrejection', e => notifyUnexpected(e.reason));

// ===== 난수 =====
// 전통 확률 (시초점, 계사전 '대연지수' 방식): 노음 6 = 1/16, 소양 7 = 5/16, 소음 8 = 7/16, 노양 9 = 3/16
// 터치 입력(시각·좌표·누른 시간)을 해시로 누적하고 보안 난수와 XOR로 섞는다.
// 한쪽이 균등 난수이므로 입력 패턴이 치우쳐도 확률은 유지되고, 입력으로 결과를 노릴 수도 없다.
const LINE_WEIGHTS = [
  { value: 6, weight: 1 },
  { value: 7, weight: 5 },
  { value: 8, weight: 7 },
  { value: 9, weight: 3 }
];

let entropyState = [0x243f6a88, 0x85a308d3, 0x13198a2e, 0x03707344];
let entropyCount = 0;

function mixEntropy(...values) {
  let [h1, h2, h3, h4] = entropyState;
  for (const v of values) {
    const k = ((Number(v) || 0) * 1000) | 0;
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  entropyState = [h1, h2, h3, h4];
}

function userEntropyWord() {
  mixEntropy(performance.now(), entropyCount++);
  let [h1, h2, h3, h4] = entropyState;
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  return (h1 ^ h2 ^ h3 ^ h4) >>> 0;
}

function secureWord() {
  try {
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const a = new Uint32Array(1);
      crypto.getRandomValues(a);
      return a[0];
    }
  } catch (e) {}
  return (Math.random() * 4294967296) >>> 0;
}

function randomUnit() {
  return ((userEntropyWord() ^ secureWord()) >>> 0) / 4294967296;
}

function mapValueToLine(value) {
  return {
    value,
    type: (value === 7 || value === 9) ? 'yang' : 'yin',
    changing: (value === 6 || value === 9)
  };
}

function randomLine() {
  const total = LINE_WEIGHTS.reduce((sum, item) => sum + item.weight, 0);
  let r = randomUnit() * total;
  for (const item of LINE_WEIGHTS) {
    if (r < item.weight) return mapValueToLine(item.value);
    r -= item.weight;
  }
  return mapValueToLine(8);
}

// ===== 렌더링 =====
function renderLineGraphic(container, line) {
  if (line.type === 'yang') {
    container.innerHTML = '<div class="yang-line"></div>';
  } else {
    container.innerHTML = '<div class="yin-wrap"><div class="yin-line-left"></div><div class="yin-line-right"></div></div>';
  }
  if (line.changing) {
    const mark = document.createElement('div');
    mark.className = 'changing-mark';
    mark.textContent = getLang() === 'en' ? '↻' : '변';
    container.appendChild(mark);
  }
}

function describeLine(line, index) {
  return t('line.desc', {
    i: index,
    type: t(line.type === 'yang' ? 'line.yang' : 'line.yin'),
    change: t(line.changing ? 'line.changing' : 'line.stable')
  });
}

function renderLiveLine(line, index) {
  livePreview.style.display = 'block';
  liveLinePreview.innerHTML = '';
  renderLineGraphic(liveLinePreview, line);
  liveLineText.textContent = describeLine(line, index);
  tapInfo.textContent = t('line.drawn', { i: index });
}

function renderLines() {
  progressText.textContent = t('progress', { n: lines.length });
  const frag = document.createDocumentFragment();
  const combined = [...Array(6 - lines.length).fill(null), ...[...lines].reverse()];
  combined.forEach((line, index) => {
    const row = document.createElement('div');
    row.className = 'line-row';
    const label = document.createElement('div');
    label.className = 'line-label';
    label.textContent = t('line.label', { n: 6 - index });
    const box = document.createElement('div');
    box.className = 'iching-line';
    if (line) renderLineGraphic(box, line);
    else box.innerHTML = '<div class="empty-line"></div>';
    row.append(label, box);
    frag.appendChild(row);
  });
  hexagramStack.replaceChildren(frag);
}

function refreshTapInfo() {
  tapInfo.textContent = lines.length ? t('line.drawn', { i: lines.length }) : t(tapDefaultKey);
}

// ===== 괘 데이터 (언어별) =====
// 영어 데이터(HEXAGRAMS_EN)에 채워진 필드는 영어로, 비어 있는 필드는 한국어로 대체한다.
function readingOf(binary) {
  const base = HEXAGRAMS[binary];
  if (getLang() === 'en' && typeof HEXAGRAMS_EN !== 'undefined' && HEXAGRAMS_EN[binary]) {
    const en = HEXAGRAMS_EN[binary];
    return { ...base, ...en, _detailInEnglish: !!(en.core && en.situation && en.example && en.actions && en.practical) };
  }
  return { ...base, _detailInEnglish: true };
}

const shortName = n => n.split(' (')[0];
const sentence = s => /[.!?]$/.test(s) ? s : s + '.';

// 뽑은 효 값(6~9) 6개 → 본괘/지괘 계산
function analyzeValues(values) {
  const lineList = values.map(mapValueToLine);
  const bit = l => (l.type === 'yang' ? '1' : '0');
  const binary = lineList.map(bit).join('');
  const changedLines = lineList.map(l => mapValueToLine(l.changing ? (l.type === 'yang' ? 8 : 7) : l.value));
  const changedBinary = changedLines.map(bit).join('');
  const changingIdx = lineList.map((l, i) => (l.changing ? i : -1)).filter(i => i >= 0);
  return {
    lineList, changedLines, binary, changedBinary, changingIdx,
    reading: readingOf(binary), changed: readingOf(changedBinary)
  };
}

// ===== 결과 =====
const TRIGRAMS = {
  '111': ['☰', 'heaven'], '110': ['☱', 'lake'], '101': ['☲', 'fire'], '100': ['☳', 'thunder'],
  '011': ['☴', 'wind'], '010': ['☵', 'water'], '001': ['☶', 'mountain'], '000': ['☷', 'earth']
};

// 괘 이름이 뜻하는 위·아래 자연물 (키는 아래→위 순서이므로 앞 3개가 아래, 뒤 3개가 위)
function trigramText(binary) {
  const lower = TRIGRAMS[binary.slice(0, 3)], upper = TRIGRAMS[binary.slice(3)];
  return t('trigram.line', {
    u: `${upper[0]} ${t('trigram.' + upper[1])}`,
    l: `${lower[0]} ${t('trigram.' + lower[1])}`
  });
}

// 작은 괘 그림 (위가 6효). highlight: 변하는 효의 인덱스 목록(0 = 1효)
function miniHexagram(lineList, highlight) {
  const box = document.createElement('div');
  box.className = 'mini-hex';
  for (let i = 5; i >= 0; i--) {
    const row = document.createElement('div');
    row.className = 'iching-line' + (highlight.includes(i) ? ' hl' : '');
    renderLineGraphic(row, lineList[i]);
    box.appendChild(row);
  }
  return box;
}

function hexFigure(title, name, lineList, highlight) {
  const fig = document.createElement('div');
  fig.className = 'hex-figure';
  const ti = document.createElement('div'); ti.className = 'hex-figure-title'; ti.textContent = title;
  const n = document.createElement('div'); n.className = 'hex-figure-name'; n.textContent = shortName(name);
  fig.append(ti, miniHexagram(lineList, highlight), n);
  return fig;
}

// 한글 조사 선택: 마지막 글자의 받침 유무 (ㄹ 받침은 '로' 계열 취급)
function josa(word, withBatchim, without, rieulSame = false) {
  const c = word.charCodeAt(word.length - 1) - 0xAC00;
  if (c < 0 || c > 11171) return without;
  const jong = c % 28;
  if (jong === 0 || (rieulSame && jong === 8)) return without;
  return withBatchim;
}

function buildChangeParagraphs(changingIdx, lineList, reading, changed) {
  const ko = getLang() !== 'en';
  const fromName = shortName(reading.name), toName = shortName(changed.name);
  if (!changingIdx.length) return [t('chg.none', { name: fromName })];

  const all = changingIdx.length === 6;
  const fmt = arr => (ko ? arr.map(i => i + 1).join('·') + '효' : 'line' + (arr.length > 1 ? 's ' : ' ') + arr.map(i => i + 1).join(', '));
  const yang = changingIdx.filter(i => lineList[i].type === 'yang');
  const yin = changingIdx.filter(i => lineList[i].type === 'yin');
  const how = [];
  const fmtOf = arr => (all && ko ? '여섯 효 모두' : fmt(arr));
  const cap = x => (ko ? x : x.charAt(0).toUpperCase() + x.slice(1));   // 영어는 문장 첫 글자를 대문자로
  if (yang.length) how.push(cap(t('chg.yang', { list: fmtOf(yang), josa: ko ? (all ? '의' : '는') : '' })));
  if (yin.length) how.push(cap(t('chg.yin', { list: fmtOf(yin), josa: ko ? (all ? '의' : '는') : '' })));
  const where = all ? t('chg.whereAll') : t('chg.whereSome', { list: fmt(changingIdx) });

  const out = [t('chg.p1', { where, how: how.join(ko ? ', ' : '; ') })];
  if (ko) {
    out.push(t('chg.p2', {
      from: fromName, to: toName,
      josa1: josa(toName, '으로', '로', true), josa2: josa(toName, '은', '는'),
      summary: sentence(changed.summary)
    }));
    out.push(t('chg.p3', { action: changed.actions[0] }));
  } else {
    out.push(t('chg.p2', { from: fromName, to: toName, keyword: changed.keyword, summary: sentence(changed.summary) }));
    if (changed.actions && changed.actions[0]) out.push(t('chg.p3', { action: changed.actions[0] }));
  }
  if (changingIdx.length >= 4) out.push(t('chg.many'));
  return out;
}

function setResultCardText(info, question) {
  const { reading, changed, binary, changingIdx, lineList, changedLines } = info;
  const en = getLang() === 'en';

  resultBadge.textContent = !changingIdx.length ? t('result.badge.none')
    : changingIdx.length === 6 ? t('result.badge.all')
    : t(changingIdx.length === 1 ? 'result.badge.one' : 'result.badge.some', { n: changingIdx.length, list: changingIdx.map(i => i + 1).join(', ') });
  hexagramName.textContent = reading.name;
  trigramNote.textContent = trigramText(binary);
  hexagramKeyword.textContent = reading.keyword;
  resultIntro.textContent = reading.summary;

  const figures = [hexFigure(t('result.figNow'), reading.name, lineList, changingIdx)];
  if (changingIdx.length) {
    const arrow = document.createElement('div'); arrow.className = 'hex-arrow'; arrow.textContent = '→';
    figures.push(arrow, hexFigure(t('result.figAfter'), changed.name, changedLines, changingIdx));
  }
  hexCompare.replaceChildren(...figures);

  coreReading.textContent = reading.core;
  exampleQuestion.textContent = question ? t('result.questionEcho', { q: question }) : '';
  exampleQuestion.style.display = question ? '' : 'none';
  exampleText.textContent = reading.example;
  situationMeaning.textContent = reading.situation;
  changeText.replaceChildren(...buildChangeParagraphs(changingIdx, lineList, reading, changed).map(tx => {
    const p = document.createElement('p'); p.textContent = tx; return p;
  }));
  const toItems = arr => arr.map(item => { const li = document.createElement('li'); li.textContent = item; return li; });
  actionList.replaceChildren(...toItems(reading.actions));
  practicalList.replaceChildren(...toItems(reading.practical));
  if (langNote) langNote.classList.toggle('hidden', !(en && !reading._detailInEnglish));
  // 주역 원문 풀이(괘사·효사, 고변점 규칙) — divination.js / classic-view.js
  if (typeof renderClassicBlock === 'function') renderClassicBlock(info);
}

function updateSaveButton() {
  if (!saveBtn) return;
  const saved = !!(currentResult && currentResult.savedId);
  saveBtn.disabled = saved;
  saveBtn.textContent = t(saved ? 'result.saved' : 'result.save');
  if (savedBanner) {
    const fromVault = !!(currentResult && currentResult.fromVault);
    savedBanner.classList.toggle('hidden', !fromVault);
    if (fromVault) savedBanner.textContent = t('result.fromVault', { date: new Date(currentResult.savedAt).toLocaleString(getLang() === 'en' ? 'en-US' : 'ko-KR', { dateStyle: 'medium', timeStyle: 'short' }) });
  }
}

function renderResult() {
  if (!currentResult || !resultCard) return;
  setResultCardText(analyzeValues(currentResult.values), currentResult.question);
  updateSaveButton();
  resultCard.classList.remove('hidden');
}

function showResult() {
  currentResult = {
    values: lines.map(l => l.value),
    question: questionInput ? questionInput.value.trim() : '',
    method: PAGE_METHOD,
    savedId: null
  };
  renderResult();
  setTimeout(() => resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
}

// ===== 보관함 연동 =====
function showToast(message) {
  let box = document.getElementById('toast');
  if (!box) {
    box = document.createElement('div');
    box.id = 'toast';
    box.className = 'toast';
    box.setAttribute('role', 'status');
    document.body.appendChild(box);
  }
  box.textContent = message;
  box.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => box.classList.remove('show'), 2200);
}

function saveCurrentResult() {
  if (!currentResult || currentResult.savedId) return;
  const res = vaultAdd({ values: currentResult.values, question: currentResult.question, method: currentResult.method });
  currentResult.savedId = res.id;
  updateSaveButton();
  showToast(t(res.ok ? 'result.savedToast' : 'result.saveFail'));
}
if (saveBtn) saveBtn.addEventListener('click', saveCurrentResult);

// 보관함에서 선택한 기록을 결과 카드로 다시 보여준다
function renderSavedReading(id) {
  const rec = vaultGet(id);
  if (!rec || !resultCard) return false;
  currentResult = { values: rec.values, question: rec.question, method: rec.method, savedId: rec.id, savedAt: rec.savedAt, fromVault: true };
  renderResult();
  setTimeout(() => resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  return true;
}

// 주소의 #view=기록ID 를 처리 (다른 페이지에서 보관함 항목을 눌렀을 때)
function handleViewHash() {
  const m = /^#view=([\w-]+)$/.exec(location.hash);
  if (!m) return;
  renderSavedReading(m[1]);
  try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
}

// 페이지별 resetAll()이 공통으로 마무리하는 부분
function resetCommon() {
  lines = [];
  currentResult = null;
  refreshTapInfo();
  livePreview.style.display = 'none';
  liveLinePreview.innerHTML = '';
  liveLineText.textContent = '';
  resultCard.classList.add('hidden');
  renderLines();
}

// 언어가 바뀌면 동적으로 만든 부분도 다시 그린다
onLangChange(() => {
  if (!tapZone) return;
  renderLines();
  refreshTapInfo();
  if (!busy && lines.length) liveLineText.textContent = describeLine(lines[lines.length - 1], lines.length);
  if (currentResult) renderResult();
});
