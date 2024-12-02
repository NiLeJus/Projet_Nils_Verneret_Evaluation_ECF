import React, { useState, useEffect } from "react";
import {
  scheduleGetAllDays,
  scheduleGetDefaultWeek,
  scheduleUpdateDay,
} from "../../../serverRelated/ApiRequest";
import { format, parseISO } from "date-fns";
import { fr, getWeek } from "date-fns";
import ScheduleManagement from "./ScheduleManagement"; // Assurez-vous d'ajuster le chemin selon votre structure

const getCurrentYear = () => {
  const currentDate = new Date();
  return currentDate.getFullYear();
};

export const ScheduleManagementLogic = () => {
  const [copiedDayData, setCopiedDayData] = useState(null);
  const [preparedData, setPreparedData] = useState([]);
  const [copiedWeekData, setCopiedWeekData] = useState(null);

  // Toute la logique de gestion des états, y compris toggleDayState, copyDayContent, etc.

  useEffect(() => {
    const fetchData = async () => {
      const year = getCurrentYear();
      try {
        // Assurez-vous que les fonctions renvoient directement un tableau ou extrayez le tableau comme nécessaire
        const daysResponse = await scheduleGetAllDays(year);
        console.log("daysResponse", daysResponse);

        const preparedData = prepareDataForDisplay(daysResponse);
        setPreparedData(preparedData);
        console.log("peparedData", preparedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des horaires:", error);
      }
    };

    fetchData();
  }, []);

  const prepareDataForDisplay = (data) => {
    const groupedData = [];
    let currentGroup = [];
    const currentWeekNumber = getWeek(new Date());

    Object.keys(data)
      .sort()
      .forEach((weekNumber) => {
        if (parseInt(weekNumber) >= currentWeekNumber) {
          const week = data[weekNumber];
          const firstDayOfWeek = week[0] ? parseISO(week[0].date) : null;
          const weekNum = firstDayOfWeek ? getWeek(firstDayOfWeek) : null;

          week.forEach((day, index) => {
            if (index < 7) {
              currentGroup.push(day);
            }
          });

          if (currentGroup.length > 0 && weekNum !== null) {
            groupedData.push({ weekNum, days: currentGroup });
            currentGroup = [];
          }
        }
      });
    console.log("grouped data :", groupedData);
    return groupedData;
  };

  const toggleDayState = async (weekIndex, dayIndex) => {
    let day; // Déclarer la variable day en dehors du bloc try
    let newData; // Déclarer la variable newData en dehors du bloc try

    try {
      // Deep copy to avoid mutating the state directly
      newData = [...preparedData];
      day = newData[weekIndex].days[dayIndex]; // Accessing the specific day object

      // Modify the isOpen state
      day.isOpen = !day.isOpen;

      // Update the component state with the new data
      setPreparedData(newData);

      // Update the server with the new day data
      const { date, ...dayData } = day; // Exclude the date property
      const formattedDayData = {
        date: formatDate(date), // Format the date
        ...dayData,
      };
      await scheduleUpdateDay(date, formattedDayData);
      console.log(`Day ${date} updated successfully.`);
    } catch (error) {
      console.error(`Error updating day ${day.date}:`, error);
      // Revert the state change if update fails
      if (day) {
        day.isOpen = !day.isOpen; // Revert the isOpen state
      }
      if (newData) {
        setPreparedData([...newData]); // Revert the state change
      }
    }
  };

  const handleInputChange = async (event, weekIndex, dayIndex, header) => {
    const newValue = event.target.value;
    console.log("New input value:", newValue); // Vérifiez ce log
    await updateDayData(weekIndex, dayIndex, header, newValue);
  };

  const updateDayData = async (weekIndex, dayIndex, header, newValue) => {
    // Deep copy to avoid mutating the state directly
    const newData = [...preparedData];
    const day = newData[weekIndex].days[dayIndex]; // Accessing the specific day object

    // Directly assign the new value. Do not use the fallback to empty string if newValue is null or empty
    day[header] = newValue !== null ? newValue : ""; // Utilisez `header` directement

    // Update the component state with the new data
    setPreparedData(newData);

    // Update the server with the new day data
    try {
      // Préparation des données pour l'API
      const { date, ...dayData } = day;
      const formattedDayData = { date: formatDate(date), ...dayData };
      
      // Appelez ici votre API pour mettre à jour les données sur le serveur...
      await scheduleUpdateDay(date, formattedDayData);
      console.log(`Day ${date} updated successfully.`);
    } catch (error) {
      console.error(`Error updating day ${day.date}:`, error);
      // Revert the state change if update fails
      day[header] = ""; // Revert to previous value using `header` directly
      setPreparedData([...newData]); // Revert the state change
    }
  };

  const pasteDefaultWeekContent = async (weekIndex) => {
    try {
      const defaultWeekData = await scheduleGetDefaultWeek();
      if (defaultWeekData) {
        const newData = [...preparedData];
        const targetWeek = newData[weekIndex];
  
        const updatedDays = targetWeek.days.map((day, dayIndex) => {
          const defaultDay = defaultWeekData.find(
            (defaultDay) => defaultDay.day_of_week === dayIndex + 1
          );
          if (defaultDay) {
            return {
              ...day,
              isOpen: defaultDay.isOpen,
              morningOpening: defaultDay.morningOpening
                ? defaultDay.morningOpening.substring(0, 5)
                : day.morningOpening,
              morningClosing: defaultDay.morningClosing
                ? defaultDay.morningClosing.substring(0, 5)
                : day.morningClosing,
              afternoonOpening: defaultDay.afternoonOpening
                ? defaultDay.afternoonOpening.substring(0, 5)
                : day.afternoonOpening,
              afternoonClosing: defaultDay.afternoonClosing
                ? defaultDay.afternoonClosing.substring(0, 5)
                : day.afternoonClosing,
            };
          } else {
            return day;
          }
        });
  
        console.log("UpdatedDays", updatedDays);
        newData[weekIndex] = { ...targetWeek, days: updatedDays };
  
        // Update each day asynchronously
        for (const day of updatedDays) {
          try {
            // Prepare data for the API
            const { date, ...dayData } = day;
            const formattedDayData = { date: formatDate(date), ...dayData };
  
            // Call your API to update the data on the server
            await scheduleUpdateDay(date, formattedDayData);
            console.log(`Day ${date} updated successfully.`);
          } catch (error) {
            console.error(`Error updating day ${day.date}:`, error);
          }
        }
  
        setPreparedData(newData);
        console.log("NewData", newData);
      } else {
        console.error(
          "Aucune donnée de semaine par défaut ou données de semaine préparées invalides."
        );
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de la semaine par défaut:",
        error
      );
    }
  };
  
  
  const copyDayContent = (dayId) => {
    console.log("day Id:", dayId);
    console.log(preparedData);

    // Parcourir chaque semaine dans preparedData
    for (const week of preparedData) {
      // Trouver le jour spécifique par son ID dans le tableau de jours de cette semaine
      const dayToCopy = week.days.find((day) => day.id === dayId);

      if (dayToCopy) {
        // Exclure la propriété 'date' lors de la copie
        const { day_of_week, ...rest } = dayToCopy;
        setCopiedDayData({ ...rest });
        console.log(`Contenu du jour :`, dayToCopy);
        console.log(`Contenu du jour ${dayId} copié, à l'exception du jour.`);
        return; // Sortir de la fonction après avoir trouvé et copié le jour
      }
    }

    console.log("Jour non trouvé.");
  };

  const pasteStoredDayContent = (dayId) => {
    if (!copiedDayData) {
      console.log("Aucun contenu à coller.");
      return;
    }

    // Parcourir chaque semaine dans preparedData
    const newData = preparedData.map((week) => {
      // Trouver le jour spécifique par son ID dans le tableau de jours de cette semaine
      const updatedDays = week.days.map((day) => {
        if (day.id === dayId) {
          // Copier les données du jour et les fusionner avec les données copiées
          return { ...day, ...copiedDayData };
        }
        return day; // Retourner le jour inchangé si ce n'est pas celui à coller
      });

      // Retourner une nouvelle semaine avec les jours mis à jour
      return { ...week, days: updatedDays };
    });

    // Mettre à jour preparedData avec les nouvelles données
    setPreparedData(newData);
    console.log(`Contenu collé dans le jour ${dayId}.`);
  };

  // Function to format the date
  const formatDate = (date) => {
    return format(new Date(date), "yyyy-MM-dd");
  };

  const handleInputBlur = async (event, weekIndex, dayIndex, header) => {
    const newValue = event.target.value;
    await updateDayData(weekIndex, dayIndex, header, newValue);
  };

  const openDaysInWeek = (weekIndex) => {
    const newData = [...preparedData];

    // Accéder à la propriété `days` pour la semaine concernée
    newData[weekIndex].days = newData[weekIndex].days.map((day) => ({
      ...day,
      isOpen: true, // Ferme le jour
      morningOpening: "", // Réinitialise les horaires d'ouverture et de fermeture
      morningClosing: "",
      afternoonOpening: "",
      afternoonClosing: "",
    }));

    // Met à jour l'état du composant avec les nouvelles données
    setPreparedData(newData);

    // Si nécessaire, mettez à jour les données sur le serveur ici
  };



  const copyWeekContent = (weekIndex) => {
    const weekToCopy = preparedData[weekIndex];
    if (weekToCopy) {
      // Exclure la propriété 'date' de chaque jour lors de la copie
      const daysWithoutDate = weekToCopy.days.map((day) => {
        const { date, ...dayWithoutDate } = day;
        return dayWithoutDate;
      });

      // Stocker les données copiées sans les dates
      setCopiedWeekData({ ...weekToCopy, days: daysWithoutDate });
      console.log(
        `Contenu de la semaine ${weekToCopy.weekNum} copié, à l'exception des dates.`
      );
      console.log("CopiedWeekData", copiedWeekData);
    }
  };

  const pasteStoredWeekContent = (weekIndex) => {
    if (!copiedWeekData) {
      console.log("Aucun contenu de semaine à coller.");
      return;
    }

    const newData = [...preparedData];
    const targetWeek = newData[weekIndex];

    // Fusionner les données copiées avec les jours cibles tout en conservant les dates originales
    const mergedDays = targetWeek.days.map((day, index) => {
      if (copiedWeekData.days[index]) {
        return { ...day, ...copiedWeekData.days[index], date: day.date };
      }
      return day;
    });

    newData[weekIndex] = { ...targetWeek, days: mergedDays };
    setPreparedData(newData);
    console.log(
      `Contenu de la semaine collé dans la semaine ${newData[weekIndex].weekNum}, en conservant les dates originales.`
    );
  };

  const closeDaysInWeek = (weekIndex) => {
    const newData = [...preparedData];

    // Accéder à la propriété `days` pour la semaine concernée
    newData[weekIndex].days = newData[weekIndex].days.map((day) => ({
      ...day,
      isOpen: false, // Ferme le jour
      morningOpening: "", // Réinitialise les horaires d'ouverture et de fermeture
      morningClosing: "",
      afternoonOpening: "",
      afternoonClosing: "",
    }));

    // Met à jour l'état du composant avec les nouvelles données
    setPreparedData(newData);

    // Si nécessaire, mettez à jour les données sur le serveur ici
  };

  // Fonctions comme toggleDayState, copyDayContent, pasteStoredDayContent, etc.

  return (
    <ScheduleManagement
      preparedData={preparedData}
      toggleDayState={toggleDayState}
      copyDayContent={copyDayContent}
      pasteStoredDayContent={pasteStoredDayContent}
      handleInputChange={handleInputChange}
      handleInputBlur={handleInputBlur}
      copyWeekContent={copyWeekContent}
      pasteStoredWeekContent={pasteStoredWeekContent}
      openDaysInWeek={openDaysInWeek}
      closeDaysInWeek={closeDaysInWeek}
      pasteDefaultWeekContent={pasteDefaultWeekContent}
      updateDayData={updateDayData}
    />
  );
};

export default ScheduleManagementLogic;
