const express = require("express");
const router = express.Router();

const {
    Request,
    Vehicle,
} = require("../scripts/db");

// Obtenir toutes les demandes
router.get("/", async (req, res) => {
    try {
        const requests = await Request.findAll({
            include: [
                {
                    model: Vehicle,
                    attributes: ["id"],
                },
            ],
        });
        res.json(requests);
    } catch (error) {
      res.status(500).send(error.message);
    }
}
);

//Ajouter
router.post('/', async (req, res) => {
  if (req.body.honeyPot) {
    console.log('Tentative de soumission détectée par un bot.');
    return res.status(201).json({message: "Traitée comme une soumission valide par un bot."});
}
    try {
      const newRequest = await Request.create(req.body);
      res.status(201).json(newRequest);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  

// Modifier 
router.put('/:id', async (req, res) => {
    try {
      const [updated] = await Request.update(req.body, {
        where: { id: req.params.id }
      });
      if (updated) {
        const updatedRequest = await Request.findByPk(req.params.id);
        res.status(200).json(updatedRequest);
      } else {
        res.status(404).send('Demande non trouvée');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  

// Supprimer
router.delete('/:id', async (req, res) => {
    try {
      const deleted = await Request.destroy({
        where: { id: req.params.id }
      });
      if (deleted) {
        res.status(204).send("Demande supprimée");
      } else {
        res.status(404).send("Demande non trouvée");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  

module.exports = router;
 
  