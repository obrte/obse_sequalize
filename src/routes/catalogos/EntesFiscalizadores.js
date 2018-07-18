// const express = require('express')
// const router = express.Router()

const EntesFiscalizadoresPolicies = require('../../policies/catalogos/EntesFiscalizadoresPolicies')
const EntesFiscalizadoresController = require('../../controllers/catalogos/EnteFiscalizadorController')

module.exports = (router) => {
// POST single
router.post('/entes_fiscalizadores', EntesFiscalizadoresPolicies.registro, EntesFiscalizadoresController.crear)

// GET all
router.get('/entes_fiscalizadores', EntesFiscalizadoresController.verTodos)

// GET one by id
router.get('/entes_fiscalizadores/:id', EntesFiscalizadoresController.verId)

// PATCH single
router.patch('/entes_fiscalizadores/:id', EntesFiscalizadoresPolicies.actualizar, EntesFiscalizadoresController.actualizar)

// DELETE single
router.delete('/entes_fiscalizadores/:id', EntesFiscalizadoresController.eliminar)
}
//module.exports = router