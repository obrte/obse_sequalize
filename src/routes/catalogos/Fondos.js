const FondosPolicies = require('../../policies/catalogos/FondosPolicies')
const FondosController = require('../../controllers/catalogos/FondosController')

module.exports = (router) => {
	// POST single
	router.post('/fondos', FondosPolicies.guardar, FondosController.guardar)

	// GET all
	router.get('/fondos', FondosController.fondos)

	// GET one by id
	router.get('/fondos/:id', FondosController.fondo)

	// PATCH single
	router.patch('/fondos/:id', FondosPolicies.actualizar, FondosController.actualizar)

	// DELETE single
	router.delete('/fondos/:id', FondosController.eliminar)
}