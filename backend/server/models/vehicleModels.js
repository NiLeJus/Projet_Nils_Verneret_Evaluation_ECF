module.exports = (sequelize, DataTypes) => {

  const VehicleModel = sequelize.define(
    "VehicleModel",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      brand_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Brand",
          key: "id",
        },
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      door_number: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 5,
      },
      wheel_number: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 4,
      },
      seat_number: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "VehicleModel",
      tableName: "vehicle_models",
      timestamps: false,
    }
  );



  return VehicleModel;
};
