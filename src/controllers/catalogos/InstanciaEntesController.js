const db = require('../../config/db')
const buscar = require('../../customFunction/Buscar')

//POST single
exports.guardar = (req, res) => {
	db.catInstanciaEntes.create(req.nuevaInstanciaEntes)
		.then(nuevaInstanciaEntes => {
			res.status(200).json(nuevaInstanciaEntes)
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
	db.catInstanciaEntes.findAll()
		.then(instanciasEntes => {
			res.status(200).json(instanciasEntes)
		})
		.catch(err => {
			console.log(err)
			res.status(400).json({
				status: 'error',
				msg: 'No encontrado',
				error: err
			})
		})
}

// GET one por id
exports.ente = (req, res) => {
	buscar.idInstanciaEntes(req.params.id)
		.then(instanciaEntes => {
			if (instanciaEntes) {
				res.status(200).json(instanciaEntes)
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
	req.oldInstanciaEntes.updateAttributes(req.updateInstanciaEnte)
		.then(instanciaEntesActualizado => {
			res.json(instanciaEntesActualizado)
		})
		.catch(err => {
			console.log(err)
			res.status(400).json({
				status: 'error',
				msg: 'Fallo al actualizar',
				error: err
			})
		})
}

// DELETE single
exports.eliminar = (req, res) => {
	db.catInstanciaEntes.destroy({
		where: {
			id: req.params.id
		}
	})
		.then(instanciaEntesEliminado => {
			if (instanciaEntesEliminado == 1) {
				res.status(200).json({
					status: 'success',
					msg: 'Eliminación exitosa'
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
				error: err
			})
		})
}