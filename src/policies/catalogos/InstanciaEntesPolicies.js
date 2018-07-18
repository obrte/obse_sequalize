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
        const idInstancia = nuevaInstanciaEntes.id_instancia
        const idEnte = nuevaInstanciaEntes.id_ente
        existe.idInstancia(idInstancia)
            .then(existeInstancia => {
                if (existeInstancia) {
                    existe.idEnte(idEnte)
                        .then(existeEnte => {
                            if (existeEnte) {
                                req.nuevaInstanciaEntes = nuevaInstanciaEntes
                                next()
                            } else {
                                res.status(400).json({
                                    status: 'error',
                                    msg: 'Ente no encontrado'
                                })
                            }
                        })
                } else {
                    res.status(400).json({
                        status: 'error',
                        msg: 'Instancia no encontrada'
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
                    existe.idInstancia(updateInstanciaEnte.id_instancia)
                        .then(existeInstancia => {
                            if (existeInstancia) {
                                existe.idEnte(updateInstanciaEnte.id_ente)
                                    .then(existeEnte => {
                                        if (existeEnte) {
                                            req.updateInstanciaEnte = updateInstanciaEnte
                                            req.oldInstanciaEntes = oldInstanciaEntes
                                            next()
                                        } else {
                                            res.status(400).json({
                                                status: 'error',
                                                msg: 'Ente no encontrado'
                                            })
                                        }
                                    })
                            } else {
                                res.status(400).json({
                                    status: 'error',
                                    msg: 'Instancia no encontrada'
                                })
                            }
                        })
                } else {
                    res.status(400).json({
                        status: 'error',
                        msg: 'Instancia-Entes no encontrado'
                    })
                }
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