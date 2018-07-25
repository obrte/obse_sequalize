const InstanciaEntesPolicies = require('../../policies/catalogos/InstanciaEntesPolicies')
const InstanciaEntesController = require('../../controllers/catalogos/InstanciaEntesController')

module.exports = (router) => {
	// POST single
	router.post('/instancia_entes', InstanciaEntesPolicies.guardar, InstanciaEntesController.guardar)

	// GET all
	router.get('/instancia_entes', InstanciaEntesController.entes)

	// GET one by id
	router.get('/instancia_entes/:id', InstanciaEntesController.ente)

	// PATCH single
	router.patch('/instancia_entes/:id', InstanciaEntesPolicies.actualizar, InstanciaEntesController.actualizar)

	// DELETE single
	router.delete('/instancia_entes/:id', InstanciaEntesController.eliminar)
}