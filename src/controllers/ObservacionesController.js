const db = require('../config/db')
const buscar = require('../customFunction/Buscar')

//POST single
exports.guardar = (req, res) => {
	db.observaciones.create(req.observacion)
		.then(observacion => {
			req.observacionLog.idObservacion = observacion.idObservacion
			db.observacionesLog.update({
				esUltimo: 0
			}, {
				where: {
					idObservacion: req.observacionLog.idObservacion
				}
			})
				.then(() => {
					db.observacionesLog.create(req.observacionLog)
						.then(() => {
							buscar.observaciones(observacion.idObservacion)
								.then(datosObservacion => {
									res.status(201).json(datosObservacion)
								})
								.catch(err =>
									res.status(400).json({
										status: 'Alerta',
										msg: 'Fallo al crear(Buscar).',
										error: err
									})
								)
						})
						.catch(err =>
							res.status(400).json({
								status: 'Alerta',
								msg: 'Fallo al crear.',
								error: err
							})
						)
				})
				.catch(err =>
					res.status(400).json({
						status: 'Alerta',
						msg: 'Fallo al editar las observaciones (esUltimo).',
						error: err
					})
				)
		})
		.catch(err => {
			res.status(400).json({
				status: 'Alerta',
				msg: 'Fallo al crear.',
				error: err
			})
		})
}

// GET all
exports.observaciones = (req, res) => {
	db.observaciones.find({
		include: [{
			model: db.observacionesLog,
			where: {
				esUltimo: 1
			},
			as: 'log',
			include: [{
				model: db.oficios,
				as: 'oficio'
			},
			{
				model: db.catUniAdm,
				as: 'unidad'
			},
			{
				model: db.catUsuarios,
				attributes: [
					'idUsuario',
					'tipo',
					'nombre',
					'email',
					'activo',
					'created_at',
					'updated_at'
				],
				as: 'usuario'
			},
			]
		}]
	})
		.then(observaciones => {
			res.status(200).json(observaciones)
		})
		.catch(err => {
			res.status(400).json({
				status: 'Alerta',
				msg: 'Fallo al buscar',
				error: err
			})
		})
}

// GET all (LOG)
exports.observacionesLog = (req, res) => {
	db.observaciones.findAll({
		include: [{
			model: db.observacionesLog,
			as: 'log',
			include: [{
				model: db.oficios,
				as: 'oficio'
			},
			{
				model: db.catUniAdm,
				as: 'unidad'
			},
			{
				model: db.catUsuarios,
				attributes: [
					'idUsuario',
					'tipo',
					'nombre',
					'email',
					'activo',
					'created_at',
					'updated_at'
				],
				as: 'usuario'
			},
			]
		}]
	})
		.then(observaciones => {
			res.status(200).json(observaciones)
		})
		.catch(err => {
			res.status(400).json({
				status: 'Alerta',
				msg: 'Fallo al buscar',
				error: err
			})
		})
}

// GET one por id (LOG)
exports.observacionLog = (req, res) => {
	db.observaciones.findAll({
		where: {
			idObservacion: req.params.id
		},
		include: [{
			model: db.observacionesLog,
			as: 'log',
			include: [{
				model: db.oficios,
				as: 'oficio'
			},
			{
				model: db.catUniAdm,
				as: 'unidad'
			},
			{
				model: db.catUsuarios,
				attributes: [
					'idUsuario',
					'tipo',
					'nombre',
					'email',
					'activo',
					'created_at',
					'updated_at'
				],
				as: 'usuario'
			},
			]
		}]
	})
		.then(observaciones => {
			res.status(200).json(observaciones)
		})
		.catch(err => {
			res.status(400).json({
				status: 'Alerta',
				msg: 'Fallo al buscar',
				error: err
			})
		})
}

// GET one por id
exports.observacion = (req, res) => {
	buscar.observaciones(req.params.id)
		.then(observacion => {
			res.status(200).json(observacion)
		})
		.catch(err => {
			res.status(400).json({
				status: 'Alerta',
				msg: 'Fallo al buscar',
				error: err
			})
		})
}

// PATCH single
exports.actualizar = (req, res) => {
	db.observaciones.update(req.observacion, {
		where: {
			idObservacion: req.params.id
		}
	})
		.then(observacionActualizada => {
			if (observacionActualizada > 0) {
				req.observacionLog.idObservacion = req.params.id
				db.observacionesLog.update({
					esUltimo: 0
				}, {
					where: {
						idObservacion: req.observacionLog.idObservacion
					}
				})
					.then(() => {
						db.observacionesLog.create(req.observacionLog)
							.then(() => {
								buscar.observaciones(req.params.id)
									.then(datosObservacion => {
										res.status(201).json(datosObservacion)
									})
									.catch(err =>
										res.status(400).json({
											status: 'Alerta',
											msg: 'Fallo al crear(Buscar).',
											error: err
										})
									)
							})
							.catch(err =>
								res.status(400).json({
									status: 'Alerta',
									msg: 'Fallo al crear.',
									error: err
								})
							)
					})
			} else {
				res.status(400).json({
					status: 'Alerta',
					msg: 'Observacion no actualizada.'
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
	db.observacionesLog.destroy({
		where: {
			idObservacion: req.params.id
		}
	})
		.then(() => {
			db.observaciones.destroy({
				where: {
					idObservacion: req.params.id
				}
			})
				.then(observacionEliminada => {
					if (observacionEliminada == 1) {
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
						msg: 'Error al eliminar, verifica que no tenga dependencias',
						error: {
							name: err.name,
							code: err.parent.code
						}
					})
				})
		})
		.catch(err => {
			res.status(400).json({
				status: 'Alerta',
				msg: 'Error al eliminar',
				error: {
					name: err.name,
					code: err.parent.code
				}
			})
		})
}