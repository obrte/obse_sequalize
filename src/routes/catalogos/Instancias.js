const express = require('express')
const router = express.Router()

const InstanciasPolices = require('../../policies/catalogos/InstanciasPolicies')
const InstanciasController = require('../../controllers/catalogos/InstanciasController')


// POST single catalogo/Fondo
router.post('/', InstanciasPolices.registro, InstanciasController.crear)

// GET all catalogo/Fondo
router.get('/', InstanciasController.verTodos)

// GET one catalogo/Fondo by id
router.get('/:id', InstanciasController.verID)

// PATCH single catalogo/Fondo
router.patch('/:id', InstanciasPolices.actualizar, InstanciasController.actualizar)

// DELETE single catalogo/Fondo
router.delete('/:id', InstanciasController.eliminar)

module.exports = router