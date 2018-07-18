// const express = require('express')
// const router = express.Router()

const FondosPolicies = require('../../policies/catalogos/FondosPolicies')
const FondosController = require('../../controllers/catalogos/FondosController')

module.exports = (router) => {
// POST single
router.post('/fondos', FondosPolicies.registro, FondosController.crear)

// GET all
router.get('/fondos', FondosController.verTodos)

// GET one by id
router.get('/fondos/:id', FondosController.verId)

// PATCH single
router.patch('/fondos/:id', FondosPolicies.actualizar, FondosController.actualizar)

// DELETE single
router.delete('/fondos/:id', FondosController.eliminar)
}
//module.exports = router