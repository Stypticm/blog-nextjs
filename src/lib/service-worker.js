/// <reference lib="webworker" />
let self;
let CACHE_NAME = `my-pwa-cache-version-${Date.now()}`;
let urlsToCache = [
    './',
    '/blog',
    '/createpost',
    '/icon-192x192.png',
    '/icon-256x256.png',
    '/icon-384x384.png',
    '/icon-512x512.png',
    'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5fCxc4AMP6lbBP.woff2',
];


self.addEventListener('fetch', async (event) => {
    const requestURL = new URL(event.request.url);

    if (requestURL.pathname.startsWith('/api/auth/callback/github') ||
        requestURL.pathname.startsWith('/api/auth/callback/google') ||
        requestURL.pathname.startsWith('/api/register') ||
        requestURL.pathname.startsWith('/api/auth')) {
        event.respondWith(fetch(event.request, { redirect: 'follow', mode: 'cors', credentials: 'include', cache: 'no-cache' }));
    } else if (event.request.method === 'POST') {
        event.respondWith(fetch(event.request));
    } else {
        event.respondWith(
            caches.match(event.request).then((response) => {
                return (
                    response || fetch(event.request).then((response) => {
                        let responseClone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseClone);
                        });

                        return response;
                    })
                )
            })
                .catch(() => {
                    console.log('No internet connection found. App is running in offline mode.');
                })
        );
    }
});

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((key) => {
                    if (key === CACHE_NAME) {
                        return;
                    }
                    return caches.delete(key);
                })
            )
        })
    )
});

const clearCache = async () => {
    const cacheNames = await caches.keys();
    await Promise.all(
        cacheNames.map((cacheName) => {
            if (cacheName.startsWith(CACHE_NAME)) {
                return caches.delete(cacheName);
            }
            return null;
        })
    );
}
self.addEventListener('message', (event) => {
    if (event.data.type === 'LOGOUT') {
        event.waitUntil(
            caches.keys().then((keyList) =>
                Promise.all(
                    keyList.map((key) => {
                        if (key.startsWith(CACHE_NAME)) {
                            return caches.delete(key);
                        }
                        return null;
                    }).filter(Boolean)
                ),
            ).then(() => self.skipWaiting())
        )
    }
});
