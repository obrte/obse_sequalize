const OficiosPolicies = require('../policies/OficiosPolicies')
const UploadMiddleware = require('../middlewares/UploadMiddleware')
const OficiosController = require('../controllers/OficiosController')
//const AuthMiddleware = require('../middlewares/AuthMiddleware')


module.exports = (router) => {
	router.post('/oficios', UploadMiddleware.cuerpo, OficiosPolicies.guardar, UploadMiddleware.upload, OficiosController.test)
	router.post('/oficios/test')
}