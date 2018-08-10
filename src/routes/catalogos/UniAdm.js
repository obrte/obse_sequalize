const AuthMiddleware = require('../../middlewares/AuthMiddleware')
const UniAdmPolicies = require('../../policies/catalogos/UniAdmPolicies')
const UniAdmController = require('../../controllers/catalogos/UniAdmController')

module.exports = (router) => {
	// POST single
	router.post('/uniadm', AuthMiddleware.decodificar, UniAdmPolicies.guardar, UniAdmController.guardar)

	// GET all
	router.get('/uniadm', AuthMiddleware.decodificar, UniAdmController.uniAdms)

	// GET one by id
	router.get('/uniadm/:id', AuthMiddleware.decodificar, UniAdmController.uniAdm)

	// PATCH single
	router.patch('/uniadm/:id', AuthMiddleware.decodificar, UniAdmPolicies.actualizar, UniAdmController.actualizar)

	// DELETE single
	router.delete('/uniadm/:id', AuthMiddleware.decodificar, UniAdmController.eliminar)
}