module.exports = (sequelize, DataTypes) => {
	const catalogoUniAdm = sequelize.define('catalogoUniAdm', {
		idUniAdm: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			unique: true,
			primaryKey: true
		},
		idInstancia: {
			type: DataTypes.UUID,
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
		// Timestamps
		created_at: DataTypes.DATE,
		updated_at: DataTypes.DATE
	}, {
		paranoid: false,
		underscored: true
	})
	//! Asociaciones
	catalogoUniAdm.associate = function (db) {
		catalogoUniAdm.belongsTo(db.catInstancias, {
			foreignKey: 'idInstancia',
			as: 'instancia'
		})
		catalogoUniAdm.hasMany(db.catUniAdm, {
			foreignKey: 'idInstancia',
			as: 'uniAdm'
		})
	}
	return catalogoUniAdm
}