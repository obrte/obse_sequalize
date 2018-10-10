const BaseJoi = require('joi')
const Extension = require('joi-date-extensions')
const Joi = BaseJoi.extend(Extension)
const fs = require('fs')
const db = require('../config/db')
const Op = db.Sequelize.Op
var moment = require('moment')
const mensajes = require('../customFunction/Mensajes')

const schema = {
	idInforme: Joi.string().required(),
	numero: Joi.string().required(),
	fecha: Joi.date().format('DD-MM-YYYY').required(),
	fechaRecepcion: Joi.date().format('DD-MM-YYYY').required()
}

const datosOficio = (req) => {
	return {
		idInforme: req.body.idInforme,
		numero: req.body.numero.toUpperCase().trim(),
		fecha: req.body.fecha.split('/').join('-'),
		fechaRecepcion: req.body.fechaRecepcion.split('/').join('-')
	}
}

//validar que los campos no esten vacios
exports.guardar = (req, res, next) => {
	const oficio = datosOficio(req)
	const {
		error
	} = Joi.validate(oficio, schema)
	if (error) {
		if (req.file) {
			eliminarArchivo(req.file.path)
		}
		mensajes.switchError(error, res)
	} else {
		db.oficiosInstancia.findOne({
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
						status: 'Fallo',
						msg: 'El numero de oficio ya existe.'
					})
				} else {
					req.oficio = oficio
					if (req.file) {
						req.oficio.pathPdfFile = (req.file.destination + req.file.filename)
					}
					next()
				}
			})
			.catch((err) => {
				if (req.file) {
					eliminarArchivo(req.file.path)
				}
				res.status(400).json({
					status: 'fallo',
					msg: 'Conflicto con los datos en la BD',
					error: err
				})
			})
	}
}

//validar que los campos no esten vacios
exports.actualizar = (req, res, next) => {
	const oficio = datosOficio(req)
	const {
		error
	} = Joi.validate(oficio, schema)
	if (error) {
		if (req.file) {
			eliminarArchivo(req.file.path)
		}
		mensajes.switchError(error, res)
	} else {
		db.oficiosInstancia.findOne({
			where: {
				numero: oficio.numero,
				idOficioInstancia: {
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
			.catch((err) => {
				if (req.file) {
					eliminarArchivo(req.file.path)
				}
				res.status(400).json({
					status: 'fallo',
					msg: 'Conflicto con los datos en la BD',
					error: err
				})
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