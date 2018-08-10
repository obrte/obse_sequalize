const db = require('../../config/db')
const buscar = require('../../customFunction/Buscar')

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
	db.catUniAdm
		.findAll({
			include: [
				{
					model: db.catInstancias,
					attributes: ['nombre', 'idOrganizacion'],
					as: 'instancia'
				}
			]
		})
		.then(uniAdm => {
			res.json(uniAdm)
		})
		.catch(err => {
			res.json(err)
		})
}

// GET one por id
exports.uniAdm = (req, res) => {
	buscar
		.uniAdm(req.params.id)
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
			console.log(err)
			res.status(400).json({
				status: 'Alerta',
				msg: 'Fallo al buscar',
				error: err
			})
		})
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
