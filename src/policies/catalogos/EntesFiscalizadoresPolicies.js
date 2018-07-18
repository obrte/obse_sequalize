const Joi = require('joi')
const db = require('../../config/db')
const Op = db.Sequelize.Op
const mensajes = require('../../customFunction/Mensajes')
const existe = require('../../customFunction/Existe')

const schema = {
    id_organizacion: Joi.string().required(),
    nombre: Joi.string().required(),
    activo: Joi.number().integer().required()
}

//validar que los campos no esten vacios
exports.registro = (req, res, next) => {
    const nuevoEnteFiscalizador = datosCuerpo(req)
    const {
        error
    } = Joi.validate(nuevoEnteFiscalizador, schema)
    if (error) {
        mensajes.switchError(error, res)
    } else {
        const id = nuevoEnteFiscalizador.id_organizacion
        existe.idOrganizacion(id)
            .then(existeID => {
                if (existeID) {
                    req.nuevoEnteFiscalizador = nuevoEnteFiscalizador
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
    const updateEnteFiscalizador = datosCuerpo(req)
    const {
        error
    } = Joi.validate(updateEnteFiscalizador, schema)
    if (error) {
        mensajes.switchError(error, res)
    } else {
        const id = req.params.id
        db.catEntesFiscalizadores.find({
                where: {
                    id_ente: id
                },
                nombre: {
                    [Op.ne]: updateEnteFiscalizador.nombre
                }
            })
            .then(oldEnteFiscalizador => {
                if (oldEnteFiscalizador) {
                    existe.idOrganizacion(updateEnteFiscalizador.id_organizacion)
                        .then(existeID => {
                            if (existeID) {
                                req.updateEnteFiscalizador = updateEnteFiscalizador
                                req.oldEnteFiscalizador = oldEnteFiscalizador
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
                        msg: 'Ente Fiscalizador no encontrado o ya se encuentra registrado para esta organizacion'
                    })
                }
            })
    }
}

const datosCuerpo = (req) => {
    const id_organizacion = req.body.id_organizacion,
        nombre = req.body.nombre,
        activo = req.body.activo
    const datosEnteFiscalizador = {
        id_organizacion: id_organizacion,
        nombre: nombre,
        activo: activo
    }
    return datosEnteFiscalizador
}