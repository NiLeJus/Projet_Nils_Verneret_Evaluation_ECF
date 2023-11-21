module.exports = (sequelize, DataTypes) => {

const Garage = sequelize.define('Garage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  zip_code: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  telephone: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
sequelize,
  timestamps: false,
  modelName: 'Garage',
  tableName: 'garages'
});

return Garage;
};
