const Joi = require('joi')
const db = require('../../config/db')
const Op = db.Sequelize.Op

exports.registro = (req, res, next) => {
    const schema = {
        nombre: Joi.string().required(),
        nombre_corto: Joi.string().required(),
        activo: Joi.number().integer().required()
    }
    const {
        error
    } = Joi.validate({
        nombre: req.body.nombre,
        nombre_corto: req.body.nombre_corto,
        activo: req.body.activo
    }, schema)

    if (error) {
        switch (error.details[0].context.key) {
            case 'nombre':
                res.status(400).json({
                    status: 'error',
                    msg: 'Debe introducir el nombre.'
                })
                break
            case 'nombre_corto':
                res.status(400).json({
                    status: 'error',
                    msg: 'Debe introducir un nombre corto.'
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
        db.catOrganizaciones.findOne({
                where: {
                    [Op.or]: [{
                            nombre: req.body.nombre
                        },
                        {
                            nombre_corto: req.body.nombre_corto
                        }
                    ]
                }
            })
            .then(organizacion => {
                if (organizacion != null) {
                    res.status(400).json({
                        status: 'error',
                        msg: 'El nombre o nombre corto ya existe.'
                    })
                } else {
                    next()
                }
            })
    }
}

exports.actualizar = (req, res, next) => {
    const schema = {
        nombre: Joi.string().required(),
        nombre_corto: Joi.string().required(),
        activo: Joi.number().integer().required()
    }
    const {
        error
    } = Joi.validate({
        nombre: req.body.nombre,
        nombre_corto: req.body.nombre_corto,
        activo: req.body.activo
    }, schema)

    if (error) {
        switch (error.details[0].context.key) {
            case 'nombre':
                res.status(400).json({
                    status: 'error',
                    msg: 'Debe introducir el nombre.'
                })
                break
            case 'nombre_corto':
                res.status(400).json({
                    status: 'error',
                    msg: 'Debe introducir un nombre corto.'
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
        db.catOrganizaciones.find({
                where: {
                    id_organizacion: id
                }
            })
            .then(editarOrganizacion => {
                if (editarOrganizacion != null) {
                    //compara que los valores que se quieren actualizar, no existen en otro registro
                    db.catOrganizaciones.findOne({
                            where: {
                                [Op.or]: [{
                                        nombre: req.body.nombre
                                    },
                                    {
                                        nombre_corto: req.body.nombre_corto
                                    }
                                ],
                                id_organizacion: {
                                    [Op.ne]: id
                                }
                            }
                        })
                        .then(errorOrganizacion => {
                            if (errorOrganizacion != null) {
                                res.status(400).json({
                                    status: 'error',
                                    msg: 'El nombre o nombre corto ya existe.'
                                })
                            } else {
                                req.editarOrganizacion = editarOrganizacion
                                next()
                            }
                        })
                } else {
                    res.status(400).json({
                        status: 'error',
                        msg: 'No encontrado'
                    })
                }
            })
    }
}