const express = require('express');
const router = express.Router();
const { VehicleType } = require('../scripts/db');

// Obtenir tous les types de véhicules
router.get('/', async (req, res) => {
    try {
        const vehicleTypes = await VehicleType.findAll();
        res.json(vehicleTypes);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Ajouter un nouveau type de véhicule
router.post('/', async (req, res) => {
    try {
        const { name, description } = req.body;
        const newVehicleType = await VehicleType.create({ name, description });
        res.status(201).json(newVehicleType);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Modifier un type de véhicule
router.put('/:id', async (req, res) => {
    try {
        const vehicleTypeId = req.params.id;
        const { name, description } = req.body;

        const vehicleType = await VehicleType.findByPk(vehicleTypeId);
        if (!vehicleType) {
            return res.status(404).send('Type de véhicule non trouvé');
        }

        vehicleType.name = name;
        vehicleType.description = description;
        await vehicleType.save();

        res.json(vehicleType);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Supprimer un type de véhicule
router.delete('/:id', async (req, res) => {
    try {
        const vehicleTypeId = req.params.id;
        const vehicleType = await VehicleType.findByPk(vehicleTypeId);

        if (!vehicleType) {
            return res.status(404).send('Type de véhicule non trouvé');
        }

        await vehicleType.destroy();
        res.status(200).send('Type de véhicule supprimé');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
