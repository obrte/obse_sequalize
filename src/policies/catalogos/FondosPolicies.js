const Joi = require('joi')
const db = require('../../config/db')
const Op = db.Sequelize.Op
const buscar = require('../../customFunction/Buscar')
const mensajes = require('../../customFunction/Mensajes')
const existe = require('../../customFunction/Existe')

const schema = {
    id_organizacion: Joi.string().required(),
    nombre: Joi.string().required(),
    origen: Joi.number().integer().required(),
    activo: Joi.number().integer().required()
}

//validar que los campos no esten vacios
exports.registro = (req, res, next) => {
    const nuevoFondo = datosCuerpo(req)
    const {
        error
    } = Joi.validate(nuevoFondo, schema)

    if (error) {
        mensajes.switchError(error, res)
    } else {
        existe.idOrganizacion(nuevoFondo.id_organizacion)
            .then(existeID => {
                if (existeID) {
                    req.nuevoFondo = nuevoFondo
                    next()
                } else {
                    res.status(400).json({
                        status: 'error',
                        msg: 'Organización no encontrada'
                    })
                }
            })
    }
}

//validar que los campos no esten vacios
exports.actualizar = (req, res, next) => {
    const updateFondo = datosCuerpo(req)
    const {
        error
    } = Joi.validate(updateFondo, schema)
    if (error) {
        mensajes.switchError(error, res)
    } else {
        const id = req.params.id
        buscar.idFondo(id)
            .then(oldFondo => {
                if (oldFondo) {
                   existe.idOrganizacion(updateFondo.id_organizacion)
                        .then(existeID => {
                            if (existeID) {
                                //oldFondo contiene todos los datos actualmente guardados en la tabla de catalogo_fondos
                                //updateFondo contiene los nuevos datos que se actualizarán
                                req.updateFondo = updateFondo
                                req.oldFondo = oldFondo
                                next()
                            } else {
                                res.status(400).json({
                                    status: 'error',
                                    msg: 'Organización no encontrada'
                                })
                            }
                        })
                } else {
                    res.status(400).json({
                        status: 'error',
                        msg: 'Fondo no encontrado'
                    })
                }
            })
    }
}

const datosCuerpo = (req) => {
    const id_organizacion = req.body.id_organizacion,
    nombre = req.body.nombre,
    origen = req.body.origen,
    activo = req.body.activo
const datosFondo = {
    id_organizacion: id_organizacion,
    nombre: nombre,
    origen: origen,
    activo: activo
}
    return datosFondo
}