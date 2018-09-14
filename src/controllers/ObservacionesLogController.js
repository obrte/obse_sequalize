const db = require('../config/db')

//POST single
exports.guardar = (req, res) => {
	db.observacionesLog.update({
		esUltimo: 0
	}, {
		where: {
			idObservacion: req.observacionesLog.idObservacion
		}
	})
		.then(() => {
			db.observacionesLog.create(req.observacionesLog)
				.then(observacion => {
					res.status(201).json(observacion)
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
}


// GET all
exports.observaciones = (req, res) => {
	db.observacionesLog.findAll({})
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