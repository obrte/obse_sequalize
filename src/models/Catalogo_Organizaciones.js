module.exports = (sequelize, DataTypes) => {
    const Catalogo_Organizaciones = sequelize.define('catalogo_organizaciones', {
        id_organizacion: {
            //int (11)
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            //varchar(255)
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        nombre_corto: {
            //varchar (25)
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
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
    return Catalogo_Organizaciones
}