const UsuariosPolicies = require('../../policies/catalogos/UsuariosPolicies')
const UsuariosController = require('../../controllers/catalogos/UsuariosController')

module.exports = (router) => {
// POST single
	router.post('/usuarios', UsuariosPolicies.registro, UsuariosController.crear)

	// GET all
	router.get('/usuarios', UsuariosController.verTodos)

	// GET one by id
	router.get('/usuarios/:id', UsuariosController.verId)

	// PATCH single
	router.patch('/usuarios/:id', UsuariosPolicies.actualizar, UsuariosController.actualizar)

	// DELETE single
	router.delete('/usuarios/:id', UsuariosController.eliminar)
}