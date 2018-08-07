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
		idUsuarioCreacion: {
			type: DataTypes.UUID,
			allowNull: true
		},
		// Timestamps
		created_at: DataTypes.DATE,
		updated_at: DataTypes.DATE
	}, {
		paranoid: false,
		underscored: true
	})
	return catalogoUsuarios
}