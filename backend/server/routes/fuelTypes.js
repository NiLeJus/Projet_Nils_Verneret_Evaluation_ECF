const express = require('express');
const router = express.Router();
const { FuelType} = require('../scripts/db');


// Récupèrer
router.get("/", async (req, res) => {
  try {
    const fuelTypes = await FuelType.findAll();
    res.json(fuelTypes);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Ajouter
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const newFuelType = await FuelType.create({ name });
    res.status(201).json(newFuelType);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Modifier
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const fuelType = await FuelType.findByPk(id);
    if (!fuelType) {
      return res.status(404).send("Type de carburant non trouvé");
    }
    fuelType.name = name;
    await fuelType.save();
    res.json(fuelType);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Supprimer
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fuelType = await FuelType.findByPk(id);
    if (!fuelType) {
      return res.status(404).send("Type de carburant non trouvé");
    }
    await fuelType.destroy();
    res.status(200).send("Type de carburant supprimé avec succès");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;

