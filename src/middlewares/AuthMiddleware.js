const jwt = require('jsonwebtoken')

exports.decodificar = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1]
		req.userData = jwt.verify(token, process.env.JWT_KEY)
		next()
	} catch (error) {
		return res.status(401).json({
			status: 'InvalidToken',
			msg: 'Fallo en Autenticación.'
		})
	}
}

exports.tokenUrl = (req, res, next) => {
	try {
		const token = req.params.token
		req.userData = jwt.verify(token, process.env.JWT_KEY)
		next()
	} catch (error) {
		return res.status(401).json({
			status: 'InvalidToken',
			msg: 'Fallo en Autenticación.'
		})
	}
}