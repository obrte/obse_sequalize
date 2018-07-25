const switchError = (error, res) => {
	switch (error.details[0].context.key) {
	case 'idOrganizacion':
		res.status(400).json({
			status: 'error',
			msg: 'Debe introducir la organizacion.'
		})
		break
	case 'idInstancia':
		res.status(400).json({
			status: 'error',
			msg: 'Debe introducir la instancia.'
		})
		break
	case 'idEnte':
		res.status(400).json({
			status: 'error',
			msg: 'Debe introducir el ente.'
		})
		break
	case 'idUniadm':
		res.status(400).json({
			status: 'error',
			msg: 'Debe introducir la Unidad Administrativa'
		})
		break
	case 'nombre':
		res.status(400).json({
			status: 'error',
			msg: 'Debe introducir un nombre.'
		})
		break
	case 'email':
		res.status(400).json({
			status: 'error',
			msg: 'Debe introducir un correo.'
		})
		break
	case 'password':
		res.status(400).json({
			status: 'error',
			msg: 'Debe introducir un password.'
		})
		break
	case 'activo':
		res.status(400).json({
			status: 'error',
			msg: 'Debe proporcionar el campo activo.'
		})
		break
	case 'idUsuarioCreacion':
		res.status(400).json({
			status: 'error',
			msg: 'Debe introducir un idUsuarioCreacion.'
		})
		break
	case 'nombreCorto':
		res.status(400).json({
			status: 'error',
			msg: 'Debe introducir un nombre corto.'
		})
		break
	case 'origen':
		res.status(400).json({
			status: 'error',
			msg: 'Debe proporcionar el origen.'
		})
		break
	default:
		res.status(500).json({
			status: 'error',
			msg: 'No se encontraron un caso para este error.'
		})
		break
	}
}



const mensajes = {}

mensajes.switchError = switchError

module.exports = mensajes