const db = require('../../config/db')
const buscar = require('../../customFunction/Buscar')

//POST single
exports.guardar = (req, res) => {
	db.catInstanciaFondos.create(req.nuevaInstanciaFondos)
		.then(nuevaInstanciaFondos => {
			res.status(200).json(nuevaInstanciaFondos)
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
exports.verTodos = (req, res) => {
	db.catInstanciaFondos.findAll()
		.then(instanciasFondos => {
			res.status(200).json(instanciasFondos)
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
exports.verId = (req, res) => {
	buscar.idInstanciaFondos(req.params.id)
		.then(instanciaFondos => {
			if (instanciaFondos) {
				res.status(200).json(instanciaFondos)
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
	req.oldInstanciaFondos.updateAttributes(req.updateInstanciaFondos)
		.then(instanciaFondosActualizado => {
			res.json(instanciaFondosActualizado)
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
	db.catInstanciaFondos.destroy({
		where: {
			id: req.params.id
		}
	})
		.then(instanciaFondosEliminado => {
			if (instanciaFondosEliminado == 1) {
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