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
	case 'idFondo':
		res.status(400).json({
			status: 'error',
			msg: 'Debe introducir el Fondo.'
		})
		break
	case 'idUniAdm':
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
			msg: 'Debe introducir un password valido.'
		})
		break
	case 'rePassword':
		res.status(400).json({
			status: 'error',
			msg: 'Las contraseñas no coinciden.'
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
	case 'ejercicio':
		res.status(400).json({
			status: 'error',
			msg: 'Debe proporcionar el ejercicio.'
		})
		break
	case 'delMes':
		res.status(400).json({
			status: 'error',
			msg: 'Debe proporcionar el mes de Inicio.'
		})
		break
	case 'alMes':
		res.status(400).json({
			status: 'error',
			msg: 'Debe proporcionar el mes de Termino.'
		})
		break
	case 'numero':
		res.status(400).json({
			status: 'error',
			msg: 'Debe proporcionar el numero.'
		})
		break
	case 'numeroAuditoria':
		res.status(400).json({
			status: 'error',
			msg: 'Debe proporcionar el numero de auditoria.'
		})
		break
	case 'notificaResultados':
		res.status(400).json({
			status: 'error',
			msg: 'Debe proporcionar el campo Notifica Resultados.'
		})
		break
	case 'fecha':
		res.status(400).json({
			status: 'error',
			msg: 'Debe proporcionar la fecha.'
		})
		break
	case 'fechaRecepcion':
		res.status(400).json({
			status: 'error',
			msg: 'Debe proporcionar la fecha de recepcion.'
		})
		break
	case 'fechaVencimiento':
		res.status(400).json({
			status: 'error',
			msg: 'Debe proporcionar la fecha de vencimiento.'
		})
		break
	case 'idUsuario':
		res.status(400).json({
			status: 'error',
			msg: 'Debe proporcionar id del Usuario.'
		})
		break
	case 'monto':
		res.status(400).json({
			status: 'error',
			msg: 'Debe proporcionar monto.'
		})
		break
	case 'estatus':
		res.status(400).json({
			status: 'error',
			msg: 'Debe proporcionar estatus.'
		})
		break
	case 'comentarios':
		res.status(400).json({
			status: 'error',
			msg: 'Debe proporcionar comentarios.'
		})
		break
	case 'idOficio':
		res.status(400).json({
			status: 'error',
			msg: 'Debe proporcionar id del Oficio.'
		})
		break
	case 'idUnidad':
		res.status(400).json({
			status: 'error',
			msg: 'Debe proporcionar idUnidad.'
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