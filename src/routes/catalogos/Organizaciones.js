const OrganizacionPolicies = require('../../policies/catalogos/OrganizacionesPolicies')
const OrganizacionesController = require('../../controllers/catalogos/OrganizacionesController')

module.exports = (router) => {
	// POST single
	router.post('/organizaciones', OrganizacionPolicies.guardar, OrganizacionesController.guardar)

	// GET all
	router.get('/organizaciones', OrganizacionesController.organizaciones)

	// GET one by id
	router.get('/organizaciones/:id', OrganizacionesController.organizacion)

	// PATCH single
	router.patch('/organizaciones/:id', OrganizacionPolicies.actualizar, OrganizacionesController.actualizar)

	// DELETE single
	router.delete('/organizaciones/:id', OrganizacionesController.eliminar)
}