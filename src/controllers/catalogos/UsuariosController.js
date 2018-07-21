const db = require('../../config/db')
const buscar = require('../../customFunction/Buscar')

//POST single
exports.crear = (req, res) => {
	db.catUsuarios.create(req.nuevoUsuario)
		.then(nuevoUsuario => {
			res.status(200).json(nuevoUsuario)
		})
		.catch(err => {
			console.log(err)
			res.status(400).json({
				status: 'error',
				msg: 'Error al crear',
				error: err
			})
		})
}

// GET all
exports.verTodos = (req, res) => {
	db.catUsuarios.findAll()
		.then(usuarios => {
			res.status(200).json(usuarios)
		})
		.catch(err => {
			console.log(err)
			res.status(400).json({
				status: 'error',
				msg: 'Error al buscar',
				error: err
			})
		})
}

// GET one por id
exports.verId = (req, res) => {
	buscar.idUsuario(req.params.id)
		.then(usuario => {
			if (usuario) {
				res.status(200).json(usuario)
			} else {
				res.status(400).json({
					status: 'error',
					msg: 'No encontrado'
				})
			}
		})
		.catch(err => {
			console.log(err)
			res.status(400).json({
				status: 'error',
				msg: 'Error al buscar',
				error: err
			})
		})
}

// PATCH single
exports.actualizar = (req, res) => {
	req.oldUsuario.updateAttributes(req.updateUsuario)
		.then(usuarioActualizado => {
			res.json(usuarioActualizado)
		})
		.catch(err => {
			console.log(err)
			res.status(400).json({
				status: 'error',
				msg: 'Fallo al actualizar',
				error: err
			})
		})
}

// DELETE single
exports.eliminar = (req, res) => {
	db.catUsuarios.destroy({
		where: {
			idUsuario: req.params.id
		}
	})
		.then(usuarioEliminado => {
			if (usuarioEliminado == 1) {
				res.status(200).json({
					status: 'success',
					msg: 'Eliminación exitosa'
				})
			} else {
				res.status(400).json({
					status: 'error',
					msg: 'No encontrado'
				})
			}
		})
		.catch(err => {
			console.log(err)
			res.status(400).json({
				status: 'error',
				msg: 'Error al eliminar',
				error: err
			})
		})
}