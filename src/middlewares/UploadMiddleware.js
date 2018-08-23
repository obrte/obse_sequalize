const multer = require('multer')
const buscar = require('../customFunction/Buscar')
var archivo
var organizacion
var instancia
var ente

exports.cuerpo = (req, res, next) => {
	const cuerpoM = multer().single('adjunto')

	cuerpoM(req, res, (err) => {
		console.log('CUERPO', req.body)
		console.log('CUERPO', req.file)
		if (err) {
			res.json({
				msgs: err
			})
		} else {
			next()
		}
	})
}

exports.upload = async (req, res, next) => {
	console.log('UPLOAD')
	archivo = 'vacio'
	await datosOficio(req.body.idInforme)
	const yr = req.body.fecha.split('/')[2]
	const storage = multer.diskStorage({
		destination: 'src/docs/' + organizacion + '/' + instancia + '/' + yr + '/' + ente,
		filename: 'oficio-' + req.file.originalname
	})
	const fileFilter = (req, file, cb) => {
		console.log('FILTER FILE')
		console.log(file)
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
	}).single(req.file)

	upload(req, res, (err) => {
		console.log('UPLOAD FUNC', req.file)
		if (err) {
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
	await buscar.informe(idInforme)
		.then(async informe => {
			ente = informe.ente.nombre
			instancia = informe.instancia.nombre
			await buscar.instancia(informe.instancia.idInstancia)
				.then(async datosInstancia => {
					organizacion = datosInstancia.organizacion.nombreCorto
					ente = await short(ente)
					instancia = await short(instancia)
				})
				.catch((err) => console.log(err))
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