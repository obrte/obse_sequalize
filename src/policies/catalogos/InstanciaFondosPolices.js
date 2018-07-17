const Joi = require('joi')
const db = require('../../config/db')
const Op = db.Sequelize.Op
const mensajes = require('../../customFunction/Mensajes')
const existe = require('../../customFunction/Existe')
const buscar = require('../../customFunction/Buscar')

const schema = {
    id_instancia: Joi.string().required(),
    id_fondo: Joi.string().required()
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
        const idInstancia = nuevaInstanciaFondos.id_instancia
        const idFondo = nuevaInstanciaFondos.id_fondo
        existe.idInstancia(idInstancia)
            .then(existeInstancia => {
                if (existeInstancia) {
                    existe.idFondo(idFondo)
                        .then(existeFondo => {
                            if (existeFondo) {
                                req.nuevaInstanciaFondos = nuevaInstanciaFondos
                                next()
                            } else {
                                res.status(400).json({
                                    status: 'error',
                                    msg: 'Fondo no encontrado'
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
                    existe.idInstancia(updateInstanciaFondos.id_instancia)
                        .then(existeInstancia => {
                            if (existeInstancia) {
                                existe.idFondo(updateInstanciaFondos.id_fondo)
                                    .then(existeFondo => {
                                        if (existeFondo) {
                                            //oldInstanciaFondos contiene todos los datos actualmente guardados en la tabla de catalogo_instancias
                                            //updateInstanciaFondos contiene los nuevos datos que se actualizarán
                                            req.updateInstanciaFondos = updateInstanciaFondos
                                            req.oldInstanciaFondos = oldInstanciaFondos
                                            next()
                                        } else {
                                            res.status(400).json({
                                                status: 'error',
                                                msg: 'Fondo no encontrado'
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
                        msg: 'Instancia-Fondos no encontrado'
                    })
                }
            })
    }
}

const datosCuerpo = (req) => {
    const id_instancia = req.body.id_instancia,
        id_fondo = req.body.id_fondo
    const datosInstanciaFondos = {
        id_instancia: id_instancia,
        id_fondo: id_fondo
    }
    return datosInstanciaFondos
}