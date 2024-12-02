const express = require("express");
const router = express.Router();
const { Admin } = require("../scripts/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { body, validationResult } = require('express-validator');
const authenticateToken = require('../scripts/verifyToken');

// LOGING
router.post('/login',
  // Validation des entrées
  body('email').isEmail().withMessage('Entrez un email valide'),
  body('password').isLength({ min: 5 }).withMessage('Le mot de passe doit contenir au moins 5 caractères'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Ajout d'un timer
    await delay(3000);

  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(404).json({ message: "Mail inconnu" });
    }

    // Comparaison du mot de passe fourni avec le hash dans la base de données
    const match = await bcrypt.compare(password, admin.password);

    if (match) { // Si les mots de passe correspondent
      const token = jwt.sign(
        { id: admin.id, email: admin.email },
        "lQ68vvBzgiz$ZJSJbUDf",
        { expiresIn: "1h" } // Temps d'expiration 
      );

      res.json({ message: "Validation réussie", name: admin.name, token });
    } else {
      res.status(401).json({ message: "Mot de passe incorrect" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Obtenir tous les admins
router.get("/", authenticateToken, async (req, res) => {
  try {
    const admins = await Admin.findAll({
      where: {
        is_master_user: false
      }
    });
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fonction de délai
const delay = (duration) => new Promise(resolve => setTimeout(resolve, duration));


// Ajouter
router.post("/add", async (req, res) => {
  try {
    const { name, email, password, is_master } = req.body;

    // Vérifie si l'admin existe déjà
    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res
        .status(409)
        .json({ message: "Un admin avec cet email existe déjà" });
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Création du nouvel admin
    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      is_master,
    });

    res
      .status(201)
      .json({ message: "Nouvel admin créé", adminId: newAdmin.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Modifier
router.put("/:id", async (req, res) => {
  try {
    const adminId = req.params.id;
    const { name, email, password, is_master } = req.body;

    // Vérification si l'admin existe
    const existingAdmin = await Admin.findByPk(adminId);

    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin introuvable" });
    }

    // Hashage du mot de passe si fourni
    if (password) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      existingAdmin.password = hashedPassword;
    }

    existingAdmin.name = name;
    existingAdmin.email = email;
    existingAdmin.is_master = is_master;

    // Sauvegarde des modifications
    await existingAdmin.save();

    res.json({ message: "Admin mis à jour", adminId: existingAdmin.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Supprimer
router.delete("/:id", async (req, res) => {
  try {
    const adminId = req.params.id;

    // Vérification si l'admin existe
    const existingAdmin = await Admin.findByPk(adminId);

    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin introuvable" });
    }

    // Suppression de l'admin
    await existingAdmin.destroy();

    res.json({ message: "Admin supprimé", adminId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
