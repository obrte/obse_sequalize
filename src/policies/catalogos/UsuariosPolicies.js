const Joi = require('joi')
const mensajes = require('../../customFunction/Mensajes')
const existe = require('../../customFunction/Existe')
const buscar = require('../../customFunction/Buscar')

const schema = {
    tipo: Joi.string().required(),
    idOrganizacion: Joi.string().required(),
    idInstancia: Joi.string().required(),
    idUniadm: Joi.string().required(),
    nombre: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    idUsuarioCreacion: Joi.number().integer().required()
}

//validar que los campos no esten vacios
exports.registro = (req, res, next) => {
    const nuevoUsuario = datosCuerpo(req)
    const {
        error
    } = Joi.validate(nuevoUsuario, schema)
    if (error) {
        mensajes.switchError(error, res)
    } else {
        existenIds(nuevoUsuario)
            .then(ids => {
                if (ids.existe) {
                    existe.email(nuevoUsuario.email)
                        .then(existeEmail => {
                            if (!existeEmail) {
                                req.nuevoUsuario = nuevoUsuario
                                next()
                            } else {
                                res.status(400).json({
                                    status: 'error',
                                    msg: 'El correo ya está en uso'
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
    const updateUsuario = datosCuerpo(req)
    const {
        error
    } = Joi.validate(updateUsuario, schema)
    if (error) {
        mensajes.switchError(error, res)
    } else {
        buscar.idUsuario(req.params.id)
            .then(oldUsuario => {
                if (oldUsuario) {
                    existenIds(updateUsuario)
                        .then(ids => {
                            if (ids.existe) {
                                if (updateUsuario.email == oldUsuario.email) {
                                    req.oldUsuario = oldUsuario
                                    req.updateUsuario = updateUsuario
                                    next()
                                } else {
                                    existe.email(updateUsuario.email)
                                        .then(existeEmail => {
                                            if (!existeEmail) {
                                                req.oldUsuario = oldUsuario
                                                req.updateUsuario = updateUsuario
                                                next()
                                            } else {
                                                res.status(400).json({
                                                    status: 'error',
                                                    msg: 'El correo ya está en uso'
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
            })
    }
}

const datosCuerpo = (req) => {
    const tipo = req.body.tipo,
        idOrganizacion = req.body.idOrganizacion,
        idInstancia = req.body.idInstancia,
        idUniadm = req.body.idUniadm,
        nombre = req.body.nombre,
        email = req.body.email,
        password = req.body.password,
        activo = req.body.activo,
        idUsuarioCreacion = req.body.idUsuarioCreacion
    const datosUsuario = {
        tipo: tipo,
        idOrganizacion: idOrganizacion,
        idInstancia: idInstancia,
        idUniadm: idUniadm,
        nombre: nombre,
        email: email,
        password: password,
        activo: activo,
        idUsuarioCreacion: idUsuarioCreacion
    }
    return datosUsuario
}

const existenIds = (datos) => {
    return new Promise((resolve, reject) => {
        existe.idOrganizacion(datos.id_organizacion)
            .then(existeOrganizacion => {
                if (existeOrganizacion) {
                    existe.idInstancia(datos.id_instancia)
                        .then(existeInstancia => {
                            if (existeInstancia) {
                                existe.idUniAdm(datos.id_uniadm)
                                    .then(existeUniAdm => {
                                        if (existeUniAdm) {
                                            const ids = {
                                                existe: true
                                            }
                                            resolve(ids)
                                        } else {
                                            const ids = {
                                                existe: false,
                                                msg: 'Unidad Administrativa no encontrada'
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
                } else {
                    const ids = {
                        existe: false,
                        msg: 'Organizacion no encontrada'
                    }
                    resolve(ids)
                }
            })
            .catch(err => reject(err))
    })
}