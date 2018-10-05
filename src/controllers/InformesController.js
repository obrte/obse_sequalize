const db = require('../config/db')
const buscar = require('../customFunction/Buscar')

//POST single
exports.guardar = (req, res) => {
	db.informes.create(req.informe).then(informe => {
		buscar.informe(informe.idInforme)
			.then(datosInforme => {
				res.status(201).json(datosInforme)
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
exports.informes = (req, res) => {
	console.log('InformeSSS')
	var cont = 0
	var listaInformes = []
	db.informes.findAll()
		.then(arr => {
			if (arr.length > 0) {
				arr.forEach(element => {
					buscar.informe(element.idInforme)
						.then(datosInforme => {
							listaInformes.push(datosInforme)
							cont++
							if (cont == arr.length) res.status(200).json(listaInformes)
						})
						.catch(err =>
							res.status(400).json({
								status: 'Alerta',
								msg: 'Fallo al ordenar Informes. 1',
								error: err
							})
						)
				})
			} else {
				res.status(200).json(listaInformes)
			}
		})
		.catch(err =>
			res.status(400).json({
				status: 'Alerta',
				msg: 'Fallo al buscar Informes. 2',
				error: err
			})
		)
}

// GET one por id
exports.informe = (req, res) => {
	buscar.informe(req.params.id)
		.then(datosInforme => {
			res.status(200).json(datosInforme)
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
	db.informes.update(req.informe, {
		where: {
			idInforme: req.params.id
		}
	})
		.then(InformeActualizado => {
			if (InformeActualizado > 0) {
				buscar.informe(req.params.id).then(informe => {
					res.status(200).json(informe)
				})
			} else {
				res.status(400).json({
					status: 'Alerta',
					msg: 'Informe no actualizado.'
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
	db.informes
		.destroy({
			where: {
				idInforme: req.params.id
			}
		})
		.then(informeEliminado => {
			if (informeEliminado == 1) {
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