
const express = require('express');
const router = express.Router();
const { Garage } = require('../scripts/db'); // Assurez-vous que ce chemin correspond à l'emplacement de votre modèle Sequelize

// Obtenir tous les garages
router.get('/', async (req, res) => {
    try {
        const garages = await Garage.findAll();
        res.json(garages);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtenir un garage spécifique par ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const garage = await Garage.findByPk(id);
        if (garage) {
            res.json(garage);
        } else {
            res.status(404).send('Garage non trouvé');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Modifier un garage
router.put('/:id', async (req, res) => {
    try {
        const garageId = req.params.id;
        const { address, city, zip_code, telephone, email } = req.body;

        const garage = await Garage.findByPk(garageId);
        if (!garage) {
            return res.status(404).send('Garage non trouvé');
        }

        garage.address = address;
        garage.city = city;
        garage.zip_code = zip_code;
        garage.telephone = telephone;
        garage.email = email;

        await garage.save();

        res.json(garage);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
