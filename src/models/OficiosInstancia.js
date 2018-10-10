module.exports = (sequelize, DataTypes) => {
	const oficiosInstancia = sequelize.define('oficiosInstancia', {
		idOficioInstancia: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			unique: true,
			primaryKey: true
		},
		idInforme: {
			type: DataTypes.UUID,
			allowNull: false
		},
		numero: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		fecha: {
			type: DataTypes.DATE,
			allowNull: false
		},
		fechaRecepcion: {
			type: DataTypes.DATE,
			allowNull: false
		},
		anexo: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		created_at: DataTypes.DATE,
		updated_at: DataTypes.DATE
	}, {
		paranoid: false,
		underscored: true
	})
	oficiosInstancia.associate = function (db) {
		oficiosInstancia.belongsTo(db.informes, {
			foreignKey: 'idInforme',
			as: 'informe'
		})
	}
	return oficiosInstancia
}