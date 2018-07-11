//const Catalogo_Organizaciones = require('../models/Catalogo_Organizaciones')
const db = require('../config/db')

// POST single Catalogo_Organizaciones
exports.crear = (req, res) => {
    const nombre = req.body.nombre;
    //Busca primero si existe alguna organización con ese nombre
    db.Catalogo_Organizaciones.findAll({
            where: {
                nombre: nombre
            }
        })
        .exect()
        .then(organizacion => {
            //si existe regresa error de existencia, de lo contrario intenta la nueva creación
            if (organizacion >= 1) {
                return res.status(409).json({
                    status: 'error',
                    msg: 'Ya existe una Organización con ese nombre'
                })
            } else {
                const nombre_corto = req.body.nombre_corto
                const activo = req.body.activo
                db.Catalogo_Organizaciones.create({
                        nombre: nombre,
                        nombre_corto: nombre_corto,
                        activo: activo
                    }, (err, nuevaOrganizacion))
                    .then(nuevaOrganizacion => {
                        res.json(nuevaOrganizacion)
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({
                            error: err
                        })
                    })
            }
        })
}

// GET all Catalogo_Organizaciones
exports.verTodos = (req, res) => {
    db.Catalogo_Organizaciones.findAll()
        .then(Catalogo_Organizaciones => {
            res.json(Catalogo_Organizaciones);
        })
}

// // GET one Catalogo_Organizaciones by id
// exports.verID = (req, res) => {
//     const id = req.params.id;
//     db.Catalogo_Organizaciones.find({
//             where: {
//                 id: id
//             }
//         })
//         .then(Catalogo_Organizaciones => {
//             res.json(Catalogo_Organizaciones);
//         })
// }

// // PATCH single Catalogo_Organizaciones
// exports.actualizar = (req, res) => {
//     const id = req.params.id
//     let updates = {
//         nombre: req.body.nombre,
//         nombre_corto: req.body.nombre_corto,
//         activo: req.body.activo
//     }
//     db.Catalogo_Organizaciones.find({
//             where: {
//                 id: id
//             }
//         })
//         .then(Catalogo_Organizaciones => {
//             return Catalogo_Organizaciones.updateAttributes(updates)
//         })
//         .then(organizacionActualizada => {
//             res.json(organizacionActualizada);
//         })
// }

// // DELETE single Catalogo_Organizaciones
// exports.eliminar = (req, res) => {
//     const id = req.params.id;
//     db.Catalogo_Organizaciones.destroy({
//             where: {
//                 id: id
//             }
//         })
//         .then(organizacionEliminada => {
//             res.json(organizacionEliminada)
//         })
// }