module.exports = (sequelize, DataTypes) => {
    return sequelize.define('products', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        height: {
            type: DataTypes.DECIMAL
        },
        length: {
            type: DataTypes.DECIMAL
        },
        width: {
            type: DataTypes.DECIMAL
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
    });
};
