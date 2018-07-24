const db = require('../../config/db')
const buscar = require('../../customFunction/Buscar')

//POST single
exports.guardar = (req, res) => {
	db.catInstancias.create(req.body.instancia)
		.then(instancia => {

			const fondos = req.body.instancia.fondos
			var datosFondos = Object.keys(fondos)
			instancia.fondos = []
			if (datosFondos.length > 0) {
				var instanciaFondos = {
					idInstancia: instancia.idInstancia
				}
				datosFondos.forEach((item) => {
					instanciaFondos.idFondo = fondos[item]
					db.catInstanciaFondos.create(instanciaFondos)
						.then(instanciaFondo => {
							buscar.idFondo(instanciaFondo.idFondo)
								.then(fondo => {
									instancia.fondo.push(fondo.nombre)
								})
								.catch(err => res.status(400).json(err))
						})
						.catch(err => res.status(400).json(err))
				})
			}
			res.status(200).json(instancia)
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
exports.instancias = (req, res) => {
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
exports.instancia = (req, res) => {
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
	db.catInstancias.update(req.instancia, {
		where: {
			idInstancia: req.params.id
		}
	})
		.then(instanciaActualizado => {
			if (instanciaActualizado > 0) {
				res.status(200).json({
					status: 'success',
					id: req.params.id,
					datos: req.instancia
				})
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
	db.catInstancias.destroy({
		where: {
			idInstancia: req.params.id
		}
	})
		.then(instanciaEliminada => {
			if (instanciaEliminada == 1) {
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
				msg: 'Error al elimiar',
				error: {
					name: err.name,
					code: err.parent.code
				}
			})
		})
}

// const instanciaEntes = (instancia, entes) => {
// 	var datosEntes = Object.keys(entes)
// 	instancia.entes = []
// 	if (datosEntes.length > 0) {
// 		var instanciaEntes = {
// 			idInstancia: instancia.idInstancia
// 		}
// 		datosEntes.forEach((item) => {
// 			instanciaEntes.idEnte = entes[item]
// 			db.catInstanciaEntes.create(instanciaEntes)
// 				.then(instanciaEnte => {
// 					buscar.idEnte(instanciaEnte.idEnte)
// 						.then(ente => {
// 							instancia.ente.push(ente.nombre)
// 						})
// 						.catch(err => err)
// 				})
// 				.catch(err => err)
// 		})
// 	}
// }