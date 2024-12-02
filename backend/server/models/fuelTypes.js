module.exports = (sequelize, DataTypes) => {

const FuelType = sequelize.define('FuelType', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  }
}, {
    sequelize,
    modelName: 'FuelType',
    tableName: 'fuel_types',
    timestamps: false 
});

return FuelType;
}
