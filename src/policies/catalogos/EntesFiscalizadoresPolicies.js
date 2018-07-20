const Joi = require('joi')
const db = require('../../config/db')
const Op = db.Sequelize.Op
const mensajes = require('../../customFunction/Mensajes')
const existe = require('../../customFunction/Existe')

const schema = {
    idOrganizacion: Joi.string().required(),
    nombre: Joi.string().required()
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
        const id = nuevoEnteFiscalizador.idOrganizacion
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
                    idEnte: id
                },
                nombre: {
                    [Op.ne]: updateEnteFiscalizador.nombre
                }
            })
            .then(oldEnteFiscalizador => {
                if (oldEnteFiscalizador) {
                    existe.idOrganizacion(updateEnteFiscalizador.idOrganizacion)
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
    const idOrganizacion = req.body.ente.idOrganizacion,
        nombre = req.body.ente.nombre,
        activo = req.body.ente.activo
    const datosEnteFiscalizador = {
        idOrganizacion: idOrganizacion,
        nombre: nombre,
        activo: activo
    }
    return datosEnteFiscalizador
}