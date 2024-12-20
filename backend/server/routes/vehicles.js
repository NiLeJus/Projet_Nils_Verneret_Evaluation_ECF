const express = require("express");
const router = express.Router();
const path = require('path');
const fs = require('fs/promises'); 


const {
  Photo,
  Vehicle,
  VehicleCondition,
  VehicleModel,
  Option,
  Brand,
  Color,
  FuelType,
  Transmission,
  VehicleType,
  RelVehiclesOptions,
} = require("../scripts/db");

// Obtenir tous les véhicules avec les détails complets et url de photos associés
router.get("/all", async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({
      include: [
        {
          model: VehicleModel,
          include: [
            {
              model: Brand,
              attributes: ["id", "name"], 
            },
          ],
          attributes: [
            "id",
            "name",
            "description",
            "door_number",
            "wheel_number",
            "seat_number",
          ], // Inclure les attributs nécessaires du modèle de véhicule
        },
        {
          model: VehicleType,
          attributes: ["id", "name"],
        },
        {
          model: Color,
          attributes: ["id", "name", "hex"], // Inclure les attributs nécessaires de la couleur
        },
        {
          model: FuelType,
          attributes: ["id", "name"], // Inclure les attributs nécessaires du type de carburant
        },
        {
          model: Transmission,
          attributes: ["id", "transmission_type", "speed_number", "name"], // Inclure les attributs nécessaires de la transmission
        },
        {
          model: VehicleCondition,
          attributes: ["name", "description"], // Inclure les attributs nécessaires de la condition du véhicule
        },
        {
          model: Photo,
          attributes: ["id", "url"],
        },
        {
          model: Option,
          through: {
            attributes: [], // Ne pas inclure les attributs de la table de jointure
          },
          attributes: ["name", "description"], // Inclure le nom et la description de l'option
        },
        // Autres associations si nécessaire
      ],
      attributes: [
        "id",
        "color_id",
        "production_year",
        "mileage",
        "price",
        "vehicle_comment",
        "fuel_type_id",
        "transmission_id",
        "tax_horsepower",
        "vehicle_ad_status",
        "vehicle_status",
        "at_garage_id",
        "created_at",
      ], // Inclure les attributs nécessaires du véhicule
    });
    res.json(vehicles);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Obtenir un véhicule spécifique par ID avec les détails complets et url de photos associés
router.get("/details/:id", async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const vehicle = await Vehicle.findByPk(vehicleId, {
      include: [
        {
          model: VehicleModel,
          include: [
            {
              model: Brand,
              attributes: ["id", "name"], // Inclure les attributs nécessaires de la marque
            },
          ],
          attributes: [
            "id",
            "name",
            "description",
            "door_number",
            "wheel_number",
            "seat_number",
          ], // Inclure les attributs nécessaires du modèle de véhicule
        },
        {
          model: Color,
          attributes: ["id", "name", "hex"], // Inclure les attributs nécessaires de la couleur
        },
        {
          model: FuelType,
          attributes: ["id", "name"], // Inclure les attributs nécessaires du type de carburant
        },
        {
          model: Transmission,
          attributes: ["id", "transmission_type", "speed_number", "name"], // Inclure les attributs nécessaires de la transmission
        },

        {
          model: VehicleCondition,
          attributes: ["name", "description"], // Inclure les attributs nécessaires de la condition du véhicule
        },
        {
          model: Photo,
          attributes: ["id", "url"],
        },
        {
          model: VehicleType,
          attributes: ["id", "name"],
        },
        {
          model: Option,
          through: {
            attributes: [], // Ne pas inclure les attributs de la table de jointure
          },
          attributes: ["name", "description"], // Inclure le nom et la description de l'option
        },
        // Autres associations si nécessaire
      ],
      attributes: [
        "id",
        "color_id",
        "production_year",
        "mileage",
        "price",
        "vehicle_comment",
        "fuel_type_id",
        "transmission_id",
        "tax_horsepower",
        "vehicle_ad_status",
        "vehicle_status",
        "at_garage_id",
        "created_at",
      ], // Inclure les attributs nécessaires du véhicule
    });

    if (!vehicle) {
      return res.status(404).send("Véhicule non trouvé");
    }

    res.json(vehicle);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Obtenir tous les véhicules avec les détails réduits pour vehicle card
router.get("/allmost", async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({
      include: [
        {
          model: VehicleModel,
          include: [
            {
              model: Brand,
              attributes: ["id", "name"], // Inclure les attributs nécessaires de la marque
            },
          ],
          attributes: [
            "id",
            "name",
            "description",
            "door_number",
            "wheel_number",
            "seat_number",
          ], // Inclure les attributs nécessaires du modèle de véhicule
        },
        {
          model: Color,
          attributes: ["id", "name", "hex"], // Inclure les attributs nécessaires de la couleur
        },
        {
          model: FuelType,
          attributes: ["id", "name"], // Inclure les attributs nécessaires du type de carburant
        },
        {
          model: Transmission,
          attributes: ["id", "transmission_type", "speed_number", "name"], // Inclure les attributs nécessaires de la transmission
        },
        {
          model: VehicleCondition,
          attributes: ["name", "description"], // Inclure les attributs nécessaires de la condition du véhicule
        },
        {
          model: Photo,
          attributes: ["id", "url"],
        },
        {
          model: Option,
          through: {
            attributes: [], // Ne pas inclure les attributs de la table de jointure
          },
          attributes: ["name", "description"], // Inclure le nom et la description de l'option
        },
        // Autres associations si nécessaire
      ],
      attributes: [
        "id",
        "color_id",
        "production_year",
        "mileage",
        "price",
        "vehicle_comment",
        "fuel_type_id",
        "transmission_id",
        "tax_horsepower",
        "vehicle_ad_status",
        "vehicle_status",
        "at_garage_id",
        "created_at",
      ], // Inclure les attributs nécessaires du véhicule
    });
    res.json(vehicles);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Ajouter
router.post("/add", async (req, res) => {
  try {
    const newVehicleData = req.body;
    console.log("req.body", req.body);

    // Création du nouveau véhicule
    const newVehicle = await Vehicle.create(newVehicleData);

    // Vérification si des options sont fournies
    if (newVehicleData.options && Array.isArray(newVehicleData.options)) {
      // Pour chaque option, créez une entrée dans la table de relation
      const optionsPromises = newVehicleData.options.map((optionId) =>
        RelVehiclesOptions.create({
          vehicle_id: newVehicle.id,
          option_id: optionId,
        })
      );

      // Attendre la création de toutes les relations options
      await Promise.all(optionsPromises);
    }

    res.status(201).json({ id: newVehicle.id });
  } catch (error) {
    console.error(
      "Erreur lors de l'ajout du véhicule et de ses options:",
      error
    );
    res.status(500).send(error.message);
  }
});

/* Supprimer un véhicule spécifique par ID
router.delete("/:id", async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const vehicle = await Vehicle.findByPk(vehicleId);

    if (!vehicle) {
      return res.status(404).send("Véhicule non trouvé");
    }

    await vehicle.destroy();
    res.send("Véhicule supprimé avec succès");
  } catch (error) {
    res.status(500).send(error.message);
  }
});
*/

router.delete("/:id", async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const vehicle = await Vehicle.findByPk(vehicleId);

    if (!vehicle) {
      return res.status(404).send("Véhicule non trouvé");
    }

    // Récupération des chemins des images à supprimer
    const photos = await Photo.findAll({
      where: { vehicle_id: vehicleId },
    });
    console.log("photos", photos)

// Suppression des images du système de fichiers
for (const photo of photos) {
  const imagePath = path.join(__dirname, '..', photo.url);
  await deleteImage(imagePath);
}

    // Suppression de l'entrée du véhicule dans la base de données, correct
    await vehicle.destroy();
    res.send("Véhicule et images associées supprimées avec succès");
  } catch (error) {
    console.error("Erreur lors de la suppression du véhicule :", error);
    res.status(500).send(error.message);
  }
});


// Fonction auxiliaire pour supprimer les images

async function deleteImage(imageFilename) {
  const imagePath = path.join(__dirname, '..', 'public', 'vehicleImages', imageFilename);
  console.log(`Tentative de suppression de l'image : ${imagePath}`);
  try {
    await fs.unlink(imagePath);
    console.log(`Image supprimée avec succès : ${imagePath}`);
  } catch (error) {
    console.error(`Échec de la suppression de l'image : ${imagePath}`, error);
  }
}


module.exports = router;
