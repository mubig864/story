/* 서비스워커 등록과 업데이트 반영 — 모든 페이지가 공유합니다. (설치 안내 배너 pwa-install.js 와는 별개)
   - 어느 페이지로 처음 들어와도 등록되어, 첫 방문부터 오프라인 캐시가 만들어집니다.
   - 새 버전의 서비스워커가 인계받으면(이미 서비스워커가 있던 경우만) 화면을 한 번 새로 불러와 HTML·JS 버전을 맞춥니다.
     단, 점을 치는 중이거나 결과·질문이 화면에 있으면 새로고침하지 않고 안내만 합니다. */
(function () {
  if (!('serviceWorker' in navigator) || !(location.protocol === 'https:' || location.hostname === 'localhost')) return;

  const hadController = !!navigator.serviceWorker.controller;   // false 이면 첫 설치라서 새로고침이 필요 없다
  let reloading = false;

  const hasWorkInProgress = () => {
    try {
      if (typeof lines !== 'undefined' && lines.length) return true;
      if (typeof currentResult !== 'undefined' && currentResult) return true;
      const q = document.getElementById('question');
      if (q && q.value.trim()) return true;
    } catch (e) {}
    return false;
  };

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController || reloading) return;
    if (hasWorkInProgress()) {
      try { if (typeof showToast === 'function' && typeof t === 'function') showToast(t('sw.updated')); } catch (e) {}
      return;
    }
    reloading = true;
    location.reload();
  });

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' }).catch(error => {
      console.warn('서비스 워커 등록 실패:', error);
    });
  });
})();
