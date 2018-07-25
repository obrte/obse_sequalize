const EntesFiscalizadoresPolicies = require('../../policies/catalogos/EntesFiscalizadoresPolicies')
const EntesFiscalizadoresController = require('../../controllers/catalogos/EnteFiscalizadorController')

module.exports = (router) => {
	// POST single
	router.post('/entes', EntesFiscalizadoresPolicies.guardar, EntesFiscalizadoresController.guardar)

	// GET all
	router.get('/entes/:id', EntesFiscalizadoresController.entes)

	// GET one by id
	router.get('/ente/:id', EntesFiscalizadoresController.ente)

	// PATCH single
	router.patch('/entes/:id', EntesFiscalizadoresPolicies.actualizar, EntesFiscalizadoresController.actualizar)

	// DELETE single
	router.delete('/entes/:id', EntesFiscalizadoresController.eliminar)
}