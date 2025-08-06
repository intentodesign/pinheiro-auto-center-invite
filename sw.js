// Service Worker for Pinheiro Auto Center Invite App
const CACHE_NAME = 'pinheiro-invite-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles/main.css',
    '/js/app.js',
    'https://fonts.googleapis.com/css2?family=Goli&display=swap',
    'https://unpkg.com/lucide@latest/dist/umd/lucide.js'
];

// Install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            })
    );
});

// Activate event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});