const express = require('express')
const router = express.Router()

const EntesFiscalizadoresPolices = require('../../policies/catalogos/EntesFiscalizadoresPolicies')
const EntesFiscalizadoresController = require('../../controllers/catalogos/EnteFiscalizadorController')


// POST single catalogo/Fondo
router.post('/', EntesFiscalizadoresPolices.registro, EntesFiscalizadoresController.crear)

// GET all catalogo/Fondo
router.get('/', EntesFiscalizadoresController.verTodos)

// GET one catalogo/Fondo by id
router.get('/:id', EntesFiscalizadoresController.verID)

// PATCH single catalogo/Fondo
router.patch('/:id', EntesFiscalizadoresPolices.actualizar, EntesFiscalizadoresController.actualizar)

// DELETE single catalogo/Fondo
router.delete('/:id', EntesFiscalizadoresController.eliminar)

module.exports = router