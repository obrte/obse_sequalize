const Joi = require('joi')
const fs = require('fs')
const db = require('../config/db')
const Op = db.Sequelize.Op
const mensajes = require('../customFunction/Mensajes')

const schema = {
	idInforme: Joi.string().required(),
	numero: Joi.string().required(),
	idOficio: Joi.string().required(),
	idUnidad: Joi.string().required(),
	idUsuario: Joi.string().required(),
	descripcion: Joi.string().required(),
	monto: Joi.number().precision(2),
	estatus: Joi.number().integer(),
	comentarios: Joi.string(),
	esUltimo: Joi.string()
}

const datosObservacionTodos = (req) => {
	return {
		idInforme: req.body.idInforme,
		numero: req.body.numero.toUpperCase().trim(),
		idOficio: req.body.idOficio,
		idUnidad: req.body.idUnidad,
		idUsuario: req.userData.data.idUsuario,
		descripcion: req.body.descripcion.toUpperCase().trim(),
		estatus: req.body.estatus,
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

	if (req.body.monto) observacionTodos.monto = req.body.monto
	if (req.body.comentarios) observacionTodos.comentarios = req.body.comentarios.toUpperCase().trim()

	const {
		error
	} = Joi.validate(observacionTodos, schema)
	if (error) {
		if (req.file) {
			eliminarArchivo(req.file.path)
		}
		mensajes.switchError(error, res)
	} else {
		req.observacionLog = observacionTodos
		delete req.observacionLog['idInforme']
		delete req.observacionLog['numero']
		req.observacion = observacion
		if (req.file) {
			req.observacionLog.anexo = (req.file.destination + req.file.filename)
		}
		db.observaciones.find({
			where: {
				numero: observacion.numero
			}
		})
			.then(conflictoNumero => {
				if (conflictoNumero) {
					res.status(400).json({
						status: 'error',
						msg: 'El número de Observacion ya existe.'
					})
				} else {
					next()
				}
			})
	}
}

//validar que los campos no esten vacios
exports.actualizar = (req, res, next) => {
	var observacionTodos = datosObservacionTodos(req)
	var observacion = datosObservacion(req)

	if (req.body.monto) observacionTodos.monto = req.body.monto
	if (req.body.comentarios) observacionTodos.comentarios = req.body.comentarios.toUpperCase().trim()

	const {
		error
	} = Joi.validate(observacionTodos, schema)
	if (error) {
		if (req.file) {
			eliminarArchivo(req.file.path)
		}
		mensajes.switchError(error, res)
	} else {
		req.observacionLog = observacionTodos
		delete req.observacionLog['idInforme']
		delete req.observacionLog['numero']
		req.observacion = observacion
		if (req.file) {
			req.observacionLog.anexo = (req.file.destination + req.file.filename)
		}
		db.observaciones.find({
			where: {
				numero: observacion.numero,
				idObservacion: {
					[Op.ne]: req.params.id
				}
			}
		})
			.then(conflictoNumero => {
				if (conflictoNumero) {
					res.status(400).json({
						status: 'error',
						msg: 'El número de Observacion ya existe.'
					})
				} else {
					next()
				}
			})
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