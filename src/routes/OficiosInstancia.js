const OficiosInstanciaPolicies = require('../policies/OficiosInstanciaPolicies')
const UploadMiddleware = require('../middlewares/UploadMiddleware')
const OficiosInstanciaController = require('../controllers/OficiosInstanciaController')
const AuthMiddleware = require('../middlewares/AuthMiddleware')

module.exports = router => {
	// POST single
	router.post('/oficiosinstancia', AuthMiddleware.decodificar, UploadMiddleware.anexo, OficiosInstanciaPolicies.guardar, OficiosInstanciaController.guardar)

	// GET all
	router.get('/oficiosinstancia/', AuthMiddleware.decodificar, OficiosInstanciaController.oficios)

	// GET one by id
	router.get('/oficiosinstancia/:id', AuthMiddleware.decodificar, OficiosInstanciaController.oficio)

	// PATCH single
	router.patch('/oficiosinstancia/:id', AuthMiddleware.decodificar, UploadMiddleware.anexo, OficiosInstanciaPolicies.actualizar, OficiosInstanciaController.actualizar)

	// DELETE single
	router.delete('/oficiosinstancia/:id', AuthMiddleware.decodificar, OficiosInstanciaController.eliminar)
}