const routes = [
	require('./catalogos/EntesFiscalizadores'),
	require('./catalogos/Fondos'),
	require('./catalogos/Instancias'),
	require('./catalogos/Organizaciones'),
	require('./catalogos/UniAdm'),
	require('./catalogos//Usuarios'),
	require('./Auth')
]

// Add access to the app and db objects to each route
module.exports = function router(app) {
	return routes.forEach((route) => {
		route(app)
	})
}