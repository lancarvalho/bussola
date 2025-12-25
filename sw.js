
const CACHE_NAME = 'bussola-politica-cache-v4';
// Arquivos iniciais para o cache do app shell
const urlsToCache = [
  '/',
  '/index.html',
  '/logo.svg',
  'https://www.renatorgomes.com/backup/quiz/bussola/logo.png',
  'https://renatorgomes.com/backup/quiz/bussola/qr-code.png',
  '/manifest.json'
];

// Instala o service worker e armazena o app shell em cache
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('PWA: Cache de shell instalado');
        return cache.addAll(urlsToCache);
      })
  );
});

// Serve o conteúdo do cache quando estiver offline (Network-first para index, Cache-first para assets)
self.addEventListener('fetch', event => {
  // Evitar interceptar requisições que não sejam GET ou sejam de analytics
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o cache se encontrar, senão busca na rede
        return response || fetch(event.request).then(fetchResponse => {
          // Só cacheia se for uma resposta válida de um asset do nosso domínio ou CDNs seguras
          const url = event.request.url;
          const isAsset = url.includes('.tsx') || 
                          url.includes('.ts') || 
                          url.includes('.js') || 
                          url.includes('.svg') || 
                          url.includes('.png') ||
                          url.includes('aistudiocdn.com');

          if (isAsset && fetchResponse.status === 200) {
            const responseToCache = fetchResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return fetchResponse;
        });
      }).catch(() => {
        // Fallback offline para a página principal
        if (event.request.mode === 'navigate') {
          return caches.match('/');
        }
      })
  );
});

// Limpa caches antigos e assume controle imediatamente
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    Promise.all([
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
