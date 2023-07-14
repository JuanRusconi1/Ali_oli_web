module.exports = (sequelize, dataTypes) => {
  const alias = "Admin"
  const cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.TEXT,
    },
    password: {
      type: dataTypes.TEXT,
    }
  }
  const config = {
    tableName: 'Admin',
    timestamps: false
  }

  const Admin = sequelize.define(alias, cols, config)

  return Admin
}