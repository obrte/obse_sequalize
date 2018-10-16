const db = require('../../config/db')
const Op = db.Sequelize.Op
const buscar = require('../../customFunction/Buscar')
var valido = false

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
	switch (req.userData.data.roles) {
	case 'superadmin':
		db.catUsuarios.findAll({
			where: {
				tipo: {
					[Op.ne]: 'superadmin'
				}
			},
			attributes: ['idUsuario', 'tipo', 'nombre', 'email', 'activo', 'created_at', 'updated_at'],
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
			},
			{
				model: db.catUsuarios,
				attributes: ['idUsuarioCreacion', 'nombre'],
				as: 'creador'
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
		break
	case 'administrador':
		db.catUsuarios.findAll({
			where: {
				idInstancia: req.userData.data.instancia.idInstancia
			},
			attributes: ['idUsuario', 'tipo', 'nombre', 'email', 'activo', 'created_at', 'updated_at'],
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
			},
			{
				model: db.catUsuarios,
				attributes: ['idUsuarioCreacion', 'nombre'],
				as: 'creador'
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
		break
	default:
		res.status(200).json([])
		break
	}
}

// GET one por id
exports.usuario = async (req, res) => {
	valido = false
	await validar(req, res)
	if (valido) {
		buscar.usuario(req.params.id)
			.then(usuario => {
				res.status(200).json(usuario)
			})
			.catch((err) => {
				res.status(400).json({
					status: 'Alerta',
					msg: 'Fallo al buscar',
					error: err
				})
			})
	} else {
		res.status(200).json({})
	}
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

async function validar(req, res) {
	switch (req.userData.data.roles) {
	case 'superadmin':
		valido = true
		break
	case 'administrador':
		await db.catUsuarios.find({
			where: {
				idUsuario: req.params.id,
				idInstancia: req.userData.data.instancia.idInstancia
			}
		})
			.then(existe => {
				if (existe) {
					valido = true
				} else {
					valido = false
				}
			})
			.catch(err => {
				res.status(400).json({
					status: 'Alerta',
					msg: 'Fallo al buscar',
					error: err
				})
			})
		break
	default:
		valido = false
		break
	}
}