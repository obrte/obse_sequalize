const AuthMiddleware = require('../../middlewares/AuthMiddleware')
const OrganizacionPolicies = require('../../policies/catalogos/OrganizacionesPolicies')
const OrganizacionesController = require('../../controllers/catalogos/OrganizacionesController')

module.exports = (router) => {
	// POST single
	router.post('/organizaciones', AuthMiddleware.decodificar, OrganizacionPolicies.guardar, OrganizacionesController.guardar)

	// GET all
	router.get('/organizaciones', AuthMiddleware.decodificar, OrganizacionesController.organizaciones)

	// GET one by id
	router.get('/organizaciones/:id', AuthMiddleware.decodificar, OrganizacionesController.organizacion)

	// PATCH single
	router.patch('/organizaciones/:id', AuthMiddleware.decodificar, OrganizacionPolicies.actualizar, OrganizacionesController.actualizar)

	// DELETE single
	router.delete('/organizaciones/:id', AuthMiddleware.decodificar, OrganizacionesController.eliminar)
}