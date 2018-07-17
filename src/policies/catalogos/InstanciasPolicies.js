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
    const nuevaInstancia = datosCuerpo(req)
    const {
        error
    } = Joi.validate(nuevaInstancia, schema)
    if (error) {
        mensajes.switchError(error, res)
    } else {
        const id = nuevaInstancia.id_organizacion
        existe.idOrganizacion(id)
            .then(existeID => {
                if (existeID) {
                    req.nuevaInstancia = nuevaInstancia
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
    const updateInstancia = datosCuerpo(req)
    const {
        error
    } = Joi.validate(updateInstancia, schema)
    if (error) {
        mensajes.switchError(error, res)
    } else {
        const id = req.params.id
        db.catInstancias.find({
                where: {
                    id_instancia: id
                },
                nombre: {
                    [Op.ne]: updateInstancia.nombre
                }
            })
            .then(oldInstancia => {
                if (oldInstancia) {
                    existe.idOrganizacion(updateInstancia.id_organizacion)
                        .then(existeID => {
                            if (existeID) {
                                //oldInstancia contiene todos los datos actualmente guardados en la tabla de catalogo_instancias
                                //updateInstancia contiene los nuevos datos que se actualizarán
                                req.updateInstancia = updateInstancia
                                req.oldInstancia = oldInstancia
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
    const datosInstancia = {
        id_organizacion: id_organizacion,
        nombre: nombre,
        activo: activo
    }
    return datosInstancia
}