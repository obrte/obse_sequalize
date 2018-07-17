const db = require('../../config/db')
const buscar = require('../../customFunction/Buscar')

//POST single Catalogo/Organizaciones
exports.crear = (req, res) => {
    db.catFondos.create(req.nuevoFondo)
        .then(nuevoFondo => {
            res.status(200).json(nuevoFondo)
        })
}

// GET all Catalogo/Organizaciones
exports.verTodos = (req, res) => {
    db.catFondos.findAll()
        .then(fondos => {
            res.status(200).json(fondos)
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
    buscar.idFondo(req.params.id)
        .then(fondo => {
            if (fondo != null) {
                res.json(fondo)
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
    req.oldFondo.updateAttributes(req.updateFondo)
        .then(fondoActualizado => {
            res.json(fondoActualizado)
        })
}

// DELETE single Catalogo/Organizaciones
exports.eliminar = (req, res) => {
    db.catFondos.destroy({
            where: {
                id_fondo: req.params.id
            }
        })
        .then(fondoEliminado => {
            if (fondoEliminado == 1) {
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