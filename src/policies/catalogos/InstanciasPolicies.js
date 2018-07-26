const Joi = require('joi')
const db = require('../../config/db')
const Op = db.Sequelize.Op
const mensajes = require('../../customFunction/Mensajes')

const schema = {
	idOrganizacion: Joi.string().required(),
	nombre: Joi.string().required(),
	activo: Joi.number().integer(),
	entes: Joi.array(),
	fondos: Joi.array()
}

const datosInstancia = (req) => {
	return {
		idOrganizacion: req.body.instancia.idOrganizacion,
		nombre: req.body.instancia.nombre,
		activo: req.body.instancia.activo,
		entes: req.body.instancia.entes,
		fondos: req.body.instancia.fondos
	}
}

//validar que los campos no esten vacios
exports.guardar = (req, res, next) => {
	const instancia = datosInstancia(req)
	const {
		error
	} = Joi.validate(instancia, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		db.catInstancias.findOne({
			where: {
				idOrganizacion: instancia.idOrganizacion,
				nombre: instancia.nombre
			}
		})
			.then(conflictoNombre => {
				if (conflictoNombre) {
					res.status(400).json({
						status: 'error',
						msg: 'La Instancia ya existe en esta organización.'
					})
				} else {
					next()
				}
			})
	}
}

//validar que los campos no esten vacios
exports.actualizar = (req, res, next) => {
	const instancia = datosInstancia(req)
	const {
		error
	} = Joi.validate(instancia, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		db.catInstancias.findOne({
			where: {
				idOrganizacion: instancia.idOrganizacion,
				nombre: instancia.nombre,
				idInstancia: {
					[Op.ne]: req.params.id
				}
			}
		})
			.then(conflictoNombre => {
				if (conflictoNombre) {
					res.status(400).json({
						status: 'error',
						msg: 'El nombre de la Instancia ya existe en esta organización.'
					})
				} else {
					next()
				}
			})
	}

}