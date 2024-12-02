module.exports = (sequelize, DataTypes) => {
const VehicleCondition = sequelize.define('VehicleCondition', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
 
  sequelize,
  modelName: 'Vehicle_Condition',
  tableName: 'vehicle_conditions',
  timestamps: false 
});

return VehicleCondition;}