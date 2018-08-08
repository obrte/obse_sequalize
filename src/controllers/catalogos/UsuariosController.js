const db = require('../../config/db')
const buscar = require('../../customFunction/Buscar')

//POST single
exports.guardar = (req, res) => {
	db.catUsuarios.create(req.usuario)
		.then(usuario => {
			buscar.usuario(usuario.idUsuario)
				.then(usuario => {
					res.status(201).json(usuario)
				})
		})
		.catch((err) => {
			res.status(400).json({
				status: 'error',
				msg: 'Error al crear',
				error: err
			})
		})
}

// GET all
exports.usuarios = (req, res) => {
	db.catUsuarios.findAll({
		attributes: ['idUsuario', 'tipo', 'nombre', 'email', 'activo', 'idUsuarioCreacion', 'created_at', 'updated_at'],
		include: [{
			model: db.catOrganizaciones,
			attributes: ['idOrganizacion', 'nombre'],
			as: 'organizacion'
		},
		{
			model: db.catInstancias,
			attributes: ['idInstancia', 'nombre'],
			as: 'instancia'
		},
		{
			model: db.catUniAdm,
			attributes: ['idUniAdm', 'nombre'],
			as: 'uniAdm'
		}
		]
	})
		.then(usuarios => {
			res.status(200).json(usuarios)
		})
		.catch((err) => {
			res.status(400).json({
				status: 'Alerta',
				msg: 'Fallo al buscar',
				error: err
			})
		})
}

// GET one por id
exports.usuario = (req, res) => {
	buscar.usuario(req.params.id)
		.then(usuario => {
			console.log(usuario)
			res.status(200).json(usuario)
		})
		.catch((err) => {
			res.status(400).json({
				status: 'Alerta',
				msg: 'Fallo al buscar',
				error: err
			})
		})
}

// PATCH single
exports.actualizar = (req, res) => {
	db.catUsuarios.update(req.usuario, {
		where: {
			idUsuario: req.params.id
		}
	})
		.then(usuarioActualizado => {
			if (usuarioActualizado > 0) {
				buscar.usuario(req.params.id)
					.then(usuario => {
						res.status(200).json(usuario)
					})
			} else {
				res.status(400).json({
					status: 'Alerta',
					msg: 'Usuario no actualizado.'
				})
			}
		})
		.catch((err) => {
			res.status(400).json({
				status: 'Alerta',
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
					status: 'Alerta',
					msg: 'No encontrado'
				})
			}
		})
		.catch((err) => {
			res.status(400).json({
				status: 'Alerta',
				msg: 'Error al eliminar, verifica que no tenga dependencias',
				error: {
					name: err.name,
					code: err.parent.code
				}
			})
		})
}