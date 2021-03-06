const db = require('../config/db')
const fs = require('fs')
const buscar = require('../customFunction/Buscar')

//POST single
exports.guardar = (req, res) => {
	db.oficiosInstancia.create(req.oficio)
		.then(oficio => {
			buscar.oficioInstancia(oficio.idOficioInstancia)
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
}

// GET all
exports.oficios = (req, res) => {
	db.oficiosInstancia.findAll({
		attributes: [
			'idOficioInstancia',
			'numero',
			'fecha',
			'fechaRecepcion',
			'anexo',
			'created_at',
			'updated_at'
		],
		include: [{
			model: db.informes,
			attributes: ['idInforme', 'nombre'],
			as: 'informe'
		}]
	})
		.then(oficios => {
			oficios.forEach(arr => {
				if (arr.anexo) {
					arr.anexo = arr.anexo.split('/')[5]
				} else {
					arr.anexo = null
				}
			})
			res.status(200).json(oficios)
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
	buscar.oficioInstancia(req.params.id)
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
	buscar.oficioInstancia(req.params.id)
		.then(oficio => {
			if (oficio.anexo != null && req.file) {
				eliminarArchivo(oficio.anexo)
			}
			db.oficiosInstancia.update(req.oficio, {
				where: {
					idOficioInstancia: req.params.id
				}
			})
				.then(oficioActualizado => {
					if (oficioActualizado > 0) {
						buscar.oficioInstancia(req.params.id)
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
	buscar.oficioInstancia(req.params.id)
		.then(oficio => {
			if (oficio.anexo != null) {
				eliminarArchivo(oficio.anexo)
			}
			db.oficiosInstancia.destroy({
				where: {
					idOficioInstancia: req.params.id
				}
			})
				.then(oficioEliminado => {
					if (oficioEliminado == 1) {
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
		.catch(() => {
			res.status(400).json({
				status: 'Alerta',
				msg: 'No encontrado'
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