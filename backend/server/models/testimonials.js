module.exports = (sequelize, DataTypes) => {

  
const Testimonial = sequelize.define('Testimonial', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  posted_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  testimony: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  testimony_status: {
    type: DataTypes.ENUM('pending', 'displayed', 'hidden'),
    defaultValue: 'pending',
    allowNull: false
  },
  note: {
    type: DataTypes.TINYINT,
    allowNull: true
  }
}, {
    sequelize,
    modelName: 'Testimonial',
    tableName: 'testimonials',
    timestamps: false 
});

return Testimonial; 
}
