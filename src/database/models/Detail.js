module.exports = (sequelize, dataTypes) => {
  let alias = "Detail";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    detail: {
      type: dataTypes.TEXT,
      allowNull: true,
    }
  };
  let config = {
    tableName: "detail",
    timestamps: false,
  };

  const Detail = sequelize.define(alias, cols, config);

  Detail.associate = (models) => {
    Detail.belongsTo(models.OrderItem, {
      as: "orderitem",
      foreignKey: "itemId",
    });
  };

  return Detail
} 