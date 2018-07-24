const db = require('../../config/db')
const buscar = require('../../customFunction/Buscar')

//POST single
exports.guardar = (req, res) => {
	db.catFondos.create(req.body.fondo)
		.then(fondo => {
			buscar.datosFondo(fondo.idFondo)
				.then(datosFondo => {
					res.status(200).json(datosFondo)
				})
				.catch(err => res.status(400).json({
					status: 'error',
					msg: 'Error al crear',
					error: err
				}))
		})
		.catch(err => {
			res.status(400).json({
				status: 'error',
				msg: 'Error al crear',
				error: err
			})
		})
}

// GET all
exports.fondos = (req, res) => {
	db.catFondos.findAll()
		.then(fondos => {
			res.status(200).json(fondos)
		})
		.catch(err => {
			res.status(400).json({
				status: 'error',
				msg: 'Error al buscar',
				error: err
			})
		})
}

// GET one por id
exports.fondo = (req, res) => {
	buscar.idFondo(req.params.id)
		.then(fondo => {
			if (fondo) {
				res.json(fondo)
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
	db.catFondos.update(req.fondo, {
		where: {
			idFondo: req.params.id
		}
	})
		.then(fondoActualizado => {
			if (fondoActualizado > 0) {
				buscar.datosFondo(req.params.id)
					.then(datosFondo => {
						res.status(200).json(datosFondo)
					})
					.catch(err => res.status(400).json({
						status: 'error',
						msg: 'Error al actualizar',
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
	db.catFondos.destroy({
		where: {
			idFondo: req.params.id
		}
	})
		.then(fondoEliminado => {
			if (fondoEliminado == 1) {
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