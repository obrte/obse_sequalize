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
    db.catInstancias.findAll()
        .then(instancias => {
            res.status(200).json(instancias)
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
    buscar.idInstancia(req.params.id)
        .then(instancia => {
            if (instancia) {
                res.status(200).json(instancia)
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
    req.oldInstancia.updateAttributes(req.updateInstancia)
        .then(instanciaActualizada => {
            res.json(instanciaActualizada)
        })
}

// DELETE single Catalogo/Organizaciones
exports.eliminar = (req, res) => {
    db.catInstancias.destroy({
            where: {
                id_instancia: req.params.id
            }
        })
        .then(instanciaEliminada => {
            if (instanciaEliminada == 1) {
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