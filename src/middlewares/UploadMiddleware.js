const multer = require('multer')
const buscar = require('../customFunction/Buscar')
const mkdirp = require('mkdirp')
const db = require('../config/db')
var moment = require('moment')
var archivo = 'vacio'
var msgError = ''
var organizacion
var instancia
var ente
var ruta
var yr

exports.upload = (req, res, next) => {
	const fecha = moment().format('YYYY-MM-DD HH:mm:ss').split('-').join('').split(':').join('').replace(' ', '')
	const storage = multer.diskStorage({
		destination: async function (req, file, cb) {
			await datosOficio(req.body.idInforme)
			yr = req.body.fecha.split('/')[2]
			ruta = 'public/' + organizacion + '/' + instancia + '/' + yr + '/' + ente + '/'
			mkdirp(ruta, err => cb(err, ruta))
		},
		filename: function (req, file, cb) {
			cb(null, fecha + '-' + file.originalname)
		}
	})
	const fileFilter = (req, file, cb) => {
		if (file) {
			if (file.mimetype === 'application/pdf') {
				archivo = 'ok'
				cb(null, true)
			} else {
				archivo = 'fallo'
				cb(null, false)
			}
		}
	}
	const upload = multer({
		storage: storage,
		fileFilter: fileFilter
	}).single('adjunto')

	upload(req, res, err => {
		if (err || msgError) {
			archivo = 'vacio'
			var msgE = msgError
			msgError = ''
			res.status(409).json({
				msg: err ? err + msgE : msgE
			})
		} else {
			switch (archivo) {
			case 'ok':
				archivo = 'vacio'
				next()
				break
			case 'fallo':
				archivo = 'vacio'
				res.status(400).json({
					msg: 'Tipo de archivo no valido.'
				})
				break
			default:
				next()
				break
			}
		}
	})
}

exports.anexo = (req, res, next) => {
	const fecha = moment().format('YYYY-MM-DD HH:mm:ss').split('-').join('').split(':').join('').replace(' ', '')
	const storage = multer.diskStorage({
		destination: async function (req, file, cb) {
			await datosAnexo(req.body.idObservacion)
			ruta = 'public/' + organizacion + '/' + instancia + '/' + yr + '/' + ente + '/'
			mkdirp(ruta, err => cb(err, ruta))
		},
		filename: function (req, file, cb) {
			cb(null, fecha + '-' + file.originalname)
		}
	})
	const fileFilter = (req, file, cb) => {
		if (file) {
			if (file.mimetype === 'application/pdf') {
				archivo = 'ok'
				cb(null, true)
			} else {
				archivo = 'fallo'
				cb(null, false)
			}
		}
	}
	const upload = multer({
		storage: storage,
		fileFilter: fileFilter
	}).single('adjunto')

	upload(req, res, err => {
		if (err || msgError) {
			archivo = 'vacio'
			var msgE = msgError
			msgError = ''
			res.status(409).json({
				msg: err ? err + msgE : msgE
			})
		} else {
			switch (archivo) {
			case 'ok':
				archivo = 'vacio'
				next()
				break
			case 'fallo':
				archivo = 'vacio'
				res.status(400).json({
					msg: 'Tipo de archivo no valido.'
				})
				break
			default:
				next()
				break
			}
		}
	})
}

async function datosOficio(idInforme) {
	await buscar.informe(idInforme)
		.then(async datosInforme => {
			ente = datosInforme.ente.nombre
			instancia = datosInforme.instancia.nombre
			await buscar
				.instancia(datosInforme.instancia.idInstancia)
				.then(async datosInstancia => {
					organizacion = datosInstancia.organizacion.nombreCorto
					ente = await short(ente)
					instancia = await short(instancia)
				})
				.catch((err) => msgError = 'No se puede obtener el directorio destino del archivo, ' + err)
		})
		.catch((err) => msgError = 'No se puede obtener el directorio destino del archivo, ' + err)
}

async function datosAnexo(idInforme) {
	await buscar.informe(idInforme)
		.then(async datosInforme => {
			ente = datosInforme.ente.nombre
			instancia = datosInforme.instancia.nombre

			await db.oficios.find({
				where: {
					idInforme: datosInforme.idInforme,
					esUltimo: 1
				}
			})
				.then(async oficio => {
					yr = oficio.fecha.split('-')[0]
					await buscar.instancia(datosInforme.instancia.idInstancia)
						.then(async datosInstancia => {
							organizacion = datosInstancia.organizacion.nombreCorto
							ente = await short(ente)
							instancia = await short(instancia)
						})
						.catch((err) => msgError = 'No se puede obtener el directorio destino del archivo, ' + err)
				})
				.catch((err) => msgError = 'No se puede obtener el directorio destino del archivo, ' + err)
		})
		.catch((err) => msgError = 'No se puede obtener el directorio destino del archivo, ' + err)
}

function short(nombre) {
	if (nombre.split(' ').length > 1) {
		var arr = nombre.split(' ')
		nombre = ''
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].length > 2) {
				nombre += arr[i].charAt(0)
			}
		}
	}
	return nombre
}