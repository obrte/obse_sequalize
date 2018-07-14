const Joi = require('joi')
const db = require('../../config/db')
const Op = db.Sequelize.Op
const buscar = require('../../customFunction/Buscar')
const mensajes = require('../../customFunction/Mensajes')

const schema = {
    nombre: Joi.string().required(),
    nombre_corto: Joi.string().required(),
    activo: Joi.number().integer().required()
}

/*
esta funcion valida que los campos que se van a registrar no esten vacios 
y que la organizacion no esté capturada
*/
exports.registro = (req, res, next) => {
    //! la funcion datosCuerpo se encuentra al final del archivo
    const nuevaOrganizacion = datosCuerpo(req)
    const {
        error
    } = Joi.validate(nuevaOrganizacion, schema)

    if (error) {
        mensajes.switchError(error, res)
    } else {
        //verificar que no exista ya una organizacion con el mismo nombre(largo y corto)
        db.catOrganizaciones.findOne({
                where: {
                    [Op.or]: [{
                            nombre: nuevaOrganizacion.nombre
                        },
                        {
                            nombre_corto: nuevaOrganizacion.nombre_corto
                        }
                    ]
                }
            })
            .then(organizacion => {
                if (organizacion) {
                    res.status(400).json({
                        status: 'error',
                        msg: 'El nombre o nombre corto ya existe.'
                    })
                } else {
                    req.nuevaOrganizacion = nuevaOrganizacion
                    next()
                }
            })
    }
}

/*
esta funcion valida que los campos que se van a actualizar no esten vacios 
y que la organizacion no esté capturada
*/
exports.actualizar = (req, res, next) => {
    //! la funcion datosCuerpo se encuentra al final del archivo    
    const actualizarOrganizacion = datosCuerpo(req)
    const {
        error
    } = Joi.validate(actualizarOrganizacion, schema)

    if (error) {
        mensajes.switchError(error, res)
    } else {
        const id = req.params.id
        buscar.IdOrganizacion(id)
            .then(existe => {
                if (existe) {
                    db.catOrganizaciones.findOne({
                            where: {
                                [Op.or]: [{
                                        nombre: actualizarOrganizacion.nombre
                                    },
                                    {
                                        nombre_corto: actualizarOrganizacion.nombre_corto
                                    }
                                ],
                                id_organizacion: {
                                    [Op.ne]: id
                                }
                            }
                        })
                        .then(errorOrganizacion => {
                            console.log('errorOrganizacion')
                            if (errorOrganizacion) {
                                res.status(400).json({
                                    status: 'error',
                                    msg: 'El nombre o nombre corto ya existe.'
                                })
                            } else {
                                req.actualizarOrganizacion = actualizarOrganizacion
                                req.organizacionExistente = existe
                                next()
                            }
                        })
                } else {
                    res.status(400).json({
                        status: 'error',
                        msg: 'No se pudo actualizar'
                    })
                }
            })
            .catch(err =>
                res.status(400).json({
                    status: 'error',
                    msg: 'No se pudo actualizar',
                    error: err
                })
            )
    }
}

const datosCuerpo = (req) => {
    const nombre = req.body.nombre,
        nombre_corto = req.body.nombre_corto,
        activo = req.body.activo
    const datosOrganizacion = {
        nombre: nombre,
        nombre_corto: nombre_corto,
        activo: activo
    }
    return datosOrganizacion
}