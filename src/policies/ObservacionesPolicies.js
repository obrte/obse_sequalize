const Joi = require('joi')
// const db = require('../config/db')
const mensajes = require('../customFunction/Mensajes')

const schema = {
	idInforme: Joi.string().required(),
	numero: Joi.string().required()
}

const datosObservacion = (req) => {
	return {
		idInforme: req.body.observacion.idInforme,
		numero: req.body.observacion.numero.toUpperCase().trim(),
	}
}

//validar que los campos no esten vacios
exports.guardar = (req, res, next) => {
	const observacion = datosObservacion(req)
	const {
		error
	} = Joi.validate(observacion, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		req.observacion = observacion
		next()
	}
}

//validar que los campos no esten vacios
exports.actualizar = (req, res, next) => {
	const observacion = datosObservacion(req)
	const {
		error
	} = Joi.validate(observacion, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		req.observacion = observacion
		next()
	}
}