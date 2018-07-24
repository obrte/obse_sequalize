const Joi = require('joi')
const db = require('../../config/db')
const Op = db.Sequelize.Op
const existe = require('../../customFunction/Existe')
const mensajes = require('../../customFunction/Mensajes')


const schema = {
	nombre: Joi.string().required(),
	nombreCorto: Joi.string().required()
}

exports.guardar = (req, res, next) => {
	const {
		error
	} = Joi.validate(req.body.organizacion, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		db.catOrganizaciones.findOne({
			where: {
				[Op.or]: [{
					nombre: req.body.organizacion.nombre
				},
				{
					nombreCorto: req.body.organizacion.nombreCorto
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
					next()
				}
			})
	}
}

exports.actualizar = (req, res, next) => {
	const id = req.params.id
	existe.organizacion(id)
		.then(existeOrganizacion => {
			if (existeOrganizacion) {
				var llaves = Object.keys(req.body.organizacion)
				llaves.forEach((item) => {
					if ((req.body.organizacion[item] == '') && item != 'activo') {
						res.status(400).json({
							status: 'error',
							msg: 'Debe proporcionar el dato ' + item + '.'
						})
						throw console.log('Debe proporcionar el dato ' + item + '.')
					}
					if (item == 'nombre') {
						db.catOrganizaciones.findOne({
							where: {
								nombre: req.body.organizacion.nombre
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
								nombre: req.body.organizacion.nombreCorto
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