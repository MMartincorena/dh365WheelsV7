module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: dataTypes.STRING(85),
        },
        apellido:  {
            type: dataTypes.STRING(85),
        },
        email:  {
            type: dataTypes.STRING(85),
        },
        password:  {
            type: dataTypes.STRING(85),
        },
        avatar:  {
            type: dataTypes.STRING(85),
        },
        auto:  {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: true
        },
    };
    let config = {
        tableName: 'usuarios',
        timestamps: false
    }
    const User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
        User.hasMany(models.Autos, {
            as: 'autos',
            foreignKey: 'id',
        });
    }

    return User;
}