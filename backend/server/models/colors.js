module.exports = (sequelize, DataTypes) => {

const Color = sequelize.define('Color', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  },
  hex: {
    type: DataTypes.STRING(7),
    allowNull: false
  }
}, {
    sequelize,
    modelName: 'Color',
    tableName: 'colors',
    timestamps: false 
});

return Color;
}
