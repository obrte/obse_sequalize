const db = require('../config/db')
const buscar = require('../customFunction/Buscar')
var datosObservaciones = []

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
	db.observaciones.findAll({
		include: [{
			model: db.observacionesLog,
			where: {
				esUltimo: 1
			},
			as: 'log',
			attributes: ['idObservacion', 'descripcion', 'monto', 'anexo', 'estatus', 'comentarios', 'esUltimo'],
			include: [{
				model: db.oficios,
				attributes: ['idOficio', 'numero'],
				as: 'oficio'
			},
			{
				model: db.catUniAdm,
				attributes: ['idUniAdm', 'nombre'],
				as: 'unidad'
			},
			{
				model: db.catUsuarios,
				attributes: ['idUsuario', 'nombre'],
				as: 'usuario'
			}
			]
		}]
	})
		.then(async dato => {
			var cont = 0
			if (dato.length > 0) {
				dato.forEach(observacion => {
					if (observacion.log) {
						db.observacionesLog.findAll({
							where: {
								idObservacion: observacion.idObservacion
							},
							attributes: ['idObservacion', 'descripcion', 'monto', 'anexo', 'estatus', 'comentarios', 'esUltimo', 'created_at', 'updated_at'],
							include: [{
								model: db.oficios,
								attributes: ['idOficio', 'numero'],
								as: 'oficio'
							},
							{
								model: db.catUniAdm,
								attributes: ['idUniAdm', 'nombre'],
								as: 'unidad'
							},
							{
								model: db.catUsuarios,
								attributes: ['idUsuario', 'nombre'],
								as: 'usuario'
							}
							]
						})
							.then(logObservaciones => {
								logObservaciones.forEach(obj => {
									if (obj.anexo) obj.anexo = obj.anexo.split('/')[5]
								})
								var cuerpo = {
									idInforme: observacion.idInforme,
									idObservacion: observacion.idObservacion,
									numero: observacion.numero,
									oficio: observacion.log[0].oficio,
									unidad: observacion.log[0].unidad,
									usuario: observacion.log[0].usuario,
									descripcion: observacion.log[0].descripcion,
									estatus: observacion.log[0].estatus,
									esUltimo: observacion.log[0].esUltimo,
									log: logObservaciones,
									created_at: observacion.created_at,
									updated_at: observacion.updated_at
								}
								if (observacion.log[0].anexo) {
									cuerpo.anexo = observacion.log[0].anexo.split('/')[5]
								} else {
									cuerpo.anexo = null
								}
								if (observacion.log[0].monto) {
									cuerpo.monto = observacion.log[0].monto
								} else {
									cuerpo.monto = null
								}
								if (observacion.log[0].comentarios) {
									cuerpo.comentarios = observacion.log[0].comentarios
								} else {
									cuerpo.comentarios = null
								}

								datosObservaciones.push(cuerpo)

								cont++
								if (cont == dato.length) res.status(200).json(datosObservaciones)
							})
							.catch(err => {
								res.status(400).json({
									status: 'Alerta',
									msg: 'Fallo al buscar log',
									error: err
								})
							})
					}
				})
			} else {
				res.status(200).json(datosObservaciones)
			}
		})
		.catch(err => {
			res.status(400).json({
				status: 'Alerta',
				msg: 'Fallo al buscar obs',
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
	db.observaciones.update({
		numero: req.body.numero
	}, {
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