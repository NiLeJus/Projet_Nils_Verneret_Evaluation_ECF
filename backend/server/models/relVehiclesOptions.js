module.exports = (sequelize, DataTypes) => {

const Vehicle = require('./vehicles')(sequelize, DataTypes);
const Option = require('./options')(sequelize, DataTypes);


const RelVehiclesOptions = sequelize.define('RelVehiclesOptions', {
  vehicle_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Vehicle,
      key: 'id'
    },
    primaryKey: true
  },
  option_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Option,
      key: 'id'
    },
    primaryKey: true
  }
}, {
  sequelize,
  modelName: 'RelVehicleOptions',
  tableName: 'rel_vehicles_options',
  timestamps: false
});



return RelVehiclesOptions;
}


