const db = require('../config/db')
// const buscar = require('../customFunction/Buscar')

//POST single
exports.guardar = (req, res) => {
	db.observaciones.create(req.observacion)
		.then(observacion => {
			res.status(201).json(observacion)
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
	db.observaciones.findAll({})
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
	db.observaciones.findAll({
		where: {
			idObservacion: req.params.id
		}
	})
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
				res.status(200).json(observacionActualizada)
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
	db.informes.destroy({
		where: {
			idObservacion: req.params.id
		}
	})
		.then(ObservacionEliminada => {
			if (ObservacionEliminada == 1) {
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
}