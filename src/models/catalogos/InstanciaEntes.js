module.exports = (sequelize, DataTypes) => {
	const catalogoInstanciaEntes = sequelize.define('catalogoInstanciaEntes', {
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
		idEnte: {
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
	catalogoInstanciaEntes.associate = function (db) {
		catalogoInstanciaEntes.belongsTo(db.catInstancias, {
			foreignKey: 'idInstancia',
			as: 'instancia'
		})
		catalogoInstanciaEntes.belongsTo(db.catEntesFiscalizadores, {
			foreignKey: 'idEnte',
			as: 'ente'
		})
	}
	return catalogoInstanciaEntes
}