if('serviceWorker' in navigator){
	navigator.serviceWorker.register('./worker.js')
		.then(reg => console.log('Registro de ServiceWorker exitoso', reg))
		.catch(err => console.warn('Error al tratar de registrar el ServiceWorker.'))
}
