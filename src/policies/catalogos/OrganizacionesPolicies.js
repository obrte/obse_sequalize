const Joi = require('joi')
const db = require('../../config/db')
const Op = db.Sequelize.Op
const existe = require('../../customFunction/Existe')
const mensajes = require('../../customFunction/Mensajes')

const schema = {
	nombre: Joi.string().required(),
	nombreCorto: Joi.string().required()
}

exports.crear = (req, res, next) => {
	const organizacion = req.body.organizacion
	const {
		error
	} = Joi.validate(organizacion, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		db.catOrganizaciones.findOne({
			where: {
				[Op.or]: [{
					nombre: organizacion.nombre
				},
				{
					nombreCorto: organizacion.nombreCorto
				}
				]
			}
		})
			.then(organizacion => {
				if (organizacion) {
					res.status(400).json({
						status: 'error',
						msg: 'El nombre o nombre corto ya existe.'
					})
				} else {
					req.organizacion = organizacion
					next()
				}
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