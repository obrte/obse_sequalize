const db = require('../config/db')
//const Op = db.Sequelize.Op


//Regresa todos los datos del ID encontrado
const idOrganizacion = (id) => {
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

const idEnteFiscalizador = (id) => {
	return new Promise((resolve, reject) => {
		db.catEntesFiscalizadores.find({
			where: {
				idEnte: id
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

const idFondo = (id) => {
	return new Promise((resolve, reject) => {
		db.catFondos.find({
			where: {
				idFondo: id
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

const idInstancia = (id) => {
	return new Promise((resolve, reject) => {
		db.catInstancias.find({
			where: {
				idInstancia: id
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

const idInstanciaFondos = (id) => {
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

const idInstanciaEntes = (id) => {
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

const idUniAdm = (id) => {
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

const idUsuario = (id) => {
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

buscar.idOrganizacion = idOrganizacion
buscar.idEnteFiscalizador = idEnteFiscalizador
buscar.idFondo = idFondo
buscar.idInstancia = idInstancia
buscar.idInstanciaFondos = idInstanciaFondos
buscar.idInstanciaEntes = idInstanciaEntes
buscar.idUniAdm = idUniAdm
buscar.idUsuario = idUsuario

module.exports = buscar