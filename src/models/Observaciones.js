module.exports = (sequelize, DataTypes) => {
	const observaciones = sequelize.define('observaciones', {
		idObservacion: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			unique: true,
			primaryKey: true
		},
		idInforme: {
			type: DataTypes.UUID,
			allowNull: false
		},
		numero: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		created_at: DataTypes.DATE,
		updated_at: DataTypes.DATE
	}, {
		paranoid: false,
		underscored: true
	})
	observaciones.associate = function (db) {
		observaciones.belongsTo(db.informes, {
			foreignKey: 'idInforme',
			as: 'informe'
		})
		observaciones.hasMany(db.observacionesLog, {
			foreignKey: 'idObservacion',
			as: 'log'
		})
	}
	return observaciones
}