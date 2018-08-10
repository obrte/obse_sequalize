const AuthMiddleware = require('../../middlewares/AuthMiddleware')
const UsuariosPolicies = require('../../policies/catalogos/UsuariosPolicies')
const UsuariosController = require('../../controllers/catalogos/UsuariosController')

module.exports = (router) => {
	// POST single
	router.post('/usuarios', AuthMiddleware.decodificar, UsuariosPolicies.guardar, UsuariosController.guardar)

	// GET all
	router.get('/usuarios', AuthMiddleware.decodificar, UsuariosController.usuarios)

	// GET one by id
	router.get('/usuarios/:id', AuthMiddleware.decodificar, UsuariosController.usuario)

	// PATCH single
	router.patch('/usuarios/:id', AuthMiddleware.decodificar, UsuariosPolicies.actualizar, UsuariosController.actualizar)

	// DELETE single
	router.delete('/usuarios/:id', AuthMiddleware.decodificar, UsuariosController.eliminar)
}