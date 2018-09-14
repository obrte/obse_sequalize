module.exports = (sequelize, DataTypes) => {
	const informes = sequelize.define('informes', {
		idInforme: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			unique: true,
			primaryKey: true
		},
		idUsuarioCreacion: {
			type: DataTypes.UUID,
			allowNull: false
		},
		idInstancia: {
			type: DataTypes.UUID,
			allowNull: false
		},
		idEnte: {
			type: DataTypes.UUID,
			allowNull: false
		},
		idFondo: {
			type: DataTypes.UUID,
			allowNull: true
		},
		ejercicio: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		delMes: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		alMes: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		numero: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		numeroAuditoria: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		nombre: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		activo: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: 1
		},
		created_at: DataTypes.DATE,
		updated_at: DataTypes.DATE
	}, {
		paranoid: false,
		underscored: true
	})
	//! Asociaciones
	informes.associate = function (db) {
		informes.belongsTo(db.catUsuarios, {
			foreignKey: 'idUsuarioCreacion',
			as: 'usuarioCreacion'
		})
		informes.belongsTo(db.catEntesFiscalizadores, {
			foreignKey: 'idEnte',
			as: 'ente'
		})
		informes.belongsTo(db.catFondos, {
			foreignKey: 'idFondo',
			as: 'fondo'
		})
		informes.belongsTo(db.catInstancias, {
			foreignKey: 'idInstancia',
			as: 'instancia'
		})
		informes.hasMany(db.oficios, {
			foreignKey: 'idInforme',
			as: 'oficios'
		})
		informes.hasMany(db.observaciones, {
			foreignKey: 'idInforme',
			as: 'observaciones'
		})
	}
	return informes
}