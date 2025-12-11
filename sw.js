
const CACHE_NAME = 'bussola-politica-cache-v3';
// Arquivos iniciais para o cache do app shell
const urlsToCache = [
  '/',
  '/index.html',
  '/logo.svg',
  '/logo.png', // Importante para compartilhar mesmo offline se possível
  '/qr-code.png',
  '/manifest.json',
];

// Instala o service worker e armazena o app shell em cache
self.addEventListener('install', event => {
  // Força o SW a se tornar ativo imediatamente após a instalação
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Serve o conteúdo do cache quando estiver offline
self.addEventListener('fetch', event => {
  event.respondWith(
    // Tenta pegar do cache primeiro
    caches.match(event.request)
      .then(response => {
        // Se não estiver no cache, busca na rede
        return response || fetch(event.request).then(fetchResponse => {
          // Se for uma requisição válida para a CDN ou para nossos assets, armazena em cache
          const shouldCache =
            event.request.url.startsWith('https://') ||
            event.request.url.includes('.tsx') ||
            event.request.url.includes('.ts');

          if (shouldCache && fetchResponse.status === 200) {
            const responseToCache = fetchResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
          }
          return fetchResponse;
        });
      })
  );
});

// Limpa caches antigos e assume controle imediatamente
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    Promise.all([
      // Reivindica o controle de todas as abas abertas imediatamente
      self.clients.claim(),
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});