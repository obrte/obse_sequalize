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

//validar que los campos no esten vacios
exports.guardar = (req, res, next) => {
	const {
		error
	} = Joi.validate(req.body.fondo, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		db.catFondos.findOne({
			where: {
				idOrganizacion: req.body.fondo.idOrganizacion,
				nombre: req.body.fondo.nombre,
				origen: req.body.fondo.origen
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
	const {
		error
	} = Joi.validate(req.body.fondo, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		db.catFondos.findOne({
			where: {
				idOrganizacion: req.body.fondo.idOrganizacion,
				nombre: req.body.fondo.nombre,
				origen: req.body.fondo.origen
			},
			idFondo: {
				[Op.ne]: req.params.id
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
