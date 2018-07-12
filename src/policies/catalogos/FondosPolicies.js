const Joi = require('joi')
const db = require('../../config/db')
const Op = db.Sequelize.Op


//validar que los campos no esten vacios
exports.registro = (req, res, next) => {
    const schema = {
        id_organizacion: Joi.string().required(),
        nombre: Joi.string().required(),
        origen: Joi.number().integer().required(),
        activo: Joi.number().integer().required()
    }
    const id_organizacion = req.body.id_organizacion,
        nombre = req.body.nombre,
        origen = req.body.origen,
        activo = req.body.activo
    const nuevoFondo = {
        id_organizacion: id_organizacion,
        nombre: nombre,
        origen: origen,
        activo: activo
    }
    const {
        error
    } = Joi.validate(nuevoFondo, schema)

    if (error) {
        switch (error.details[0].context.key) {
            case 'id_organizacion':
                res.status(400).json({
                    status: 'error',
                    msg: 'Debe introducir la organizacion.'
                })
                break
            case 'nombre':
                res.status(400).json({
                    status: 'error',
                    msg: 'Debe introducir un nombre.'
                })
                break
            case 'origen':
                res.status(400).json({
                    status: 'error',
                    msg: 'Debe proporcionar el origen.'
                })
                break
            case 'activo':
                res.status(400).json({
                    status: 'error',
                    msg: 'Debe proporcionar el campo activo.'
                })
                break
        }
    } else {
        db.catOrganizaciones.find({
                where: {
                    id_organizacion: id_organizacion
                }
            })
            .then(organizacion => {
                if (organizacion != null) {
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
    const schema = {
        id_organizacion: Joi.string().required(),
        nombre: Joi.string().required(),
        origen: Joi.number().integer().required(),
        activo: Joi.number().integer().required()
    }
    const id_organizacion = req.body.id_organizacion,
        nombre = req.body.nombre,
        origen = req.body.origen,
        activo = req.body.activo
    const actualizarFondo = {
        id_organizacion: id_organizacion,
        nombre: nombre,
        origen: origen,
        activo: activo
    }
    const {
        error
    } = Joi.validate(actualizarFondo, schema)

    if (error) {
        switch (error.details[0].context.key) {
            case 'id_organizacion':
                res.status(400).json({
                    status: 'error',
                    msg: 'Debe introducir la organizacion.'
                })
                break
            case 'nombre':
                res.status(400).json({
                    status: 'error',
                    msg: 'Debe introducir un nombre.'
                })
                break
            case 'origen':
                res.status(400).json({
                    status: 'error',
                    msg: 'Debe proporcionar el origen.'
                })
                break
            case 'activo':
                res.status(400).json({
                    status: 'error',
                    msg: 'Debe proporcionar el campo activo.'
                })
                break
        }
    } else {
        const id = req.params.id
        db.catFondos.find({
                where: {
                    id_fondo: id
                }
            })
            .then(editarFondo => {
                if (editarFondo != null) {
                    db.catOrganizaciones.find({
                            where: {
                                id_organizacion: id_organizacion
                            }
                        })
                        .then(organizacion => {
                            if (organizacion != null) {
                                //editarFondo contiene todos los datos actualmente guardados en la tabla de catalogo_fondos
                                //actualizarFondo contiene los nuevos datos que se actualizarán
                                req.actualizarFondo = actualizarFondo
                                req.editarFondo = editarFondo
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