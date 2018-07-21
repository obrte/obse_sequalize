const db = require('../../config/db')
const buscar = require('../../customFunction/Buscar')

//POST single
exports.crear = (req, res) => {
	db.catOrganizaciones.create(req.organizacion)
		.then(organizacion => {
			res.status(200).json(organizacion)
		})
		.catch(err => {
			console.log(err)
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
			console.log(err)
			res.status(400).json({
				status: 'error',
				msg: 'No encontrado',
				error: err
			})
		})
}

// GET one por id
exports.organizacion = (req, res) => {
	buscar.idOrganizacion(req.params.id)
		.then(organizacion => {
			if (organizacion) {
				res.status(200).json(organizacion)
			} else {
				res.status(400).json({
					status: 'error',
					msg: 'No encontrado'
				})
			}
		})
		.catch(err => {
			console.log(err)
			res.status(400).json({
				status: 'error',
				msg: 'Error al buscar',
				error: err
			})
		})
}

// PATCH single
exports.actualizar = (req, res) => {
	db.catOrganizaciones.update(req.organizacion, {
		where: {
			idOrganizacion: req.params.id
		}
	})
		.then(organizacionActualizada => {
			if(organizacionActualizada > 0) {
				res.status(200).json({
					status: 'success',
					id: req.params.id,
					datos: req.organizacion
				})
			} else {
				res.status(400).json({
					status: 'error',
					msg: 'Error al actualizar'
				})
			}
		})
		.catch(err => {
			console.log(err)
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
			console.log(err)
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