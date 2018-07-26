/*
 ! CONECCION A LA DB
 ! USANDO MySQL-Sequalize
*/
const Sequelize = require('sequelize')
const sequelize = new Sequelize('observaciones', 'root', '', {
	host: 'localhost',
	dialect: 'mysql',
	operatorsAliases: false,
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
//! Organizaciones/Fondos
//catalogo_fondos/catalogo_organizacion(id_organizacion)
db.catFondos.belongsTo(db.catOrganizaciones, { foreignKey: 'idOrganizacion', as: 'organizacion' })
db.catOrganizaciones.hasMany(db.catFondos, { foreignKey: 'idOrganizacion', as: 'fondos' })

//! Organizaciones/Entes
//catalogo_entes_fiscalizadores/catalogo_organizacion(id_organizacion)
db.catEntesFiscalizadores.belongsTo(db.catOrganizaciones, { foreignKey: 'idOrganizacion', as: 'organizacion' })
db.catOrganizaciones.hasMany(db.catEntesFiscalizadores, { foreignKey: 'idOrganizacion', as: 'entes' })

//!Organizaciones/Instancias
//catalogo_instancias/catalogo_organizacion(id_organizacion)
db.catInstancias.belongsTo(db.catOrganizaciones, { foreignKey: 'idOrganizacion', as: 'organizacion' })
db.catOrganizaciones.hasMany(db.catInstancias, { foreignKey: 'idOrganizacion', as: 'instancias' })

//!  Instancias
//** InstanciaFondos
//catalogo_instancia_fondos/catalogo_instancias/catalogo_fondos(id_instancia/id_fondo)
db.catInstanciaFondos.belongsTo(db.catInstancias, { foreignKey: 'idInstancia', as: 'instancia' })
db.catInstanciaEntes.belongsTo(db.catInstancias, { foreignKey: 'idInstancia', as: 'instancia' })

db.catInstancias.hasMany(db.catInstanciaFondos, { foreignKey: 'idInstancia', as: 'fondos' })
db.catInstancias.hasMany(db.catInstanciaEntes, { foreignKey: 'idInstancia', as: 'entes' })

db.catInstanciaFondos.belongsTo(db.catFondos, { foreignKey: 'idFondo', as: 'fondo' })
db.catInstanciaEntes.belongsTo(db.catEntesFiscalizadores, { foreignKey: 'idEnte', as: 'ente' })

db.catFondos.hasMany(db.catInstanciaFondos, { foreignKey: 'idFondo', as: 'instanciaFondos' })
db.catEntesFiscalizadores.hasMany(db.catInstanciaEntes, { foreignKey: 'idEnte', as: 'instanciaEnte' })

//catalogo_instancia_entes/catalogo_instancias/catalogo_entes_fiscalizadores(id_instancia/id_ente)





//! UniAdm
//catalogo_uniadm/catalogo_instancia(id_instancia)
db.catUniAdm.belongsTo(db.catInstancias, { foreignKey: 'idInstancia', as: 'instancia' })
db.catInstancias.hasMany(db.catUniAdm, { foreignKey: 'idInstancia', as: 'uniAdm' })
/**
 * catalogo_usuarios/catalogo_organizaciones/catalogo_instancia/catalogo_uniadm
 * (id_organizacion/id_instancia/id_uniadm)
 **/
db.catUsuarios.belongsTo(db.catOrganizaciones, { foreignKey: 'idOrganizacion', as: 'organizacion' })
db.catUsuarios.belongsTo(db.catInstancias, { foreignKey: 'idInstancia', as: 'instancia' })
db.catUsuarios.belongsTo(db.catUniAdm, { foreignKey: 'idUniadm', as: 'uniAdm' })

module.exports = db