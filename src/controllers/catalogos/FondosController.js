const db = require('../../config/db')
const buscar = require('../../customFunction/Buscar')

//POST single
exports.crear = (req, res) => {
    db.catFondos.create(req.nuevoFondo)
        .then(nuevoFondo => {
            res.status(200).json(nuevoFondo)
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
    db.catFondos.findAll()
        .then(fondos => {
            res.status(200).json(fondos)
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

// GET one por id
exports.verId = (req, res) => {
    buscar.idFondo(req.params.id)
        .then(fondo => {
            if (fondo) {
                res.json(fondo)
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
    req.oldFondo.updateAttributes(req.updateFondo)
        .then(fondoActualizado => {
            res.json(fondoActualizado)
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
    db.catFondos.destroy({
            where: {
                idFondo: req.params.id
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
        .catch(err => {
            console.log(err)
            res.status(400).json({
                status: 'error',
                msg: 'Error al eliminar',
                error: err
            })
        })
}