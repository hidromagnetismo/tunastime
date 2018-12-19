;
const CACHE_NAME = 'v1_cache_tunastime',
urlsToCache = [
	'./',
	'./script.js',
	'./worker.js',
	'./js/jquery.min.js',
	'./js/bootstrap.min.js',
	'./js/vue.min.js',
	'./img/icons/offlinux_mrobot_tpb_512.jpg',
	'./img/icons/offlinux_mrobot_tpb_256.jpg',
	'./img/icons/offlinux_mrobot_tpb_128.jpg',
	'./img/icons/offlinux_mrobot_tpb_64.jpg',
	'./img/icons/offlinux_mrobot_tpb_32.jpg',
	'./img/icons/offlinux_mrobot_tpb_16.jpg'
]

// durante la fase de instalacion, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
	e.waitUntil(
		caches.open(CACHE_NAME)
		.then(cache => {
			return cache.addAll(urlsToCache)
				.then(() => self.skipWaiting())
		})
		.catch(err => console.log('Falló el registro de cache', err))
	)
})

// una vez que se instala el ServiceWorker, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
	const cacheWhiteList = [ CACHE_NAME ]

	e.waitUntil(
		caches.keys()
			.then(cacheNames => {
				cacheNames.map(cacheName => {
					// eliminamos lo que ya no se necesita en cache
					if(cacheWhiteList.indexOf(cacheName) === -1){
						return caches.delete(cacheName)
					}
				})
			})
			// le indica al ServiceWorker activar el cache actual
			.then(() => self.clients.claim())
	)
})

// cuando el navegador recupera una url
self.addEventListener('fetch', e => {
	// responder ya sea con el objeto en caché o continuar y buscar la url real
	e.respondWith(
		caches.match(e.request)
			.then(res => {
				if(res){
					// recuperando del cache
					return res
				}

				// recuperar de la petición a la url 
				return fetch(e.request)
			})
	)
})
