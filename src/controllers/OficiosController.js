const db = require('../config/db')
const buscar = require('../customFunction/Buscar')

exports.test = (req, res) => {
	console.log('TEST')
	console.log(req.oficio)


	res.json(req.oficio)
}


//POST single
exports.guardar = (req, res) => {
	console.log('CONTROLLER')
	db.oficios.update({
		esUltimo: 0
	}, {
		where: {
			idInforme: req.oficio.idInforme
		}
	})
		.then(() => {
			db.oficios.create(req.oficio)
				.then(oficio => {
					buscar.oficio(oficio.idOficio)
						.then(datosOficio => {
							res.status(201).json(datosOficio)
						})
						.catch(err =>
							res.status(400).json({
								status: 'Alerta',
								msg: 'Fallo al crear(buscar).',
								error: err
							})
						)
				})
		})
}

// GET all
exports.informes = (req, res) => {
	db.informes
		.findAll({
			attributes: [
				'idInforme',
				'nombre',
				'ejercicio',
				'delMes',
				'alMes',
				'numero',
				'numeroAuditoria',
				'activo',
				'created_at',
				'updated_at'
			],
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
			}
			]
		})
		.then(informes => {
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
	buscar
		.informe(req.params.id)
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
}

// PATCH single
exports.actualizar = (req, res) => {
	db.informes
		.update(req.informe, {
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
					msg: 'Usuario no actualizado.'
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