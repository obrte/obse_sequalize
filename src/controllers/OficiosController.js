const db = require('../config/db')
const fs = require('fs')
const buscar = require('../customFunction/Buscar')

//POST single
exports.guardar = (req, res) => {
	db.oficios.update({
		esUltimo: 0
	}, {
		where: {
			idInforme: req.oficio.idInforme
		}
	})
		.then(() => {
			db.oficios.create(req.oficio)
				.then(oficio => {
					buscar.oficio(oficio.idOficio)
						.then(datosOficio => {
							res.status(201).json(datosOficio)
						})
						.catch(err =>
							res.status(400).json({
								status: 'Alerta',
								msg: 'Fallo al crear(buscar).',
								error: err
							})
						)
				})
		})
}

// GET all
exports.oficios = (req, res) => {
	db.oficios.findAll({
		attributes: [
			'idOficio',
			'numero',
			'fecha',
			'fechaRecepcion',
			'fechaVencimiento',
			'observaciones',
			'pathPdfFile',
			'notificaResultados',
			'esUltimo',
			'created_at',
			'updated_at'
		],
		include: [{
			model: db.informes,
			attributes: ['idInforme', 'nombre'],
			as: 'informe'
		}]
	})
		.then(informes => {
			res.status(200).json(informes)
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
exports.oficio = (req, res) => {
	buscar.oficio(req.params.id)
		.then(datosOficio => {
			res.status(200).json(datosOficio)
		})
		.catch(err =>
			res.status(400).json({
				status: 'Alerta',
				msg: 'Fallo al crear(buscar).',
				error: err
			})
		)
}

// PATCH single
exports.actualizar = (req, res) => {
	buscar.oficio(req.params.id)
		.then(oficio => {
			if (oficio.pathPdfFile != null && req.file) {
				eliminarArchivo(oficio.pathPdfFile)
			}
			db.oficios.update(req.oficio, {
				where: {
					idOficio: req.params.id
				}
			})
				.then(oficioActualizado => {
					if (oficioActualizado > 0) {
						buscar.oficio(req.params.id)
							.then(oficio => {
								res.status(200).json(oficio)
							})
					} else {
						res.status(400).json({
							status: 'Alerta',
							msg: 'Oficio no actualizado.'
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
		})

}

// DELETE single
exports.eliminar = (req, res) => {
	buscar.oficio(req.params.id)
		.then(oficio => {
			if (oficio.pathPdfFile != null) {
				eliminarArchivo(oficio.pathPdfFile)
			}
			db.oficios.destroy({
				where: {
					idOficio: req.params.id
				}
			})
				.then(oficioEliminado => {
					if (oficioEliminado == 1) {
						db.oficios.max('idOficio', {
							where: {
								idInforme: oficio.informe.idInforme
							}
						})
							.then(ultimoAnterior => {
								db.oficios.update({
									esUltimo: 1
								}, {
									where: {
										idOficio: ultimoAnterior
									}
								})
							})
						res.status(200).json({
							status: 'success',
							msg: 'Eliminación exitosa'
						})
					} else {
						res.status(400).json({
							status: 'Alerta',
							msg: 'No encontrado 1'
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
		.catch(() => {
			res.status(400).json({
				status: 'Alerta',
				msg: 'No encontrado 2'
			})
		})
}

function eliminarArchivo(archivo) {
	fs.stat(archivo, function (err) {
		if (err) return console.error(err)
		fs.unlink(archivo, function (err) {
			if (err) return console.log(err)
		})
	})
}