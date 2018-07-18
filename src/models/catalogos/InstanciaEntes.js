module.exports = (sequelize, DataTypes) => {
    const catalogoInstanciaEntes = sequelize.define('catalogo_instancia_entes', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            primaryKey: true
        },
        id_instancia: {
            type: DataTypes.UUID,
            allowNull: false
        },
        id_ente: {
            type: DataTypes.UUID,
            allowNull: false
        },
        // Timestamps
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE
    }, {
        paranoid: false,
        underscored: true
    })
    return catalogoInstanciaEntes
}