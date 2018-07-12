module.exports = (sequelize, DataTypes) => {
    const catalogoOrganizaciones = sequelize.define('catalogo_organizaciones', {
        id_organizacion: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            primaryKey: true
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
    return catalogoOrganizaciones
}