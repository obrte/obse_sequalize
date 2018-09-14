const Joi = require('joi')
// const db = require('../config/db')
// const Op = db.Sequelize.Op
const fs = require('fs')
const mensajes = require('../customFunction/Mensajes')

const schema = {
	idObservacion: Joi.string().required(),
	idOficio: Joi.string().required(),
	idUnidad: Joi.string().required(),
	idUsuario: Joi.string().required(),
	descripcion: Joi.string().required(),
	monto: Joi.number().positive().precision(2),
	estatus: Joi.number().integer(),
	comentarios: Joi.string(),
	esUltimo: Joi.string().required()
}

const datosObservacionLog = (req) => {
	return {
		idObservacion: req.body.idObservacion,
		idOficio: req.body.idOficio,
		idUnidad: req.body.idUnidad,
		idUsuario: req.userData.observacionLog.idUsuario,
		descripcion: req.body.descripcion.toUpperCase().trim(),
		monto: req.body.monto,
		estatus: req.body.estatus,
		comentarios: req.body.comentarios.toUpperCase().trim(),
		esUltimo: req.body.esUltimo
	}
}

//validar que los campos no esten vacios
exports.guardar = (req, res, next) => {
	const observacionLog = datosObservacionLog(req)
	if (observacionLog.monto == '' || observacionLog.monto == null) {
		delete observacionLog['monto']
	}
	if (observacionLog.comentarios == '' || observacionLog.comentarios == null) {
		delete observacionLog['comentarios']
	}
	delete observacionLog['estatus']
	req.observacionLog = observacionLog
	const {
		error
	} = Joi.validate(observacionLog, schema)
	if (error) {
		if (req.file) {
			eliminarArchivo(req.file.path)
		}
		mensajes.switchError(error, res)
	} else {
		req.observacionLog = observacionLog
		if (req.file) {
			req.observacionLog.anexo = (req.file.destination + req.file.filename)
		}
		next()
	}
}

//validar que los campos no esten vacios
exports.actualizar = (req, res, next) => {
	const observacionLog = datosObservacionLog(req)
	if (observacionLog.monto == '' || observacionLog.monto == null) {
		delete observacionLog['monto']
	}
	if (observacionLog.comentarios == '' || observacionLog.comentarios == null) {
		delete observacionLog['comentarios']
	}
	const {
		error
	} = Joi.validate(observacionLog, schema)
	if (error) {
		if (req.file) {
			eliminarArchivo(req.file.path)
		}
		mensajes.switchError(error, res)
	} else {
		req.observacionLog = observacionLog
		if (req.file) {
			req.observacionLog.anexo = (req.file.destination + req.file.filename)
		}
		next()
	}
}

function eliminarArchivo(archivo) {
	fs.stat(archivo, function (err) {
		if (err) return console.error(err)
		fs.unlink(archivo, function (err) {
			if (err) return console.log(err)
		})
	})
}