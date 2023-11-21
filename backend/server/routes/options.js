const express = require("express");
const router = express.Router();
const { Option } = require("../scripts/db");

// Récupèrer
router.get("/", async (req, res) => {
  try {
    const options = await Option.findAll();
    res.json(options);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Ajouter
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;

    const newOption = await Option.create({ name, description });
    res.status(201).json(newOption);
  } catch (error) {
    // Gestion des erreurs
    res.status(500).send("Erreur lors de la création de l'option");
  }
});

// Supprimer
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id; // Récupérer l'ID de l'option à supprimer

    // Trouver l'option par son ID
    const option = await Option.findByPk(id);
    if (!option) {
      return res.status(404).send("Option non trouvée"); // Si l'option n'existe pas
    }

    // Supprimer l'option
    await option.destroy();

    // Répondre avec un message de succès
    res.send("Option supprimée avec succès");
  } catch (error) {
    // Gestion des erreurs
    res
      .status(500)
      .send("Erreur lors de la suppression de l'option: " + error.message);
  }
});

// Modifier
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body; // Récupérer la description ainsi que le nom

    // Vérifier que le nom est fourni
    if (!name) {
      return res.status(400).send("Le nouveau nom de l'option est requis");
    }

    // Trouver l'option par son identifiant
    const option = await Option.findByPk(id);
    if (!option) {
      return res.status(404).send("Option non trouvée");
    }

    // Mettre à jour le nom et la description
    option.name = name;
    if (description !== undefined) {
      // Vérifier si la description est fournie
      option.description = description;
    }
    await option.save();

    // Renvoyer la réponse
    res.json({ message: "Option modifiée avec succès", option });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
