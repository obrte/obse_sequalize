module.exports = (sequelize, DataTypes) => {
    const catalogoFondos = sequelize.define('catalogo_fondos', {
        id_fondo: {
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
            unique: true
        },
        origen: {
            //varchar (25)
            type: DataTypes.INTEGER,
            allowNull: false
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
    return catalogoFondos
}