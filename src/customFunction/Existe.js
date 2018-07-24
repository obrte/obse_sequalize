const db = require('../config/db')
//const Op = db.Sequelize.Op

const organizacion = (id) => {
	return new Promise((resolve, reject) => {
		db.catOrganizaciones.find({
			where: {
				idOrganizacion: id
			}
		})
			.then(datos => {
				if (datos) {
					resolve(true)
				} else {
					resolve(false)
				}
			})
			.catch(err => {
				reject(err)
			})
	})
}

const ente = (id) => {
	return new Promise((resolve, reject) => {
		db.catEntesFiscalizadores.find({
			where: {
				idEnte: id
			}
		})
			.then(datos => {
				if (datos) {
					resolve(true)
				} else {
					resolve(false)
				}
			})
			.catch(err => reject(err))
	})
}

const fondo = (id) => {
	return new Promise((resolve, reject) => {
		db.catFondos.find({
			where: {
				idFondo: id
			}
		})
			.then(datos => {
				if (datos) {
					resolve(true)
				} else {
					resolve(false)
				}
			})
			.catch(err => reject(err))
	})
}

const instancia = (id) => {
	return new Promise((resolve, reject) => {
		db.catInstancias.find({
			where: {
				idInstancia: id
			}
		})
			.then(datos => {
				if (datos) {
					resolve(true)
				} else {
					resolve(false)
				}
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
					resolve(true)
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
					resolve(true)
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
					resolve(true)
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
					resolve(true)
				} else {
					resolve(false)
				}
			})
			.catch(err => reject(err))
	})
}

const email = (email) => {
	return new Promise((resolve, reject) => {
		db.catUsuarios.find({
			where: {
				email: email
			}
		})
			.then(datos => {
				if (datos) {
					resolve(true)
				} else {
					resolve(false)
				}
			})
			.catch(err => reject(err))
	})
}

const existe = {}

existe.organizacion = organizacion
existe.ente = ente
existe.fondo = fondo
existe.instancia = instancia
existe.instanciaFondos = instanciaFondos
existe.instanciaEntes = instanciaEntes
existe.uniAdm = uniAdm
existe.usuario = usuario
existe.email = email

module.exports = existe