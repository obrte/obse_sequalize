const Joi = require('joi')
const mensajes = require('../../customFunction/Mensajes')
const existe = require('../../customFunction/Existe')
const buscar = require('../../customFunction/Buscar')

const schema = {
    id_instancia: Joi.string().required(),
    id_ente: Joi.string().required()
}

//validar que los campos no esten vacios
exports.registro = (req, res, next) => {
    const nuevaInstanciaEntes = datosCuerpo(req)
    const {
        error
    } = Joi.validate(nuevaInstanciaEntes, schema)
    if (error) {
        mensajes.switchError(error, res)
    } else {
        existenIds(nuevaInstanciaEntes)
            .then(ids => {
                if (ids.existe) {
                    req.nuevaInstanciaEntes = nuevaInstanciaEntes
                    next()
                } else {
                    res.status(400).json({
                        status: 'error',
                        msg: ids.msg
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
    const updateInstanciaEnte = datosCuerpo(req)
    const {
        error
    } = Joi.validate(updateInstanciaEnte, schema)
    if (error) {
        mensajes.switchError(error, res)
    } else {
        buscar.idInstanciaEntes(req.params.id)
            .then(oldInstanciaEntes => {
                if (oldInstanciaEntes) {
                    existenIds(updateInstanciaEnte)
                        .then(ids => {
                            if (ids.existe) {
                                req.updateInstanciaEnte = updateInstanciaEnte
                                req.oldInstanciaEntes = oldInstanciaEntes
                                next()
                            } else {
                                res.status(400).json({
                                    status: 'error',
                                    msg: ids.msg
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
                } else {
                    res.status(400).json({
                        status: 'error',
                        msg: 'Instancia-Entes no encontrado'
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

const datosCuerpo = (req) => {
    const id_instancia = req.body.id_instancia,
        id_ente = req.body.id_ente
    const datosInstanciaEntes = {
        id_instancia: id_instancia,
        id_ente: id_ente
    }
    return datosInstanciaEntes
}

const existenIds = (datos) => {
    return new Promise((resolve, reject) => {
        existe.idInstancia(datos.id_instancia)
            .then(existeInstancia => {
                if (existeInstancia) {
                    existe.idEnteFiscalizador(datos.id_ente)
                        .then(existeEnte => {
                            if (existeEnte) {
                                const ids = {
                                    existe: true
                                }
                                resolve(ids)
                            } else {
                                const ids = {
                                    existe: false,
                                    msg: 'Ente no encontrado'
                                }
                                resolve(ids)
                            }
                        })
                        .catch(err => reject(err))
                } else {
                    const ids = {
                        existe: false,
                        msg: 'Instancia no encontrada'
                    }
                    resolve(ids)
                }
            })
            .catch(err => reject(err))
    })
}