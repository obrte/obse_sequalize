module.exports = (sequelize, DataTypes) => {
    const catalogoEntesFiscalizadores = sequelize.define('catalogo_entes_fiscalizadores', {
        id_ente: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            primaryKey: true
        },
        id_organizacion: {
            //int (11)
            type: DataTypes.UUID,
            allowNull: false
        },
        nombre: {
            //varchar(255)
            type: DataTypes.STRING,
            allowNull: false,
        },
        activo: {
            //int (11)
            type: DataTypes.INTEGER
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