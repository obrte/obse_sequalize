const UniAdmPolicies = require('../../policies/catalogos/UniAdmPolicies')
const UniAdmController = require('../../controllers/catalogos/UniAdmController')

module.exports = (router) => {
	// POST single
	router.post('/uniadm', UniAdmPolicies.guardar, UniAdmController.guardar)

	// GET all
	router.get('/uniadm', UniAdmController.uniAdms)

	// GET one by id
	router.get('/uniadm/:id', UniAdmController.uniAdm)

	// PATCH single
	router.patch('/uniadm/:id', UniAdmPolicies.actualizar, UniAdmController.actualizar)

	// DELETE single
	router.delete('/uniadm/:id', UniAdmController.eliminar)
}