/*
 ! CONECCION A LA DB
 ! USANDO MySQL-Sequalize
 new Sequelize('database', 'username', 'password', {
*/
const Sequelize = require('sequelize')
const sequelize = new Sequelize('observaciones_bd', 'root', null, {
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


//Relaciones

module.exports = db