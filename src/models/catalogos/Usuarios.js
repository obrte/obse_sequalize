module.exports = (sequelize, DataTypes) => {
    const catalogoUsuarios = sequelize.define('catalogo_usuarios', {
        id_usuario: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            primaryKey: true
        },
        tipo: {
            type: DataTypes.STRING(25),
            allowNull: false
        },
        id_organizacion: {
            type: DataTypes.UUID,
            allowNull: false
        },
        id_instancia: {
            type: DataTypes.UUID,
            allowNull: false
        },
        id_uniadm: {
            type: DataTypes.UUID,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        activo: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        id_usuario_creacion: {
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
    return catalogoUsuarios
}