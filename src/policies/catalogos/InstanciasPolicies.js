const Joi = require('joi')
const mensajes = require('../../customFunction/Mensajes')
const existe = require('../../customFunction/Existe')

const schema = {
	idOrganizacion: Joi.string().required(),
	nombre: Joi.string().required()
}

//validar que los campos no esten vacios
exports.crear = (req, res, next) => {
	const instancia = req.body.instancia
	const {
		error
	} = Joi.validate(instancia, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		const id = instancia.idOrganizacion
		existe.idOrganizacion(id)
			.then(existeID => {
				if (existeID) {
					req.instancia = instancia
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
	const instancia = req.body.instancia
	existe.idInstancia(req.params.id)
		.then(existeId => {
			if (existeId) {
				var llaves = Object.keys(instancia)
				var contador = 1
				llaves.forEach(async (item) => {
					if ((instancia[item] == '') && item != 'activo') {
						res.status(400).json({
							status: 'error',
							msg: 'Debe proporcionar el dato ' + item + '.'
						})
					} else {
						if ((item == 'idOrganizacion') && (contador < llaves.length)) {
							await existe.idOrganizacion(instancia.idOrganizacion)
								.then(existeId => {
									if (!existeId) {
										res.status(400).json({
											status: 'error',
											msg: 'Organizacion no encontrada'
										})
									}
								})
						} else {
							if ((item == 'activo') || (contador == llaves.length)) {
								req.instancia = instancia
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