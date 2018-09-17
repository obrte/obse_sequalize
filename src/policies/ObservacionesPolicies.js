const Joi = require('joi')
const fs = require('fs')
const mensajes = require('../customFunction/Mensajes')

const schema = {
	idInforme: Joi.string().required(),
	numero: Joi.string().required(),
	idOficio: Joi.string().required(),
	idUnidad: Joi.string().required(),
	idUsuario: Joi.string().required(),
	descripcion: Joi.string().required(),
	monto: Joi.number().positive().precision(2),
	estatus: Joi.number().integer(),
	comentarios: Joi.string(),
	esUltimo: Joi.string().required()
}

const datosObservacionTodos = (req) => {
	return {
		idInforme: req.body.idInforme,
		numero: req.body.numero.toUpperCase().trim(),
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

const datosObservacion = (req) => {
	return {
		idInforme: req.body.idInforme,
		numero: req.body.numero.toUpperCase().trim()
	}
}

//validar que los campos no esten vacios
exports.guardar = (req, res, next) => {
	var observacionTodos = datosObservacionTodos(req)
	var observacion = datosObservacion(req)

	if (observacionTodos.monto == '' || observacionTodos.monto == null) {
		delete observacionTodos['monto']
	}
	if (observacionTodos.comentarios == '' || observacionTodos.comentarios == null) {
		delete observacionTodos['comentarios']
	}
	delete observacionTodos['estatus']

	req.observacionLog = observacionTodos
	delete req.observacionLog['idInforme']
	delete req.observacionLog['numero']

	req.observacion = observacion
	req.observacionTodos = observacionTodos

	const {
		error
	} = Joi.validate(observacionTodos, schema)
	if (error) {
		if (req.file) {
			eliminarArchivo(req.file.path)
		}
		mensajes.switchError(error, res)
	} else {
		if (req.file) {
			req.observacionLog.anexo = (req.file.destination + req.file.filename)
		}
		next()
	}
}

//validar que los campos no esten vacios
exports.actualizar = (req, res, next) => {
	var observacionTodos = datosObservacionTodos(req)
	var observacion = datosObservacion(req)

	if (observacionTodos.monto == '' || observacionTodos.monto == null) {
		delete observacionTodos['monto']
	}
	if (observacionTodos.comentarios == '' || observacionTodos.comentarios == null) {
		delete observacionTodos['comentarios']
	}

	req.observacionLog = observacionTodos
	delete req.observacionLog['idInforme']
	delete req.observacionLog['numero']

	req.observacion = observacion
	req.observacionTodos = observacionTodos

	const {
		error
	} = Joi.validate(observacionTodos, schema)
	if (error) {
		if (req.file) {
			eliminarArchivo(req.file.path)
		}
		mensajes.switchError(error, res)
	} else {
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