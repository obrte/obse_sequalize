const db = require('../../config/db')
const buscar = require('../../customFunction/Buscar')

//POST single
exports.crear = (req, res) => {
	db.catInstancias.create(req.nuevaInstancia)
		.then(nuevaInstancia => {
			res.status(200).json(nuevaInstancia)
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
	db.catInstancias.findAll()
		.then(instancias => {
			res.status(200).json(instancias)
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
	buscar.idInstancia(req.params.id)
		.then(instancia => {
			if (instancia) {
				res.status(200).json(instancia)
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
	req.oldInstancia.updateAttributes(req.updateInstancia)
		.then(instanciaActualizada => {
			res.json(instanciaActualizada)
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
	db.catInstancias.destroy({
		where: {
			idInstancia: req.params.id
		}
	})
		.then(instanciaEliminada => {
			if (instanciaEliminada == 1) {
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
				msg: 'Error al elimiar',
				error: err
			})
		})
}