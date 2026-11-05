// 배포 시 CACHE_VERSION만 올리면 이전 캐시가 자동 정리됩니다.
const CACHE_VERSION = "20261105-2";
const CACHE_NAME = "juyeok-pwa-" + CACHE_VERSION;
const OFFLINE_URL = "./index.html";

const PRECACHE = [
  "./", "./index.html", "./original.html", "./hexagram-list.html", "./about.html",
  "./style.css", "./original.css",
  "./init.js", "./gtag-init.js", "./hexagram-list.js", "./hexagrams.js", "./hexagrams_en.js", "./i18n.js", "./store.js",
  "./core.js", "./divination.js", "./classic-view.js", "./yijing-data.js", "./menu.js", "./index.js", "./original.js", "./pwa-install.js",
  "./manifest.webmanifest", "./192.png", "./512.png", "./apple-touch-icon.png", "./maskable-512.png"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  // 일부 파일이 없어도 설치가 실패하지 않도록 하나씩 담는다.
  event.waitUntil(caches.open(CACHE_NAME).then((cache) =>
    Promise.all(PRECACHE.map((url) => cache.add(new Request(url, { cache: "reload" })).catch(() => {})))
  ));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key.startsWith("juyeok-pwa-") && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

const putInCache = (request, response) => {
  if (!response || !response.ok || response.type === "opaque") return;
  const copy = response.clone();
  caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)).catch(() => {});
};

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  // 페이지 이동: 네트워크 우선, 실패 시 같은 페이지 캐시 → 앱 첫 화면
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).then((response) => {
        putInCache(request, response);
        return response;
      }).catch(() =>
        caches.match(request, { ignoreSearch: true }).then((hit) => hit || caches.match(OFFLINE_URL))
      )
    );
    return;
  }

  // 정적 파일: 캐시를 먼저 보여주고 뒤에서 새로 받아 갱신 (빠른 로딩 + 오프라인)
  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then((cached) => {
      const network = fetch(request).then((response) => {
        putInCache(request, response);
        return response;
      });
      if (cached) { network.catch(() => {}); return cached; }
      return network;
    })
  );
});
