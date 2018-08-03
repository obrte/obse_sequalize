const AuthMiddleware = require('../middlewares/AuthMiddleware')
const AuthController = require('../controllers/AuthController')

module.exports = (router) => {
	//login, variable => status = success, header => Authorization = Bearer jkfbd97v9fd8vyf98dv9fduvifhd0v
	router.post('/login', AuthController.login)

	// Refrescar
	router.get('/refrescar', AuthMiddleware.decodificar, AuthController.refrescar)

	//Datos TOKEN
	router.get('/token', AuthMiddleware.decodificar, AuthController.token)
}