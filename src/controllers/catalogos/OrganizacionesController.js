const db = require('../../config/db')
const buscar = require('../../customFunction/Buscar')


//POST single
exports.guardar = (req, res) => {
	db.catOrganizaciones.create(req.organizacion)
		.then(organizacion => {
			res.status(201).json(organizacion)
		})
		.catch((err) => {
			res.status(400).json({
				status: 'Alerta',
				msg: 'Fallo al crear',
				error: err
			})
		})
}

// GET one por id
exports.organizacion = (req, res) => {
	if (req.userData.data.roles == 'superadmin') {
		db.catOrganizaciones.find({
			where: {
				idOrganizacion: req.params.id
			},
			include: [{
				model: db.catEntesFiscalizadores,
				as: 'entes'
			},
			{
				model: db.catFondos,
				as: 'fondos'
			},
			{
				model: db.catInstancias,
				as: 'instancias',
				include: [{
					model: db.catInstanciaEntes,
					as: 'entes',
					include: [{
						model: db.catEntesFiscalizadores,
						as: 'ente'
					}]
				},
				{
					model: db.catInstanciaFondos,
					as: 'fondos',
					include: [{
						model: db.catFondos,
						as: 'fondo'
					}]
				}
				]
			}
			]
		})
			.then(organizacion => {
				res.status(200).json(organizacion)
			})
			.catch((err) => {
				res.status(400).json({
					status: 'Alerta',
					msg: 'Fallo al buscar',
					error: err
				})
			})
	} else {
		res.status(200).json({})
	}
}

// GET all con TODO
exports.organizaciones = (req, res) => {
	if (req.userData.data.roles == 'superadmin') {
		db.catOrganizaciones.findAll({
			include: [{
				model: db.catEntesFiscalizadores,
				as: 'entes'
			},
			{
				model: db.catFondos,
				as: 'fondos'
			},
			{
				model: db.catInstancias,
				as: 'instancias',
				include: [{
					model: db.catInstanciaEntes,
					as: 'entes',
					include: [{
						model: db.catEntesFiscalizadores,
						as: 'ente'
					}]
				},
				{
					model: db.catInstanciaFondos,
					as: 'fondos',
					include: [{
						model: db.catFondos,
						as: 'fondo'
					}]
				}
				]
			}
			]
		})
			.then(organizaciones => {
				res.status(200).json(organizaciones)
			})
			.catch((err) => {
				res.status(400).json({
					status: 'Alerta',
					msg: 'Fallo al buscar',
					error: err
				})
			})
	} else {
		res.status(200).json({})
	}
}

// PATCH single
exports.actualizar = (req, res) => {
	db.catOrganizaciones.update(req.organizacion, {
		where: {
			idOrganizacion: req.params.id
		}
	})
		.then(organizacionActualizada => {
			if (organizacionActualizada > 0) {
				buscar.organizacion(req.params.id)
					.then(organizacion => {
						res.status(200).json(organizacion)
					})
			} else {
				res.status(400).json({
					status: 'Alerta',
					msg: 'Organización no actualizada.'
				})
			}
		})
		.catch((err) => {
			res.status(400).json({
				status: 'Alerta',
				msg: 'Fallo al actualizar',
				error: err
			})
		})
}

// DELETE single
exports.eliminar = (req, res) => {
	db.catOrganizaciones.destroy({
		where: {
			idOrganizacion: req.params.id
		}
	})
		.then(organizacionEliminada => {
			if (organizacionEliminada > 0) {
				res.status(200).json({
					status: 'success',
					msg: 'Eliminación exitosa',
					id: req.params.id
				})
			} else {
				res.status(400).json({
					status: 'Alerta',
					msg: 'No encontrado'
				})
			}
		})
		.catch((err) => {
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