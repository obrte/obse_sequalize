const db = require('../../config/db')
const buscar = require('../../customFunction/Buscar')

//POST single Catalogo/Organizaciones
exports.crear = (req, res) => {
    db.catOrganizaciones.create(req.nuevaOrganizacion)
        .then(nuevaOrganizacion => {
            res.status(200).json(nuevaOrganizacion)
        })
}

// GET all Catalogo/Organizaciones
exports.verTodos = (req, res) => {
    db.catOrganizaciones.findAll()
        .then(organizaciones => {
            res.status(200).json(organizaciones)
        })
        .catch(function (err) {
            // print the error details
            console.log(err)
            res.status(400).json({
                status: 'error',
                msg: 'No encontrado',
                error: err
            })
        })
}

// GET one Catalogo/Organizaciones por id
exports.verID = (req, res) => {
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
}

// PATCH single Catalogo/Organizaciones
exports.actualizar = (req, res) => {
    req.oldOrganizacion.updateAttributes(req.updateOrganizacion)
        .then(organizacionActualizada => {
            res.json(organizacionActualizada)
        })
}

// DELETE single Catalogo/Organizaciones
exports.eliminar = (req, res) => {
    db.catOrganizaciones.destroy({
            where: {
                id_organizacion: req.params.id
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
}