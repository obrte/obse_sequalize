// const express = require('express')
// const router = express.Router()

const InstanciaFondosPolicies = require('../../policies/catalogos/InstanciaFondosPolicies')
const InstanciaFondosController = require('../../controllers/catalogos/InstanciaFondosController')

module.exports = (router) => {

// POST single
router.post('/instancia_fondos', InstanciaFondosPolicies.registro, InstanciaFondosController.crear)

// GET all
router.get('/instancia_fondos', InstanciaFondosController.verTodos)

// GET one by id
router.get('/instancia_fondos/:id', InstanciaFondosController.verId)

// PATCH single
router.patch('/instancia_fondos/:id', InstanciaFondosPolicies.actualizar, InstanciaFondosController.actualizar)

// DELETE single
router.delete('/instancia_fondos/:id', InstanciaFondosController.eliminar)
}
//module.exports = router