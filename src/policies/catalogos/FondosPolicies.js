const Joi = require('joi')
const mensajes = require('../../customFunction/Mensajes')
const existe = require('../../customFunction/Existe')

const schema = {
	idOrganizacion: Joi.string().required(),
	nombre: Joi.string().required(),
	origen: Joi.number().integer().required()
}

//validar que los campos no esten vacios
exports.crear = (req, res, next) => {
	const fondo = req.body.fondo
	const {
		error
	} = Joi.validate(fondo, schema)

	if (error) {
		mensajes.switchError(error, res)
	} else {
		existe.idOrganizacion(fondo.idOrganizacion)
			.then(existeID => {
				if (existeID) {
					req.fondo = fondo
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
	const fondo = req.body.fondo
	const id = req.params.id
	continuar(id, fondo)
		.then(() => {
			req.fondo = fondo
			next()

		})
		.catch(err => {
			res.status(400).json({
				status: 'error',
				msg: err.msg
			})
		})
}

const continuar = (id, fondo) => {
	return new Promise((resolve, reject) => {
		existe.idFondo(id)
			.then(existeFondo => {
				if (!existeFondo) {
					const err = {
						msg: 'Fondo no encontrado'
					}
					reject(err)
				} else {
					var llaves = Object.keys(fondo)
					var contador = 1
					llaves.forEach(async (item) => {
						if ((fondo[item] == '') && item != 'activo') {
							const err = {
								msg: 'Debe proporcionar el dato ' + item + '.'
							}
							reject(err)
						} else {
							if ((item == 'idOrganizacion') && (contador < llaves.length)) {
								await existe.idOrganizacion(fondo.idOrganizacion)
									.then(existeId => {
										if (!existeId) {
											const err = {
												msg: 'Organizacion no encontrada'
											}
											reject(err)
										}
									})
								resolve(true)
							} else {
								if ((item == 'activo') && (contador == llaves.length)) {
									resolve(true)
								}
							}
						}
						contador++
					})
				}
			})
	})
}
