module.exports = (sequelize, DataTypes) => {
	const oficios = sequelize.define('oficios', {
		idOficio: {
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
		fechaVencimiento: {
			type: DataTypes.DATE,
			allowNull: false
		},
		observaciones: {
			type: DataTypes.TEXT('long'),
			allowNull: true
		},
		pathPdfFile: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		notificaResultados: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		esUltimo: {
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
	oficios.associate = function (db) {
		oficios.belongsTo(db.informes, {
			foreignKey: 'idInforme',
			as: 'informe'
		})
	}
	return oficios
}