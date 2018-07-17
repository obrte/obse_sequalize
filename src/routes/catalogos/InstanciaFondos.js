const express = require('express')
const router = express.Router()

const InstanciaFondosPolices = require('../../policies/catalogos/InstanciaFondosPolices')
const InstanciaFondosController = require('../../controllers/catalogos/InstanciaFondosController')


// POST single catalogo/Fondo
router.post('/', InstanciaFondosPolices.registro, InstanciaFondosController.crear)

// GET all catalogo/Fondo
router.get('/', InstanciaFondosController.verTodos)

// GET one catalogo/Fondo by id
router.get('/:id', InstanciaFondosController.verID)

// PATCH single catalogo/Fondo
router.patch('/:id', InstanciaFondosPolices.actualizar, InstanciaFondosController.actualizar)

// DELETE single catalogo/Fondo
router.delete('/:id', InstanciaFondosController.eliminar)

module.exports = router