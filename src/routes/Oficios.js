const OficiosPolicies = require('../policies/OficiosPolicies')
const UploadMiddleware = require('../middlewares/UploadMiddleware')
const OficiosController = require('../controllers/OficiosController')
//const AuthMiddleware = require('../middlewares/AuthMiddleware')

module.exports = router => {
	// POST single
	router.post('/oficios', UploadMiddleware.upload, OficiosPolicies.guardar, OficiosController.guardar)

	// GET all
	router.get('/oficios', OficiosController.oficios)

	// GET one by id
	router.get('/oficios/:id', OficiosController.oficio)

	// PATCH single
	router.patch('/oficios/:id', UploadMiddleware.upload, OficiosPolicies.actualizar, OficiosController.actualizar)

	// DELETE single
	router.delete('/oficios/:id', OficiosController.eliminar)
}