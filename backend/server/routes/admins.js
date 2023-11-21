const express = require("express");
const router = express.Router();
const { Admin } = require("../scripts/db");
const bcrypt = require('bcrypt');
const saltRounds = 10; 

// LOGING 
router.post('/login', async (req, res) => {
    try {
      console.log(req.body);
      const { email, password } = req.body;
      
      // Recherche de l'admin par email
      const admin = await Admin.findOne({ where: { email } });
  
      if (!admin) {
        // Si aucun admin n'est trouvé avec cet email
        return res.status(404).json({ message: 'Mail inconnu' });
      }
  
      // Comparaison du mot de passe fourni avec le hash dans la base de données
      const match = await bcrypt.compare(password, admin.password);
      console.log(match);
      if (match) {
        // Si les mots de passe correspondent
        res.json({ message: 'Validation réussie', name: admin.name });
      } else {
        // Si les mots de passe ne correspondent pas
        res.status(401).json({ message: 'Mot de passe incorrect' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Obtenir tous les admins
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ajouter
router.post('/add', async (req, res) => {
  try {
      const { name, email, password, is_master } = req.body;

      // Vérifie si l'admin existe déjà
      const existingAdmin = await Admin.findOne({ where: { email } });
      if (existingAdmin) {
          return res.status(409).json({ message: 'Un admin avec cet email existe déjà' });
      }

      // Hashage du mot de passe
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Création du nouvel admin
      const newAdmin = await Admin.create({
          name,
          email,
          password: hashedPassword,
          is_master
      });

      res.status(201).json({ message: 'Nouvel admin créé', adminId: newAdmin.id });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Modifier
router.put('/:id', async (req, res) => {
  try {
    const adminId = req.params.id;
    const { name, email, password, is_master } = req.body;

    // Vérification si l'admin existe
    const existingAdmin = await Admin.findByPk(adminId);

    if (!existingAdmin) {
      return res.status(404).json({ message: 'Admin introuvable' });
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

    res.json({ message: 'Admin mis à jour', adminId: existingAdmin.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Supprimer
router.delete('/:id', async (req, res) => {
  try {
    const adminId = req.params.id;

    // Vérification si l'admin existe
    const existingAdmin = await Admin.findByPk(adminId);

    if (!existingAdmin) {
      return res.status(404).json({ message: 'Admin introuvable' });
    }

    // Suppression de l'admin
    await existingAdmin.destroy();

    res.json({ message: 'Admin supprimé', adminId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
