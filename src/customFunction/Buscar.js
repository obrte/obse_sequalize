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
			.catch(err => reject(err))
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
			.catch(err => reject(err))
	})
}

const instancia = (id) => {
	return new Promise((resolve, reject) => {
		db.catInstancias.find({
			where: {
				idInstancia: id
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
			}]
		})
			.then(instancia => {
				resolve(instancia)
			})
			.catch(err => reject(err))
	})
}

const instanciaFondos = (id) => {
	return new Promise((resolve, reject) => {
		db.catInstanciaFondos.find({
			where: {
				id: id
			}
		})
			.then(datos => {
				if (datos) {
					resolve(datos)
				} else {
					resolve(false)
				}
			})
			.catch(err => reject(err))
	})
}

const instanciaEntes = (id) => {
	return new Promise((resolve, reject) => {
		db.catInstanciaEntes.find({
			where: {
				id: id
			}
		})
			.then(datos => {
				if (datos) {
					resolve(datos)
				} else {
					resolve(false)
				}
			})
			.catch(err => reject(err))
	})
}

const uniAdm = (id) => {
	return new Promise((resolve, reject) => {
		db.catUniAdm.find({
			where: {
				idUniadm: id
			}
		})
			.then(datos => {
				if (datos) {
					resolve(datos)
				} else {
					resolve(false)
				}
			})
			.catch(err => reject(err))
	})
}

const usuario = (id) => {
	return new Promise((resolve, reject) => {
		db.catUsuarios.find({
			where: {
				idUsuario: id
			}
		})
			.then(datos => {
				if (datos) {
					resolve(datos)
				} else {
					resolve(false)
				}
			})
			.catch(err => reject(err))
	})
}


const buscar = {}

buscar.organizacion = organizacion
buscar.ente = ente
buscar.fondo = fondo
buscar.instancia = instancia
buscar.instanciaFondos = instanciaFondos
buscar.instanciaEntes = instanciaEntes
buscar.uniAdm = uniAdm
buscar.usuario = usuario

module.exports = buscar