const jwt = require('jsonwebtoken')

exports.decodificar = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1]
		req.userData = jwt.verify(token, process.env.JWT_KEY)
		next()
	} catch (error) {
		return res.status(401).json({
			message: 'Fallo en Autenticación.'
		})
	}
}