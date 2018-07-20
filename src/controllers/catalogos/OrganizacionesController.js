const db = require('../../config/db')
const buscar = require('../../customFunction/Buscar')

//POST single
exports.crear = (req, res) => {
    db.catOrganizaciones.create(req.nuevaOrganizacion)
        .then(nuevaOrganizacion => {
            res.status(200).json(nuevaOrganizacion)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({
                status: 'error',
                msg: 'Error al crear',
                error: err
            })
        })
}

// GET all
exports.verTodos = (req, res) => {
    db.catOrganizaciones.findAll()
        .then(organizaciones => {
            res.status(200).json(organizaciones)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({
                status: 'error',
                msg: 'No encontrado',
                error: err
            })
        })
}

// GET one por id
exports.verId = (req, res) => {
    buscar.idOrganizacion(req.params.id)
        .then(organizacion => {
            if (organizacion) {
                res.status(200).json(organizacion)
            } else {
                res.status(400).json({
                    status: 'error',
                    msg: 'No encontrado'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({
                status: 'error',
                msg: 'Error al buscar',
                error: err
            })
        })
}

// PATCH single
exports.actualizar = (req, res) => {
    req.oldOrganizacion.updateAttributes(req.updateOrganizacion)
        .then(organizacionActualizada => {
            res.json(organizacionActualizada)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({
                status: 'error',
                msg: 'Error al actualizar',
                error: err
            })
        })
}

// DELETE single
exports.eliminar = (req, res) => {
    db.catOrganizaciones.destroy({
        where: {
            idOrganizacion: req.params.id
        }
    })
        .then(organizacionEliminada => {
            if (organizacionEliminada == 1) {
                res.status(200).json({
                    status: 'success',
                    msg: 'Eliminación exitosa'
                })
            } else {
                res.status(400).json({
                    status: 'error',
                    msg: 'No encontrado'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({
                status: 'error',
                msg: 'Error al eliminar',
                error: err
            })
        })
}