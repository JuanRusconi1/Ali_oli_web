module.exports = (sequelize, dataTypes) => {
  let alias = "Stock"
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.TEXT,
      allowNull: false
    },
    quantity: {
      type: dataTypes.TEXT,
      allowNull: false
    },
  };
  let config = {
    tableName: "stock",
    timestamps: false,
  };

  const Stock = sequelize.define(alias, cols, config);

  return Stock
}