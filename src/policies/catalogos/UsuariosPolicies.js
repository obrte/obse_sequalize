const Joi = require('joi')
const db = require('../../config/db')
const Op = db.Sequelize.Op
const mensajes = require('../../customFunction/Mensajes')
const bcrypt = require('bcrypt')
var usuario

const schema = {
	tipo: Joi.string().required(),
	idOrganizacion: Joi.string(),
	idInstancia: Joi.string(),
	idUniAdm: Joi.string(),
	nombre: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(8),
	rePassword: Joi.any().valid(Joi.ref('password')),
	activo: Joi.number().integer(),
	idUsuarioCreacion: Joi.string().required()
}

const usuarioBody = req => {
	return {
		idOrganizacion: req.body.usuario.idOrganizacion,
		idInstancia: req.body.usuario.idInstancia,
		idUniAdm: req.body.usuario.idUniAdm,
		email: req.body.usuario.email.trim(),
		password: req.body.usuario.password,
		rePassword: req.body.usuario.rePassword,
		activo: req.body.usuario.activo,
		idUsuarioCreacion: req.userData.data.idUsuario
	}
}

exports.guardar = (req, res, next) => {
	usuario = usuarioBody(req)
	usuario.tipo = req.body.usuario.tipo.toLowerCase().trim()
	usuario.nombre = req.body.usuario.nombre.toUpperCase().trim()
	if (usuario.idUniAdm == undefined) usuario.idUniAdm = ''
	if (usuario.tipo == 'superadmin') {
		delete usuario['idOrganizacion']
		delete usuario['idInstancia']
		delete usuario['idUniAdm']
	} else {
		if (usuario.tipo == 'administrador') {
			delete usuario['idUniAdm']
		}
	}
	req.usuario = usuario
	const {
		error
	} = Joi.validate(usuario, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		hashPass(usuario.password, usuario.rePassword)
			.then(hash => {
				db.catUsuarios
					.findOne({
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
					.catch(err => {
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

exports.actualizar = (req, res, next) => {
	usuario = usuarioBody(req)
	usuario.tipo = req.body.usuario.tipo.toLowerCase().trim()
	usuario.nombre = req.body.usuario.nombre.toUpperCase().trim()
	if (usuario.tipo == 'superadmin') {
		delete usuario['idOrganizacion']
		delete usuario['idInstancia']
		delete usuario['idUniAdm']
	} else {
		if (usuario.tipo == 'administrador') {
			delete usuario['idUniAdm']
		}
	}
	if (usuario.password == null || usuario.password == '') {
		delete usuario['password']
		delete usuario['rePassword']
	}
	console.log(usuario)
	req.usuario = usuario
	const {
		error
	} = Joi.validate(usuario, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
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
		db.catUsuarios
			.findOne({
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
			.catch(err => {
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