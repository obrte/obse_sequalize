const Joi = require('joi')
const mensajes = require('../../customFunction/Mensajes')
const existe = require('../../customFunction/Existe')
const buscar = require('../../customFunction/Buscar')

const schema = {
    idInstancia: Joi.string().required(),
    idFondo: Joi.string().required()
}

//validar que los campos no esten vacios
exports.registro = (req, res, next) => {
    const nuevaInstanciaFondos = datosCuerpo(req)
    const {
        error
    } = Joi.validate(nuevaInstanciaFondos, schema)
    if (error) {
        mensajes.switchError(error, res)
    } else {
        //busca el id_instancia y el id_fondo
        existenIds(nuevaInstanciaFondos)
            .then(ids => {
                if (ids.existe) {
                    req.nuevaInstanciaFondos = nuevaInstanciaFondos
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
    const updateInstanciaFondos = datosCuerpo(req)
    const {
        error
    } = Joi.validate(updateInstanciaFondos, schema)
    if (error) {
        mensajes.switchError(error, res)
    } else {
        buscar.idInstanciaFondos(req.params.id)
            .then(oldInstanciaFondos => {
                if (oldInstanciaFondos) {
                    //busca el id_instancia y el id_fondo
                    existenIds(updateInstanciaFondos)
                        .then(ids => {
                            if (ids.existe) {
                                console.log(oldInstanciaFondos)
                                req.updateInstanciaFondos = updateInstanciaFondos
                                req.oldInstanciaFondos = oldInstanciaFondos
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
                        msg: 'Instancia-Fondos no encontrado'
                    })
                }
            })
    }
}

const datosCuerpo = (req) => {
    const idInstancia = req.body.instancia.idInstancia,
        idFondo = req.body.instancia.idFondo
    const datosInstanciaFondos = {
        idInstancia: idInstancia,
        idFondo: idFondo
    }
    return datosInstanciaFondos
}

const existenIds = (datos) => {
    return new Promise((resolve, reject) => {
        existe.idInstancia(datos.idInstancia)
            .then(existeInstancia => {
                if (existeInstancia) {
                    existe.idFondo(datos.id_fondo)
                        .then(existeFondo => {
                            if (existeFondo) {
                                const ids = {
                                    existe: true
                                }
                                resolve(ids)
                            } else {
                                const ids = {
                                    existe: false,
                                    msg: 'Fondo no encontrado'
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