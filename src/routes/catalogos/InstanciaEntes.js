// const express = require('express')
// const router = express.Router()

const InstanciaEntesPolicies = require('../../policies/catalogos/InstanciaEntesPolicies')
const InstanciaEntesController = require('../../controllers/catalogos/InstanciaEntesController')

module.exports = (router) => {
// POST single
router.post('/instancia_entes', InstanciaEntesPolicies.registro, InstanciaEntesController.crear)

// GET all
router.get('/instancia_entes', InstanciaEntesController.verTodos)

// GET one by id
router.get('/instancia_entes/:id', InstanciaEntesController.verId)

// PATCH single
router.patch('/instancia_entes/:id', InstanciaEntesPolicies.actualizar, InstanciaEntesController.actualizar)

// DELETE single
router.delete('/instancia_entes/:id', InstanciaEntesController.eliminar)
}
//module.exports = router