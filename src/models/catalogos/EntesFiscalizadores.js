module.exports = (sequelize, DataTypes) => {
    const catalogoEntesFiscalizadores = sequelize.define('catalogo_entes_fiscalizadores', {
        id_ente: {
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
            allowNull: false,
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
    return catalogoEntesFiscalizadores
}