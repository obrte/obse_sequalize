const ObservacionesPolicies = require('../policies/ObservacionesPolicies')
const UploadMiddleware = require('../middlewares/UploadMiddleware')
const ObservacionesController = require('../controllers/ObservacionesController')
const AuthMiddleware = require('../middlewares/AuthMiddleware')

module.exports = router => {
	// POST single
	router.post('/observaciones', AuthMiddleware.decodificar, UploadMiddleware.anexo, ObservacionesPolicies.guardar, ObservacionesController.guardar)

	// GET all
	router.get('/observaciones/', AuthMiddleware.decodificar, ObservacionesController.observaciones)

	// GET one by id
	router.get('/observaciones/:id', AuthMiddleware.decodificar, ObservacionesController.observacion)

	// PATCH single
	router.patch('/observaciones/:id', AuthMiddleware.decodificar, UploadMiddleware.anexo, ObservacionesPolicies.actualizar, ObservacionesController.actualizar)

	// DELETE single
	router.delete('/observaciones/:id', AuthMiddleware.decodificar, ObservacionesController.eliminar)
}