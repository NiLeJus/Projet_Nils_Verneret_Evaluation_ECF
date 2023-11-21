const express = require('express');
const router = express.Router();
const { VehicleCondition} = require('../scripts/db');

// Récupérer
router.get('/', async (req, res) => {
  try {
    const conditions = await VehicleCondition.findAll();
    res.json(conditions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Ajouter 
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCondition = await VehicleCondition.create({ name, description });
    res.status(201).json(newCondition);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Modifier
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const condition = await VehicleCondition.findByPk(id);

    if (condition) {
      condition.name = name;
      condition.description = description;
      await condition.save();
      res.json(condition);
    } else {
      res.status(404).send('Condition non trouvée');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Supprimer
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const condition = await VehicleCondition.findByPk(id);

    if (condition) {
      await condition.destroy();
      res.send('Condition supprimée avec succès');
    } else {
      res.status(404).send('Condition non trouvée');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
