'use strict';
/* 로컬 저장소(localStorage) — 설정과 '나의 점괘 보관함'.
   브라우저가 저장소를 막은 경우(사생활 보호 모드 등)에는 메모리에만 임시 보관하고, 저장 성공 여부를 반환한다. */

const SETTINGS_KEY = 'juyeok.settings.v1';
const VAULT_KEY = 'juyeok.vault.v1';
const VAULT_MAX = 300;
const memoryStore = {};
let storagePersistent = true;

// 쓰기가 실패한 값(저장 공간 초과·저장소 차단)은 메모리에 두고, 읽을 때 메모리가 있으면 그 값을 먼저 돌려 준다.
// (예전에는 저장소 '접근'이 막힌 경우에만 메모리를 읽어서, 용량 초과로 쓰기만 실패하면 방금 저장한 기록이 목록에서 사라졌다.)
function lsGet(key) {
  if (Object.prototype.hasOwnProperty.call(memoryStore, key)) return memoryStore[key];
  try { return localStorage.getItem(key); } catch (e) { storagePersistent = false; return null; }
}
function lsSet(key, value) {
  try { localStorage.setItem(key, value); delete memoryStore[key]; return true; }
  catch (e) { storagePersistent = false; memoryStore[key] = value; return false; }
}

// ===== 설정 =====
const DEFAULT_SETTINGS = { theme: 'dark', lang: 'ko', fontSize: 'normal' };

function getSettings() {
  let s = {};
  try { s = JSON.parse(lsGet(SETTINGS_KEY)) || {}; } catch (e) { s = {}; }
  return {
    theme: ['dark', 'light'].includes(s.theme) ? s.theme : DEFAULT_SETTINGS.theme,
    lang: ['ko', 'en'].includes(s.lang) ? s.lang : DEFAULT_SETTINGS.lang,
    fontSize: ['normal', 'large', 'xlarge'].includes(s.fontSize) ? s.fontSize : DEFAULT_SETTINGS.fontSize
  };
}
function setSetting(key, value) {
  const s = getSettings();
  s[key] = value;
  return lsSet(SETTINGS_KEY, JSON.stringify(s));
}

// ===== 테마 =====
function resolveTheme(pref) {
  return pref === 'light' ? 'light' : 'dark';
}
function applyTheme(pref) {
  const theme = resolveTheme(pref);
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'light' ? '#f7f0e6' : '#1a110b');
}
// ===== 글자 크기 =====
function applyFontSize(size) {
  if (size === 'large' || size === 'xlarge') document.documentElement.dataset.fs = size;
  else delete document.documentElement.dataset.fs;
}
function setFontSize(size) {
  setSetting('fontSize', size);
  applyFontSize(size);
}
function setTheme(pref) {
  setSetting('theme', pref);
  applyTheme(pref);
}
// ===== 점괘 보관함 =====
// 기록에는 '뽑은 효 값(6~9)'과 질문, 시각만 저장한다. 괘 이름·풀이는 열 때마다 최신 데이터로 다시 만든다.
function validRecord(r) {
  return r && typeof r.id === 'string' && Array.isArray(r.values) && r.values.length === 6
    && r.values.every(v => v === 6 || v === 7 || v === 8 || v === 9);
}

// 저장된 배열 전체(검증하지 않은 항목 포함). 쓰기는 이 배열을 기준으로 해서, 이 버전이 알아보지 못하는 기록
// (나중 버전이 만든 형식 등)을 새 기록을 저장하는 김에 지워 버리지 않는다.
function vaultRaw() {
  const text = lsGet(VAULT_KEY);
  if (!text) return [];
  try {
    const arr = JSON.parse(text);
    return Array.isArray(arr) ? arr.filter(r => r && typeof r === 'object') : [];
  } catch (e) {
    // 내용이 깨진 경우: 덮어쓰기 전에 원본을 한 번 따로 남겨 둔다.
    if (lsGet(VAULT_KEY + '.corrupt') === null) lsSet(VAULT_KEY + '.corrupt', text);
    return [];
  }
}

// 화면에 보여 줄 유효한 기록만, 최신순으로
function vaultList() {
  return vaultRaw().filter(validRecord).sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0));
}

// 유효한 기록은 최대 VAULT_MAX 개(오래된 것부터 버림), 알아보지 못하는 항목은 그대로 둔다.
function capVault(raw) {
  const valid = raw.filter(validRecord).sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0));
  const keep = new Set(valid.slice(0, VAULT_MAX));
  return raw.filter(r => !validRecord(r) || keep.has(r));
}

function vaultWrite(arr) {
  return lsSet(VAULT_KEY, JSON.stringify(arr));
}

function vaultGet(id) {
  return vaultList().find(r => r.id === id) || null;
}

// 저장 후 { ok, id, record } 반환. ok=false 이면 이 브라우저에서는 영구 저장이 안 된 것.
function vaultAdd({ values, question, method }) {
  const record = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    savedAt: Date.now(),
    values: values.slice(),
    question: (question || '').slice(0, 500),
    method: method === 'yarrow' ? 'yarrow' : 'simple'
  };
  const raw = vaultRaw();
  raw.unshift(record);
  const ok = vaultWrite(capVault(raw));
  return { ok, id: record.id, record };
}

// 저장된 기록의 질문만 고친다. 성공하면 true.
function vaultUpdateQuestion(id, question) {
  const raw = vaultRaw();
  const rec = raw.find(r => validRecord(r) && r.id === id);
  if (!rec) return false;
  rec.question = (question || '').trim().slice(0, 500);
  return vaultWrite(raw);
}

function vaultRemove(id) {
  return vaultWrite(vaultRaw().filter(r => r.id !== id));
}
function vaultClear() {
  return vaultWrite([]);
}
