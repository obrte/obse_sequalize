const db = require('../config/db')
const buscar = require('../customFunction/Buscar')

//POST single
exports.guardar = (req, res) => {
	db.informes.create(req.informe).then(informe => {
		buscar.informe(informe.idInforme)
			.then(datosInforme => {
				res.status(201).json(datosInforme)
			})
			.catch(err =>
				res.status(400).json({
					status: 'Alerta',
					msg: 'Fallo al crear(buscar).',
					error: err
				})
			)
	})
}

// GET all
exports.informes = (req, res) => {
	db.informes.findAll({
		attributes: ['idInforme', 'nombre', 'ejercicio', 'delMes', 'alMes', 'numero', 'numeroAuditoria', 'activo', 'created_at', 'updated_at'],
		include: [{
			model: db.catUsuarios,
			attributes: ['nombre', 'idUsuario'],
			as: 'usuarioCreacion'
		},
		{
			model: db.catEntesFiscalizadores,
			attributes: ['nombre', 'idEnte'],
			as: 'ente'
		},
		{
			model: db.catFondos,
			attributes: ['nombre', 'idFondo'],
			as: 'fondo'
		},
		{
			model: db.catInstancias,
			attributes: ['nombre', 'idInstancia'],
			as: 'instancia'
		},
		{
			model: db.oficios,
			attributes: ['idOficio', 'numero', 'fecha', 'fechaRecepcion', 'fechaVencimiento', 'observaciones', 'pathPdfFile', 'notificaResultados', 'esUltimo', 'created_at', 'updated_at'],
			as: 'oficios'
		},
		{
			model: db.observaciones,
			as: 'observaciones',
			include: [{
				model: db.observacionesLog,
				as: 'log'
			}]
		}
		]
	})
		.then(informes => {
			informes.forEach(informe => {
				if (informe.oficios) {
					informe.oficios.forEach(obj => {
						if (obj.pathPdfFile) obj.pathPdfFile = obj.pathPdfFile.split('/')[5]
					})
				}
				if (informe.observaciones) {
					informe.observaciones.forEach(observacion => {
						if (observacion.log) {
							observacion.log.forEach(log => {
								if (log.anexo) log.anexo = log.anexo.split('/')[5]
							})
						}
					})
				}
			})
			res.status(200).json(informes)
		})
		.catch(err => {
			res.status(400).json({
				status: 'Alerta',
				msg: 'Fallo al buscar',
				error: err
			})
		})
}

// GET one por id
exports.informe = (req, res) => {
	buscar.informe(req.params.id)
		.then(datosInforme => {
			res.status(200).json(datosInforme)
		})
		.catch(err =>
			res.status(400).json({
				status: 'Alerta',
				msg: 'Fallo al crear(buscar).',
				error: err
			})
		)
}

// PATCH single
exports.actualizar = (req, res) => {
	db.informes.update(req.informe, {
		where: {
			idInforme: req.params.id
		}
	})
		.then(InformeActualizado => {
			if (InformeActualizado > 0) {
				buscar.informe(req.params.id).then(informe => {
					res.status(200).json(informe)
				})
			} else {
				res.status(400).json({
					status: 'Alerta',
					msg: 'Informe no actualizado.'
				})
			}
		})
		.catch(err => {
			res.status(400).json({
				status: 'Alerta',
				msg: 'Fallo al actualizar',
				error: err
			})
		})
}

// DELETE single
exports.eliminar = (req, res) => {
	db.informes
		.destroy({
			where: {
				idInforme: req.params.id
			}
		})
		.then(informeEliminado => {
			if (informeEliminado == 1) {
				res.status(200).json({
					status: 'success',
					msg: 'Eliminación exitosa'
				})
			} else {
				res.status(400).json({
					status: 'Alerta',
					msg: 'No encontrado'
				})
			}
		})
		.catch(err => {
			res.status(400).json({
				status: 'Alerta',
				msg: 'Error al eliminar, verifica que no tenga dependencias',
				error: {
					name: err.name,
					code: err.parent.code
				}
			})
		})
}