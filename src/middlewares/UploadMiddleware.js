const multer = require('multer')
const buscar = require('../customFunction/Buscar')
const mkdirp = require('mkdirp')
var moment = require('moment')
var archivo = 'vacio'
var organizacion
var instancia
var ente

exports.cuerpo = (req, res, next) => {
	const storageA = multer.diskStorage({
		destination: async function(req, file, cb) {
			await datosOficio(req.body.idInforme)
			var rut = 'src/docs/' + req.body.carpetaA + '/' + req.body.carpetaB + '/'
			mkdirp(rut, err => cb(err, rut))
		},
		filename: function(req, file, cb) {
			cb(null, 'oficio' + '-' + file.originalname)
		}
	})
	const fileFilterA = (req, file, cb) => {
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
	const uploadA = multer({
		storage: storageA,
		fileFilter: fileFilterA
	}).single('adjunto')

	uploadA(req, res, err => {
		if (err) {
			res.json({
				msgs: err
			})
		} else {
			next()
		}
	})
}

exports.upload = (req, res, next) => {
	console.log('UPLOAD')
	var fecha = moment().format('YYYY-MM-DD HH:mm:ss')
	const storage = multer.diskStorage({
		destination: async function(req, file, cb) {
			await datosOficio(req.body.idInforme)
			const yr = req.body.fecha.split('/')[2]
			var ruta =
				'src/docs/' + organizacion + '/' + instancia + '/' + yr + '/' + ente
			mkdirp(ruta, err => cb(err, ruta))
		},
		filename: function(req, file, cb) {
			cb(null, fecha + '-' + 'oficio' + '-' + file.originalname)
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
		console.log('Antes IFFFF')
		console.log(err)
		if (err) {
			archivo = 'vacio'
			res.json({
				msg: err
			})
		} else {
			console.log('UPLOAD ESLEEEEEEEEEEEEE')
			console.log(archivo)
			switch (archivo) {
			case 'ok':
				archivo = 'vacio'
				req.oficio.pathPdfFile = req.file.path
				next()
				break
			case 'fallo':
				archivo = 'vacio'
				res.json({
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
	await buscar.informe(idInforme).then(async datosInforme => {
		ente = datosInforme.ente.nombre
		instancia = datosInforme.instancia.nombre
		await buscar
			.instancia(datosInforme.instancia.idInstancia)
			.then(async datosInstancia => {
				organizacion = datosInstancia.organizacion.nombreCorto
				ente = await short(ente)
				instancia = await short(instancia)
			})
			.catch(err => console.log(err))
	})
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
