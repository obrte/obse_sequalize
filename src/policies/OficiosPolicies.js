const BaseJoi = require('joi')
const Extension = require('joi-date-extensions')
const fs = require('fs')
const Joi = BaseJoi.extend(Extension)
const db = require('../config/db')
const Op = db.Sequelize.Op
var moment = require('moment')
const mensajes = require('../customFunction/Mensajes')

const schema = {
	idInforme: Joi.string().required(),
	numero: Joi.string().required(),
	fecha: Joi.date().format('DD-MM-YYYY'),
	fechaRecepcion: Joi.date().format('DD-MM-YYYY'),
	fechaVencimiento: Joi.date().format('DD-MM-YYYY'),
	observaciones: Joi.string(),
	notificaResultados: Joi.number().integer()
}

const datosOficio = (req) => {
	return {
		idInforme: req.body.idInforme,
		numero: req.body.numero.toUpperCase().trim(),
		fecha: req.body.fecha.split('/').join('-'),
		fechaRecepcion: req.body.fechaRecepcion.split('/').join('-'),
		fechaVencimiento: req.body.fechaVencimiento.split('/').join('-'),
		observaciones: req.body.observaciones.toUpperCase().trim(),
		notificaResultados: req.body.notificaResultados.toUpperCase().trim()
	}
}

exports.test = (req, res, next) => {
	console.log('POLICIES')
	req.oficio = req.body
	// if (req.file) {
	// 	req.oficio.pathPdfFile = (req.file.destination + req.file.filename).replace('src', '')
	// }
	console.log(req.oficio.fecha)
	req.oficio.fecha = req.oficio.fecha.split('/').join('-')
	console.log(req.oficio.fecha)
	eliminarArchivo(req.file.path)
	next()
}

//validar que los campos no esten vacios
exports.guardar = (req, res, next) => {
	const oficio = datosOficio(req)
	if (oficio.observaciones == '' || oficio.observaciones == null) {
		delete oficio['observaciones']
	}
	const {
		error
	} = Joi.validate(oficio, schema)
	if (error) {
		if (req.file) {
			eliminarArchivo(req.file.path)
		}
		mensajes.switchError(error, res)
	} else {
		db.oficios.findOne({
			where: {
				numero: oficio.numero
			}
		})
			.then(conflictoNumero => {
				fechas(oficio)
				if (conflictoNumero) {
					if (req.file) {
						eliminarArchivo(req.file.path)
					}
					res.status(400).json({
						status: 'error',
						msg: 'El numero de oficio ya existe.'
					})
				} else {
					req.oficio = oficio
					if (req.file) {
						req.oficio.pathPdfFile = (req.file.destination + req.file.filename).replace('src', '')
					}
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
	const {
		error
	} = Joi.validate(oficio, schema)
	if (error) {
		if (req.file) {
			eliminarArchivo(req.file.path)
		}
		mensajes.switchError(error, res)
	} else {
		db.oficios.findOne({
			where: {
				numero: oficio.numero,
				idOficio: {
					[Op.ne]: req.params.id
				}
			}
		})
			.then(conflictoNumero => {
				fechas(oficio)
				if (conflictoNumero) {
					if (req.file) {
						eliminarArchivo(req.file.path)
					}
					res.status(400).json({
						status: 'error',
						msg: 'El numero de oficio ya existe.'
					})
				} else {
					req.oficio = oficio
					if (req.file) {
						req.oficio.pathPdfFile = (req.file.destination + req.file.filename).replace('src', '')
					}
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

function fechas(oficio) {
	oficio.fecha = moment(oficio.fecha, 'DD-MM-YYYY')
	oficio.fechaRecepcion = moment(oficio.fechaRecepcion, 'DD-MM-YYYY')
	oficio.fechaVencimiento = moment(oficio.fechaVencimiento, 'DD-MM-YYYY')
}