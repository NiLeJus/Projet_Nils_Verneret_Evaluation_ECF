
module.exports = (sequelize, DataTypes) => {

const Brand = sequelize.define('Brand', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Brand',
  tableName: 'brands',
  timestamps: false 
});

return Brand;
};
