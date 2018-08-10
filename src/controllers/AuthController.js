const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../config/db')
const buscar = require('../customFunction/Buscar')
var data

exports.login = (req, res) => {
	db.catUsuarios.findOne({
		where: {
			email: req.body.login.email
		}
	})
		.then(usuario => {
			if (!usuario) {
				return res.status(401).json({
					status: 'Alerta',
					msg: 'El correo electrónico o contraseña no coiciden.'
				})
			}
			bcrypt.compare(req.body.login.password, usuario.password, async (err, result) => {
				if (err) {
					return res.status(401).json({
						status: 'Alerta',
						msg: 'El correo electrónico o contraseña no coiciden.'
					})
				}
				if (result) {
					await datosUsuario(usuario.idUsuario)
					if (data) {
						const token = jwt.sign({
							data
						},
						process.env.JWT_KEY, {
							expiresIn: process.env.expiresIn
						}
						)
						const headerToken = 'Bearer ' + token
						return res.setHeader('Authorization', headerToken),
						res.setHeader('Access-Control-Expose-Headers', 'Authorization'),
						res.status(200).json({
							status: 'success',
							data
						})
					} else {
						return res.status(401).json({
							status: 'Alerta',
							msg: 'Datos del token corruptos.',
							error: err
						})
					}

				}
				return res.status(401).json({
					status: 'Alerta',
					msg: 'El correo electrónico o contraseña no coiciden.'
				})
			})
		})
		.catch((err) => {
			res.status(400).json({
				status: 'Alerta',
				msg: err
			})
		})
}

exports.refrescar = (req, res) => {
	let usuario = req.userData.data
	const tokenNew = jwt.sign({
		usuario
	},
	process.env.JWT_KEY, {
		expiresIn: process.env.expiresIn
	}
	)
	const headerToken = 'Bearer ' + tokenNew
	return res.setHeader('Authorization', headerToken),
	res.setHeader('Access-Control-Expose-Headers', 'Authorization'),
	res.status(200).json({
		status: 'success',
		data: req.userData.data
	})
}

exports.usuario = (req, res) => {
	return res.status(200).json({
		status: 'success',
		data: req.userData.data
	})
}

async function datosUsuario(id) {
	await buscar.usuario(id)
		.then(usuario => {
			try {
				switch (usuario.tipo) {
				case 'superadmin':
					data = {
						idUsuario: usuario.idUsuario,
						nombre: usuario.nombre,
						email: usuario.email,
						roles: usuario.tipo
					}
					break
				case 'administrador':
					data = {
						idUsuario: usuario.idUsuario,
						nombre: usuario.nombre,
						email: usuario.email,
						roles: usuario.tipo,
						organizacion: {
							idOrganizacion: usuario.organizacion.idOrganizacion,
							nombre: usuario.organizacion.nombre
						},
						instancia: {
							idInstancia: usuario.instancia.idInstancia,
							nombre: usuario.instancia.nombre
						}
					}
					break
				default:
					data = {
						idUsuario: usuario.idUsuario,
						nombre: usuario.nombre,
						email: usuario.email,
						roles: usuario.tipo,
						organizacion: {
							idOrganizacion: usuario.organizacion.idOrganizacion,
							nombre: usuario.organizacion.nombre
						},
						instancia: {
							idInstancia: usuario.instancia.idInstancia,
							nombre: usuario.instancia.nombre
						},
						uniAdm: {
							idInstancia: usuario.uniAdm.idUniAdm,
							nombre: usuario.uniAdm.nombre
						}
					}
					break
				}
			} catch (error) {
				data = false
				return data
			}
		})
}