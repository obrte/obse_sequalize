const Joi = require('joi')
const db = require('../../config/db')
const Op = db.Sequelize.Op
const mensajes = require('../../customFunction/Mensajes')
const bcrypt = require('bcrypt')

const schemaNormal = {
	tipo: Joi.string().required(),
	idOrganizacion: Joi.string().required(),
	idInstancia: Joi.string().required(),
	idUniAdm: Joi.string().required(),
	nombre: Joi.string().required(),
	email: Joi.string().email().required(),
	activo: Joi.number().integer(),
	idUsuarioCreacion: Joi.string().required()
}

const schemaAdministrador = {
	tipo: Joi.string().required(),
	idOrganizacion: Joi.string().required(),
	idInstancia: Joi.string().required(),
	nombre: Joi.string().required(),
	email: Joi.string().email().required(),
	activo: Joi.number().integer(),
	idUsuarioCreacion: Joi.string().required()
}

const schemaSuperAdmin = {
	tipo: Joi.string().required(),
	nombre: Joi.string().required(),
	email: Joi.string().email().required(),
	activo: Joi.number().integer(),
	idUsuarioCreacion: Joi.string()
}

const usuarioNormal = (req) => {
	return {
		tipo: req.body.usuario.tipo.toLowerCase().trim(),
		idOrganizacion: req.body.usuario.idOrganizacion,
		idInstancia: req.body.usuario.idInstancia,
		idUniAdm: req.body.usuario.idUniAdm,
		nombre: req.body.usuario.nombre.toUpperCase().trim(),
		email: req.body.usuario.email.trim(),
		activo: req.body.usuario.activo,
		idUsuarioCreacion: req.body.usuario.idUsuarioCreacion
	}
}

const usuarioAdmin = (req) => {
	return {
		tipo: req.body.usuario.tipo.toLowerCase().trim(),
		idOrganizacion: req.body.usuario.idOrganizacion,
		idInstancia: req.body.usuario.idInstancia,
		nombre: req.body.usuario.nombre.toUpperCase().trim(),
		email: req.body.usuario.email.trim(),
		activo: req.body.usuario.activo,
		idUsuarioCreacion: req.body.usuario.idUsuarioCreacion
	}
}

const usuarioSuperAdmin = (req) => {
	return {
		tipo: req.body.usuario.tipo.toLowerCase().trim(),
		nombre: req.body.usuario.nombre.toUpperCase().trim(),
		email: req.body.usuario.email.trim(),
		activo: req.body.usuario.activo
	}
}

exports.guardar = (req, res, next) => {
	let schema
	let usuario
	if (req.body.usuario.tipo.toLowerCase().trim() == 'superadmin') {
		usuario = usuarioSuperAdmin(req)
		schema = schemaSuperAdmin
	} else {
		if (req.body.usuario.tipo.toLowerCase().trim() == 'administrador') {
			usuario = usuarioAdmin(req)
			schema = schemaAdministrador
		} else {
			usuario = usuarioNormal(req)
			schema = schemaNormal
		}
	}
	const {
		error
	} = Joi.validate(usuario, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		usuario.password = req.body.usuario.password.trim(),
		usuario.rePassword = req.body.usuario.rePassword.trim()
		if (!usuario.password) {
			res.status(400).json({
				status: 'Alerta',
				msg: 'Debe introducir un Password valido.'
			})
		} else {
			if (usuario.password == usuario.rePassword) {
				db.catUsuarios.findOne({
					where: {
						email: usuario.email
					}
				})
					.then(conflictoEmail => {
						if (conflictoEmail) {
							res.status(400).json({
								status: 'Alerta',
								msg: 'El correo ya esta en uso.'
							})
						} else {
							bcrypt.hash(usuario.password, 10, (err, hash) => {
								if (err) {
									return res.status(400).json({
										error: err
									})
								} else {
									usuario.password = hash
									req.usuario = usuario
									next()
								}
							})
						}
					})
					.catch((err) => {
						res.status(400).json({
							status: 'Alerta',
							msg: err
						})
					})
			} else {
				res.status(400).json({
					status: 'Alerta',
					msg: 'Las contraseñas no son iguales.'
				})
			}
		}

	}
}

exports.actualizar = (req, res, next) => {
	let schema
	let usuario
	if (req.body.usuario.tipo.toUpperCase().trim() == 'SUPERADMIN') {
		usuario = usuarioSuperAdmin(req)
		schema = schemaSuperAdmin
	} else {
		if (req.body.usuario.tipo.toUpperCase().trim() == 'ADMINISTRADOR') {
			usuario = usuarioAdmin(req)
			schema = schemaAdministrador
		} else {
			usuario = usuarioNormal(req)
			schema = schemaNormal
		}
	}
	const {
		error
	} = Joi.validate(usuario, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		usuario.password = req.body.usuario.password.trim(),
		usuario.rePassword = req.body.usuario.rePassword.trim()
		req.usuario = usuario
		if (usuario.password == usuario.rePassword) {
			if (!usuario.password) {
				delete req.usuario['password']
			}
			db.catUsuarios.findOne({
				where: {
					email: usuario.email,
					idUsuario: {
						[Op.ne]: req.params.id
					}
				}
			})
				.then(conflictoEmail => {
					if (conflictoEmail) {
						res.status(400).json({
							status: 'Alerta',
							msg: 'El correo ya esta en uso.'
						})
					} else {
						next()
					}
				})
				.catch((err) => {
					res.status(400).json({
						status: 'Alerta',
						msg: err
					})
				})
		} else {
			res.status(400).json({
				status: 'Alerta',
				msg: 'Las contraseñas no son iguales.'
			})
		}
	}
}