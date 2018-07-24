const Joi = require('joi')
const mensajes = require('../../customFunction/Mensajes')
const existe = require('../../customFunction/Existe')

const schema = {
	idOrganizacion: Joi.string().required(),
	nombre: Joi.string().required(),
	origen: Joi.number().integer().required()
}

//validar que los campos no esten vacios
exports.guardar = (req, res, next) => {
	const {
		error
	} = Joi.validate(req.body.fondo, schema)

	if (error) {
		mensajes.switchError(error, res)
	} else {
		existe.idOrganizacion(req.body.fondo.idOrganizacion)
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
	}
}

//validar que los campos no esten vacios
exports.actualizar = (req, res, next) => {
	existe.idFondo(req.params.id)
		.then(existeFondo => {
			if (!existeFondo) {
				res.status(400).json({
					status: 'error',
					msg: 'Fondo no encontrado.'
				})
			} else {
				var llaves = Object.keys(req.body.fondo)
				var contador = 1
				llaves.forEach(async (item) => {
					if ((req.body.fondo[item] == '') && item != 'activo') {
						res.status(400).json({
							status: 'error',
							msg: 'Debe proporcionar el dato ' + item + '.'
						})
					} else {
						if ((item == 'idOrganizacion') && (contador < llaves.length)) {
							await existe.idOrganizacion(req.body.fondo.idOrganizacion)
								.then(existeId => {
									if (!existeId) {
										res.status(400).json({
											status: 'error',
											msg: 'Organizacion no encontrada.'
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
			}
		})
}
