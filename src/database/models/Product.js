
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
        deleteAt:{
            type: dataTypes.INTEGER
        }
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
        Product.hasMany(models.OrderItem, {
            as:"OrderItem",
            foreignKey: "productId"
        })
    }
    

    return Product

}