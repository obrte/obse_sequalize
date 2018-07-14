const db = require('../config/db')
//const Op = db.Sequelize.Op


//Regresa todos los datos del ID encontrado
const IdOrganizacion = (id) => {
    return new Promise((resolve, reject) => {
        db.catOrganizaciones.find({
                where: {
                    id_organizacion: id
                }
            })
            .then(datos => {
                if (datos) {
                    console.log('regresé True')
                    resolve(datos)
                } else {
                    console.log('Regresé False')
                    reject('no existe')
                }
            })
    })
}

const IdEnteFiscalizador = (id) => {
    return new Promise((resolve, reject) => {
        db.catOrganizaciones.find({
                where: {
                    id_organizacion: id
                }
            })
            .then(datos => {
                if (datos) {
                    console.log('regresé True')
                    resolve(datos)
                } else {
                    console.log('Regresé False')
                    resolve(false)
                }
            })
            .catch(err => reject(err))
    })
}

const buscar = {}

buscar.IdOrganizacion = IdOrganizacion
buscar.IdEnteFiscalizador = IdEnteFiscalizador

module.exports = buscar