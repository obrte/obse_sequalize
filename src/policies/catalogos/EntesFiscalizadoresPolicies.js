const Joi = require('joi')
const db = require('../../config/db')
const Op = db.Sequelize.Op
const mensajes = require('../../customFunction/Mensajes')

const schema = {
	idOrganizacion: Joi.string().required(),
	nombre: Joi.string().required(),
	activo: Joi.number().integer()
}

const datosEnte = (req) => {
	return {
		idOrganizacion: req.body.ente.idOrganizacion,
		nombre: req.body.ente.nombre,
		activo: req.body.ente.activo
	}
}

//validar que los campos no esten vacios
exports.guardar = (req, res, next) => {
	const ente = datosEnte(req)
	const {
		error
	} = Joi.validate(ente, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		db.catEntesFiscalizadores.findOne({
			where: {
				idOrganizacion: ente.idOrganizacion,
				nombre: ente.nombre
			}
		})
			.then(conflictoNombre => {
				if (conflictoNombre) {
					res.status(400).json({
						status: 'error',
						msg: 'El ente ya existe en esta organización.'
					})
				} else {
					next()
				}
			})
	}
}

//validar que los campos no esten vacios
exports.actualizar = (req, res, next) => {
	const ente = datosEnte(req)
	const {
		error
	} = Joi.validate(ente, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		db.catEntesFiscalizadores.findOne({
			where: {
				idOrganizacion: ente.idOrganizacion,
				nombre: ente.nombre
			},
			idEnte: {
				[Op.ne]: req.params.id
			}
		})
			.then(conflictoNombre => {
				if (conflictoNombre) {
					res.status(400).json({
						status: 'error',
						msg: 'El ente ya existe en esta organización.'
					})
				} else {
					next()
				}
			})
	}
}