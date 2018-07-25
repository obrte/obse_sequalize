const db = require('../../config/db')
const buscar = require('../../customFunction/Buscar')

//POST single
exports.guardar = (req, res) => {
	const instancia = {
		idOrganizacion: req.body.instancia.idOrganizacion,
		nombre: req.body.instancia.nombre
	}
	db.catInstancias.create(instancia)
		.then(instancia => {
			fondos(req.body.instancia.fondos, instancia.idInstancia)
			console.log('entre Funciones')
			entes(req.body.instancia.entes, instancia.idInstancia)

			console.log('Antes de BUSCAR')
			// buscar.instancia(instancia.idInstancia)
			// 	.then(instancia => {
			// 		res.status(200).json(instancia)
			// 	})
		})
		.catch(err => {
			console.log(err)
			res.status(400).json({
				status: 'error',
				msg: 'Error al crear',
				error: err
			})
		})
	console.log('FIN')
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
	db.catInstancias.update(req.body.instancia, {
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

const fondos = (fondos, idInstancia) => {
	var datosFondos = Object.keys(fondos)
	if (datosFondos.length > 0) {
		var instanciaFondos = []
		datosFondos.forEach((item) => {
			instanciaFondos.push({ idInstancia: idInstancia, idFondo: item })
		})
		db.catInstanciaFondos.bulkCreate(instanciaFondos, { individualHooks: true })
			.then(() => true)
			.catch(err => console.log(err))
	}
}
const entes = async (entes, idInstancia) => {
	var datosEntes = Object.keys(entes)
	if (datosEntes.length > 0) {
		var instanciaEntes = []
		datosEntes.forEach((item) => {
			instanciaEntes.push({ idInstancia: idInstancia, idEnte: entes[item].idEnte })
		})
		await db.catInstanciaEntes.bulkCreate(instanciaEntes, { individualHooks: true })
			.then(() => { return console.log('se cargaron los entes.') })
			.catch(err => console.log(err))
	}
}