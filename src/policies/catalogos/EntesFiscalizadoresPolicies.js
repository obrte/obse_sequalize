const Joi = require('joi')
const mensajes = require('../../customFunction/Mensajes')
const existe = require('../../customFunction/Existe')

const schema = {
    idOrganizacion: Joi.string().required(),
    nombre: Joi.string().required()
}

//validar que los campos no esten vacios
exports.crear = (req, res, next) => {
    const ente = req.body.ente
    const {
        error
    } = Joi.validate(ente, schema)
    if (error) {
        mensajes.switchError(error, res)
    } else {
        existe.idOrganizacion(ente.idOrganizacion)
            .then(existeID => {
                if (existeID) {
                    req.ente = ente
                    next()
                } else {
                    res.status(400).json({
                        status: 'error',
                        msg: 'Organización no encontrada'
                    })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({
                    status: 'error',
                    msg: err
                })
            })
    }
}

//validar que los campos no esten vacios
exports.actualizar = (req, res, next) => {
    const id = req.params.id
    const ente = req.body.ente
    continuar(id, ente)
        .then(continuar => {
            req.ente = ente
            next()

        })
        .catch(err => {
            res.status(400).json({
                status: 'error',
                msg: err.msg
            })
        })
}

const continuar = (id, ente) => {
    return new Promise((resolve, reject) => {
        existe.idEnteFiscalizador(id)
            .then(existeEnte => {
                if (!existeEnte) {
                    const err = {
                        msg: 'Ente no encontrado'
                    }
                    reject(err)
                } else {
                    var llaves = Object.keys(ente)
                    var contador = 1
                    llaves.forEach(async (item) => {
                        if ((ente[item] == "") && item != "activo") {
                            const err = {
                                msg: 'Debe proporcionar el dato ' + item + '.'
                            }
                            reject(err)
                        } else {
                            console.log(item, contador)
                            if ((item == "idOrganizacion") && (contador < llaves.length)) {
                                await existe.idOrganizacion(ente.idOrganizacion)
                                    .then(existeId => {
                                        if (!existeId) {
                                            const err = {
                                                msg: 'Organizacion no encontrada'
                                            }
                                            reject(err)
                                        }
                                    })
                                resolve(true)
                            } else {
                                if ((item == "activo") && (contador == llaves.length)) {
                                    resolve(true)
                                }
                            }
                        }
                        contador++
                    })
                }
            })
    })
}