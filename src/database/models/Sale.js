module.exports = (sequelize, dataTypes) => {
    let alias = "Sale";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        buyerName: {
            type: dataTypes.TEXT   
        },
        paymentType: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        phoneNumber: {
            type: dataTypes.INTEGER
        },
        total: {
            type: dataTypes.INTEGER
        },
        date: {
            type: dataTypes.TEXT,
            allowNull: false
        }

    }
    let config = {
        tableName: "sales",
        timestamps: false
    }   

    const Sale = sequelize.define(alias, cols, config)

    Sale.associate = (models) => {
       Sale.OrderItem = Sale.hasMany(models.OrderItem, {
            as:"orderitem",
            foreignKey: "salesId"
        })
    }
    
    return Sale
}