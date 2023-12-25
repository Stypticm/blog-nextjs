/// <reference lib="webworker" />

const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
    '/',
    '/blog',
    '/createpost',
]

self.addEventListener('install', (event: Event) => {
    (event as ExtendableEvent).waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    )
})

self.addEventListener('activate', (event: Event) => {
    (event as ExtendableEvent).waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName !== CACHE_NAME;
                }).map(cacheName => caches.delete(cacheName))
            );
        })
    )
})

self.addEventListener('fetch', (event: Event) => {
    (event as FetchEvent).respondWith(
        caches.match((event as FetchEvent).request).then(response => {

            if (response) {
                return response
            }

            return fetch((event as FetchEvent).request).then(networkResponse => {
                if (networkResponse) {
                    const responseToCache = networkResponse.clone();
                    return caches.open(CACHE_NAME).then(cache => {
                        return cache.put((event as FetchEvent).request, responseToCache)
                            .then(() => {
                                return networkResponse
                            })
                    })
                }
                return networkResponse
            }).catch((error) => {
                console.error('Fetch sw failed', error)
                throw error
            })
        })
    )
})

