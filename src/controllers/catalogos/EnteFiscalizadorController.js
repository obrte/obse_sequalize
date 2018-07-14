const db = require('../../config/db')

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
            res.json(entesFiscalizadores)
        })
        .catch(function (err) {
            // print the error details
            console.log(err)
        })
}

// GET one Catalogo/Organizaciones por id
exports.verID = (req, res) => {
    db.catEntesFiscalizadores.find({
            where: {
                id_ente: req.params.id
            }
        })
        .then(enteFiscalizador => {
            if (enteFiscalizador != null) {
                res.json(enteFiscalizador)
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
    req.editarEnteFiscalizador.updateAttributes(req.actualizarEnteFiscalizador)
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