const express = require('express')
const router = express.Router()

const OrganizacionPolices = require('../../policies/catalogos/OrganizacionesPolices')
const OrganizacionesController = require('../../controllers/catalogos/OrganizacionesController')


// POST single catalogo/Organizaciones
router.post('/', OrganizacionPolices.registro, OrganizacionesController.crear)

// GET all catalogo/Organizaciones
router.get('/', OrganizacionesController.verTodos)

// GET one catalogo/Organizaciones by id
router.get('/:id', OrganizacionesController.verID)

// PATCH single catalogo/Organizaciones
router.patch('/:id', OrganizacionPolices.actualizar, OrganizacionesController.actualizar)

// DELETE single catalogo/Organizaciones
router.delete('/:id', OrganizacionesController.eliminar)

module.exports = router