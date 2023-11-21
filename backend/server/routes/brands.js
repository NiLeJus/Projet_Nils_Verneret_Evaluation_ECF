const express = require("express");
const router = express.Router();
const { VehicleModel, Brand } = require('../scripts/db');

// Récupèrer
router.get("/", async (req, res) => {
  try {
    const brands = await Brand.findAll();
    res.json(brands);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Ajouter
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send("Le nom de la marque est requis");
    }

    const newBrand = await Brand.create({ name });
    res.status(201).json(newBrand); // Renvoie la marque créée
  } catch (error) {
    // Gestion des erreurs
    res.status(500).send("Erreur lors de la création de la marque");
  }
});

// Supprimer
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const relatedVehicleModels = await VehicleModel.findAll({
      where: { brand_id: id },
      attributes: ["name"],
    });

    if (relatedVehicleModels.length > 0) {
      return res.status(400).json({
        message:
          "Impossible de supprimer la marque car elle est associée à des modèles de véhicules",
        models: relatedVehicleModels.map((model) => model.name),
      });
    }

    // Supprimer la marque si aucun modèle associé n'est trouvé
    await Brand.destroy({ where: { id: id } });
    res.status(200).send(`Marque avec l'ID ${id} supprimée avec succès`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Modifier une marque
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;

    if (!name) {
      return res.status(400).send("Le nouveau nom de la marque est requis");
    }

    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).send("Marque non trouvée");
    }

    brand.name = name;
    await brand.save();

    res.json({ message: "Marque modifiée avec succès", brand });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
