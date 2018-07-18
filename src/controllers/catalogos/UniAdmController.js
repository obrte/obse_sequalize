const db = require('../../config/db')
const buscar = require('../../customFunction/Buscar')

//POST single
exports.crear = (req, res) => {
    db.catUniAdm.create(req.nuevaUniAdm)
        .then(nuevaUniAdm => {
            res.status(200).json(nuevaUniAdm)
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
    db.catUniAdm.findAll()
        .then(uniAdms => {
            res.status(200).json(uniAdms)
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
    buscar.idUniAdm(req.params.id)
        .then(uniAdm => {
            if (uniAdm) {
                res.status(200).json(uniAdm)
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
    req.oldUniAdm.updateAttributes(req.updateUniAdm)
        .then(uniAdmActualizada => {
            res.json(uniAdmActualizada)
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
    db.catUniAdm.destroy({
            where: {
                id_uniadm: req.params.id
            }
        })
        .then(uniAdmEliminada => {
            if (uniAdmEliminada == 1) {
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