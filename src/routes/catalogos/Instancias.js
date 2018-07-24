const InstanciasPolicies = require('../../policies/catalogos/InstanciasPolicies')
const InstanciasController = require('../../controllers/catalogos/InstanciasController')

module.exports = (router) => {
	// POST single
	router.post('/instancias', InstanciasPolicies.guardar, InstanciasController.guardar)

	// GET all
	router.get('/instancias', InstanciasController.instancias)

	// GET one by id
	router.get('/instancias/:id', InstanciasController.instancia)

	// PATCH single
	router.patch('/instancias/:id', InstanciasPolicies.actualizar, InstanciasController.actualizar)

	// DELETE single
	router.delete('/instancias/:id', InstanciasController.eliminar)
}