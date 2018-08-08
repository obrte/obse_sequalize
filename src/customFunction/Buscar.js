const db = require('../config/db')
//const Op = db.Sequelize.Op


//Regresa todos los datos del ID encontrado
const organizacion = (id) => {
	return new Promise((resolve, reject) => {
		db.catOrganizaciones.find({
			where: {
				idOrganizacion: id
			}
		})
			.then(datos => {
				if (datos) {
					resolve(datos)
				} else {
					reject('no existe')
				}
			})
	})
}

const ente = (id) => {
	return new Promise((resolve, reject) => {
		db.catEntesFiscalizadores.find({
			where: {
				idEnte: id
			},
			include: [{
				model: db.catOrganizaciones,
				attributes: ['nombre'],
				as: 'organizacion'
			}],
		})
			.then(ente => {
				resolve(ente)
			})
			.catch((err) => reject(err))
	})
}

const fondo = (id) => {
	return new Promise((resolve, reject) => {
		db.catFondos.find({
			where: {
				idFondo: id
			},
			include: [{
				model: db.catOrganizaciones,
				attributes: ['nombre'],
				as: 'organizacion'
			}],
		})
			.then(fondo => {
				resolve(fondo)
			})
			.catch((err) => reject(err))
	})
}

const instancia = (id) => {
	return new Promise((resolve, reject) => {
		db.catInstancias.find({
			where: {
				idInstancia: id
			},
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
			},
			{
				model: db.catOrganizaciones,
				attributes: ['nombre'],
				as: 'organizacion'
			}
			]
		})
			.then(instancia => {
				resolve(instancia)
			})
			.catch((err) => reject(err))
	})
}

const uniAdm = (id) => {
	return new Promise((resolve, reject) => {
		console.log(3)
		db.catUniAdm.find({
			where: {
				idUniAdm: id
			},
			include: [{
				model: db.catInstancias,
				attributes: ['nombre', 'idOrganizacion'],
				as: 'instancia'
			}],
		})
			.then(uniAdm => {
				console.log(4)
				resolve(uniAdm)
			})
			.catch((err) => reject(err))
	})
}

const usuario = (id) => {
	return new Promise((resolve, reject) => {
		db.catUsuarios.find({
			where: {
				idUsuario: id
			},
			attributes: ['idUsuario', 'tipo', 'nombre', 'email', 'activo', 'idUsuarioCreacion'],
			include: [{
				model: db.catOrganizaciones,
				attributes: ['idOrganizacion', 'nombre'],
				as: 'organizacion'
			},
			{
				model: db.catInstancias,
				attributes: ['idInstancia', 'nombre'],
				as: 'instancia'
			},
			{
				model: db.catUniAdm,
				attributes: ['idUniAdm', 'nombre'],
				as: 'uniAdm'
			}
			]
		})
			.then(datos => {
				if (datos) {
					console.log('antes')
					nombreCreador(datos.idUsuarioCreacion)
						.then(creador => {
							datos.dataValues.nombreCreacion = creador.nombre
							resolve(datos)
						})
						.catch((err) => reject(err))
				} else {
					resolve(false)
				}
			})
			.catch((err) => reject(err))
	})
}

function nombreCreador(id) {
	return new Promise((resolve, reject) => {
		console.log('dentro')
		db.catUsuarios.find({
			where: {
				idUsuario: id
			}
		})
			.then(creador => {
				resolve(creador)
			})
			.catch((err) => reject(err))
	})
}


const buscar = {}

buscar.organizacion = organizacion
buscar.ente = ente
buscar.fondo = fondo
buscar.instancia = instancia
buscar.uniAdm = uniAdm
buscar.usuario = usuario

module.exports = buscar