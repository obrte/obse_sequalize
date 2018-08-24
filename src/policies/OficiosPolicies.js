const BaseJoi = require('joi')
const Extension = require('joi-date-extensions')
const Joi = BaseJoi.extend(Extension)
const db = require('../config/db')
const Op = db.Sequelize.Op
const mensajes = require('../customFunction/Mensajes')

const schema = {
	idInforme: Joi.string().required(),
	numero: Joi.string().required(),
	fecha: Joi.date().format('DD/MM/YYYY'),
	fechaRecepcion: Joi.date().format('DD/MM/YYYY'),
	fechaVencimiento: Joi.date().format('DD/MM/YYYY'),
	observaciones: Joi.string(),
	notificaResultados: Joi.number().integer()
}

const datosOficio = (req) => {
	return {
		idInforme: req.body.idInforme,
		numero: req.body.numero.toUpperCase().trim(),
		fecha: req.body.fecha,
		fechaRecepcion: req.body.fechaRecepcion,
		fechaVencimiento: req.body.fechaVencimiento,
		observaciones: req.body.observaciones.toUpperCase().trim(),
		notificaResultados: req.body.notificaResultados.toUpperCase().trim()
	}
}

exports.test = (req, res, next) => {
	console.log('Policies', req.body)
	req.oficio = req.body
	next()
}

//validar que los campos no esten vacios
exports.guardar = (req, res, next) => {
	console.log('POLICIES')
	const oficio = datosOficio(req)
	if (oficio.observaciones == '' || oficio.observaciones == null) {
		delete oficio['observaciones']
	}
	req.oficio = oficio
	const {
		error
	} = Joi.validate(oficio, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		db.oficios.findOne({
			where: {
				numero: oficio.numero
			}
		})
			.then(conflictoNumero => {
				if (conflictoNumero) {
					res.status(400).json({
						status: 'error',
						msg: 'El numero de oficio ya existe.'
					})
				} else {
					next()
				}
			})
	}
}

//validar que los campos no esten vacios
exports.actualizar = (req, res, next) => {
	const oficio = datosOficio(req)
	if (oficio.observaciones == '' || oficio.observaciones == null) {
		delete oficio['observaciones']
	}
	req.oficio = oficio
	const {
		error
	} = Joi.validate(oficio, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		db.oficio.findOne({
			where: {
				numero: oficio.numero,
				idOficio: {
					[Op.ne]: req.params.id
				}
			}
		})
			.then(conflictoNumero => {
				if (conflictoNumero) {
					res.status(400).json({
						status: 'error',
						msg: 'El numero de oficio ya existe.'
					})
				} else {
					next()
				}
			})
	}
}