const ObservacionesLogPolicies = require('../policies/ObservacionesLogPolicies')
const UploadMiddleware = require('../middlewares/UploadMiddleware')
const ObservacionesLogController = require('../controllers/ObservacionesLogController')
const AuthMiddleware = require('../middlewares/AuthMiddleware')

module.exports = router => {
	// POST single
	router.post('/oficios', AuthMiddleware.decodificar, UploadMiddleware.anexo, ObservacionesLogPolicies.guardar, ObservacionesLogController.guardar)

	// GET all
	router.get('/oficios/', AuthMiddleware.decodificar, ObservacionesLogController.oficios)
}