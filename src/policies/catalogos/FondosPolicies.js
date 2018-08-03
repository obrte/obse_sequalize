const Joi = require('joi')
const db = require('../../config/db')
const Op = db.Sequelize.Op
const mensajes = require('../../customFunction/Mensajes')

const schema = {
	idOrganizacion: Joi.string().required(),
	nombre: Joi.string().required(),
	origen: Joi.number().integer().required(),
	activo: Joi.number().integer()
}

const datosFondo = (req) => {
	return {
		idOrganizacion: req.body.fondo.idOrganizacion,
		nombre: req.body.fondo.nombre.toUpperCase().trim(),
		origen: req.body.fondo.origen,
		activo: req.body.fondo.activo
	}
}

//validar que los campos no esten vacios
exports.guardar = (req, res, next) => {
	const fondo = datosFondo(req)
	req.fondo = fondo
	const {
		error
	} = Joi.validate(fondo, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		db.catFondos.findOne({
			where: {
				idOrganizacion: fondo.idOrganizacion,
				nombre: fondo.nombre,
				origen: fondo.origen
			}
		})
			.then(conflictoFondo => {
				if (conflictoFondo) {
					res.status(400).json({
						status: 'error',
						msg: 'Ya existe un nombre de Fondo con el mismo Origen en esta organización.'
					})
				} else {
					next()
				}
			})
	}
}

//validar que los campos no esten vacios
exports.actualizar = (req, res, next) => {
	const fondo = datosFondo(req)
	req.fondo = fondo
	const {
		error
	} = Joi.validate(fondo, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		console.log(fondo)
		db.catFondos.findOne({
			where: {
				idOrganizacion: fondo.idOrganizacion,
				nombre: fondo.nombre,
				origen: fondo.origen,
				idFondo: {
					[Op.ne]: req.params.id
				}
			}
		})
			.then(conflictoFondo => {
				if (conflictoFondo) {
					res.status(400).json({
						status: 'error',
						msg: 'Ya existe un nombre de Fondo con el mismo Origen en esta organización.'
					})
				} else {
					next()
				}
			})
	}

}