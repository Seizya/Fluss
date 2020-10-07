// キャッシュファイルの指定
const CACHE_NAME = 'fluss_cash-01';
const urlsToCache = [
    "./",
    "./index.html",
    "./img/icon.png",
    "./manifest.json",
    "./main.js",
    "./main.css",
    "./Seifuncs/main.js",
    "./Seifuncs/config.js"
];

// インストール処理
self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installing');
    event.waitUntil(
        caches
        .open(CACHE_NAME)
        .then(function (cache) {
            console.log("[Service Worker] Pre-Caching Offline Page");
            return cache.addAll(urlsToCache);
        })
    );
    console.log(`[Service Worker] Installed Successfully!\nVersion: ${CACHE_NAME}`);
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function (event) {
    // キャッシュファイル一覧に含まれているか（他ドメインからも許可するなら、urlsToCacheを絶対パスにして、下のreplace関数を削除）
    if (urlsToCache.includes(event.request.url.replace("https://seizya.github.io/Fluss/", "./"))) {
        console.log('[Service Worker] Fetching', event.request.url);
        event.respondWith(
            caches
            .match(event.request)
            .then(function (response) {
                return response || fetch(event.request).then(function (cache) {
                    console.log(`[Service Worker] Caching new resource: ${event.request}`);
                    cache.open(CACHE_NAME).put(event.request, response.clone());
                    return response;
                });
            })
        );
    }
});

// 新バージョン時に、旧バージョンのキャッシュを削除
self.addEventListener('activate', function (event) {
    console.log('[Service Worker] Activated');
    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== CACHE_NAME) {
                    console.log("[Service Worker] Removing old Cache: ", key);
                    return caches.delete(key);
                }
            }));
        })
    );
    console.log('[Service Worker] Removed old cache Successfully.');
    return self.clients.claim();
});