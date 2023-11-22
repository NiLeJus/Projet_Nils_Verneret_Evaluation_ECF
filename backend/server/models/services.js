module.exports = (sequelize, DataTypes) => {
const Service = sequelize.define('Service', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  min_price: {
    type: DataTypes.INTEGER
  }
}, {
  timestamps: false 
});

return Service;
}