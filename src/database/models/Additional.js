
module.exports = (sequelize, dataTypes) => {
    let alias = "Additional"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false
        },
        name:{
            type: dataTypes.TEXT,
            allowNull: false
        },
        price:{ 
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }
    let config = {
        tableName: "additional",
        timestamps: false
    }

    const Additional = sequelize.define(alias, cols, config);

    return Additional
}