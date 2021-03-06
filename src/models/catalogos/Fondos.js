module.exports = (sequelize, DataTypes) => {
	const catalogoFondos = sequelize.define('catalogoFondos', {
		idFondo: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			unique: true,
			primaryKey: true
		},
		idOrganizacion: {
			type: DataTypes.UUID,
			allowNull: false
		},
		nombre: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		origen: {
			type: DataTypes.INTEGER(11),
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
	catalogoFondos.associate = function (db) {
		catalogoFondos.belongsTo(db.catOrganizaciones, {
			foreignKey: 'idOrganizacion',
			as: 'organizacion'
		})
	}
	return catalogoFondos
}