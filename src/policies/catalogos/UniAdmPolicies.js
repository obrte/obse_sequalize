const Joi = require('joi')
const db = require('../../config/db')
const Op = db.Sequelize.Op
const mensajes = require('../../customFunction/Mensajes')

const schema = {
	idInstancia: Joi.string().required(),
	nombre: Joi.string().required(),
	activo: Joi.number().integer()
}

const datosUniAdm = (req) => {
	return {
		idInstancia: req.body.uniAdm.idInstancia,
		nombre: req.body.uniAdm.nombre,
		activo: req.body.uniAdm.activo
	}
}

//validar que los campos no esten vacios
exports.guardar = (req, res, next) => {
	const uniAdm = datosUniAdm(req)
	const {
		error
	} = Joi.validate(uniAdm, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		db.catUniAdm.findOne({
			where: {
				idInstancia: uniAdm.idInstancia,
				nombre: uniAdm.nombre
			}
		})
			.then(conflictoNombre => {
				if (conflictoNombre) {
					res.status(400).json({
						status: 'error',
						msg: 'La Unidad Administrativa ya existe en esta Instancia.'
					})
				} else {
					next()
				}
			})
	}
}

//validar que los campos no esten vacios
exports.actualizar = (req, res, next) => {
	const uniAdm = datosUniAdm(req)
	const {
		error
	} = Joi.validate(uniAdm, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		db.catUniAdm.findOne({
			where: {
				idInstancia: uniAdm.idOrganizacion,
				nombre: uniAdm.nombre,
				idUniAdm: {
					[Op.ne]: req.params.id
				}
			}
		})
			.then(conflictoNombre => {
				if (conflictoNombre) {
					res.status(400).json({
						status: 'error',
						msg: 'El nombre de la Unidad Administrativa ya existe en esta Instancia.'
					})
				} else {
					next()
				}
			})
	}
}