module.exports = (sequelize, DataTypes) => {
	const catalogoInstanciaFondos = sequelize.define('catalogoInstanciaFondos', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			unique: true,
			primaryKey: true
		},
		idInstancia: {
			type: DataTypes.UUID,
			allowNull: false
		},
		idFondo: {
			type: DataTypes.UUID,
			allowNull: false
		},
		// Timestamps
		created_at: DataTypes.DATE,
		updated_at: DataTypes.DATE
	}, {
		paranoid: false,
		underscored: true
	})
	//! Asociaciones
	catalogoInstanciaFondos.associate = function (db) {
		catalogoInstanciaFondos.belongsTo(db.catInstancias, {
			foreignKey: 'idInstancia',
			as: 'instancia'
		})
		catalogoInstanciaFondos.belongsTo(db.catFondos, {
			foreignKey: 'idFondo',
			as: 'fondo'
		})
	}
	return catalogoInstanciaFondos
}