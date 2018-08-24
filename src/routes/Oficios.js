const OficiosPolicies = require('../policies/OficiosPolicies')
const UploadMiddleware = require('../middlewares/UploadMiddleware')
const OficiosController = require('../controllers/OficiosController')
//const AuthMiddleware = require('../middlewares/AuthMiddleware')


module.exports = (router) => {
	router.post('/oficios', UploadMiddleware.upload, OficiosPolicies.guardar, OficiosController.test)
	router.post('/oficios/test', UploadMiddleware.cuerpo, OficiosPolicies.test, OficiosController.test)
}