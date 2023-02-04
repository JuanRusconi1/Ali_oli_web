module.exports = (sequelize, dataTypes) => {
    let alias = "Category";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.TEXT,
            allowNull: false
        }

    };
    let config = {
        tableName: "categories",
        timestamps: false
    };
    const Category = sequelize.define(alias, cols, config)

    Category.associate = (models) => {
        Category.hasMany(models.Product, {
            as:"products",
            foreignKey:"categoryId"
        })
    }
    
    return Category
}