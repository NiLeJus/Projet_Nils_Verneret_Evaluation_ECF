const { Sequelize, DataTypes } = require("sequelize");

console.log("Starting Sequelize configuration");

// Configuration de Sequelize et connexion à la base de données
const sequelize = new Sequelize('vparrot_activity_db', 'root', '', { //('nom db', 'user', 'password')
    host: 'localhost', //Hébergement de la base de donnée
    dialect: 'mariadb', 
});


console.log("Sequelize configured");


// Importer les modèles
console.log("Importing models");
const Admin = require("../models/admins")(sequelize, DataTypes); console.log("Admin model imported");
const Garage = require("../models/garages")(sequelize, DataTypes); console.log("Garage model imported");
const Service = require("../models/services")(sequelize, DataTypes); console.log("Service model imported");
const Brand = require("../models/brands")(sequelize, DataTypes); console.log("Brand model imported");
const VehicleModel = require("../models/vehicleModels")(sequelize, DataTypes); console.log("VehicleModel model imported");
const VehicleType = require("../models/vehicleTypes")(sequelize, DataTypes); console.log("VehicleType model imported"); 
const VehicleCondition = require("../models/vehicleConditions")(sequelize, DataTypes);  console.log("VehicleCondition model imported");
const Option = require("../models/options")(sequelize, DataTypes);  console.log("Option model imported");
const FuelType = require("../models/fuelTypes")(sequelize, DataTypes); console.log("FuelType model imported");
const Transmission = require("../models/transmissions")(sequelize, DataTypes); console.log("Transmission model imported");
const Color = require("../models/colors")(sequelize, DataTypes); console.log("Color model imported");
const Vehicle = require("../models/vehicles")(sequelize, DataTypes); console.log("Vehicle model imported");
const Photo = require("../models/photos")(sequelize, DataTypes); console.log("Photo model imported");
const RelVehiclesOptions = require("../models/relVehiclesOptions")(sequelize, DataTypes); console.log("RelVehiclesOptions model imported");
const Request = require("../models/requests")(sequelize, DataTypes); console.log("Request model imported");
const Testimonial = require("../models/testimonials")(sequelize, DataTypes); console.log("Testimonials model imported");
const Day = require("../models/days")(sequelize, DataTypes); console.log("Day model imported");
const DefaultWeek = require("../models/defaultWeek")(sequelize, DataTypes); console.log("DefaultWeek model imported");
console.log("All models imported");

// Relations
console.log("Setting up relationships");


//#region Relations VehicleModels
console.log("Setting up VehicleModel <-> Brand relationship");
VehicleModel.belongsTo(Brand, { foreignKey: "brand_id" });
Brand.hasMany(VehicleModel, { foreignKey: "brand_id" });
console.log("VehicleModel <-> Brand relationship set up");
//#endregion

//#region Relations vehicles
// Relation Vehicle -> VehicleModel
console.log("Setting up Vehicle <-> VehicleModel relationship");
Vehicle.belongsTo(VehicleModel, { foreignKey: 'vehicle_model_id' });
VehicleModel.hasMany(Vehicle, { foreignKey: 'vehicle_model_id' });
console.log("Vehicle <-> VehicleModel relationship set up");

// Relation Vehicle -> Color
console.log("Setting up Vehicle <-> Color relationship");
Vehicle.belongsTo(Color, { foreignKey: 'color_id' });
Color.hasMany(Vehicle, { foreignKey: 'color_id' });
console.log("Vehicle <-> Color relationship set up");

// Relation Vehicle -> VehicleCondition
console.log("Setting up Vehicle <-> VehicleCondition relationship");
Vehicle.belongsTo(VehicleCondition, { foreignKey: 'vehicle_condition_id' });
VehicleCondition.hasMany(Vehicle, { foreignKey: 'vehicle_condition_id' });
console.log("Vehicle <-> VehicleCondition relationship set up");

// Relation Vehicle -> FuelType
console.log("Setting up Vehicle <-> FuelType relationship");
Vehicle.belongsTo(FuelType, { foreignKey: 'fuel_type_id' });
FuelType.hasMany(Vehicle, { foreignKey: 'fuel_type_id' });
console.log("Vehicle <-> FuelType relationship set up");

// Relation Vehicle -> Transmission
console.log("Setting up Vehicle <-> Transmission relationship");
Vehicle.belongsTo(Transmission, { foreignKey: 'transmission_id' });
Transmission.hasMany(Vehicle, { foreignKey: 'transmission_id' });
console.log("Vehicle <-> Transmission relationship set up");

// Relation Vehicle -> Garage
console.log("Setting up Vehicle <-> Garage relationship");
Vehicle.belongsTo(Garage, { foreignKey: 'at_garage_id' });
Garage.hasMany(Vehicle, { foreignKey: 'at_garage_id' });
console.log("Vehicle <-> Garage relationship set up");
//#endregion

//Relation Vehicle -> VehicleType
console.log("Setting up Vehicle <-> VehicleType relationship");
Vehicle.belongsTo(VehicleType, { foreignKey: 'vehicle_type_id' });
VehicleType.hasMany(Vehicle, { foreignKey: 'vehicle_type_id' });
console.log("Vehicle <-> VehicleType relationship set up");


//#region Association Vehicle-Option via RelVehiclesOptions
// Relation Vehicle -> Option
console.log("Setting up Vehicle <-> Option relationship");
  Vehicle.belongsToMany(Option, { 
    through: RelVehiclesOptions, 
    foreignKey: 'vehicle_id' 
  });
console.log("Vehicle <-> Option relationship set up");
console.log("Setting up Option <-> Vehicle relationship");
  Option.belongsToMany(Vehicle, { 
    through: RelVehiclesOptions, 
    foreignKey: 'option_id' 
  });
console.log("Option <-> Vehicle relationship set up");
//#endregion

//#region Association VehicleModels-VehicleType via RelVehicleModels&VehicleTypes

//#region Relations Photos
// Relation Vehicle -> Photo
console.log("Setting up Vehicle <-> Photo relationship");
Vehicle.hasMany(Photo, { foreignKey: "vehicle_id" });
Photo.belongsTo(Vehicle, { foreignKey: "vehicle_id" });
console.log("Vehicle <-> Photo relationship set up");
//#endregion

//#region Relations Requests
// Relation Vehicle -> Request
console.log("Setting up Vehicle <-> Request relationship");
Vehicle.hasMany(Request, { foreignKey: "vehicle_id" });
Request.belongsTo(Vehicle, { foreignKey: "vehicle_id" });
console.log("Vehicle <-> Request relationship set up");
//#endregion
console.log("All relationships set up");

// Synchronisation des modèles
console.log("Syncing models with the database");

Promise.all([
  Service.sync(),
  VehicleModel.sync(),
  Brand.sync(),
  VehicleType.sync(),
  VehicleCondition.sync(),
  Option.sync(),
  FuelType.sync(),
  Transmission.sync(),
  Color.sync(),
  Photo.sync(),
  Vehicle.sync(),
  RelVehiclesOptions.sync(),
  Request.sync(),
  Admin.sync(),
  Garage.sync(),
  Testimonial.sync(),
  Day.sync(),
  DefaultWeek.sync()

]).then(() => {
  console.log("All models synced successfully");
}).catch((error) => {
  console.error("Error syncing models:", error);
}); 

console.log("All models synced successfully");

console.log("Exporting models");
module.exports = {
  Admin,
  Service,
  VehicleModel,
  Brand,
  VehicleType,
  VehicleCondition,
  Option,
  FuelType,
  Transmission,
  Color,
  Photo,
  Vehicle,
  RelVehiclesOptions,
  Request,
  Testimonial,
  Garage,
  Day,
  DefaultWeek,
  Sequelize,
  sequelize
};
console.log("Models exported successfully");


