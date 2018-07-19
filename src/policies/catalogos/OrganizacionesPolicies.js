const Joi = require('joi')
const db = require('../../config/db')
const Op = db.Sequelize.Op
const buscar = require('../../customFunction/Buscar')
const mensajes = require('../../customFunction/Mensajes')

const schema = {
    nombre: Joi.string().required(),
    nombreCorto: Joi.string().required()
}

/*
esta funcion valida que los campos que se van a registrar no esten vacios 
y que la organizacion no esté capturada
*/

exports.test = (req, res) => {
    var llaves = Object.keys(req.body)
    llaves.forEach((item) => {
        if(req.body[item] == ""){
            res.status(400).json({
                status: 'error',
                msg: 'Debe proporcionar el dato ' + item + '.'
            })
        } 
    })
    
}

exports.crear = (req, res, next) => {
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
                            nombreCorto: nuevaOrganizacion.nombreCorto
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
    
    const updateOrganizacion = datosCuerpo(req)
    const {
        error
    } = Joi.validate(updateOrganizacion, schema)

    if (error) {
        mensajes.switchError(error, res)
    } else {
        const id = req.params.id
        buscar.idOrganizacion(id)
            .then(oldOrganizacion => {
                if (oldOrganizacion) {
                    db.catOrganizaciones.findOne({
                            where: {
                                [Op.or]: [{
                                        nombre: updateOrganizacion.nombre
                                    },
                                    {
                                        nombreCorto: updateOrganizacion.nombreCorto
                                    }
                                ],
                                idOrganizacion: {
                                    [Op.ne]: id
                                }
                            }
                        })
                        .then(errorOrganizacion => {
                            if (errorOrganizacion) {
                                res.status(400).json({
                                    status: 'error',
                                    msg: 'El nombre o nombre corto ya existe.'
                                })
                            } else {
                                req.updateOrganizacion = updateOrganizacion
                                req.oldOrganizacion = oldOrganizacion
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
        nombreCorto = req.body.nombreCorto,
        activo = req.body.activo
    const datosOrganizacion = {
        nombre: nombre,
        nombreCorto: nombreCorto,
        activo: activo
    }
    return datosOrganizacion
}