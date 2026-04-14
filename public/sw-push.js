// Service Worker for Web Push Notifications - UAM Commerce
self.addEventListener('push', (event) => {
  let data = { title: '🔔 Nouvelle commande !', body: 'Consultez vos commandes.' };
  
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body || 'Consultez vos commandes et marquez-la comme terminée après retrait du client.',
    icon: '/pwa-icon.png',
    badge: '/pwa-icon.png',
    vibrate: [200, 100, 200],
    tag: data.tag || 'new-order',
    renotify: true,
    data: {
      url: data.url || '/vendeur',
    },
  };

  event.waitUntil(
    self.registration.showNotification(data.title || '🔔 Nouvelle commande !', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/vendeur';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Focus existing window if found
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(urlToOpen);
          return client.focus();
        }
      }
      // Open new window
      return clients.openWindow(urlToOpen);
    })
  );
});

// Activate immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});
