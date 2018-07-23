const Joi = require('joi')
const db = require('../../../config/db')
const Op = db.Sequelize.Op
const existe = require('../../../customFunction/Existe')

exports.crear = (req, res, next) => {
	const entes = req.body.instancia.entes
	const fondos = req.body.instancia.fondos

	var llavesEntes = Object.keys(entes)
	var llavesFondos = Object.keys(fondos)

	if ((llavesEntes.length > 0) || (llavesFondos.length > 0)) {
		instanciaEntes(entes, llavesEntes)
			.then(() => {
				req.entes = entes
			})
			.catch(err => {
				res.status(400).json({
					status: 'error',
					err
				})
			})
		instanciaFondos(fondos, llavesFondos)
			.then(() => {
				req.fondos = fondos
			})
			.catch(err => {
				res.status(400).json({
					status: 'error',
					err
				})
			})
		next()
	} else {
		res.status(400).json({
			status: 'error',
			msg: 'Debe proporcionar por lo menos un Ente o un Fondo para esta Instancia.'
		})
	}

}

exports.actualizar = (req, res, next) => {
	const id = req.params.id
	existe.idOrganizacion(id)
		.then(existeOrganizacion => {
			if (existeOrganizacion) {
				const organizacion = req.body.organizacion
				var llaves = Object.keys(organizacion)
				llaves.forEach((item) => {
					if ((organizacion[item] == '') && item != 'activo') {
						res.status(400).json({
							status: 'error',
							msg: 'Debe proporcionar el dato ' + item + '.'
						})
						throw console.log('Debe proporcionar el dato ' + item + '.')
					}
					if (item == 'nombre') {
						db.catOrganizaciones.findOne({
							where: {
								nombre: organizacion.nombre
							},
							idOrganizacion: {
								[Op.ne]: id
							}
						})
							.then(existeNombre => {
								if (existeNombre) {
									res.status(400).json({
										status: 'error',
										msg: 'El nombre ya existe.'
									})
									throw console.log('El nombre ya existe.')
								}
							})
					}
					if (item == 'nombreCorto') {
						db.catOrganizaciones.findOne({
							where: {
								nombre: organizacion.nombreCorto
							},
							idOrganizacion: {
								[Op.ne]: id
							}
						})
							.then(existeNombreCorto => {
								if (existeNombreCorto) {
									res.status(400).json({
										status: 'error',
										msg: 'El nombre corto ya existe.'
									})
									throw console.log('El nombre corto ya existe.')
								}
							})
					}
				})
				req.organizacion = organizacion
				next()
			} else {
				res.status(400).json({
					status: 'error',
					msg: 'ID de la Organizacion no encontrado.'
				})
			}
		})
		.catch(err => {
			console.log(err)
			res.status(400).json({
				status: 'error',
				msg: err
			})
		})

}

const instanciaEntes = (entes, llavesEntes) => {
	return new Promise((resolve, reject) => {
		if (llavesEntes.length > 0) {
			llavesEntes.forEach(async (item) => {
				await existe.idEnteFiscalizador(entes[item])
					.then(existeId => {
						if (!existeId) {
							const err = {
								msg: 'ID del Ente no fue encontrado.',
								id: entes[item]
							}
							reject(err)
						}
					})
			})
			resolve(true)
		}
	})
}

const instanciaFondos = (fondos, llavesFondos) => {
	return new Promise((resolve, reject) => {
		if (llavesFondos.length > 0) {
			llavesFondos.forEach(async (item) => {
				await existe.idFondo(fondos[item])
					.then(existeId => {
						if (!existeId) {
							const err = {
								msg: 'ID del Fondo no fue encontrado.',
								id: fondos[item]
							}
							reject(err)
						}
					})
			})
			resolve(true)
		}
	})
}