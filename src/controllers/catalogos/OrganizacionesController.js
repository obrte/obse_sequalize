const db = require('../../config/db')
const buscar = require('../../customFunction/Buscar')


//POST single
exports.guardar = (req, res) => {
	db.catOrganizaciones.create(req.body.organizacion)
		.then(organizacion => {
			res.status(200).json(organizacion)
		})
		.catch(err => {
			res.status(400).json({
				status: 'error',
				msg: 'Error al crear',
				error: err
			})
		})
}

// GET all
exports.organizaciones = (req, res) => {
	db.catOrganizaciones.findAll()
		.then(organizaciones => {
			res.status(200).json(organizaciones)
		})
		.catch(err => {
			res.status(400).json({
				status: 'error',
				msg: 'No encontrado',
				error: err
			})
		})
}

// GET one por id
exports.organizacion = (req, res) => {
	db.catOrganizaciones.findAll({
		where: {
			idOrganizacion: req.params.id
		},
		include: [{
			model: db.catEntesFiscalizadores,
			attributes: ['nombre'],
			as: 'entes'
		},
		{
			model: db.catFondos,
			attributes: ['nombre', 'origen'],
			as: 'fondos'
		},
		{
			model: db.catInstancias,
			attributes: ['nombre'],
			as: 'instancias',
			include: [
				{
					model: db.catInstanciaEntes,
					attributes: ['idEnte',],
					as: 'entes',
					include: [
						{
							model: db.catEntesFiscalizadores,
							attributes: ['nombre'],
							as: 'ente'
						}
					]
				},
				{
					model: db.catInstanciaFondos,
					attributes: ['idFondo'],
					as: 'fondos',
					include: [
						{
							model: db.catFondos,
							attributes: ['nombre', 'origen'],
							as: 'fondo'
						}
					]
				}
			]
		}]
	})
		.then(entes => {
			res.json(entes)
		})
		.catch(err => {
			console.log(err)
			res.json(err)
		})
	// buscar.idOrganizacion(req.params.id)
	// 	.then(organizacion => {
	// 		if (organizacion) {
	// 			res.status(200).json(organizacion)
	// 		} else {
	// 			res.status(400).json({
	// 				status: 'error',
	// 				msg: 'No encontrado'
	// 			})
	// 		}
	// 	})
	// 	.catch(err => {
	// 		console.log(err)
	// 		res.status(400).json({
	// 			status: 'error',
	// 			msg: 'Error al buscar',
	// 			error: err
	// 		})
	// 	})
}

// PATCH single
exports.actualizar = (req, res) => {
	db.catOrganizaciones.update(req.body.organizacion, {
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
					status: 'error',
					msg: 'Organización no actualizada.'
				})
			}
		})
		.catch(err => {
			res.status(400).json({
				status: 'error',
				msg: 'Error al actualizar',
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
					status: 'error',
					msg: 'No encontrado'
				})
			}
		})
		.catch(err => {
			res.status(400).json({
				status: 'error',
				msg: 'Error al eliminar, verifica que no tenga dependencias',
				error: {
					name: err.name,
					code: err.parent.code
				}
			})
		})
}