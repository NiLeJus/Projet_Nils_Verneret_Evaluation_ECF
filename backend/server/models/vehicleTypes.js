module.exports = (sequelize, DataTypes) => {

    const VehicleType = sequelize.define('VehicleType', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
      sequelize,
      modelName: 'VehicleType',
      tableName: 'vehicle_types',
      timestamps: false  
      });
    
      return VehicleType;}