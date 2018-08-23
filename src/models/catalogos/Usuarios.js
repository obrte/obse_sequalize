module.exports = (sequelize, DataTypes) => {
	const catalogoUsuarios = sequelize.define('catalogoUsuarios', {
		idUsuario: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			unique: true,
			primaryKey: true
		},
		tipo: {
			type: DataTypes.STRING(25),
			allowNull: false
		},
		idOrganizacion: {
			type: DataTypes.UUID,
			allowNull: true
		},
		idInstancia: {
			type: DataTypes.UUID,
			allowNull: true
		},
		idUniAdm: {
			type: DataTypes.UUID,
			allowNull: true
		},
		nombre: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true
		},
		password: {
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
	catalogoUsuarios.associate = function (db) {
		catalogoUsuarios.belongsTo(db.catOrganizaciones, {
			foreignKey: 'idOrganizacion',
			as: 'organizacion'
		})
		catalogoUsuarios.belongsTo(db.catInstancias, {
			foreignKey: 'idInstancia',
			as: 'instancia'
		})
		catalogoUsuarios.belongsTo(db.catUniAdm, {
			foreignKey: 'idUniAdm',
			as: 'uniAdm'
		})
		catalogoUsuarios.belongsTo(db.catUsuarios, {
			foreignKey: 'idUsuarioCreacion',
			as: 'creador'
		})
	}
	return catalogoUsuarios
}