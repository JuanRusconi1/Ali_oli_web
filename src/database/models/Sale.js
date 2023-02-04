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
        direccion: {
            type: dataTypes.STRING(100)
        },
        telefono: {
            type: dataTypes.INTEGER
        },
        createdAt: {
            type: dataTypes.DATE,
            allowNull: false
        },
        deleteAt: {
            type:dataTypes.INTEGER,
            allowNull: false
        }

    }
    let config = {
        tableName: "sales",
        timestamps: false,
        paranoid: true
    }   

    const Sale = sequelize.define(alias, cols, config)

    Sale.association = (models) => {
        Sale.hasMany(models.OrderItem, {
            as:"OrderItem",
            foreignKey: "orderId"
        })
    }
    
    return Sale
}