const express = require('express');
const router = express.Router();
const { Service } = require('../scripts/db');
const authenticateToken = require('../scripts/verifyToken');

// Obtenir tous les services
router.get('/', async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Ajouter un nouveau service
router.post('/', async (req, res) => {
  try {
    const { name, description, min_price } = req.body;
    console.log('Received data:', name, description, min_price); 

    const newService = await Service.create({ name, description, min_price });

    res.status(201).json(newService); 
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Modifier un service existant
router.put('/:id', async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (service) {
      await service.update(req.body);
      res.json(service);
    } else {
      res.status(404).send('Service non trouvé');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Supprimer un service
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (service) {
      await service.destroy();
      res.send('Service supprimé avec succès');
    } else {
      res.status(404).send('Service non trouvé');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
