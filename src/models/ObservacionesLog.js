module.exports = (sequelize, DataTypes) => {
	const observacionesLog = sequelize.define('observacionesLog', {
		idObservacion: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		idOficio: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		idUnidad: {
			type: DataTypes.UUID,
			allowNull: false
		},
		idUsuario: {
			type: DataTypes.UUID,
			allowNull: false
		},
		descripcion: {
			type: DataTypes.TEXT('long'),
			allowNull: false
		},
		monto: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: true
		},
		anexo: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		estatus: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		comentarios: {
			type: DataTypes.TEXT('long'),
			allowNull: true
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
	observacionesLog.associate = function (db) {
		observacionesLog.belongsTo(db.observaciones, {
			foreignKey: 'idObservacion',
			as: 'observacion'
		})
		observacionesLog.belongsTo(db.oficios, {
			foreignKey: 'idOficio',
			as: 'oficio'
		})
		observacionesLog.belongsTo(db.catUniAdm, {
			foreignKey: 'idUnidad',
			as: 'unidad'
		})
		observacionesLog.belongsTo(db.catUsuarios, {
			foreignKey: 'idUsuario',
			as: 'usuario'
		})
	}
	return observacionesLog
}