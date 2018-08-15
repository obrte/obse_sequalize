/*
 ! CONECCION A LA DB
 ! USANDO MySQL-Sequalize
*/
const Sequelize = require('sequelize')
const sequelize = new Sequelize('observaciones', 'root', '', {
	host: 'localhost',
	dialect: 'mysql',
	operatorsAliases: false,
	logging: false,
	define: {
		charset: 'utf8',
		collate: 'utf8_general_ci'
	},
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
db.catOrganizaciones = require('../models/catalogos/Organizaciones')(
	sequelize,
	Sequelize
)
db.catFondos = require('../models/catalogos/Fondos')(sequelize, Sequelize)
db.catEntesFiscalizadores = require('../models/catalogos/EntesFiscalizadores')(
	sequelize,
	Sequelize
)
db.catInstancias = require('../models/catalogos/Instancias')(
	sequelize,
	Sequelize
)
db.catInstanciaFondos = require('../models/catalogos/InstanciaFondos')(
	sequelize,
	Sequelize
)
db.catInstanciaEntes = require('../models/catalogos/InstanciaEntes')(
	sequelize,
	Sequelize
)
db.catUniAdm = require('../models/catalogos/UniAdm')(sequelize, Sequelize)
db.catUsuarios = require('../models/catalogos/Usuarios')(sequelize, Sequelize)
db.informes = require('../models/Informes')(sequelize, Sequelize)

/**
 *!Relaciones
 **/
//! Organizaciones/Fondos
db.catFondos.belongsTo(db.catOrganizaciones, {
	foreignKey: 'idOrganizacion',
	as: 'organizacion'
})
db.catOrganizaciones.hasMany(db.catFondos, {
	foreignKey: 'idOrganizacion',
	as: 'fondos'
})

//! Organizaciones/Entes
db.catEntesFiscalizadores.belongsTo(db.catOrganizaciones, {
	foreignKey: 'idOrganizacion',
	as: 'organizacion'
})
db.catOrganizaciones.hasMany(db.catEntesFiscalizadores, {
	foreignKey: 'idOrganizacion',
	as: 'entes'
})

//!Organizaciones/Instancias
db.catInstancias.belongsTo(db.catOrganizaciones, {
	foreignKey: 'idOrganizacion',
	as: 'organizacion'
})
db.catOrganizaciones.hasMany(db.catInstancias, {
	foreignKey: 'idOrganizacion',
	as: 'instancias'
})

//!  Instancias
//** InstanciaFondos
db.catInstanciaFondos.belongsTo(db.catInstancias, {
	foreignKey: 'idInstancia',
	as: 'instancia'
})
db.catInstanciaFondos.belongsTo(db.catFondos, {
	foreignKey: 'idFondo',
	as: 'fondo'
})
db.catInstancias.hasMany(db.catInstanciaFondos, {
	foreignKey: 'idInstancia',
	as: 'fondos'
})

//** InstanciaEntes
db.catInstanciaEntes.belongsTo(db.catInstancias, {
	foreignKey: 'idInstancia',
	as: 'instancia'
})
db.catInstanciaEntes.belongsTo(db.catEntesFiscalizadores, {
	foreignKey: 'idEnte',
	as: 'ente'
})
db.catInstancias.hasMany(db.catInstanciaEntes, {
	foreignKey: 'idInstancia',
	as: 'entes'
})

//! UniAdm
db.catUniAdm.belongsTo(db.catInstancias, {
	foreignKey: 'idInstancia',
	as: 'instancia'
})
db.catInstancias.hasMany(db.catUniAdm, {
	foreignKey: 'idInstancia',
	as: 'uniAdm'
})

//! Unsuarios
db.catUsuarios.belongsTo(db.catOrganizaciones, {
	foreignKey: 'idOrganizacion',
	as: 'organizacion'
})
db.catUsuarios.belongsTo(db.catInstancias, {
	foreignKey: 'idInstancia',
	as: 'instancia'
})
db.catUsuarios.belongsTo(db.catUniAdm, {
	foreignKey: 'idUniAdm',
	as: 'uniAdm'
})
db.catUsuarios.belongsTo(db.catUsuarios, {
	foreignKey: 'idUsuarioCreacion',
	as: 'creador'
})

//! Informes
db.informes.belongsTo(db.catUsuarios, {
	foreignKey: 'idUsuarioCreacion',
	as: 'usuarioCreacion'
})
db.informes.belongsTo(db.catEntesFiscalizadores, {
	foreignKey: 'idEnte',
	as: 'ente'
})
db.informes.belongsTo(db.catFondos, {
	foreignKey: 'idFondo',
	as: 'fondo'
})
db.informes.belongsTo(db.catInstancias, {
	foreignKey: 'idInstancia',
	as: 'instancia'
})

module.exports = db
