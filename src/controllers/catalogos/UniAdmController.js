const db = require('../../config/db')
const buscar = require('../../customFunction/Buscar')
var valido = false

//POST single
exports.guardar = (req, res) => {
	db.catUniAdm.create(req.uniAdm).then(uniAdm => {
		buscar
			.uniAdm(uniAdm.idUniAdm)
			.then(datosUniAdm => {
				res.status(201).json(datosUniAdm)
			})
			.catch(err =>
				res.status(400).json({
					status: 'Alerta',
					msg: 'Fallo al crear(buscar).',
					error: err
				})
			)
	})
}

// GET all
exports.uniAdms = (req, res) => {
	switch (req.userData.data.roles) {
	case 'superadmin':
		db.catUniAdm.findAll({
			include: [{
				model: db.catInstancias,
				attributes: ['nombre', 'idInstancia'],
				as: 'instancia'
			}]
		})
			.then(uniAdm => {
				res.json(uniAdm)
			})
			.catch(err => {
				res.json(err)
			})
		break
	case 'administrador':
		db.catUniAdm.findAll({
			where: {
				idInstancia: req.userData.data.instancia.idInstancia
			},
			include: [{
				model: db.catInstancias,
				attributes: ['nombre', 'idInstancia'],
				as: 'instancia'
			}]
		})
			.then(uniAdm => {
				res.status(200).json(uniAdm)
			})
			.catch(err => {
				res.status(400).json(err)
			})
		break
	default:
		db.catUniAdm.findAll({
			where: {
				idUniAdm: req.userData.data.uniAdm.idUniAdm
			},
			include: [{
				model: db.catInstancias,
				attributes: ['nombre', 'idInstancia'],
				as: 'instancia'
			}]
		})
			.then(uniAdm => {
				res.status(200).json(uniAdm)
			})
			.catch(err => {
				res.status(400).json(err)
			})
		break
	}
}

// GET one por id
exports.uniAdm = async (req, res) => {
	valido = false
	await validar(req, res)
	if (valido) {
		buscar.uniAdm(req.params.id)
			.then(uniAdm => {
				if (uniAdm) {
					res.status(200).json(uniAdm)
				} else {
					res.status(400).json({
						status: 'Alerta',
						msg: 'No encontrado'
					})
				}
			})
			.catch(err => {
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
	db.catUniAdm
		.update(req.uniAdm, {
			where: {
				idUniAdm: req.params.id
			}
		})
		.then(uniAdmActualizada => {
			if (uniAdmActualizada > 0) {
				buscar
					.uniAdm(req.params.id)
					.then(datosUniAdm => {
						res.status(200).json(datosUniAdm)
					})
					.catch(err =>
						res.status(400).json({
							status: 'Alerta',
							msg: 'Fallo al actualizar.',
							error: err
						})
					)
			} else {
				res.status(400).json({
					status: 'Alerta',
					msg: 'Fallo al actualizar'
				})
			}
		})
		.catch(err => {
			res.status(400).json({
				status: 'Alerta',
				msg: 'Fallo al actualizar',
				error: err
			})
		})
}

// DELETE single
exports.eliminar = (req, res) => {
	db.catUniAdm
		.destroy({
			where: {
				idUniadm: req.params.id
			}
		})
		.then(uniAdmEliminada => {
			if (uniAdmEliminada == 1) {
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
		.catch(err => {
			res.status(400).json({
				status: 'Alerta',
				msg: 'Error al eliminar',
				error: err
			})
		})
}

async function validar(req, res) {
	switch (req.userData.data.roles) {
	case 'superadmin':
		valido = true
		break
	case 'administrador':
		await db.catUniAdm.find({
			where: {
				idUniadm: req.params.id,
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
		if (req.userData.data.uniAdm.idUniAdm == req.params.id) {
			valido = true
		} else {
			valido = false
		}
		break
	}
}