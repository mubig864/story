(() => {
  let deferredPrompt = null;
  const banner = document.getElementById("pwaInstallBanner");
  const installButton = document.getElementById("pwaInstallButton");
  const message = document.getElementById("pwaInstallMessage");
  const closeButton = document.getElementById("pwaInstallClose");
  if (!banner || !installButton || !message || !closeButton) return;

  const isStandalone = window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;
  if (isStandalone) return;

  const tr = (k) => (typeof t === "function" ? t(k) : k);
  let msgKey = "pwa.msg.default";
  let btnKey = "pwa.install";
  const render = () => {
    message.textContent = tr(msgKey);
    installButton.textContent = tr(btnKey);
    closeButton.textContent = tr("pwa.close");
    closeButton.setAttribute("aria-label", tr("pwa.closeAria"));
  };

  const ua = window.navigator.userAgent;
  const isIOS = /iphone|ipad|ipod/i.test(ua) && !window.MSStream;
  // 카카오톡·네이버·인스타그램 등 앱 안의 브라우저 (여기서는 홈 화면에 추가할 수 없음)
  const isInApp = /KAKAOTALK|NAVER\(inapp|Instagram|FBAN|FBAV|FB_IAB|\bLine\/|DaumApps|BAND\//i.test(ua) ||
    (/Android/i.test(ua) && /;\s*wv\)/.test(ua)) ||
    (isIOS && !/Safari\//i.test(ua));   // 아이폰에서 Safari/Chrome/Edge/Firefox가 아닌 앱 안 화면(WebView)

  // 서비스워커 등록은 sw-register.js(모든 페이지 공용)가 맡습니다.

  window.addEventListener("beforeinstallprompt", (event) => {
    if (isInApp) return;
    event.preventDefault();
    deferredPrompt = event;
    banner.style.display = "block";
    msgKey = "pwa.msg.prompt";
    btnKey = "pwa.install";
    installButton.style.display = "inline-block";
    render();
  });

  if (isInApp) {
    banner.style.display = "block";
    msgKey = isIOS ? "pwa.msg.inappIos" : "pwa.msg.inappAndroid";
    installButton.style.display = "none";
  } else if (isIOS) {
    banner.style.display = "block";
    msgKey = "pwa.msg.ios";
    installButton.style.display = "none";
  } else if (!("onbeforeinstallprompt" in window)) {
    // Keep the prompt available on browsers where installation is manual.
    banner.style.display = "block";
    msgKey = "pwa.msg.manual";
    btnKey = "pwa.howto";
  }
  render();
  if (typeof onLangChange === "function") onLangChange(render);

  installButton.addEventListener("click", async () => {
    if (!deferredPrompt) {
      msgKey = isIOS ? "pwa.msg.helpIos" : "pwa.msg.helpOther";
      render();
      return;
    }
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    banner.style.display = "none";
  });

  closeButton.addEventListener("click", () => { banner.style.display = "none"; });
})();
