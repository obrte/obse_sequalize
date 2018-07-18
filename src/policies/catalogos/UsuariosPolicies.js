const Joi = require('joi')
const mensajes = require('../../customFunction/Mensajes')
const existe = require('../../customFunction/Existe')
const buscar = require('../../customFunction/Buscar')

const schema = {
    tipo: Joi.string().required(),
    id_organizacion: Joi.string().required(),
    id_instancia: Joi.string().required(),
    id_uniadm: Joi.string().required(),
    nombre: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    activo: Joi.number().integer().required(),
    id_usuario_creacion: Joi.number().integer().required()
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
        buscarIds(nuevoUsuario)
            .then(ids => {
                if (ids.existe) {
                    req.nuevoUsuario = nuevoUsuario
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
                    buscarIds(updateUsuario)
                        .then(ids => {
                            if (ids.existe) {
                                req.oldUsuario = oldUsuario
                                req.updateUsuario = updateUsuario
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
            })
    }
}

const datosCuerpo = (req) => {
    const tipo = req.body.tipo,
        id_organizacion = req.body.id_organizacion,
        id_instancia = req.body.id_instancia,
        id_uniadm = req.body.id_uniadm,
        nombre = req.body.nombre,
        email = req.body.email,
        password = req.body.password,
        activo = req.body.activo,
        id_usuario_creacion = req.body.id_usuario_creacion
    const datosUsuario = {
        tipo: tipo,
        id_organizacion: id_organizacion,
        id_instancia: id_instancia,
        id_uniadm: id_uniadm,
        nombre: nombre,
        email: email,
        password: password,
        activo: activo,
        id_usuario_creacion: id_usuario_creacion
    }
    return datosUsuario
}

const buscarIds = (datos) => {
    return new Promise((resolve, reject) => {
        existe.idOrganizacion(datos.id_organizacion)
            .then(existeOrganizacion => {
                if (existeOrganizacion) {
                    existe.idInstancia(nuevoUsuario.id_instancia)
                        .then(existeInstancia => {
                            if (existeInstancia) {
                                existe.idUniAdm(nuevoUsuario.id_uniadm)
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