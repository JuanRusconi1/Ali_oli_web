

module.exports = (sequelize, dataTypes) => {
    let alias = "OrderItem"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        quantity:{
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }
    let config = {
        tableName: "OrderItem",
        timestamps: false,
    }

    const OrderItem = sequelize.define(alias, cols, config)

    OrderItem.associate = (models) => {
        OrderItem.belongsTo(models.Product, {
            as:"products", 
            foreignKey:"productId"
        })
        OrderItem.belongsTo(models.Sale,{
            as:"sales",
            foreignKey:"orderId"
        })
    }

    return OrderItem
}