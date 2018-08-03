const AuthMiddleware = require('../../middlewares/AuthMiddleware')
const FondosPolicies = require('../../policies/catalogos/FondosPolicies')
const FondosController = require('../../controllers/catalogos/FondosController')

module.exports = (router) => {
	// POST single
	router.post('/fondos', AuthMiddleware.decodificar, FondosPolicies.guardar, FondosController.guardar)

	// GET all
	router.get('/fondos', AuthMiddleware.decodificar, FondosController.fondos)

	// GET one by id
	router.get('/fondos/:id', AuthMiddleware.decodificar, FondosController.fondo)

	// PATCH single
	router.patch('/fondos/:id', AuthMiddleware.decodificar, FondosPolicies.actualizar, FondosController.actualizar)

	// DELETE single
	router.delete('/fondos/:id', AuthMiddleware.decodificar, FondosController.eliminar)
}