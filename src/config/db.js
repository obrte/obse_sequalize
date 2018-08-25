/*
 ! CONECCION A LA DB
 ! USANDO MySQL-Sequalize
*/
const Sequelize = require('sequelize')
const conn = new Sequelize('observaciones', 'root', '12345678', {
	host: 'localhost',
	dialect: 'mysql',
	operatorsAliases: false,
	logging: false,
	define: {
		charset: 'utf8',
		collate: 'utf8_general_ci'
	},
	timezone: '-07:00',
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
db.conn = conn

//modelos
db.catOrganizaciones = require('../models/catalogos/Organizaciones')(conn, Sequelize)
db.catFondos = require('../models/catalogos/Fondos')(conn, Sequelize)
db.catEntesFiscalizadores = require('../models/catalogos/EntesFiscalizadores')(conn, Sequelize)
db.catInstancias = require('../models/catalogos/Instancias')(conn, Sequelize)
db.catInstanciaFondos = require('../models/catalogos/InstanciaFondos')(conn, Sequelize)
db.catInstanciaEntes = require('../models/catalogos/InstanciaEntes')(conn, Sequelize)
db.catUniAdm = require('../models/catalogos/UniAdm')(conn, Sequelize)
db.catUsuarios = require('../models/catalogos/Usuarios')(conn, Sequelize)
db.informes = require('../models/Informes')(conn, Sequelize)
db.oficios = require('../models/Oficios')(conn, Sequelize)


//! Asociaciones
Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db)
	}
})

module.exports = db