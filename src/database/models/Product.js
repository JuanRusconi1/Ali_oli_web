
module.exports = (sequelize, dataTypes) => {
    let alias = "Product";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        description:{
            type: dataTypes.TEXT
        },
        image:{
            type: dataTypes.TEXT
        },
        price:{ 
            type: dataTypes.INTEGER,
            allowNull: false
        },
    }
    let config = {
        tableName: 'products',
        timestamps: false,
    }
    const Product = sequelize.define(alias, cols, config)

    Product.associate = (models) => {
        Product.belongsTo(models.Category, {
            as:"categories",
            foreignKey: "categoryId"
        })
    }

    return Product

}