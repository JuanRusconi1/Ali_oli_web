module.exports = (sequelize, dataTypes) => {
  let alias = "Docena";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
    quantity: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
  };
  let config = {
    tableName: "docena",
    timestamps: false,
  };

  const Docena = sequelize.define(alias, cols, config);

  Docena.associate = (models) => {
    Docena.belongsTo(models.OrderItem, {
      as: "orderitem",
      foreignKey: "itemId",
    });
  };

  return Docena;
};
