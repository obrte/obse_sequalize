const db = require('../../config/db')
const buscar = require('../../customFunction/Buscar')

//POST single
exports.crear = (req, res) => {
    db.catEntesFiscalizadores.create(req.nuevoEnteFiscalizador)
        .then(nuevoEnteFiscalizador => {
            res.status(200).json(nuevoEnteFiscalizador)
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
    db.catEntesFiscalizadores.findAll()
        .then(entesFiscalizadores => {
            res.status(200).json(entesFiscalizadores)
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
    buscar.idEnteFiscalizador(req.params.id)
        .then(enteFiscalizador => {
            if (enteFiscalizador) {
                res.status(200).json(enteFiscalizador)
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
    req.oldEnteFiscalizador.updateAttributes(req.updateEnteFiscalizador)
        .then(enteFiscalizadorActualizado => {
            res.json(enteFiscalizadorActualizado)
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
    db.catEntesFiscalizadores.destroy({
            where: {
                id_ente: req.params.id
            }
        })
        .then(enteFiscalizadorEliminado => {
            if (enteFiscalizadorEliminado == 1) {
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