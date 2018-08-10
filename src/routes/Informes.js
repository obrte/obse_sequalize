const AuthMiddleware = require('../middlewares/AuthMiddleware')
const InformesPolicies = require('../policies/InformesPolicies')
const InformesController = require('../controllers/InformesController')

module.exports = router => {
	// POST single
	router.post(
		'/informes',
		AuthMiddleware.decodificar,
		InformesPolicies.guardar,
		InformesController.guardar
	)

	// GET all
	router.get(
		'/informes',
		AuthMiddleware.decodificar,
		InformesController.informes
	)

	// GET one by id
	router.get(
		'/informes/:id',
		AuthMiddleware.decodificar,
		InformesController.informe
	)

	// PATCH single
	router.patch(
		'/informes/:id',
		AuthMiddleware.decodificar,
		InformesPolicies.actualizar,
		InformesController.actualizar
	)

	// DELETE single
	router.delete(
		'/informes/:id',
		AuthMiddleware.decodificar,
		InformesController.eliminar
	)
}
