const UniAdmPolicies = require('../../policies/catalogos/UniAdmPolicies')
const UniAdmController = require('../../controllers/catalogos/UniAdmController')

module.exports = (router) => {
// POST single
router.post('/uniadm', UniAdmPolicies.registro, UniAdmController.crear)

// GET all
router.get('/uniadm', UniAdmController.verTodos)

// GET one by id
router.get('/uniadm/:id', UniAdmController.verId)

// PATCH single
router.patch('/uniadm/:id', UniAdmPolicies.actualizar, UniAdmController.actualizar)

// DELETE single
router.delete('/uniadm/:id', UniAdmController.eliminar)
}