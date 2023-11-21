const express = require("express");
const router = express.Router();
const { Photo } = require("../scripts/db");
const multer = require("multer");
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

// Configuration de multer pour stocker les fichiers temporairement
const upload = multer({ dest: 'uploads/' });

// Récupèrer
router.get("/", async (req, res) => {
  try {
    const photos = await Photo.findAll();
    res.json(photos);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'public', 'vehicleImages'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Ajouter
router.post("/", upload.array('photo', 5), async (req, res) => {
  try {
    const { vehicle_id } = req.body;
    console.log(vehicle_id);

    if (req.files) {
      let newPhotos = [];
      for (const file of req.files) {
        const tempPath = file.path;
        const targetFilename = `${Date.now()}-${file.originalname}`;
        const targetPath = path.join(__dirname, '..', 'public', 'vehicleImages', targetFilename);

        const desiredWidth = 720; // Largeur souhaitée
        const desiredHeight = 400; // Hauteur souhaitée

        // Utiliser sharp pour redimensionner l'image
        await sharp(tempPath)
          .resize({
            width: desiredWidth,
            height: desiredHeight,
            fit: sharp.fit.inside, // Cette option garantit que l'image sera agrandie/diminuée pour tenir dans le cadre spécifié, en conservant le ratio
            withoutEnlargement: false // Permet d'agrandir les images plus petites que la taille souhaitée
          })
          .toFormat('jpeg' )
          .toFile(targetPath);

        fs.unlinkSync(tempPath);

        const url = `/public/vehicleImages/${targetFilename}`;
        const newPhoto = await Photo.create({ vehicle_id, url });
        newPhotos.push(newPhoto);
      }

      res.status(201).json(newPhotos);
    } else {
      throw new Error("Aucun fichier n'a été téléchargé.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Mettre à jour
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { vehicle_id, url } = req.body;
    const photo = await Photo.findByPk(id);
    if (photo) {
      photo.vehicle_id = vehicle_id;
      photo.url = url;
      await photo.save();
      res.json(photo);
    } else {
      res.status(404).send("Photo non trouvée");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Supprimer
router.delete("/:vehicle_id", async (req, res) => {
  try {
    const { vehicle_id } = req.params;
    const photos = await Photo.findAll({ where: { vehicle_id } });

    if (photos && photos.length > 0) {
      for (const photo of photos) {
        const filePath = path.join(__dirname, '..', 'public', 'vehicleImages', photo.filename);
        try {
          await fs.unlink(filePath); // Supprime le fichier du serveur
        } catch (fileError) {
          console.error("Erreur lors de la suppression du fichier:", fileError);
        }
        await photo.destroy(); // Supprime l'entrée de la base de données
      }
      res.send("Photos supprimées avec succès");
    } else {
      res.status(404).send("Aucune photo trouvée pour ce véhicule");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});


module.exports = router;
