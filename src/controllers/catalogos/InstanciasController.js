const db = require('../../config/db')
const buscar = require('../../customFunction/Buscar')

//POST single
exports.guardar = (req, res) => {
	const instancia = {
		idOrganizacion: req.body.instancia.idOrganizacion,
		nombre: req.body.instancia.nombre
	}
	db.catInstancias.create(instancia)
		.then(async instancia => {
			await fondos(req.body.instancia.fondos, instancia.idInstancia)
			await entes(req.body.instancia.entes, instancia.idInstancia)
			buscar.instancia(instancia.idInstancia)
				.then(instancia => {
					res.status(200).json(instancia)
				})
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

async function fondos(fondos, idInstancia) {
	if (fondos.length > 0) {
		var instanciaFondos = []
		fondos.forEach((item) => {
			instanciaFondos.push({ idInstancia: idInstancia, idFondo: item })
		})
		await db.catInstanciaFondos.bulkCreate(instanciaFondos, { individualHooks: true })
			.then(() => console.log('Fondos Agregados'))
			.catch((err) => console.log(err))
	}
}

async function entes(entes, idInstancia) {
	if (entes.length > 0) {
		var instanciaEntes = []
		entes.forEach((item) => {
			instanciaEntes.push({ idInstancia: idInstancia, idEnte: item })
		})
		await db.catInstanciaEntes.bulkCreate(instanciaEntes, { individualHooks: true })
			.then(() => console.log('Entes Agregados'))
			.catch(err => console.log(err))
	}
}