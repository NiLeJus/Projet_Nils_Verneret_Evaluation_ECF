const express = require("express");
const router = express.Router();
const { Day, DefaultWeek } = require("../scripts/db");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const { format, parseISO } = require('date-fns');

router.get("/alldays/:year", async (req, res) => {
  try {

    // Valider l'année
    const validatedYear = validateYearParam(req.params.year);
    const startDate = new Date(validatedYear, 0, 1); // 1er janvier de l'année
    const endDate = new Date(validatedYear, 11, 31); // 31 décembre de l'année

    const days = await Day.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate], // Utiliser l'opérateur between de Sequelize
        },
      },
      order: [["date", "ASC"]], // S'assure que les résultats sont ordonnés par date
    });

    // Transformer les jours en semaines
    const weeks = days.reduce((acc, day) => {
      const weekNumber = getISOWeekNumber(new Date(day.date));
      if (!acc[weekNumber]) {
        acc[weekNumber] = [];
      }
      acc[weekNumber].push({
        ...day.dataValues,
        morningOpening: formatTime(day.dataValues.morningOpening), 
        afternoonOpening: formatTime(day.dataValues.afternoonOpening),
      });
      return acc;
    }, {});

    console.log(weeks);
    res.json(weeks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


function validateYearParam(year) {
  // Vérifie que l'année est un nombre.
  const yearInt = parseInt(year, 10);
  if (isNaN(yearInt)) {
    throw new Error("L'année doit être un nombre.");
  }

  // Vérifie que l'année est dans une plage raisonnable (exemple : 1900 - année courante + 1).
  const currentYear = new Date().getFullYear();
  if (yearInt < 1900 || yearInt > currentYear + 1) {
    throw new Error("L'année est hors de la plage acceptable.");
  }

  return yearInt;
}

router.get("/:weekStart/:year/:numberOfWeeks", async (req, res) => {
  try {
    const { weekStart, year, numberOfWeeks } = req.params;

    // Convertir les paramètres en entiers
    const startWeek = parseInt(weekStart, 10);
    const numberOfWeeksInt = parseInt(numberOfWeeks, 10);
    const yearInt = parseInt(year, 10);

    if(isNaN(startWeek) || isNaN(numberOfWeeksInt) || isNaN(yearInt)) {
      return res.status(400).json({ error: "Invalid parameters" });
    }

    // Calculer la date de début de la semaine de départ
    let startDate = new Date(yearInt, 0, 1 + (startWeek - 1) * 7);
    while (startDate.getDay() !== 1) {
      startDate.setDate(startDate.getDate() - 1);
    }

    // Calculer la date de fin en ajoutant le nombre de semaines spécifié
    let endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + numberOfWeeksInt * 7 - 1);

    const days = await Day.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate]
        }
      },
      order: [['date', 'ASC']] // S'assure que les résultats sont ordonnés par date
    });

    // Transformer les jours en semaines
    const weeks = days.reduce((acc, day) => {
      const weekNumber = getISOWeekNumber(new Date(day.date));
      if (!acc[weekNumber]) {
        acc[weekNumber] = [];
      }
      acc[weekNumber].push(day);
      return acc;
    }, {});

    res.json(weeks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function getISOWeekNumber(d) {
  const date = new Date(d.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

function formatTime(timeString) {
  if (!timeString) return null;
  return timeString.slice(0, 5); 
}

router.get("/DefaultWeek", async (req, res) => {
  try {
    const defaultWeek = await DefaultWeek.findAll();
    const formattedWeek = defaultWeek.map(day => {
      const dayData = day.dataValues; // Accès aux valeurs réelles

      // Appliquer la fonction de formatage aux horaires
      return {
        ...dayData,
        morningOpening: formatTime(dayData.morningOpening),
        morningClosing: formatTime(dayData.morningClosing),
        afternoonOpening: formatTime(dayData.afternoonOpening),
        afternoonClosing: formatTime(dayData.afternoonClosing),
      };
    });

    res.json(formattedWeek);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mettre à jour un jour
router.put("/days/:date", async (req, res) => {
  try {
    // Parse the date parameter using parseISO from date-fns
    const parsedDate = parseISO(req.params.date);

    // Format the parsed date to a string in 'yyyy-MM-dd' format
    const formattedDate = format(parsedDate, 'yyyy-MM-dd');

    // Use formattedDate in your Sequelize update query

    const numRowsUpdated = await Day.update({
      isOpen: req.body.isOpen,
      morningOpening: req.body.morningOpening, // Assurez-vous que ce nom correspond
      morningClosing: req.body.morningClosing, // Assurez-vous que ce nom correspond
      afternoonOpening: req.body.afternoonOpening, // Assurez-vous que ce nom correspond
      afternoonClosing: req.body.afternoonClosing, // Assurez-vous que ce nom correspond
      isHoliday: req.body.isHoliday
    }, {
      where: { id: req.body.id }
    });
    
    if (numRowsUpdated > 0) {
      // The update was successful
      res.status(200).json({ message: "Day updated." });
    } else {
      // No rows were updated (perhaps the date was not found)
      res.status(404).json({ message: "Day not found." });
    }
  } catch (error) {
    console.error(`Error updating day: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
