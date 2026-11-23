// 서비스워커 — 한 번에 받은 파일 묶음(한 버전)을 캐시에서 그대로 내주는 "캐시 우선" 구조.
//  · 배포 시: CACHE_VERSION 만 올립니다. (크고 잘 안 바뀌는 yijing-data.js·아이콘은 STATIC_VERSION 이 따로 있고,
//    `node data-src/build-yijing-data.js` 가 내용 해시로 자동 갱신합니다 → 해설·아이콘이 그대로면 다시 받지 않음)
//  · 같은 버전의 HTML·JS·CSS 가 항상 함께 쓰이므로 서로 다른 버전이 섞이지 않습니다.
//  · 새 SW 가 인계하면 sw-register.js 가 (작업 중이 아닐 때) 화면을 한 번 새로 불러옵니다.
const CACHE_VERSION = "20261124-1";
const STATIC_VERSION = "6ca0826368";
const CACHE_NAME = "juyeok-pwa-" + CACHE_VERSION;
const STATIC_CACHE = "juyeok-static-" + STATIC_VERSION;
const OFFLINE_URL = "./index.html";

// 반드시 담겨야 하는 파일: 하나라도 못 받으면 설치 실패 → 이전 버전이 그대로 유지된다.
const CORE = [
  "./", "./index.html", "./original.html", "./hexagram-list.html", "./about.html",
  "./style.css", "./original.css",
  "./init.js", "./gtag-init.js", "./sw-register.js", "./hexagram-list.js", "./qr.js", "./hexmeta.js", "./result-card.js", "./hexagrams.js", "./i18n.js", "./store.js",
  "./core.js", "./divination.js", "./classic-view.js", "./menu.js", "./index.js", "./original.js", "./pwa-install.js",
  "./manifest.webmanifest", "./192.png"
];
// 늦게 쓰이는 파일: 못 받아도 설치는 성공하고, 처음 쓰일 때(또는 다음 활성화 때) 받아 저장한다. 버전 묶음과 같이 갈아 끼운다.
const OPTIONAL = ["./hexagrams_en.js"];
// 크고 잘 안 바뀌는 파일: 배포마다 다시 받지 않고 STATIC_VERSION 이 바뀔 때만 새로 받는다.
const STATIC = ["./yijing-data.js", "./512.png", "./apple-touch-icon.png", "./maskable-512.png"];

const isStatic = (url) => STATIC.some((p) => new URL(p, self.location).pathname === url.pathname);
// 저장 키에서 ?v= 같은 쿼리를 뺀다: 한 파일은 한 항목만 가지며, 지우고 다시 쓰는 사이에 비는 순간이 없다.
const keyOf = (request) => { const u = new URL(request.url); u.search = ""; return new Request(u.href); };

async function fill(cacheName, urls, tolerant) {
  const cache = await caches.open(cacheName);
  await Promise.all(urls.map(async (url) => {
    const key = new Request(new URL(url, self.location).href);
    if (await cache.match(key)) return;                 // 이미 있으면(같은 묶음) 다시 받지 않는다
    try {
      const res = await fetch(new Request(url, { cache: "reload" }));
      if (!res.ok) throw new Error(url + " " + res.status);
      await cache.put(keyOf(key), res);
    } catch (e) { if (!tolerant) throw e; }
  }));
}

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil((async () => {
    try {
      await fill(CACHE_NAME, CORE, false);
    } catch (error) {
      await caches.delete(CACHE_NAME);                  // 덜 채워진 새 캐시는 버린다
      throw error;
    }
    await Promise.all([fill(CACHE_NAME, OPTIONAL, true), fill(STATIC_CACHE, STATIC, true)]);
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter((k) => (k.startsWith("juyeok-pwa-") && k !== CACHE_NAME) || (k.startsWith("juyeok-static-") && k !== STATIC_CACHE))
      .map((k) => caches.delete(k)));
    await self.clients.claim();
    // 설치 때 못 받은 선택 파일이 있으면 지금 한 번 더 시도한다(실패해도 무시).
    await Promise.all([fill(CACHE_NAME, OPTIONAL, true), fill(STATIC_CACHE, STATIC, true)]).catch(() => {});
  })());
});

async function lookup(request) {
  const key = keyOf(request);
  const url = new URL(request.url);
  const cache = await caches.open(isStatic(url) ? STATIC_CACHE : CACHE_NAME);
  return { cache, key, hit: await cache.match(key) };
}

async function cacheFirst(event, request) {
  const { cache, key, hit } = await lookup(request);
  if (hit) return hit;
  try {
    const res = await fetch(request);
    if (res.ok && res.type === "basic") event.waitUntil(cache.put(key, res.clone()).catch(() => {}));
    return res;
  } catch (error) {
    if (request.mode === "navigate") {                  // 처음 보는 주소로 오프라인 이동 → 시작 화면
      const fallback = await caches.match(OFFLINE_URL, { cacheName: CACHE_NAME });
      if (fallback) return fallback;
    }
    throw error;
  }
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;
  if (request.headers.has("range")) return;             // 부분 요청은 브라우저에 맡긴다
  event.respondWith(cacheFirst(event, request));
});
