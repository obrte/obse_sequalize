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


const existe = {}

existe.idOrganizacion = idOrganizacion
existe.idEnteFiscalizador = idEnteFiscalizador

module.exports = existe