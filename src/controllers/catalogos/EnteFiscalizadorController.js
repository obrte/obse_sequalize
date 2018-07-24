const db = require('../../config/db')
const buscar = require('../../customFunction/Buscar')

//POST single
exports.guardar = (req, res) => {
	db.catEntesFiscalizadores.create(req.body.ente)
		.then(ente => {
			buscar.ente(ente.idEnte)
				.then(datosEnte => {
					res.status(200).json(datosEnte)
				})
				.catch(err => res.status(400).json({
					status: 'error',
					msg: 'Error al crear(buscar)',
					error: err
				}))
		})
		.catch(err => {
			console.log(err)
			res.status(400).json({
				status: 'error',
				msg: 'Error al crear',
				error: err
			})
		})
}

// GET all
exports.entes = (req, res) => {
	db.catEntesFiscalizadores.findAll()
		.then(entes => {
			res.status(200).json(entes)
		})
		.catch(err => {
			console.log(err)
			res.status(400).json({
				status: 'error',
				msg: 'Error al buscar',
				error: err
			})
		})
}

// GET one por id
exports.ente = (req, res) => {
	buscar.idEnteFiscalizador(req.params.id)
		.then(ente => {
			if (ente) {
				res.status(200).json(ente)
			} else {
				res.status(400).json({
					status: 'error',
					msg: 'No encontrado'
				})
			}
		})
		.catch(err => {
			console.log(err)
			res.status(400).json({
				status: 'error',
				msg: 'Error al buscar',
				error: err
			})
		})
}

// PATCH single
exports.actualizar = (req, res) => {
	db.catEntesFiscalizadores.update(req.body.ente, {
		where: {
			idEnte: req.params.id
		}
	})
		.then(enteActualizado => {
			if (enteActualizado > 0) {
				buscar.ente(req.params.id)
					.then(datosEnte => {
						res.status(200).json(datosEnte)
					})
					.catch(err => res.status(400).json({
						status: 'error',
						msg: 'Error al actualizar(buscar)',
						error: err
					}))
			} else {
				res.status(400).json({
					status: 'error',
					msg: 'Error al actualizar'
				})
			}
		})
		.catch(err => {
			console.log(err)
			res.status(400).json({
				status: 'error',
				msg: 'Error al actualizar',
				error: err
			})
		})
}

// DELETE single
exports.eliminar = (req, res) => {
	db.catEntesFiscalizadores.destroy({
		where: {
			idEnte: req.params.id
		}
	})
		.then(enteFiscalizadorEliminado => {
			if (enteFiscalizadorEliminado == 1) {
				res.status(200).json({
					status: 'success',
					msg: 'Eliminación exitosa',
					id: req.params.id
				})
			} else {
				res.status(400).json({
					status: 'error',
					msg: 'No encontrado'
				})
			}
		})
		.catch(err => {
			console.log(err)
			res.status(400).json({
				status: 'error',
				msg: 'Error al eliminar',
				error: {
					name: err.name,
					code: err.parent.code
				}
			})
		})
}