'use strict';
/* 좌측 상단 메뉴(서랍) + 설정 창 + 나의 점괘 보관함 창 + 개인정보 보호 안내 창.
   모든 페이지에서 공용으로 쓰며, 서랍·창은 이 파일이 body에 직접 만든다.
   요구 사항: 페이지에 #menuBtn 버튼이 있어야 하고, i18n.js · store.js · core.js 다음에 로드한다. */

/* 메뉴 아이콘: 이모지는 기기마다 색이 달라 일관성이 없으므로, 색을 하나(--accent)로 통일할 수 있는 선 아이콘(SVG)을 쓴다 */
const MENU_ICONS = {
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1"/>',
  link: '<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-3.8 3.6-6 7-6s6.2 2.2 7 6"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  shield: '<path d="M12 3l7 3v5.5c0 4.3-3 7.7-7 9.5-4-1.8-7-5.2-7-9.5V6z"/><path d="M9 12l2.2 2.2L15.5 10"/>',
  mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.5 7l8.5 6.5L20.5 7"/>'
};

/* ★ 나중에 페이지를 만들면 여기 href만 바꾸면 됩니다. (action 항목은 창을 엽니다) */
const MENU_ITEMS = [
  { id: 'about',    key: 'menu.about',    glyph: '☯', href: 'about.html' },
  { id: 'list',     key: 'menu.list',     glyph: '☰', href: 'hexagram-list.html' },
  { id: 'vault',    key: 'menu.vault',    glyph: '☷', action: 'vault' },
  { id: 'settings', key: 'menu.settings', icon: 'gear', action: 'settings' },
  { id: 'share',    key: 'menu.share',    icon: 'link', action: 'share' },
  { id: 'privacy',  key: 'menu.privacy',  icon: 'lock', action: 'privacy' },
  { id: 'contact',  key: 'menu.contact',  icon: 'mail', href: 'mailto:mubig864@gmail.com' }
];

(function () {
  const menuBtn = document.getElementById('menuBtn');
  if (!menuBtn) return;

  const el = (tag, cls, attrs) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (attrs) Object.keys(attrs).forEach(k => e.setAttribute(k, attrs[k]));
    return e;
  };

  // ---------- 서랍 ----------
  const backdrop = el('div', 'drawer-backdrop');
  const drawer = el('nav', 'drawer', { id: 'drawer', 'aria-labelledby': 'drawerTitle' });
  drawer.inert = true;

  const drawerHead = el('div', 'drawer-head');
  const drawerTitle = el('h2', null, { id: 'drawerTitle', 'data-i18n': 'menu.title' });
  const drawerClose = el('button', 'icon-btn', { type: 'button', 'data-i18n-aria': 'menu.close' });
  drawerClose.textContent = '✕';
  drawerHead.append(drawerTitle, drawerClose);

  const list = el('ul', 'drawer-list');
  MENU_ITEMS.forEach(item => {
    const li = el('li');
    const node = item.href ? el('a', 'drawer-item', { href: item.href }) : el('button', 'drawer-item', { type: 'button' });
    node.dataset.menuId = item.id;
    const glyph = el('span', 'drawer-glyph', { 'aria-hidden': 'true' });
    if (item.icon) {
      glyph.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" focusable="false">' + MENU_ICONS[item.icon] + '</svg>';
    } else {
      glyph.textContent = item.glyph + '\uFE0E';   // 텍스트 형태로 고정(이모지 색 방지)
    }
    const label = el('span', null, { 'data-i18n': item.key });
    node.append(glyph, label);
    if (item.action === 'share') node.addEventListener('click', () => { closeDrawer(false); shareApp(); });
    else if (item.action) node.addEventListener('click', () => { closeDrawer(false); openSheet(item.action); });
    li.appendChild(node);
    list.appendChild(li);
  });
  drawer.append(drawerHead, list);

  // ---------- 공유하기: 앱 주소를 클립보드에 복사 ----------
  // 어느 페이지에서 눌러도 항상 같은 앱 주소를 복사한다. (#view=… 같은 개인 기록 주소는 포함하지 않음)
  const SHARE_URL = 'https://mubig864.github.io/story/';
  function shareUrl() { return SHARE_URL; }
  function toast(msg) {
    if (typeof showToast === 'function') showToast(msg); else alert(msg);
  }
  function copyFallback(text) {
    // 구형 브라우저·권한이 막힌 환경용
    const ta = el('textarea', null, { readonly: '', 'aria-hidden': 'true' });
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) {}
    ta.remove();
    return ok;
  }
  async function shareApp() {
    const url = shareUrl();
    let ok = false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) { await navigator.clipboard.writeText(url); ok = true; }
    } catch (e) {}
    if (!ok) ok = copyFallback(url);
    if (ok) toast(t('share.copied'));
    else window.prompt(t('share.manual'), url);   // 복사가 모두 막힌 경우: 직접 복사할 수 있게 주소를 보여 준다
  }

  // ---------- 설정 창 ----------
  const settingsDlg = el('dialog', 'sheet', { 'aria-labelledby': 'settingsTitle' });
  settingsDlg.innerHTML =
    '<div class="sheet-head"><h2 id="settingsTitle" data-i18n="settings.title"></h2>' +
    '<button type="button" class="icon-btn" data-close data-i18n-aria="settings.close">✕</button></div>' +
    '<div class="sheet-body">' +
    '<div class="setting-row"><h3 data-i18n="settings.theme"></h3>' +
    '<div class="seg" role="group" data-seg="theme">' +
    '<button type="button" data-val="dark" data-i18n="settings.theme.dark"></button>' +
    '<button type="button" data-val="light" data-i18n="settings.theme.light"></button></div></div>' +
    '<div class="setting-row"><h3 data-i18n="settings.fontSize"></h3>' +
    '<div class="seg" role="group" data-seg="fontSize">' +
    '<button type="button" data-val="normal" data-i18n="settings.fs.normal"></button>' +
    '<button type="button" data-val="large" data-i18n="settings.fs.large"></button>' +
    '<button type="button" data-val="xlarge" data-i18n="settings.fs.xlarge"></button></div></div>' +
    '<div class="setting-row"><h3 data-i18n="settings.lang"></h3>' +
    '<div class="seg" role="group" data-seg="lang">' +
    '<button type="button" data-val="ko" data-i18n="settings.lang.ko"></button>' +
    '<button type="button" data-val="en" data-i18n="settings.lang.en"></button></div>' +
    '<p class="hint" data-i18n="settings.langHint"></p></div></div>';

  // ---------- 개인정보 보호 안내 창 ----------
 const privacyDlg = el('dialog', 'sheet', { 'aria-labelledby': 'privacyTitle' });
  const PRIVACY_CARDS = [
    { icon: 'user', t: 'privacy.c1t', d: 'privacy.c1d' },
    { icon: 'lock', t: 'privacy.c2t', d: 'privacy.c2d' },
    { icon: 'chart', t: 'privacy.c3t', d: 'privacy.c3d', note: true },   // 외부 서비스(GA4)가 관련된 유일한 항목 — 강조선으로 구분
    { icon: 'shield', t: 'privacy.c4t', d: 'privacy.c4d' }
  ];
  const svgIcon = n => '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true">' + MENU_ICONS[n] + '</svg>';
  privacyDlg.innerHTML =
    '<div class="sheet-head"><h2 id="privacyTitle" data-i18n="privacy.title"></h2>' +
    '<button type="button" class="icon-btn" data-close data-i18n-aria="settings.close">✕</button></div>' +
    '<div class="sheet-body privacy-body">' +
    '<div class="privacy-lead"><span class="privacy-lead-icon">' + svgIcon('shield') + '</span>' +
    '<strong data-i18n="privacy.lead"></strong><span class="privacy-lead-sub" data-i18n="privacy.leadSub"></span></div>' +
    PRIVACY_CARDS.map(c =>
      '<div class="privacy-card' + (c.note ? ' note' : '') + '"><span class="privacy-card-icon">' + svgIcon(c.icon) + '</span>' +
      '<div><h3 data-i18n="' + c.t + '"></h3><p data-i18n-html="' + c.d + '"></p></div></div>').join('') +
    '<p class="privacy-foot" data-i18n="privacy.foot"></p>' +
    '</div>';

  // ---------- 보관함 창 ----------
  const vaultDlg = el('dialog', 'sheet', { 'aria-labelledby': 'vaultTitle' });
  vaultDlg.innerHTML =
    '<div class="sheet-head"><h2 id="vaultTitle" data-i18n="vault.title"></h2>' +
    '<button type="button" class="icon-btn" data-close data-i18n-aria="settings.close">✕</button></div>' +
    '<div class="sheet-body">' +
    '<p class="vault-count" id="vaultCount"></p>' +
    '<p class="vault-warn hidden" id="vaultWarn" data-i18n="vault.unavailable"></p>' +
    '<p class="vault-empty hidden" id="vaultEmpty" data-i18n="vault.empty"></p>' +
    '<ul class="vault-list" id="vaultList"></ul>' +
    '<div class="vault-foot"><button type="button" class="ghost" id="vaultClear" data-i18n="vault.clear"></button></div></div>';

  document.body.append(backdrop, drawer, settingsDlg, privacyDlg, vaultDlg);

  // ---------- 서랍 열고 닫기 ----------
  const appRoot = document.querySelector('.app');
  // 아이폰 홈 화면 앱은 처음 실행 때 화면이 살짝 아래로 밀린 채 시작하는 경우가 있어,
  // 고정(fixed) 서랍의 터치 위치가 눈에 보이는 위치와 어긋난다. 시작·복귀·회전 때 위치를 다시 맞춘다.
  function realign() {
    if (document.body.classList.contains('menu-open')) return;
    if (window.scrollY > 0 && window.scrollY < 3) window.scrollTo(0, 0);
    void drawer.offsetHeight;   // 레이아웃 강제 갱신
  }
  window.addEventListener('pageshow', realign);
  window.addEventListener('resize', realign);
  window.addEventListener('orientationchange', realign);
  if (window.visualViewport) window.visualViewport.addEventListener('resize', realign);
  function openDrawer() {
    if (window.scrollY < 3) window.scrollTo(0, 0);
    void drawer.offsetHeight;
    document.body.classList.add('menu-open');
    drawer.inert = false;
    if (appRoot) appRoot.inert = true;
    menuBtn.setAttribute('aria-expanded', 'true');
    const first = drawer.querySelector('.drawer-item');
    if (first) first.focus();
  }
  function closeDrawer(restoreFocus) {
    document.body.classList.remove('menu-open');
    drawer.inert = true;
    if (appRoot) appRoot.inert = false;
    menuBtn.setAttribute('aria-expanded', 'false');
    if (restoreFocus !== false) menuBtn.focus();
  }
  menuBtn.setAttribute('aria-controls', 'drawer');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.addEventListener('click', () => (document.body.classList.contains('menu-open') ? closeDrawer() : openDrawer()));
  drawerClose.addEventListener('click', () => closeDrawer());
  backdrop.addEventListener('click', () => closeDrawer());
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) closeDrawer();
  });

  // ---------- 창(dialog) 열고 닫기 ----------
  function openSheet(name) {
    let dlg = settingsDlg;
    if (name === 'vault') {
      dlg = vaultDlg;
      renderVault();
    } else if (name === 'privacy') {
      dlg = privacyDlg;
    } else {
      syncSettingsUI();
    }
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
  }
  [settingsDlg, privacyDlg, vaultDlg].forEach(dlg => {
    dlg.addEventListener('click', e => {
      if (e.target === dlg || e.target.closest('[data-close]')) dlg.close();   // 바깥(배경) 클릭 또는 ✕
    });
    dlg.addEventListener('close', () => menuBtn.focus({ preventScroll: true }));
  });

  // ---------- 결과 화면 하단 고정 바 (보관함 · 메뉴) ----------
  // 결과를 읽다가 맨 위로 올라가지 않고도 보관함·메뉴를 열 수 있게 한다.
  const resultCardEl = document.getElementById('resultCard');
  {
    const bar = el('div', 'bottom-bar hidden', { role: 'toolbar' });
    const barDivine = el('button', 'bar-btn', { type: 'button' });
    const barVault = el('button', 'bar-btn', { type: 'button' });
    const barMenu = el('button', 'bar-btn', { type: 'button' });
    const fillBar = () => {
      barDivine.innerHTML = '<span aria-hidden="true">☲</span> ' + t('bar.divine');
      barVault.innerHTML = '<span aria-hidden="true">☷</span> ' + t('bar.vault');
      barMenu.innerHTML = '<span aria-hidden="true">☰</span> ' + t('menu.title');
      bar.setAttribute('aria-label', t('menu.title'));
    };
    fillBar();
    // 점 보기: 뽑기 페이지에서는 맨 위(질문·뽑기 영역)로, 다른 페이지에서는 주역점 앱으로 이동
    barDivine.addEventListener('click', () => {
      if (resultCardEl) window.scrollTo({ top: 0, behavior: 'smooth' });
      else location.href = 'index.html';
    });
    barVault.addEventListener('click', () => openSheet('vault'));
    barMenu.addEventListener('click', () => openDrawer());
    bar.append(barDivine, barVault, barMenu);
    document.body.appendChild(bar);
    // 결과 카드가 있는 페이지(뽑기)에서는 결과가 나온 뒤에만, 그 밖의 페이지(설명·64괘 목록)에서는 항상 보인다
    const syncBar = () => {
      const show = resultCardEl ? !resultCardEl.classList.contains('hidden') : true;
      bar.classList.toggle('hidden', !show);
      document.body.classList.toggle('has-bar', show);
    };
    if (resultCardEl) new MutationObserver(syncBar).observe(resultCardEl, { attributes: true, attributeFilter: ['class'] });
    syncBar();
    onLangChange(fillBar);
  }

  // ---------- 설정 ----------
  function syncSettingsUI() {
    const s = getSettings();
    settingsDlg.querySelectorAll('[data-seg="theme"] button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.val === s.theme)));
    settingsDlg.querySelectorAll('[data-seg="fontSize"] button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.val === s.fontSize)));
    settingsDlg.querySelectorAll('[data-seg="lang"] button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.val === s.lang)));
  }
  settingsDlg.addEventListener('click', e => {
    const b = e.target.closest('.seg button');
    if (!b) return;
    const kind = b.parentElement.dataset.seg;
    if (kind === 'theme') setTheme(b.dataset.val);
    if (kind === 'fontSize') setFontSize(b.dataset.val);
    if (kind === 'lang') setLang(b.dataset.val);
    syncSettingsUI();
  });

  // ---------- 보관함 ----------
  const vaultListEl = vaultDlg.querySelector('#vaultList');
  const vaultCountEl = vaultDlg.querySelector('#vaultCount');
  const vaultEmptyEl = vaultDlg.querySelector('#vaultEmpty');
  const vaultWarnEl = vaultDlg.querySelector('#vaultWarn');
  const vaultClearBtn = vaultDlg.querySelector('#vaultClear');

  const formatDate = ts => new Date(ts).toLocaleString(getLang() === 'en' ? 'en-US' : 'ko-KR', { dateStyle: 'medium', timeStyle: 'short' });

  // 두 번 눌러야 실행되는 버튼 (확인 창 대신 — 일부 환경에서는 confirm()이 막혀 있음)
  function armedClick(btn, label, sureKey, run) {
    let timer = null;
    btn.addEventListener('click', e => {
      e.stopPropagation();
      if (btn.dataset.armed) { clearTimeout(timer); run(); return; }
      btn.dataset.armed = '1';
      btn.textContent = t(sureKey);
      btn.classList.add('danger');
      timer = setTimeout(() => {
        delete btn.dataset.armed;
        btn.textContent = t(label);
        btn.classList.remove('danger');
      }, 3000);
    });
  }

  function renderVault() {
    // 입력창 포커스로 화면이 옆으로 밀렸다면 원위치
    if (window.scrollX) window.scrollTo(0, window.scrollY);
    const records = vaultList();
    vaultListEl.replaceChildren();
    vaultCountEl.textContent = records.length ? t('vault.count', { n: records.length }) : '';
    vaultEmptyEl.classList.toggle('hidden', records.length > 0);
    vaultWarnEl.classList.toggle('hidden', storagePersistent);
    vaultClearBtn.classList.toggle('hidden', records.length === 0);
    vaultClearBtn.textContent = t('vault.clear');
    vaultClearBtn.classList.remove('danger');
    delete vaultClearBtn.dataset.armed;

    records.forEach(rec => {
      let info;
      try { info = analyzeValues(rec.values); } catch (e) { console.error('보관함 기록을 표시하지 못했습니다:', e); return; }   // 기록 하나가 이상해도 창은 열리도록
      const li = el('li', 'vault-item');

      const mini = el('div', 'vault-mini');
      mini.appendChild(miniHexagram(info.lineList, info.changingIdx));

      const body = el('div', 'vault-info');
      const title = el('div', 'vault-title');
      const nameFrom = shortName(info.reading.name);
      title.textContent = info.changingIdx.length ? `${nameFrom} ${t('vault.arrow')} ${shortName(info.changed.name)}` : nameFrom;
      const meta = el('div', 'vault-meta');
      meta.textContent = `${formatDate(rec.savedAt)} · ${t('vault.method.' + rec.method)}`;
      const q = el('div', 'vault-q');
      q.textContent = rec.question ? rec.question : t('vault.noQuestion');
      if (!rec.question) q.classList.add('muted');
      body.append(title, meta, q);

      // 질문 편집: 그 자리에서 입력창으로 바뀐다
      const editBtn = el('button', 'ghost small', { type: 'button' });
      editBtn.textContent = t(rec.question ? 'vault.editQ' : 'vault.addQ');
      editBtn.addEventListener('click', () => {
        const ta = el('textarea', 'vault-q-edit', { maxlength: '500', rows: '3', placeholder: t('q.placeholder') });
        ta.value = rec.question || '';
        const row = el('div', 'vault-q-actions');
        const saveB = el('button', 'secondary small', { type: 'button' });
        saveB.textContent = t('vault.qSave');
        const cancelB = el('button', 'ghost small', { type: 'button' });
        cancelB.textContent = t('vault.qCancel');
        row.append(cancelB, saveB);
        q.replaceWith(ta);
        ta.after(row);
        actions.classList.add('hidden');
        ta.focus();
        cancelB.addEventListener('click', renderVault);
        saveB.addEventListener('click', () => {
          const ok = vaultUpdateQuestion(rec.id, ta.value);
          if (typeof currentResult !== 'undefined' && currentResult && currentResult.savedId === rec.id) {
            currentResult.question = ta.value.trim().slice(0, 500);
            if (typeof renderResult === 'function') renderResult();
          }
          if (typeof showToast === 'function') showToast(t(ok ? 'vault.qSaved' : 'result.saveFail'));
          renderVault();
        });
      });

      const actions = el('div', 'vault-actions');
      const viewBtn = el('button', 'secondary small', { type: 'button' });
      viewBtn.textContent = t('vault.view');
      viewBtn.addEventListener('click', () => openSaved(rec.id));
      const delBtn = el('button', 'ghost small', { type: 'button' });
      delBtn.textContent = t('vault.delete');
      armedClick(delBtn, 'vault.delete', 'vault.deleteSure', () => { vaultRemove(rec.id); renderVault(); });
      actions.append(viewBtn, editBtn, delBtn);

      li.append(mini, body, actions);
      vaultListEl.appendChild(li);
    });
  }
  armedClick(vaultClearBtn, 'vault.clear', 'vault.clearSure', () => { vaultClear(); renderVault(); });

  function openSaved(id) {
    vaultDlg.close();
    if (document.getElementById('resultCard') && typeof renderSavedReading === 'function') {
      location.hash = 'view=' + id;   // hashchange → handleViewHash()가 결과를 그린다
    } else {
      location.href = 'index.html#view=' + id;
    }
  }

  // 언어가 바뀌면 열려 있는 보관함·설정도 다시 그린다
  onLangChange(() => { if (vaultDlg.open) renderVault(); });
  // 다른 탭에서 보관함이 바뀌면 반영
  window.addEventListener('storage', e => { if (e.key === VAULT_KEY && vaultDlg.open) renderVault(); });

  // 서랍 안의 링크를 눌러 이동할 때 현재 페이지와 같은 곳이면 닫기만
  drawer.addEventListener('click', e => {
    const a = e.target.closest('a.drawer-item');
    if (a && a.getAttribute('href') === location.pathname.split('/').pop()) closeDrawer(false);
  });
})();

// ===== 시작: 저장된 설정 적용 =====
(function bootstrap() {
  const s = getSettings();
  applyTheme(s.theme);
  applyFontSize(s.fontSize);
  setLang(s.lang, false);
  if (typeof handleViewHash === 'function') {
    handleViewHash();
    window.addEventListener('hashchange', handleViewHash);
  }
})();