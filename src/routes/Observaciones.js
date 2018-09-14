const ObservacionesPolicies = require('../policies/ObservacionesPolicies')
const ObservacionesController = require('../controllers/ObservacionesController')
const AuthMiddleware = require('../middlewares/AuthMiddleware')

module.exports = router => {
	// POST single
	router.post('/observaciones', AuthMiddleware.decodificar, ObservacionesPolicies.guardar, ObservacionesController.guardar)

	// GET all
	router.get('/observaciones/', AuthMiddleware.decodificar, ObservacionesController.oficios)

	// GET one by id
	router.get('/observaciones/:id', AuthMiddleware.decodificar, ObservacionesController.oficio)

	// PATCH single
	router.patch('/observaciones/:id', AuthMiddleware.decodificar, ObservacionesPolicies.actualizar, ObservacionesController.actualizar)

	// DELETE single
	router.delete('/observaciones/:id', AuthMiddleware.decodificar, ObservacionesController.eliminar)
}