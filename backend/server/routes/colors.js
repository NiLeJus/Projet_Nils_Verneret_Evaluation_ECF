const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { Color } = require('../scripts/db');


// Route pour obtenir tous les services
router.get("/", async (req, res) => {
  try {
    const colors = await Color.findAll();
    res.json(colors);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Ajouter
router.post("/", async (req, res) => {
  try {
    const { name, hex } = req.body;
    const newColor = await Color.create({ name, hex });
    res.status(201).json(newColor);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Modifier
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, hex } = req.body;
    const color = await Color.findByPk(id);
    if (color) {
      color.name = name;
      color.hex = hex;
      await color.save();
      res.json(color);
    } else {
      res.status(404).send("Couleur non trouvée");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Supprimer
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const color = await Color.findByPk(id);
    if (color) {
      await color.destroy();
      res.send("Couleur supprimée avec succès");
    } else {
      res.status(404).send("Couleur non trouvée");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
