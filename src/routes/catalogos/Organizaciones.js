const OrganizacionPolicies = require('../../policies/catalogos/OrganizacionesPolicies')
const OrganizacionesController = require('../../controllers/catalogos/OrganizacionesController')

module.exports = (router) => {
// POST single
router.post('/organizaciones', OrganizacionPolicies.crear, OrganizacionesController.crear)

router.post('/test', OrganizacionPolicies.test)

// GET all
router.get('/organizaciones', OrganizacionesController.verTodos)

// GET one by id
router.get('/organizaciones/:id', OrganizacionesController.verId)

// PATCH single
router.patch('/organizaciones/:id', OrganizacionPolicies.actualizar, OrganizacionesController.actualizar)

// DELETE single
router.delete('/organizaciones/:id', OrganizacionesController.eliminar)

//Patch Activo
router.patch('/organizaciones/activo/:id', OrganizacionesController.activo)
}