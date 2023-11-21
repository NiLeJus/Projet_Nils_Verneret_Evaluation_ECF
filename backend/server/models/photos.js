module.exports = (sequelize, DataTypes) => {
  const Vehicle = require("./vehicles")(sequelize, DataTypes);

  const Photo = sequelize.define(
    "Photo",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      vehicle_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Vehicle", 
          key: "id",
        },
      },
      url: {
        type: DataTypes.STRING(2048),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Photo",
      tableName: "photos",
      timestamps: false,
    }
  );

  return Photo;
};
