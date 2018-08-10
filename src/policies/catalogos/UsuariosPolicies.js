const Joi = require('joi')
const db = require('../../config/db')
const Op = db.Sequelize.Op
const mensajes = require('../../customFunction/Mensajes')
const bcrypt = require('bcrypt')
var schema
var usuario

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
		req.usuario = usuario
		if (!usuario.password) {
			res.status(400).json({
				status: 'Alerta',
				msg: 'Debe introducir un Password valido.'
			})
		} else {
			hashPass(usuario.password, usuario.rePassword)
				.then(hash => {
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
								req.usuario.password = hash
								next()
							}
						})
						.catch((err) => {
							res.status(400).json({
								status: 'Alerta',
								msg: err
							})
						})
				})
				.catch(msg => {
					res.status(400).json({
						msg
					})
				})
		}
	}
}

exports.actualizar = (req, res, next) => {
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
		if (usuario.password == null) {
			emailValido(req.params.id, usuario.email)
				.then(() => {
					next()
				})
				.catch(msg => {
					res.status(400).json({
						msg
					})
				})
		} else {
			hashPass(usuario.password, usuario.rePassword)
				.then(hash => {
					emailValido(req.params.id, usuario.email)
						.then(() => {
							req.usuario.password = hash
							next()
						})
						.catch(msg => {
							res.status(400).json({
								msg
							})
						})
				})
				.catch(msg => {
					res.status(400).json({
						msg
					})
				})
		}
	}
}

function emailValido(id, correo) {
	return new Promise((resolve, reject) => {
		db.catUsuarios.findOne({
			where: {
				email: correo,
				idUsuario: {
					[Op.ne]: id
				}
			}
		})
			.then(conflictoEmail => {
				if (conflictoEmail) {
					reject({
						status: 'Alerta',
						msg: 'El correo ya esta en uso.'
					})
				} else {
					resolve(true)
				}
			})
			.catch((err) => {
				reject({
					status: 'Alerta',
					msg: err
				})
			})
	})
}

function hashPass(password, rePassword) {
	return new Promise((resolve, reject) => {
		if (password == rePassword) {
			bcrypt.hash(password, 10, (err, hash) => {
				if (err) {
					reject({
						msg: err
					})
				} else {
					resolve(hash)
				}
			})
		} else {
			reject({
				status: 'Alerta',
				msg: 'Las contraseñas no son iguales.'
			})
		}
	})
}