const db = require('../config/db')
//const Op = db.Sequelize.Op

const idOrganizacion = (id) => {
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
            .catch(err => reject(err))
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
                    resolve(true)
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
                    resolve(true)
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
                    resolve(true)
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
                    resolve(true)
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
                    resolve(true)
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
                    resolve(true)
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

existe.idOrganizacion = idOrganizacion
existe.idEnteFiscalizador = idEnteFiscalizador
existe.idFondo = idFondo
existe.idInstancia = idInstancia
existe.idInstanciaFondos = idInstanciaFondos
existe.idInstanciaEntes = idInstanciaEntes
existe.idUniAdm = idUniAdm
existe.idUsuario = idUsuario
existe.email = email

module.exports = existe