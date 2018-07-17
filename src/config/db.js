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

//Relaciones
db.catFondos.belongsTo(db.catOrganizaciones, {
    foreignKey: 'id_organizacion'
})
//db.catOrganizaciones.hasMany(db.catFondos) <--- hace lo mismo que la linea de arriba
db.catEntesFiscalizadores.belongsTo(db.catOrganizaciones, {
    foreignKey: 'id_organizacion'
})
db.catInstancias.belongsTo(db.catOrganizaciones, {
    foreignKey: 'id_organizacion'
})
db.catInstanciaFondos.belongsTo(db.catInstancias, {
    foreignKey: 'id_instancia'
})
db.catInstanciaFondos.belongsTo(db.catFondos, {
    foreignKey: 'id_fondo'
})

module.exports = db