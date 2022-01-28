module.exports = (sequelize, dataTypes) => {
    let alias = 'Autos';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        marca: {
            type: dataTypes.STRING(85)
        },
        modelo:  {
            type: dataTypes.STRING(85)
        },
        kilometros:  {
            type: dataTypes.BIGINT(10).UNSIGNED
        },
        anio:  {
            type: dataTypes.STRING(4)
        },
        color:  {
            type: dataTypes.STRING(85)
        },
        combustible:  {
            type: dataTypes.STRING(85)
        },
        motor:  {
            type: dataTypes.BIGINT(11).UNSIGNED
        },
        precio:  {
            type: dataTypes.STRING(85)
        },
        imagen:  {
            type: dataTypes.STRING(85)
        },
        usuario:  {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: true
        },
    };
    let config = {
        tableName: 'autos',
        timestamps: false
    }
    const Auto = sequelize.define(alias, cols, config);

    Auto.associate = (models) => {
        Auto.belongsTo(models.User, {
            as: "usuarios",
            foreignKey: "id",
        });
    }

    return Auto;
}