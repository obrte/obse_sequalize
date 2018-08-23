const Joi = require('joi')
const db = require('../config/db')
const Op = db.Sequelize.Op
const mensajes = require('../customFunction/Mensajes')

const schema = {
	idUsuarioCreacion: Joi.string().required(),
	idEnte: Joi.string().required(),
	idFondo: Joi.string(),
	idInstancia: Joi.string().required(),
	ejercicio: Joi.number().integer().required(),
	delMes: Joi.string().required(),
	alMes: Joi.string().required(),
	numero: Joi.string().required(),
	numeroAuditoria: Joi.string().required(),
	nombre: Joi.string().required(),
	activo: Joi.number().integer()
}

const datosInforme = (req) => {
	return {
		idUsuarioCreacion: req.userData.data.idUsuario,
		idEnte: req.body.informe.idEnte,
		idFondo: req.body.informe.idFondo,
		idInstancia: req.body.informe.idInstancia,
		ejercicio: req.body.informe.ejercicio,
		delMes: req.body.informe.delMes.toUpperCase().trim(),
		alMes: req.body.informe.alMes.toUpperCase().trim(),
		numero: req.body.informe.numero.toUpperCase().trim(),
		numeroAuditoria: req.body.informe.numeroAuditoria.trim(),
		nombre: req.body.informe.nombre.toUpperCase().trim(),
		activo: req.body.informe.activo
	}
}

//validar que los campos no esten vacios
exports.guardar = (req, res, next) => {
	const informe = datosInforme(req)
	if (informe.idFondo == '' || informe.idFondo == null) {
		delete informe['idFondo']
	}
	req.informe = informe
	const {
		error
	} = Joi.validate(informe, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		db.informes.findOne({
			where: {
				[Op.or]: [{
					nombre: informe.nombre,
					idEnte: informe.idEnte
				},
				{
					numeroAuditoria: informe.numeroAuditoria,
					idEnte: informe.idEnte
				}
				]
			}
		})
			.then(conflictoNombre => {
				if (conflictoNombre) {
					res.status(400).json({
						status: 'error',
						msg: 'El nombre o número de auditoría ya existe.'
					})
				} else {
					next()
				}
			})
	}
}

//validar que los campos no esten vacios
exports.actualizar = (req, res, next) => {
	const informe = datosInforme(req)
	if (informe.idFondo == '' || informe.idFondo == null) {
		delete informe['idFondo']
	}
	req.informe = informe
	const {
		error
	} = Joi.validate(informe, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		db.informes.findOne({
			where: {
				[Op.or]: [{
					nombre: informe.nombre,
					idEnte: informe.idEnte
				},
				{
					numeroAuditoria: informe.numeroAuditoria,
					idEnte: informe.idEnte
				}
				],
				idInforme: {
					[Op.ne]: req.params.id
				}
			}
		})
			.then(conflictoNombre => {
				if (conflictoNombre) {
					res.status(400).json({
						status: 'error',
						msg: 'El nombre o número de auditoría ya existe.'
					})
				} else {
					next()
				}
			})
	}
}