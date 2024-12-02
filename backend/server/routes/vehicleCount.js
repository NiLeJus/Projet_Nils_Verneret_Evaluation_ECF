const express = require("express");
const router = express.Router();
const { Vehicle, Brand, VehicleModel, VehicleType, sequelize} = require("../scripts/db");
const { Sequelize } = require("sequelize");

// Obtenir le compte des véhicules pour chaque marque
router.get("/vehicle-per-brand", async (req, res) => {
  try {
    const vehicleCountPerBrand = await VehicleModel.findAll({
      attributes: [
        [Sequelize.fn("COUNT", Sequelize.col("Vehicles.id")), "vehicleCount"], // Correction ici
      ],
      include: [
        {
          model: Vehicle, // Assurez-vous que ce nom correspond au modèle défini dans Sequelize
          as: 'Vehicles', // Utilisez l'alias 'Vehicles' si vous avez défini un alias dans vos relations
          attributes: [],
        },
        {
          model: Brand,
          attributes: ["name"],
        },
      ],
      group: ["Brand.id"],
      raw: true,
    });
    

    // Post-traitement pour reformater les résultats
    const formattedResults = vehicleCountPerBrand.map(result => ({
      name: result['Brand.name'],
      vehicleCount: result.vehicleCount
    }));

    res.json(formattedResults);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Obtenir le compte des véhicules pour chaque model
router.get("/vehicle-per-model", async (req, res) => {
  try {
    const vehicleCountPerModel = await VehicleModel.findAll({
      attributes: [
        'name',
        [Sequelize.fn("COUNT", Sequelize.col("Vehicles.id")), "vehicleCount"],
      ],
      include: [{
        model: Vehicle,
        attributes: [],
      }],
      group: ["VehicleModel.id"],
      raw: true,
    });

    // Filtre pour exclure les éléments avec un vehicleCount de 0
    const filteredResults = vehicleCountPerModel.filter(item => item.vehicleCount > 0);


    res.json(filteredResults);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.get("/vehicle-per-type", async (req, res) => {
  try {
    // Récupérer le compte des véhicules pour chaque type
    const vehicleCountPerType = await Vehicle.findAll({
      attributes: [
        'vehicle_type_id',
        [Sequelize.fn('COUNT', Sequelize.col('vehicle_type_id')), 'vehicleCount']
      ],
      include: [{
        model: VehicleType,
        attributes: ['name']
      }],
      group: ['vehicle_type_id', 'VehicleType.id', 'VehicleType.name'],
      raw: true,
    });

    // Filtrer pour exclure les types avec un comptage de 0
    // Cette étape pourrait ne pas être nécessaire si tous les types ont au moins un véhicule,
    // mais elle est conservée ici pour la cohérence avec votre demande initiale.
    const filteredResults = vehicleCountPerType.filter(item => item.vehicleCount > 0);

    // Reformater les résultats pour correspondre exactement à votre demande
    const formattedResults = filteredResults.map(item => ({
      name: item['VehicleType.name'],
      vehicleCount: item.vehicleCount
    }));

    res.json(formattedResults);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
