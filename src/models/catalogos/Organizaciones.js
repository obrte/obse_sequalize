module.exports = (sequelize, DataTypes) => {
	const catalogoOrganizaciones = sequelize.define('catalogoOrganizaciones', {
		idOrganizacion: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			unique: true,
			primaryKey: true
		},
		nombre: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true
		},
		nombreCorto: {
			type: DataTypes.STRING(25),
			allowNull: false,
			unique: true
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
	catalogoOrganizaciones.associate = function (db) {
		catalogoOrganizaciones.hasMany(db.catEntesFiscalizadores, {
			foreignKey: 'idOrganizacion',
			as: 'entes'
		})
		catalogoOrganizaciones.hasMany(db.catInstancias, {
			foreignKey: 'idOrganizacion',
			as: 'instancias'
		})
		catalogoOrganizaciones.hasMany(db.catFondos, {
			foreignKey: 'idOrganizacion',
			as: 'fondos'
		})
	}
	return catalogoOrganizaciones
}