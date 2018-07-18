/*
 ! CONECCION A LA DB
 ! USANDO MySQL-Sequalize
 new Sequelize('database', 'username', 'password', {
*/
const Sequelize = require('sequelize')
const sequelize = new Sequelize('observaciones_bd', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})


//Objeto db que contendrá todos los modelos/tablas de la Base de Datos
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

//modelos
db.catOrganizaciones = require('../models/catalogos/Organizaciones')(sequelize, Sequelize)
db.catFondos = require('../models/catalogos/Fondos')(sequelize, Sequelize)
db.catEntesFiscalizadores = require('../models/catalogos/EntesFiscalizadores')(sequelize, Sequelize)
db.catInstancias = require('../models/catalogos/Instancias')(sequelize, Sequelize)
db.catInstanciaFondos = require('../models/catalogos/InstanciaFondos')(sequelize, Sequelize)
db.catInstanciaEntes = require('../models/catalogos/InstanciaEntes')(sequelize, Sequelize)
db.catUniAdm = require('../models/catalogos/UniAdm')(sequelize, Sequelize)
db.catUsuarios = require('../models/catalogos/Usuarios')(sequelize, Sequelize)

/** 
*!Relaciones
**/

//catalogo_fondos/catalogo_organizacion(id_organizacion)
db.catFondos.belongsTo(db.catOrganizaciones, {
    foreignKey: 'id_organizacion'
})
//catalogo_entes_fiscalizadores/catalogo_organizacion(id_organizacion)
db.catEntesFiscalizadores.belongsTo(db.catOrganizaciones, {
    foreignKey: 'id_organizacion'
})
//catalogo_instancias/catalogo_organizacion(id_organizacion)
db.catInstancias.belongsTo(db.catOrganizaciones, {
    foreignKey: 'id_organizacion'
})
//catalogo_instancia_fondos/catalogo_instancias/catalogo_fondos(id_instancia/id_fondo)
db.catInstanciaFondos.belongsTo(db.catInstancias, {
    foreignKey: 'id_instancia'
})
db.catInstanciaFondos.belongsTo(db.catFondos, {
    foreignKey: 'id_fondo'
})
//catalogo_instancia_entes/catalogo_instancias/catalogo_entes_fiscalizadores(id_instancia/id_ente)
db.catInstanciaFondos.belongsTo(db.catInstancias, {
    foreignKey: 'id_instancia'
})
db.catInstanciaFondos.belongsTo(db.catEntesFiscalizadores, {
    foreignKey: 'id_ente'
})
//catalogo_uniadm/catalogo_instancia(id_instancia)
db.catUniAdm.belongsTo(db.catInstancias, {
    foreignKey: 'id_instancia'
})
/**
 * catalogo_usuarios/catalogo_organizaciones/catalogo_instancia/catalogo_uniadm
 * (id_organizacion/id_instancia/id_uniadm)
**/
db.catUsuarios.belongsTo(db.catOrganizaciones, {
    foreignKey: 'id_organizacion'
})
db.catUsuarios.belongsTo(db.catInstancias, {
    foreignKey: 'id_instancia'
})
db.catUsuarios.belongsTo(db.catUniAdm, {
    foreignKey: 'id_uniadm'
})

module.exports = db