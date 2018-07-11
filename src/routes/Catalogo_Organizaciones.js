const express = require('express')
const router = express.Router()

const Catalogo_Organizaciones_Controller = require('../controllers/Cat_Organizaciones_Controller')


// POST single Catalogo_Organizaciones
router.post('/', Catalogo_Organizaciones_Controller.crear)

// GET all Catalogo_Organizaciones
router.get('/', Catalogo_Organizaciones_Controller.verTodos)

// // GET one Catalogo_Organizaciones by id
// router.get('/catalogo_organizaciones/:id', Catalogo_Organizaciones_Controller.verID)

// // PATCH single Catalogo_Organizaciones
// router.patch('/catalogo_organizaciones/:id', Catalogo_Organizaciones_Controller.actualizar)

// // DELETE single Catalogo_Organizaciones
// router.delete('/catalogo_organizaciones/:id', Catalogo_Organizaciones_Controller.eliminar)

module.exports = router