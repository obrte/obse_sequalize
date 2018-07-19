const Joi = require('joi')
const buscar = require('../../customFunction/Buscar')
const mensajes = require('../../customFunction/Mensajes')
const existe = require('../../customFunction/Existe')

const schema = {
    idOrganizacion: Joi.string().required(),
    nombre: Joi.string().required(),
    origen: Joi.number().integer().required()
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
        existe.idOrganizacion(nuevoFondo.idOrganizacion)
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
        buscar.idFondo(req.params.id)
            .then(oldFondo => {
                if (oldFondo) {
                   existe.idOrganizacion(updateFondo.idOrganizacion)
                        .then(existeID => {
                            if (existeID) {
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
    const idOrganizacion = req.body.idOrganizacion,
    nombre = req.body.nombre,
    origen = req.body.origen,
    activo = req.body.activo
const datosFondo = {
    idOrganizacion: idOrganizacion,
    nombre: nombre,
    origen: origen,
    activo: activo
}
    return datosFondo
}