const express = require('express');
const router = express.Router();
const { VehicleModel, Brand } = require('../scripts/db');

 
//Récupèrer
router.get('/', async (req, res) => {
  try {
    const vehicleModels = await VehicleModel.findAll({
      include: [
        {
          model: Brand, 
          attributes: ['name']
        }
      ]
    });
    res.json(vehicleModels);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Récupérer un modèle de véhicule spécifique par ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const vehicleModel = await VehicleModel.findByPk(id, {
      include: [
        {
          model: Brand,
          attributes: ['name']
        }
      ]
    });

    if (!vehicleModel) {
      return res.status(404).send('Modèle de véhicule non trouvé');
    }

    res.json(vehicleModel);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// Récupérer les modèles de véhicules par brand_id
router.get('/byBrand/:brandId', async (req, res) => {
  try {
    const { brandId } = req.params;
    const vehicleModels = await VehicleModel.findAll({
      where: { brand_id: brandId },
      include: [
        {
          model: Brand, 
          attributes: ['name']
        }
      ]
    });

    if (vehicleModels.length === 0) {
      return res.status(404).send('Aucun modèle trouvé pour cette marque');
    }

    res.json(vehicleModels);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


//Ajouter
router.post('/', async (req, res) => {
  try {
    const {
      name,
      brand_id, 
      description,
      door_number, 
      wheel_number, 
      seat_number
    } = req.body;

    const newVehicleModel = await VehicleModel.create({
      name,
      brand_id,
      description,
      door_number,
      wheel_number, 
      seat_number
    });

    res.status(201).json(newVehicleModel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});


//Modifier
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const vehicleModel = await VehicleModel.findByPk(id);
    if (!vehicleModel) {
      return res.status(404).send('Modèle de véhicule non trouvé');
    }

    // Mettre à jour seulement les champs présents dans le corps de la requête
    Object.keys(updates).forEach(key => {
      vehicleModel[key] = updates[key];
    });

    await vehicleModel.save();
    res.json(vehicleModel);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


//Modifier Le nom
router.put('/updateName/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const vehicleModel = await VehicleModel.findByPk(id);
    if (!vehicleModel) {
      return res.status(404).send('Modèle de véhicule non trouvé');
    }

    vehicleModel.name = name;

    await vehicleModel.save();
    res.json(vehicleModel);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur du serveur: " + error.message);
  }
  
});

// Supprimer un modèle de véhicule
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const vehicleModel = await VehicleModel.findByPk(id);

    if (!vehicleModel) {
      return res.status(404).send('Modèle de véhicule non trouvé');
    }

    await vehicleModel.destroy();
    res.status(200).send('Modèle de véhicule supprimé avec succès');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;