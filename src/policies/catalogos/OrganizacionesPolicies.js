const Joi = require('joi')
const db = require('../../config/db')
const Op = db.Sequelize.Op
const mensajes = require('../../customFunction/Mensajes')

const schema = {
	nombre: Joi.string().required(),
	nombreCorto: Joi.string().required(),
	activo: Joi.number().integer()
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
				],
				idOrganizacion: {
					[Op.ne]: id
				}
			}
		})
			.then(conflictoNombre => {
				if (conflictoNombre) {
					res.status(400).json({
						status: 'error',
						msg: 'El nombre o nombre corto ya esta en uso.'
					})
				} else {
					next()
				}
			})
			.catch(err => {
				res.status(400).json({
					status: 'error',
					msg: err
				})
			})
	}
}