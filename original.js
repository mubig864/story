'use strict';
/* 서시법(original.html) 전용 — core.js, hexagrams.js 다음에 로드 */
let totalTapCount = 0;
PAGE_METHOD = 'yarrow';              // 보관함 기록에 '서시법'으로 표시
tapDefaultKey = 'tap.infoOriginal';  // 안내 문구 번역 키

const DRAW_DURATION_TAP = 2000;
const DRAW_DURATION_AUTO = 600;
const RESULT_DELAY = 1000;
const tapMsgEl = document.getElementById('tapMainInstruction');
const tapMsgOriginal = () => autoMode ? '' : t('orig.splitMsg');   // 언어에 맞는 기본 안내 문구

function startDrawEffects() {
  tapZone.classList.add('drawing');
  for (let i = 0; i < 3; i++) {
    const ring = document.createElement('div');
    ring.className = 'draw-ring';
    ring.style.animationDelay = (i * 0.6) + 's';
    tapZone.appendChild(ring);
  }
  livePreview.style.display = 'block';
  liveLinePreview.classList.remove('reveal');
  liveLinePreview.innerHTML = '';
  tapInfo.textContent = t('tap.drawing');
  const nextRow = hexagramStack.children[5 - lines.length];
  if (nextRow) nextRow.classList.add('slot-pulse');
}

function stopDrawEffects() {
  tapZone.classList.remove('drawing');
  tapZone.querySelectorAll('.draw-ring, .tap-burst').forEach(el => el.remove());
  liveLinePreview.classList.remove('shuffling');
  clearStalkStage();
  hexagramStack.querySelectorAll('.slot-pulse').forEach(el => el.classList.remove('slot-pulse'));
  if (tapMsgEl) tapMsgEl.textContent = tapMsgOriginal();
}

const STALK_TOTAL = 49;

// 가르기: ratio(0~1) → 왼쪽 무리 개수 L. 4로 나눈 나머지가 고르게 나오도록 L을 4의 배수 폭 안에서 고른다
// (이렇게 해야 6:7:8:9 = 1:5:7:3 의 전통 확률이 정확히 재현된다). R은 항상 4 이상이라 掛一 후에도 남는다.
function computeSplit(total, ratio) {
  const rt = Number.isFinite(ratio) ? Math.min(Math.max(ratio, 0), 0.999999) : 0.5;
  const span = 4 * Math.floor((total - 3) / 4);
  const L = 2 + Math.floor(rt * span);
  const R = total - L;
  const Rp = R - 1;
  const remL = (L % 4) || 4;
  const remR = (Rp % 4) || 4;
  return { total, L, R, Rp, remL, remR, removed: 1 + remL + remR };
}

const stalkStage = document.createElement('div');
stalkStage.className = 'stalk-stage';
tapZone.appendChild(stalkStage);

function clearStalkStage() {
  stalkStage.classList.remove('on');
  tapZone.classList.remove('stage-on');
  stalkStage.innerHTML = '';
}

async function playYarrow(cast, d, myRun, firstRatio, interactive = false) {
  const W = tapZone.clientWidth || 320;
  const H = tapZone.clientHeight || 360;
  const sp = Math.max(3, Math.min(7, Math.floor((W * 0.8) / STALK_TOTAL)));
  const sw = Math.max(2, sp - 2);
  const sh = Math.max(56, Math.min(110, Math.round(H * 0.36)));
  const rowY = Math.round(H * 0.40);
  const gap = 30;
  const trayH = 38;
  const trayTop = H - trayH - 8;
  const trayStickTop = trayTop + Math.max(2, (trayH - sh * 0.3) / 2);
  const trayRight = W - 24 - sw;

  stalkStage.innerHTML = '';
  const mk = (cls, parent = stalkStage) => {
    const el = document.createElement('div');
    el.className = cls;
    parent.appendChild(el);
    return el;
  };

  const mat = mk('stalk-mat');
  mat.style.top = (rowY + sh + 3) + 'px';
  const tray = mk('stalk-tray');
  tray.style.top = trayTop + 'px';
  tray.style.height = trayH + 'px';
  const trayText = mk('stalk-tray-text', tray);
  trayText.textContent = t('orig.tray', { n: 0 });

  const caption = mk('stalk-caption');
  const stepsEl = mk('stalk-steps');
  const stepDots = ['一變', '二變', '三變'].map(t => {
    const s = document.createElement('span');
    s.textContent = t;
    stepsEl.appendChild(s);
    return s;
  });
  const tagL = mk('stalk-tag');
  const tagR = mk('stalk-tag');
  const tagH = mk('stalk-tag');
  const result = mk('stalk-result');

  const sticks = [];
  for (let i = 0; i < STALK_TOTAL; i++) {
    const el = mk('stalk');
    el.style.width = sw + 'px';
    el.style.height = sh + 'px';
    el.style.left = (W / 2 - sw / 2) + 'px';
    el.style.top = (-sh - 20) + 'px';
    sticks.push(el);
  }

  tapZone.classList.add('stage-on');
  void stalkStage.offsetWidth;
  stalkStage.classList.add('on');

  const alive = () => myRun === drawRun;
  const wait = async (f) => { await sleep(Math.max(0, d * f)); return alive(); };
  const setPos = (id, x, y, delay = 0) => {
    const el = sticks[id];
    if (!el) return;
    el.style.transitionDelay = delay + 'ms';
    el.style.opacity = '1';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
  };
  const layoutRow = (ids, stagger = 0) => {
    const x0 = (W - ids.length * sp) / 2;
    ids.forEach((id, i) => setPos(id, x0 + i * sp, rowY, i * stagger));
  };
  const say = (text) => {
    caption.textContent = text;
    caption.classList.remove('swap');
    void caption.offsetWidth;
    caption.classList.add('swap');
  };
  const showTag = (el, text, cx, y) => {
    el.textContent = text;
    el.style.left = cx + 'px';
    el.style.top = y + 'px';
    el.classList.add('on');
  };
  const hideTags = () => [tagL, tagR, tagH].forEach(t => t.classList.remove('on'));
  const pulse = (ids) => ids.forEach(id => {
    const el = sticks[id];
    if (!el) return;
    el.classList.remove('pulse');
    void el.offsetWidth;
    el.classList.add('pulse');
  });
  const chunk = (arr, n) => {
    const out = [];
    for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
    return out;
  };

  let active = sticks.map((_, i) => i);
  let removedCount = 0;

  say(t('orig.cap0'));
  layoutRow(active, 10);
  if (!(await wait(0.4))) return false;

  for (let r = 0; r < 3; r++) {
    let ratio;
    if (r === 0 && Number.isFinite(firstRatio)) {
      ratio = firstRatio;
    } else if (interactive) {
      ratio = await waitForUserSplit(r);
      if (!alive() || !Number.isFinite(ratio)) return false;
      tapZone.classList.remove('waiting-split');
      tapZone.classList.add('stage-on');
      stalkStage.classList.add('on');
      await sleep(100);
      if (!alive()) return false;
    } else {
      ratio = randomUnit();
    }
    const s = computeSplit(active.length, ratio);
    cast.rounds.push(s);
    stepDots.forEach((dot, i) => { dot.className = i < r ? 'done' : (i === r ? 'active' : ''); });
    liveLineText.textContent = t('orig.roundNow', { r: r + 1, n: active.length });

    const startX = (W - (active.length * sp + gap)) / 2;
    const leftIds = active.slice(0, s.L);
    const rightIds = active.slice(s.L);
    const rightStart = startX + s.L * sp + gap;

    say(t('orig.cap1', { r: r + 1 }));
    leftIds.forEach((id, i) => setPos(id, startX + i * sp, rowY));
    rightIds.forEach((id, i) => setPos(id, rightStart + i * sp, rowY));
    showTag(tagL, `天 ${s.L}`, startX + (s.L * sp) / 2, rowY - 26);
    showTag(tagR, `地 ${s.R}`, rightStart + (s.R * sp) / 2, rowY - 26);
    if (!(await wait(0.3))) return false;

    const hungId = rightIds[0];
    const rightRest = rightIds.slice(1);
    const gapCx = startX + s.L * sp + gap / 2;
    say(t('orig.cap2', { r: r + 1 }));
    if (sticks[hungId]) sticks[hungId].classList.add('hung');
    setPos(hungId, gapCx - sw / 2, rowY - sh * 0.42);
    rightRest.forEach((id, i) => setPos(id, rightStart + i * sp, rowY));
    showTag(tagR, `地 ${s.Rp}`, rightStart + (s.Rp * sp) / 2, rowY - 26);
    showTag(tagH, '人', gapCx + 14, rowY - sh * 0.42);
    if (!(await wait(0.2))) return false;

    say(t('orig.cap3', { r: r + 1 }));
    const remL = leftIds.slice(s.L - s.remL);
    const remR = rightRest.slice(0, s.remR);
    const quartL = chunk(leftIds.slice(0, s.L - s.remL), 4);
    const quartR = chunk(rightRest.slice(s.remR), 4).reverse();
    const steps = Math.max(quartL.length, quartR.length);
    const tick = Math.max(20, (d * 0.3) / (steps + 1));
    for (let q = 0; q < steps; q++) {
      if (quartL[q]) pulse(quartL[q]);
      if (quartR[q]) pulse(quartR[q]);
      await sleep(tick);
      if (!alive()) return false;
    }
    [...remL, ...remR].forEach(id => { if (sticks[id]) { sticks[id].classList.add('rem'); pulse([id]); } });
    await sleep(tick);
    if (!alive()) return false;

    say(t('orig.cap4', { r: r + 1 }));
    hideTags();
    [hungId, ...remL, ...remR].forEach(id => {
      const el = sticks[id];
      if (!el) return;
      el.classList.remove('hung', 'rem', 'pulse');
      el.classList.add('gone');
      setPos(id, trayRight - removedCount * sp, trayStickTop);
      removedCount++;
    });
    trayText.textContent = t('orig.tray', { n: removedCount });
    active = [...leftIds.slice(0, s.L - s.remL), ...rightRest.slice(s.remR)];
    lastRoundRemoved = STALK_TOTAL - active.length;
    layoutRow(active);
    if (!(await wait(0.25))) return false;
    say(t('orig.cap5', { r: r + 1, n: active.length }));
    stepDots[r].className = 'done';
    if (!(await wait(0.15))) return false;
  }

  stepsEl.classList.add('hide');
  const value = active.length / 4;
  cast.value = value;
  const valueLabel = I18N.ko['orig.val' + value] ? t('orig.val' + value) : t('orig.valDefault');
  const cg = value > 1 ? Math.min(16, Math.max(6, (W * 0.9 - active.length * sp) / (value - 1))) : 0;
  const totalW = active.length * sp + (value - 1) * cg;
  const fx0 = (W - totalW) / 2;
  say(t('orig.cap6', { n: active.length }));
  active.forEach((id, i) => setPos(id, fx0 + i * sp + Math.floor(i / 4) * cg, rowY));
  if (!(await wait(0.3))) return false;

  const groups = chunk(active, 4);
  result.style.top = Math.max(40, rowY - 78) + 'px';
  result.classList.add('on');
  for (let gi = 0; gi < groups.length; gi++) {
    pulse(groups[gi]);
    result.innerHTML = `<b>${gi + 1}</b>`;
    await sleep((d * 0.3) / groups.length);
    if (!alive()) return false;
  }
  result.innerHTML = `<b>${value}</b><small>${valueLabel}</small>`;
  result.classList.add('final');
  say(`${active.length} ÷ 4 = ${value}`);
  if (!(await wait(0.2))) return false;
  return true;
}

async function drawLineDramatic(duration, ratios) {
  const myRun = drawRun;
  const cast = { rounds: [], value: null };
  const firstRatio = ratios && Number.isFinite(ratios[0]) ? ratios[0] : randomUnit();
  const interactive = duration === DRAW_DURATION_TAP && !!(ratios && Number.isFinite(ratios[0]));
  let finalLine;
  startDrawEffects();
  liveLineText.textContent = t('orig.takeUp');
  if (tapMsgEl) tapMsgEl.textContent = t('orig.dividing');

  const played = await playYarrow(cast, duration, myRun, firstRatio, interactive);
  if (!played || myRun !== drawRun) return false;
  finalLine = mapValueToLine(cast.value);

  const burst = document.createElement('div');
  burst.className = 'tap-burst';
  tapZone.appendChild(burst);
  vibrate(finalLine.changing ? [40, 60, 40] : 40);

  lines.push(finalLine);
  renderLiveLine(finalLine, lines.length);
  liveLinePreview.classList.add('reveal');
  hexagramStack.querySelectorAll('.slot-pulse').forEach(el => el.classList.remove('slot-pulse'));
  renderLines();
  const newRow = hexagramStack.children[6 - lines.length];
  if (newRow) {
    newRow.classList.add('line-new');
    if (finalLine.changing) newRow.classList.add('line-changing');
  }

  tapZone.classList.remove('drawing', 'waiting-split');
  tapZone.querySelectorAll('.draw-ring').forEach(el => el.remove());
  if (tapMsgEl) tapMsgEl.textContent = tapMsgOriginal();
  await sleep(500);
  if (myRun !== drawRun) return false;
  burst.remove();
  stopDrawEffects();
  resetSplitPreview();   // 다음 효의 첫 화면은 처음 효를 뽑을 때와 같게 (막대기 49개)
  return true;
}

async function revealResultDramatic() {
  const myRun = drawRun;
  tapZone.classList.add('finale');
  vibrate([60, 80, 60, 80, 120]);
  if (tapMsgEl) tapMsgEl.textContent = t('tap.allSet');
  await sleep(RESULT_DELAY);
  if (myRun !== drawRun) return;
  tapZone.classList.remove('finale');
  if (tapMsgEl) tapMsgEl.textContent = tapMsgOriginal();
  showResult();
}

async function tap() {
  if (lines.length >= 6 || busy) return;
  busy = true;
  const myRun = drawRun;
  totalTapCount += 1;
  tapCount.textContent = totalTapCount;
  tapZone.classList.add('active');
  setTimeout(() => tapZone.classList.remove('active'), 120);
  autoBtn.disabled = true;
  try {
    const ok = await drawLineDramatic(DRAW_DURATION_TAP, takeTapRatios());
    if (myRun !== drawRun) return;
    busy = false;
    autoBtn.disabled = false;
    if (ok && lines.length < 6) {
      splitProgressEl.textContent = t('orig.progress', { n: 1 });
      swipeInstruction.textContent = '';
    }
    if (ok && lines.length === 6) {
      busy = true;
      await revealResultDramatic();
      if (myRun === drawRun) busy = false;
    }
  } catch (err) {
    recoverFromError(err, myRun);
  }
}

async function autoDraw() {
  if (lines.length >= 6 || busy) return;
  pendingSplitRatios = [];
  gestureRatios = null;
  splitProgressEl.textContent = t('orig.progress', { n: 1 });
  busy = true;
  const myRun = drawRun;
  autoBtn.disabled = true;
  autoMode = true;
  if (tapMsgEl) tapMsgEl.textContent = '';
  try {
    while (lines.length < 6) {
      const ok = await drawLineDramatic(DRAW_DURATION_AUTO);
      if (!ok || myRun !== drawRun) return;
      await sleep(150);
      if (myRun !== drawRun) return;
    }
    await revealResultDramatic();
    if (myRun === drawRun) {
      busy = false;
      autoMode = false;
      autoBtn.disabled = false;
    }
  } catch (err) {
    recoverFromError(err, myRun);
  }
}

function resetAll() {
  autoMode = false;
  drawRun += 1;
  busy = false;
  autoBtn.disabled = false;
  stopDrawEffects();
  tapZone.classList.remove('finale', 'waiting-split', 'stage-on');
  liveLinePreview.classList.remove('reveal');
  liveLinePreview.style.opacity = '';
  totalTapCount = 0;
  tapCount.textContent = '0';
  pendingSplitRatios = [];
  gestureRatios = null;
  if (splitWaiter) { splitWaiter(null); splitWaiter = null; }
  previewStalkCount = 49;
  lastRoundRemoved = 0;
  splitProgressEl.textContent = t('orig.progress', { n: 1 });
  swipeInstruction.textContent = '';
  resetSplitPreview();
  resetCommon();
}

let lastTouch = null;
let swipeStart = null;
let gestureRatios = null;
let pendingSplitRatios = [];
let splitWaiter = null;
let previewStalkCount = 49;
const splitProgressEl = document.getElementById('splitProgress');
const stalkPreview = document.getElementById('stalkPreview');
const stalkSplitMarker = document.getElementById('stalkSplitMarker');
const leftPreviewCount = document.getElementById('leftPreviewCount');
const rightPreviewCount = document.getElementById('rightPreviewCount');
const swipeInstruction = document.getElementById('swipeInstruction');

for (let i = 0; i < 49; i++) {
  const stick = document.createElement('span');
  stick.className = 'preview-stalk';
  stick.setAttribute('aria-hidden', 'true');
  stalkPreview.insertBefore(stick, stalkSplitMarker);
}

function splitRatioAt(clientX) {
  const rect = stalkPreview.getBoundingClientRect();
  return Math.min(0.96, Math.max(0.04, (clientX - rect.left) / rect.width));
}
function updateSplitPreview(clientX, forcedRatio) {
  const ratio = Number.isFinite(forcedRatio) ? forcedRatio : splitRatioAt(clientX);
  stalkSplitMarker.style.left = (ratio * 100) + '%';
  // 전통 서시법에서는 개수를 세지 않고 무심히 가른다. 개수(→4로 나눈 나머지)를 미리 보여주면 결과를 의도적으로
  // 고를 수 있으므로, 가르는 동안에는 좌우 개수를 표시하지 않고 "왼쪽 무리/오른쪽 무리" 라벨만 둔다.
  // (가른 뒤 실제로 세는 과정의 天 N / 地 N 표시는 그대로.)
  leftPreviewCount.textContent = t('orig.leftGroup');
  rightPreviewCount.textContent = t('orig.rightGroup');
  // 막대기가 갈라져 보이는 위치 계산에는 개수가 필요하므로 값은 계산하되 화면에는 표시하지 않는다.
  const leftCount = computeSplit(previewStalkCount, ratio).L;
  const sticks = stalkPreview.querySelectorAll('.preview-stalk');
  const availableWidth = Math.min(560, Math.max(120, (stalkPreview.parentElement ? stalkPreview.parentElement.clientWidth : 320) - 36));
  const targetWidth = Math.min(availableWidth, Math.max(120, previewStalkCount * 9 + 24));
  stalkPreview.style.width = `${targetWidth}px`;
  stalkPreview.style.gridTemplateColumns = `repeat(${previewStalkCount}, minmax(1px, 1fr))`;
  stalkPreview.style.marginLeft = 'auto';
  stalkPreview.style.marginRight = 'auto';
  sticks.forEach((stick, i) => {
    stick.style.display = i < previewStalkCount ? '' : 'none';
    const distance = i < leftCount ? Math.min(14, (leftCount - i) * 1.1) : Math.min(14, (i - leftCount + 1) * 1.1);
    stick.style.transform = `translateX(${i < leftCount ? -distance : distance}px)`;
  });
}

// 새 효를 뽑기 전 화면은 항상 처음(49개, 가운데 기준)과 같게 되돌린다
// (페이지를 처음 열었을 때와 똑같이: 막대기 49개, 가르기 표시 없음, '왼쪽 무리/오른쪽 무리' 문구)
function resetSplitPreview() {
  previewStalkCount = 49;
  lastRoundRemoved = 0;
  stalkPreview.style.width = '';
  stalkPreview.style.gridTemplateColumns = '';
  stalkPreview.style.marginLeft = '';
  stalkPreview.style.marginRight = '';
  stalkPreview.querySelectorAll('.preview-stalk').forEach(stick => {
    stick.style.display = '';
    stick.style.transform = '';
  });
  stalkSplitMarker.style.left = '';
  leftPreviewCount.textContent = t('orig.leftGroup');
  rightPreviewCount.textContent = t('orig.rightGroup');
}

function touchPoint(e) {
  const rect = tapZone.getBoundingClientRect();
  return { x: Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)),
    y: Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height)),
    px: e.clientX - rect.left, py: e.clientY - rect.top };
}
function takeTapRatios() {
  const ratios = gestureRatios;
  gestureRatios = null;
  return ratios;
}

function waitForUserSplit(roundIndex) {
  stalkStage.classList.remove('on');
  tapZone.classList.remove('stage-on');
  tapZone.classList.add('waiting-split');
  previewStalkCount = Math.max(2, 49 - (lastRoundRemoved || 0));
  swipeInstruction.textContent = t('orig.dragInfo', { n: roundIndex + 1 });
  splitProgressEl.textContent = t('orig.progress', { n: roundIndex + 1 });
  const rect = stalkPreview.getBoundingClientRect();
  updateSplitPreview(rect.left + rect.width / 2);
  return new Promise(resolve => { splitWaiter = resolve; });
}

let lastRoundRemoved = 0;
stalkPreview.addEventListener('pointerdown', e => {
  if ((busy && !splitWaiter) || lines.length >= 6) return;
  e.preventDefault();
  swipeStart = { x: e.clientX, y: e.clientY, startedAt: performance.now(), pointerId: e.pointerId };
  stalkPreview.classList.add('swiping');
  updateSplitPreview(e.clientX);
  try { stalkPreview.setPointerCapture(e.pointerId); } catch (_) {}
  mixEntropy(e.timeStamp, e.clientX, e.clientY, e.pressure, e.width, e.height);
});
stalkPreview.addEventListener('pointermove', e => {
  mixEntropy(e.timeStamp, e.clientX, e.clientY);
  if (swipeStart) updateSplitPreview(e.clientX);
});
stalkPreview.addEventListener('pointerup', e => {
  if (!swipeStart) return;
  const start = swipeStart;
  swipeStart = null;
  stalkPreview.classList.remove('swiping');
  const hold = performance.now() - start.startedAt;
  mixEntropy(e.timeStamp, e.clientX, e.clientY, hold);
  const ratio = splitRatioAt(e.clientX);
  updateSplitPreview(e.clientX);
  const p = touchPoint(e);
  lastTouch = { x: ratio, y: p.y, hold, upAt: performance.now() };
  if (splitWaiter) {
    const resolve = splitWaiter;
    splitWaiter = null;
    resolve(ratio);
    splitProgressEl.textContent = t('orig.progress', { n: Math.min(3, Number((splitProgressEl.textContent.match(/(\d+)\/3/) || [0,1])[1]) + 1) });
    swipeInstruction.textContent = t('orig.splitDone');
  } else if (!busy) {
    gestureRatios = [ratio];
    pendingSplitRatios = [];
    splitProgressEl.textContent = t('orig.progress', { n: 1 });
    swipeInstruction.textContent = t('orig.firstCalc');
    tap();
  }
});
stalkPreview.addEventListener('pointercancel', () => {
  swipeStart = null;
  stalkPreview.classList.remove('swiping');
});
tapZone.addEventListener('pointerdown', e => mixEntropy(e.timeStamp, e.clientX, e.clientY));
tapZone.addEventListener('pointermove', e => mixEntropy(e.timeStamp, e.clientX, e.clientY));
tapZone.addEventListener('click', e => e.preventDefault());
tapZone.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && !busy && lines.length < 6) {
    e.preventDefault();
    gestureRatios = null;
    tap();
  }
});
autoBtn.addEventListener('click', autoDraw);
resetBtn.addEventListener('click', resetAll);

// 언어가 바뀔 때 이 페이지의 동적 문구 갱신 (가르는 위치 라벨, 좌우 개수, 진행 표시)
function refreshOriginalText() {
  stalkSplitMarker.dataset.label = t('orig.splitHere');
  const n = Number((splitProgressEl.textContent.match(/(\d+)\/3/) || [0, 1])[1]);
  splitProgressEl.textContent = t('orig.progress', { n });
  if (stalkSplitMarker.style.left) {            // 한 번이라도 가르기를 움직였다면 좌우 개수도 다시 표시
    const r = stalkPreview.getBoundingClientRect();
    updateSplitPreview(r.left + r.width * (parseFloat(stalkSplitMarker.style.left) / 100));
  }
}
onLangChange(refreshOriginalText);
refreshOriginalText();
renderLines();
