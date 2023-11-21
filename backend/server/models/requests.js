module.exports = (sequelize, DataTypes) => {

  

const Request = sequelize.define('Request', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  gender: {
    type: DataTypes.ENUM('mister', 'madam', 'not_defined'),
    defaultValue: 'not_defined',
    allowNull: false
  },
  requester_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  vehicle_id: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
    model: 'vehicles', 
    key: 'id',
  }
    },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  prefer_phone: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  is_processed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  received_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  processed_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
    sequelize,
    modelName: 'Request',
    tableName: 'requests',
    timestamps: false 
});

return Request;
}
