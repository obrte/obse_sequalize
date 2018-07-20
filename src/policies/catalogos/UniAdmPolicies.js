const Joi = require('joi')
const buscar = require('../../customFunction/Buscar')
const mensajes = require('../../customFunction/Mensajes')
const existe = require('../../customFunction/Existe')

const schema = {
    idInstancia: Joi.string().required(),
    nombre: Joi.string().required()
}

//validar que los campos no esten vacios
exports.registro = (req, res, next) => {
    const nuevaUniAdm = datosCuerpo(req)
    const {
        error
    } = Joi.validate(nuevaUniAdm, schema)
    if (error) {
        mensajes.switchError(error, res)
    } else {
        existe.idInstancia(nuevaUniAdm.id_instancia)
            .then(existeID => {
                if (existeID) {
                    req.nuevaUniAdm = nuevaUniAdm
                    next()
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
    const updateUniAdm = datosCuerpo(req)
    const {
        error
    } = Joi.validate(updateUniAdm, schema)
    if (error) {
        mensajes.switchError(error, res)
    } else {
        buscar.idUniAdm(req.params.id)
            .then(oldUniAdm => {
                if (oldUniAdm) {
                    existe.idInstancia(updateUniAdm.idInstancia)
                        .then(existeID => {
                            if (existeID) {
                                req.updateUniAdm = updateUniAdm
                                req.oldUniAdm = oldUniAdm
                                next()
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
                        msg: 'Unidad Administrativa no encontrada.'
                    })
                }
            })
    }
}

const datosCuerpo = (req) => {
    const idInstancia = req.body.uniadm.idInstancia,
        nombre = req.body.uniadm.nombre,
        activo = req.body.uniadm.activo
    const datosUniAdm = {
        idInstancia: idInstancia,
        nombre: nombre,
        activo: activo
    }
    return datosUniAdm
}