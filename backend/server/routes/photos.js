const express = require("express");
const router = express.Router();
const { Photo } = require("../scripts/db");
const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");


// Limite de taille de fichier à 5 MB
const maxSize = 5 * 1024 * 1024;

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};
// Configuration de multer pour stocker les fichiers temporairement
const uploadTemp = multer({
  dest: "uploads/temp/",
  limits: { fileSize: maxSize },
  fileFilter: fileFilter,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "public", "vehicleImages"));
  },
  filename: function (req, file, cb) {
    // Utilisation de uuid pour générer un nom de fichier unique
    cb(null, `${Date.now()}-${uuidv4()}`);
  },
});

// Récupérer
router.get("/", async (req, res) => {
  try {
    const photos = await Photo.findAll();
    res.json(photos);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Ajouter
router.post("/", uploadTemp.array("photo", 5), async (req, res) => {
  try {
    const { vehicle_id } = req.body;
    if (req.files) {
      let newPhotos = [];
      for (const file of req.files) {
        const tempPath = file.path;
        const cleanFilename = file.originalname.replace(/[^a-zA-Z0-9.]/g, "-");
        const targetFilename = `${Date.now()}-${uuidv4()}-${cleanFilename}`;
        const targetPath = path.join(
          __dirname,
          "..",
          "public",
          "vehicleImages",
          targetFilename
        );

        const desiredWidth = 720;
        const desiredHeight = 400;

        try {
          await sharp(tempPath)
            .resize({
              width: desiredWidth,
              height: desiredHeight,
              fit: sharp.fit.cover,
              withoutEnlargement: true,
            })
            .webp({ lossless: true })
            .toFile(targetPath);

          fs.unlinkSync(tempPath);

          const url = `/public/vehicleImages/${targetFilename}`;
          const newPhoto = await Photo.create({ vehicle_id, url });
          newPhotos.push(newPhoto);
        } catch (error) {
          fs.unlinkSync(tempPath); // Nettoyer en cas d'erreur de traitement d'image
          throw error; // Continuer à lancer l'erreur pour être gérée plus loin
        }
      }
      res.status(201).json(newPhotos);
    } else {
      throw new Error("Aucun fichier n'a été téléchargé.");
    }
  } catch (error) {
    // Nettoyer les fichiers déjà traités ou les enregistrements de base de données en cas d'erreur
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
        const filePath = path.join(
          __dirname,
          "..",
          "public",
          "vehicleImages",
          photo.filename
        );
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
