/* 화면이 그려지기 전에 테마와 언어를 먼저 적용해 깜빡임을 막는다. <head>에서 가장 먼저 로드. */
(function () {
  var theme = 'dark', lang = 'ko', fs = 'normal';
  try {
    var s = JSON.parse(localStorage.getItem('juyeok.settings.v1')) || {};
    if (s.theme === 'light' || s.theme === 'dark') theme = s.theme;
    if (s.lang === 'en' || s.lang === 'ko') lang = s.lang;
    if (s.fontSize === 'large' || s.fontSize === 'xlarge') fs = s.fontSize;
  } catch (e) {}
  var root = document.documentElement;
  root.dataset.theme = theme;
  root.lang = lang;
  if (fs !== 'normal') root.dataset.fs = fs;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'light' ? '#f7f0e6' : '#1a110b');
})();
