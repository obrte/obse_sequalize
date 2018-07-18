module.exports = (sequelize, DataTypes) => {
    const catalogoUniAdm = sequelize.define('catalogo_uniadm', {
        id_uniadm: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            primaryKey: true
        },
        id_instancia: {
            type: DataTypes.UUID,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(255),
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
    return catalogoUniAdm
}