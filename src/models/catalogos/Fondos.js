module.exports = (sequelize, DataTypes) => {
    const catalogoFondos = sequelize.define('catalogo_fondos', {
        id_fondo: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            primaryKey: true
        },
        id_organizacion: {
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
            allowNull: false
        },
        // Timestamps
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE
    }, {
        paranoid: false,
        underscored: true
    })
    return catalogoFondos
}