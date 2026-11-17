'use strict';
/* 간편 뽑기(index.html) 전용 — core.js, hexagrams.js 다음에 로드 */
let totalTapCount = 0;
let pointerDownAt = 0;

// ===== 효 뽑기 연출 (시간 지연 + 시각 효과) =====
const DRAW_DURATION_TAP = 2800;   // 탭 1회당 효가 결정되기까지의 시간(ms)
const DRAW_DURATION_AUTO = 1600;  // 자동 뽑기 시 효 1개당 시간(ms)
const RESULT_DELAY = 1300;        // 6번째 효 확정 후 결과 공개까지의 뜸(ms)
const PHASE_KEYS = ['tap.phase1', 'tap.phase2', 'tap.phase3'];
const tapMsgEl = tapZone.querySelector('.tap-instruction > div:not(.tap-count)');
const tapMsgOriginal = () => autoMode ? '' : t('tap.hint');   // 언어에 맞는 기본 안내 문구

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
  liveLinePreview.classList.add('shuffling');
  tapInfo.textContent = t('tap.drawing');
  // 다음에 채워질 칸 강조
  const nextRow = hexagramStack.children[5 - lines.length];
  if (nextRow) nextRow.classList.add('slot-pulse');
}

function stopDrawEffects() {
  tapZone.classList.remove('drawing');
  tapZone.querySelectorAll('.draw-ring, .tap-burst').forEach(el => el.remove());
  liveLinePreview.classList.remove('shuffling');
  hexagramStack.querySelectorAll('.slot-pulse').forEach(el => el.classList.remove('slot-pulse'));
  if (tapMsgEl) tapMsgEl.textContent = tapMsgOriginal();
}

// 효 하나를 극적으로 뽑는다. 취소되면 false 반환.
async function drawLineDramatic(duration) {
  const myRun = drawRun;
  const finalLine = randomLine();
  startDrawEffects();
  liveLineText.textContent = t('tap.deciding');

  const shuffleTime = duration * 0.85;
  const start = Date.now();
  let wait = 60;
  let lastPhase = -1;

  // 1) 셔플 구간: 양/음이 빠르게 바뀌다가 점점 느려짐
  while (Date.now() - start < shuffleTime) {
    const progress = (Date.now() - start) / shuffleTime;
    const phase = Math.min(PHASE_KEYS.length - 1, Math.floor(progress * PHASE_KEYS.length));
    if (phase !== lastPhase && tapMsgEl) {
      tapMsgEl.textContent = t(PHASE_KEYS[phase]);
      lastPhase = phase;
    }
    const fake = mapValueToLine([7, 8][Math.floor(Math.random() * 2)]);
    renderLineGraphic(liveLinePreview, fake);
    await sleep(wait);
    if (myRun !== drawRun) return false;
    wait = Math.min(wait * 1.13, 300);
  }

  // 2) 숨 고르기: 잠깐 멈춤
  liveLinePreview.classList.remove('shuffling');
  liveLinePreview.style.opacity = '0.35';
  await sleep(duration * 0.15);
  if (myRun !== drawRun) return false;
  liveLinePreview.style.opacity = '';

  // 3) 확정 연출
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

  tapZone.classList.remove('drawing');
  tapZone.querySelectorAll('.draw-ring').forEach(el => el.remove());
  if (tapMsgEl) tapMsgEl.textContent = tapMsgOriginal();
  await sleep(900);
  if (myRun !== drawRun) return false;
  burst.remove();
  stopDrawEffects();
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
    const ok = await drawLineDramatic(DRAW_DURATION_TAP);
    if (myRun !== drawRun) return;
    busy = false;
    autoBtn.disabled = false;
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
  busy = true;
  const myRun = drawRun;
  autoBtn.disabled = true;
  autoMode = true;
  if (tapMsgEl) tapMsgEl.textContent = '';
  try {
    while (lines.length < 6) {
      const ok = await drawLineDramatic(DRAW_DURATION_AUTO);
      if (!ok || myRun !== drawRun) return;
      await sleep(250);
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
  drawRun += 1;           // 진행 중인 뽑기 연출 취소
  busy = false;
  autoBtn.disabled = false;
  stopDrawEffects();
  tapZone.classList.remove('finale');
  liveLinePreview.classList.remove('reveal');
  liveLinePreview.style.opacity = '';
  totalTapCount = 0;
  tapCount.textContent = '0';
  resetCommon();
}

// 터치 입력(시각, 좌표, 누른 시간)을 난수 해시에 누적
tapZone.addEventListener('pointerdown', e => {
  pointerDownAt = performance.now();
  mixEntropy(e.timeStamp, e.clientX, e.clientY, e.pressure, e.width, e.height);
});
tapZone.addEventListener('pointermove', e => {
  mixEntropy(e.timeStamp, e.clientX, e.clientY);
});
tapZone.addEventListener('pointerup', e => {
  mixEntropy(e.timeStamp, e.clientX, e.clientY, performance.now() - pointerDownAt);
});
tapZone.addEventListener('click', tap);
// 키보드(Enter·Space)로도 뽑을 수 있게 한다. 뽑기 영역이 role="button" 이므로 같은 동작을 해야 한다. (서시법 화면과 동일)
tapZone.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && !e.repeat && !busy && lines.length < 6) {
    e.preventDefault();
    tap();
  }
});
autoBtn.addEventListener('click', autoDraw);
resetBtn.addEventListener('click', resetAll);

renderLines();
