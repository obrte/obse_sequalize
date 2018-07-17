const db = require('../../config/db')
const buscar = require('../../customFunction/Buscar')

//POST single Catalogo/Organizaciones
exports.crear = (req, res) => {
    db.catEntesFiscalizadores.create(req.nuevoEnteFiscalizador)
        .then(nuevoEnteFiscalizador => {
            res.status(200).json(nuevoEnteFiscalizador)
        })
}

// GET all Catalogo/Organizaciones
exports.verTodos = (req, res) => {
    db.catEntesFiscalizadores.findAll()
        .then(entesFiscalizadores => {
            res.status(200).json(entesFiscalizadores)
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
}

// PATCH single Catalogo/Organizaciones
exports.actualizar = (req, res) => {
    req.oldEnteFiscalizador.updateAttributes(req.newEnteFiscalizador)
        .then(enteFiscalizadorActualizado => {
            res.json(enteFiscalizadorActualizado)
        })
}

// DELETE single Catalogo/Organizaciones
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
}