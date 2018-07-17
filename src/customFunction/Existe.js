const db = require('../config/db')
//const Op = db.Sequelize.Op

const idOrganizacion = (id) => {
    return new Promise((resolve, reject) => {
        db.catOrganizaciones.find({
                where: {
                    id_organizacion: id
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
                    id_ente: id
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
                    id_fondo: id
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
                    id_instancia: id
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

const existe = {}

existe.idOrganizacion = idOrganizacion
existe.idEnteFiscalizador = idEnteFiscalizador
existe.idFondo = idFondo
existe.idInstancia = idInstancia
existe.idInstanciaFondos = idInstanciaFondos

module.exports = existe