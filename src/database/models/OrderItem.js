module.exports = (sequelize, dataTypes) => {
  let alias = "OrderItem";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productName: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
    productCategory: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    details: {
      type: dataTypes.TEXT,
      allowNull: true,
    }
  };
  let config = {
    tableName: "orderitem",
    timestamps: false,
  };

  const OrderItem = sequelize.define(alias, cols, config);

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Sale, {
      as: "sales",
      foreignKey: "salesId",
    });
    OrderItem.Docena = OrderItem.hasMany(models.Docena, {
      as: "docena",
      foreignKey: "itemId",
    });
  };

  return OrderItem;
};
