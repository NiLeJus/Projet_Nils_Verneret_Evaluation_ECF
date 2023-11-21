const express = require('express');
const router = express.Router();
const { Transmission} = require('../scripts/db');

// Récupèrer
router.get('/', async (req, res) => {
  try {
    const transmissions = await Transmission.findAll();
    res.json(transmissions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Ajouter
router.post('/', async (req, res) => {
  try {
    const { transmission_type, speed_number, name } = req.body;
    const newTransmission = await Transmission.create({ transmission_type, speed_number, name });
    res.status(201).json(newTransmission);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


// Modifier
router.put('/:id', async (req, res) => {
  try {
    const { transmission_type, speed_number, name } = req.body;
    const transmissionId = req.params.id;

    const transmission = await Transmission.findByPk(transmissionId);
    if (!transmission) {
      return res.status(404).send('Transmission not found');
    }

    transmission.transmission_type = transmission_type;
    transmission.speed_number = speed_number;
    transmission.name = name;

    await transmission.save();
    res.json(transmission);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Supprimer
router.delete('/:id', async (req, res) => {
  try {
    const transmissionId = req.params.id;
    const transmission = await Transmission.findByPk(transmissionId);

    if (!transmission) {
      return res.status(404).send('Transmission not found');
    }

    await transmission.destroy();
    res.send('Transmission deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
});


module.exports = router;

