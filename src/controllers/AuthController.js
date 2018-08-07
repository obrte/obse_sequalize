const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../config/db')

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
					msg: '1 El correo electrónico o contraseña no coiciden.'
				})
			}
			bcrypt.compare(req.body.login.password, usuario.password, (err, result) => {
				if (err) {
					return res.status(401).json({
						status: 'Alerta',
						msg: '2 El correo electrónico o contraseña no coiciden.'
					})
				}
				if (result) {
					const token = jwt.sign({
						idUsuario: usuario.idUsuario,
						nombre: usuario.nombre,
						email: usuario.email,
						tipo: usuario.tipo
					},
					process.env.JWT_KEY, {
						//expiresIn: '1h' = 1hr / es igual que 60 * 60
						expiresIn: process.env.expiresIn
					}
					)
					const headerToken = 'Bearer ' + token
					const datos = {
						nombre: usuario.nombre,
						tipo: usuario.tipo
					}
					return res.setHeader('Authorization', headerToken),
					res.setHeader('Access-Control-Expose-Headers', 'Authorization'),
					res.status(200).json({
						status: 'success',
						datos
					})
				}
				return res.status(401).json({
					status: 'Alerta',
					msg: '3 El correo electrónico o contraseña no coiciden.'
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
	const tokenNew = jwt.sign({
		idUsuario: req.userData.idUsuario,
		nombre: req.userData.nombre,
		email: req.userData.email,
		tipo: req.userData.tipo
	},
	process.env.JWT_KEY, {
		expiresIn: process.env.expiresIn
	}
	)
	const headerToken = 'Bearer ' + tokenNew
	return res.setHeader('Authorization', headerToken),
	res.setHeader('Access-Control-Expose-Headers', 'Authorization'),
	res.status(200).json({
		status: 'success'
	})
}

exports.token = (req, res) => {
	return res.status(200).json({
		status: 'success',
		datos: {
			idUsuario: req.userData.idUsuario,
			nombre: req.userData.nombre,
			email: req.userData.email,
			tipo: req.userData.tipo
		}
	})
}