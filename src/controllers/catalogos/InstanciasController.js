const db = require('../../config/db')
const buscar = require('../../customFunction/Buscar')

//POST single
exports.guardar = (req, res) => {
	const instancia = {
		idOrganizacion: req.instancia.idOrganizacion,
		nombre: req.instancia.nombre
	}
	db.catInstancias.create(instancia)
		.then(async instancia => {
			await fondos(req.instancia.fondos, instancia.idInstancia)
			await entes(req.instancia.entes, instancia.idInstancia)
			buscar.instancia(instancia.idInstancia)
				.then(instancia => {
					res.status(201).json(instancia)
				})
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
exports.instancias = (req, res) => {
	if (req.userData.data.roles == 'superadmin') {
		db.catInstancias.findAll({
			include: [{
				model: db.catInstanciaEntes,
				as: 'entes',
				include: [{
					model: db.catEntesFiscalizadores,
					as: 'ente'
				}]
			},
			{
				model: db.catInstanciaFondos,
				as: 'fondos',
				include: [{
					model: db.catFondos,
					as: 'fondo'
				}]
			},
			{
				model: db.catOrganizaciones,
				attributes: ['nombre'],
				as: 'organizacion'
			}
			]
		})
			.then(instancias => {
				res.status(200).json(instancias)
			})
			.catch(err => {
				res.status(400).json({
					status: 'error',
					msg: 'No encontrado',
					error: err
				})
			})
	} else {
		db.catInstancias.findAll({
			where: {
				idInstancia: req.userData.data.instancia.idInstancia
			},
			include: [{
				model: db.catInstanciaEntes,
				as: 'entes',
				include: [{
					model: db.catEntesFiscalizadores,
					as: 'ente'
				}]
			},
			{
				model: db.catInstanciaFondos,
				as: 'fondos',
				include: [{
					model: db.catFondos,
					as: 'fondo'
				}]
			},
			{
				model: db.catOrganizaciones,
				attributes: ['nombre'],
				as: 'organizacion'
			}
			]
		})
			.then(instancias => {
				res.status(200).json(instancias)
			})
			.catch(err => {
				res.status(400).json({
					status: 'error',
					msg: 'No encontrado',
					error: err
				})
			})
	}
}

// GET one por id
exports.instancia = (req, res) => {
	var valido = false
	if (req.userData.data.roles == 'superadmin') valido = true
	if (req.userData.data.instancia.idInstancia == req.params.id) valido = true
	if (valido) {
		buscar.instancia(req.params.id)
			.then(instancia => {
				res.status(200).json(instancia)
			})
			.catch(err => {
				res.status(400).json({
					status: 'error',
					msg: 'Error al buscar',
					error: err
				})
			})
	} else {
		res.status(200).json({})
	}
}

// PATCH single
exports.actualizar = async (req, res) => {
	const idInstancia = req.params.id
	const instancia = {
		idOrganizacion: req.instancia.idOrganizacion,
		nombre: req.instancia.nombre,
		activo: req.instancia.activo
	}
	await destruirRelaciones(idInstancia)
	db.catInstancias.update(instancia, {
		where: {
			idInstancia: idInstancia
		}
	})
		.then(async () => {
			await fondos(req.instancia.fondos, idInstancia)
			await entes(req.instancia.entes, idInstancia)
			buscar.instancia(idInstancia)
				.then(instancia => {
					res.status(200).json(instancia)
				})
		})
		.catch(err => {
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
			instanciaFondos.push({
				idInstancia: idInstancia,
				idFondo: item
			})
		})
		await db.catInstanciaFondos.bulkCreate(instanciaFondos, {
			individualHooks: true
		})
			.then(() => true)
			.catch((err) => console.log(err))
	}
}

async function entes(entes, idInstancia) {
	if (entes.length > 0) {
		var instanciaEntes = []
		entes.forEach((item) => {
			instanciaEntes.push({
				idInstancia: idInstancia,
				idEnte: item
			})
		})
		await db.catInstanciaEntes.bulkCreate(instanciaEntes, {
			individualHooks: true
		})
			.then(() => true)
			.catch((err) => console.log(err))
	}
}

async function destruirRelaciones(id) {
	await db.catInstanciaEntes.destroy({
		where: {
			idInstancia: id
		}
	})
		.then(() => true)
		.catch((err) => console.log(err))
	await db.catInstanciaFondos.destroy({
		where: {
			idInstancia: id
		}
	})
		.then(() => true)
		.catch((err) => console.log(err))
}