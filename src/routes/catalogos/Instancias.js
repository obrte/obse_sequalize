const AuthMiddleware = require('../../middlewares/AuthMiddleware')
const InstanciasPolicies = require('../../policies/catalogos/InstanciasPolicies')
const InstanciasController = require('../../controllers/catalogos/InstanciasController')

module.exports = (router) => {
	// POST single
	router.post('/instancias', AuthMiddleware.decodificar, InstanciasPolicies.guardar, InstanciasController.guardar)

	// GET all
	router.get('/instancias', AuthMiddleware.decodificar, InstanciasController.instancias)

	// GET one by id
	router.get('/instancias/:id', AuthMiddleware.decodificar, InstanciasController.instancia)

	// PATCH single
	router.patch('/instancias/:id', AuthMiddleware.decodificar, InstanciasPolicies.actualizar, InstanciasController.actualizar)

	// DELETE single
	router.delete('/instancias/:id', AuthMiddleware.decodificar, InstanciasController.eliminar)
}