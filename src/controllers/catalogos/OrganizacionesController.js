const db = require('../../config/db')

//POST single Catalogo/Organizaciones
exports.crear = (req, res) => {
    db.catOrganizaciones.create({
            nombre: req.body.nombre,
            nombre_corto: req.body.nombre_corto,
            activo: req.body.activo
        })
        .then(nuevaOrganizacion => {
            res.status(200).json(nuevaOrganizacion)
        })
}

// GET all Catalogo/Organizaciones
exports.verTodos = (req, res) => {
    db.catOrganizaciones.findAll()
        .then(organizaciones => {
            res.json(organizaciones);
        })
        .catch(function (err) {
            // print the error details
            console.log(err);
        })
}

// GET one Catalogo/Organizaciones por id
exports.verID = (req, res) => {
    db.catOrganizaciones.find({
            where: {
                id_organizacion: req.params.id
            }
        })
        .then(organizaciones => {
            if (organizaciones != null) {
                res.json(organizaciones)
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
    let updates = {
        nombre: req.body.nombre,
        nombre_corto: req.body.nombre_corto,
        activo: req.body.activo
    }
    req.editarOrganizacion.updateAttributes(updates)
        .then(organizacionActualizada => {
            res.json(organizacionActualizada);
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