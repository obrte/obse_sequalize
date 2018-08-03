const AuthMiddleware = require('../../middlewares/AuthMiddleware')
const EntesFiscalizadoresPolicies = require('../../policies/catalogos/EntesFiscalizadoresPolicies')
const EntesFiscalizadoresController = require('../../controllers/catalogos/EnteFiscalizadorController')

module.exports = (router) => {
	// POST single
	router.post('/entes', AuthMiddleware.decodificar, EntesFiscalizadoresPolicies.guardar, EntesFiscalizadoresController.guardar)

	// GET all
	router.get('/entes', AuthMiddleware.decodificar, EntesFiscalizadoresController.entes)

	// GET one by id
	router.get('/entes/:id', AuthMiddleware.decodificar, EntesFiscalizadoresController.ente)

	// PATCH single
	router.patch('/entes/:id', AuthMiddleware.decodificar, EntesFiscalizadoresPolicies.actualizar, EntesFiscalizadoresController.actualizar)

	// DELETE single
	router.delete('/entes/:id', AuthMiddleware.decodificar, EntesFiscalizadoresController.eliminar)
}