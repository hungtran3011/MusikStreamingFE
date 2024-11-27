self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: data.icon || '/icon/icon-192x192.png',
      // badge: '/badge.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2',
      },
    }
    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})
 
self.addEventListener('notificationclick', function (event) {
  console.log('Notification click received.')
  event.notification.close()
  event.waitUntil(clients.openWindow('localhost:3000'))
})

// Cache music assets
// const CACHE_NAME = 'musik-cache-v1';
const MUSIC_CACHE = 'musik-audio-cache-v1';

// Cache music files on the fly
self.addEventListener('fetch', (event) => {
  if (event.request.url.endsWith('.mp3')) {
    event.respondWith(
      caches.open(MUSIC_CACHE).then((cache) => {
        return cache.match(event.request).then((response) => {
          return response || fetch(event.request).then((response) => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  }
});