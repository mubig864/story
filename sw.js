// 배포 시 CACHE_VERSION만 올리면 이전 캐시가 자동 정리됩니다.
const CACHE_VERSION = "20261117-3";
const CACHE_NAME = "juyeok-pwa-" + CACHE_VERSION;
const OFFLINE_URL = "./index.html";
const NETWORK_TIMEOUT_MS = 5000;   // 느린 망에서는 이 시간이 지나면 캐시본을 먼저 보여 준다

// 반드시 담겨야 하는 파일: 하나라도 못 받으면 설치를 실패로 처리해, 불완전한 새 캐시가 정상 캐시를 대체하지 않게 한다.
const CORE = [
  "./", "./index.html", "./original.html", "./hexagram-list.html", "./about.html",
  "./style.css", "./original.css",
  "./init.js", "./gtag-init.js", "./sw-register.js", "./hexagram-list.js", "./qr.js", "./hexmeta.js", "./result-card.js", "./hexagrams.js", "./i18n.js", "./store.js",
  "./core.js", "./divination.js", "./classic-view.js", "./menu.js", "./index.js", "./original.js", "./pwa-install.js",
  "./manifest.webmanifest", "./192.png"
];
// 있으면 좋은 파일(용량이 크거나 늦게 불러오는 것): 못 받아도 설치는 성공하고, 나중에 쓰일 때 받아 저장한다.
const OPTIONAL = ["./yijing-data.js", "./hexagrams_en.js", "./512.png", "./apple-touch-icon.png", "./maskable-512.png"];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(async (cache) => {
    const add = (url) => cache.add(new Request(url, { cache: "reload" }));
    try {
      await Promise.all(CORE.map(add));                                 // 하나라도 실패하면 설치 실패 → 이전 버전 유지
    } catch (error) {
      await caches.delete(CACHE_NAME);                                  // 덜 채워진 새 캐시는 버린다
      throw error;
    }
    await Promise.all(OPTIONAL.map((url) => add(url).catch(() => {})));
  }));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key.startsWith("juyeok-pwa-") && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

// 같은 파일의 이전 버전(?v= 이 다른 항목)을 지우고 새로 저장한다. 서비스워커가 먼저 끝나지 않게 호출 쪽에서 waitUntil 한다.
const putInCache = (request, response) => {
  if (!response || !response.ok || response.type === "opaque") return Promise.resolve();
  const copy = response.clone();
  return caches.open(CACHE_NAME)
    .then((cache) => cache.delete(request, { ignoreSearch: true }).then(() => cache.put(request, copy)))
    .catch(() => {});
};

// 네트워크 우선: 항상 새 파일을 받아 HTML·JS·CSS 버전이 어긋나지 않게 한다(옛 JS 가 새 HTML 과 섞이는 문제 방지).
// 오프라인이거나 응답이 늦으면 캐시본으로 대신한다. HTTP 캐시에 묶이지 않도록 매번 서버에 변경 여부를 확인한다(no-cache).
async function networkFirst(event, request, fallbackUrl) {
  const net = fetch(request, { cache: "no-cache" }).then((response) => {
    event.waitUntil(putInCache(request, response));
    return response;
  });
  net.catch(() => {});   // 시간 초과로 버려져도 처리되지 않은 오류가 남지 않게
  let timer;
  const timeout = new Promise((resolve) => { timer = setTimeout(resolve, NETWORK_TIMEOUT_MS, null); });
  try {
    const first = await Promise.race([net, timeout]);
    clearTimeout(timer);
    if (first) return first;
    const slow = await caches.match(request, { ignoreSearch: true });
    return slow || net;        // 캐시본이 없으면 끝까지 기다린다
  } catch (error) {
    clearTimeout(timer);
    const cached = await caches.match(request, { ignoreSearch: true });
    if (cached) return cached;
    if (fallbackUrl) {
      const fallback = await caches.match(fallbackUrl);
      if (fallback) return fallback;
    }
    throw error;
  }
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;
  event.respondWith(networkFirst(event, request, request.mode === "navigate" ? OFFLINE_URL : null));
});
