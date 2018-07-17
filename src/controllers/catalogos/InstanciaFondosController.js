const db = require('../../config/db')
const buscar = require('../../customFunction/Buscar')

//POST single Catalogo/Organizaciones
exports.crear = (req, res) => {
    db.catInstanciaFondos.create(req.nuevaInstanciaFondos)
        .then(nuevaInstanciaFondos => {
            res.status(200).json(nuevaInstanciaFondos)
        })
}

// GET all Catalogo/Organizaciones
exports.verTodos = (req, res) => {
    db.catInstanciaFondos.findAll()
        .then(instanciasFondos => {
            res.status(200).json(instanciasFondos)
        })
        .catch(err => {
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
    buscar.idInstanciaFondos(req.params.id)
        .then(instanciaFondos => {
            if (instanciaFondos) {
                res.status(200).json(instanciaFondos)
            } else {
                res.status(400).json({
                    status: 'error',
                    msg: 'No encontrado'
                })
            }
        })
        .catch(err => {
            // print the error details
            console.log(err)
            res.status(400).json({
                status: 'error',
                msg: 'No encontrado',
                error: err
            })
        })
}

// PATCH single Catalogo/Organizaciones
exports.actualizar = (req, res) => {
    req.oldInstanciaFondos.updateAttributes(req.updateInstanciaFondos)
        .then(instanciaFondosActualizado => {
            res.json(instanciaFondosActualizado)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({
                status: 'error',
                msg: 'Fallo al actualizar',
                error: err
            })
        })
}

// DELETE single Catalogo/Organizaciones
exports.eliminar = (req, res) => {
    db.catInstanciaFondos.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(instanciaFondosEliminado => {
            if (instanciaFondosEliminado == 1) {
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