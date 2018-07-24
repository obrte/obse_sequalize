const Joi = require('joi')
const mensajes = require('../../customFunction/Mensajes')
const existe = require('../../customFunction/Existe')

const schema = {
	idOrganizacion: Joi.string().required(),
	nombre: Joi.string().required()
}

//validar que los campos no esten vacios
exports.guardar = (req, res, next) => {
	const {
		error
	} = Joi.validate(req.body.instancia, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		existe.idOrganizacion(req.body.instancia.idOrganizacion)
			.then(existeID => {
				if (existeID) {
					next()
				} else {
					res.status(400).json({
						status: 'error',
						msg: 'Organización no encontrada'
					})
				}
			})
			.catch(err => {
				console.log(err)
				res.status(400).json({
					status: 'error',
					msg: err
				})
			})
	}
}

//validar que los campos no esten vacios
exports.actualizar = (req, res, next) => {
	existe.idInstancia(req.params.id)
		.then(existeId => {
			if (existeId) {
				var llaves = Object.keys(req.body.instancia)
				var contador = 1
				llaves.forEach(async (item) => {
					if ((req.body.instancia[item] == '') && item != 'activo') {
						res.status(400).json({
							status: 'error',
							msg: 'Debe proporcionar el dato ' + item + '.'
						})
					} else {
						if ((item == 'idOrganizacion') && (contador < llaves.length)) {
							await existe.idOrganizacion(req.body.instancia.idOrganizacion)
								.then(existeId => {
									if (!existeId) {
										res.status(400).json({
											status: 'error',
											msg: 'Organizacion no encontrada'
										})
									}
								})
						} else {
							if (contador == llaves.length) {
								next()
							}
						}
					}
					contador++
				})
			} else {
				res.status(400).json({
					status: 'error',
					msg: 'Instancia no encontrada'
				})
			}
		})
}