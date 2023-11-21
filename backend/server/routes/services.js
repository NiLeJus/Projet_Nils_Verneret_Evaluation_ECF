const express = require('express');
const router = express.Router();
const { Service } = require('../scripts/db');

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
    console.log('Received data:', name, description, min_price); // Logging pour déboguer

    // Ici, ajoutez votre logique pour insérer les données dans la base de données
    const newService = await Service.create({ name, description, min_price });

    res.status(201).json(newService); // Renvoyer le service créé
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
router.delete('/:id', async (req, res) => {
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
