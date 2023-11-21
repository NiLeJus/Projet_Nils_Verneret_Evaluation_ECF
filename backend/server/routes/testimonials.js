const express = require("express");
const router = express.Router();

const { Testimonial } = require("../scripts/db");

// GET tous les témoignages affichés
router.get("/displayed", async (req, res) => {
  try {
    const displayedTestimonials = await Testimonial.findAll({
      where: {
        testimony_status: "displayed"
      }
    });
    res.json(displayedTestimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET tous les témoignages
router.get("/all", async (req, res) => {
  try {
    const allTestimonials = await Testimonial.findAll();
    res.json(allTestimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Supprimer un témoignage par ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTestimonial = await Testimonial.destroy({
      where: {
        id
      }
    });
    if (deletedTestimonial === 0) {
      res.status(404).json({ message: "Témoignage non trouvé" });
    } else {
      res.json({ message: "Témoignage supprimé avec succès" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Modifier un témoignage par ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, testimony, testimony_status, note } = req.body;
  try {
    const updatedTestimonial = await Testimonial.update(
      {
        name,
        testimony,
        testimony_status,
        note
      },
      {
        where: {
          id
        }
      }
    );
    if (updatedTestimonial[0] === 0) {
      res.status(404).json({ message: "Témoignage non trouvé" });
    } else {
      res.json({ message: "Témoignage modifié avec succès" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ajouter un témoignage
router.post("/", async (req, res) => {
  const { name, testimony, note } = req.body;
  try {
    const newTestimonial = await Testimonial.create({
      name,
      testimony,
      note
    });
    res.json(newTestimonial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
