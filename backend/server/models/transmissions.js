module.exports = (sequelize, DataTypes) => {
const Transmission = sequelize.define('Transmission', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  transmission_type: {
    type: DataTypes.ENUM('automatic', 'manual'),
    defaultValue: 'manual',
    allowNull: false
  },
  speed_number: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
    sequelize,
    modelName: 'Transmission',
    tableName: 'transmissions',
    timestamps: false 
});

return Transmission; }