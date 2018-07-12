const express = require('express')
const router = express.Router()

const FondosPolices = require('../../policies/catalogos/FondosPolicies')
const FondosController = require('../../controllers/catalogos/FondosController')


// POST single catalogo/Fondo
router.post('/', FondosPolices.registro, FondosController.crear)

// GET all catalogo/Fondo
router.get('/', FondosController.verTodos)

// GET one catalogo/Fondo by id
router.get('/:id', FondosController.verID)

// PATCH single catalogo/Fondo
router.patch('/:id', FondosPolices.actualizar, FondosController.actualizar)

// DELETE single catalogo/Fondo
router.delete('/:id', FondosController.eliminar)

module.exports = router