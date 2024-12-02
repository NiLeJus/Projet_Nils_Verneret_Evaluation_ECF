import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import {
  scheduleGetAllDays,
  scheduleGetDefaultWeek,
} from "../../../serverRelated/ApiRequest";

import { format, parseISO, set } from "date-fns";
import { af, fr } from "date-fns/locale"; // Importer les locales françaises
import { getWeek } from "date-fns";

import Button from "react-bootstrap/Button"; // Assurez-vous d'importer Button

const getCurrentYear = () => {
  const currentDate = new Date();
  return currentDate.getFullYear();
};

export const ScheduleManagement = () => {
  const [copiedDayData, setCopiedDayData] = useState(null);
  const [preparedData, setPreparedData] = useState([]);
  const [copiedWeekData, setCopiedWeekData] = useState(null);

  const toggleDayState = (weekIndex, dayIndex) => {
    const newData = [...preparedData];
    // Trouver le bon jour dans la propriété `days`
    const day = newData[weekIndex].days[dayIndex];

    // Modifier l'état isOpen
    day.isOpen = !day.isOpen;

    // Appliquer d'autres logiques si nécessaire...

    setPreparedData(newData);
  };

  const copyDayContent = (dayId) => {
    // Directement trouver le jour spécifique par son ID dans le tableau de jours
    const dayToCopy = preparedData.find((day) => day.id === dayId);

    if (dayToCopy) {
      // Exclure la propriété 'date' lors de la copie
      const { day_of_week, ...rest } = dayToCopy;
      setCopiedDayData({ ...rest });
      console.log(`Contenu du jour :` + dayToCopy);
      console.log(`Contenu du jour ${dayId} copié, à l'exception du jour.`);
    } else {
      console.log("Jour non trouvé.");
    }
  };

  const pasteStoredDayContent = (dayId) => {
    if (!copiedDayData) {
      console.log("Aucun contenu à coller.");
      return;
    }

    const newData = preparedData.map((day) =>
      day.id === dayId ? { ...day, ...copiedDayData, id: day.id } : day
    );

    setPreparedData(newData);
    console.log(`Contenu collé dans le jour ${dayId}.`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const year = getCurrentYear();
      try {
        // Assurez-vous que les fonctions renvoient directement un tableau ou extrayez le tableau comme nécessaire
        const daysResponse = await scheduleGetAllDays(year);
        console.log("daysResponse", daysResponse);

        const preparedData = prepareDataForDisplay(daysResponse);
        setPreparedData(preparedData);
        console.log("peparedData", preparedData)

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

    return groupedData;
  };

  const handleInputChange = (event, weekIndex, dayIndex, header) => {
    const newValue = event.target.value !== "" ? event.target.value : null;
  
    // Copie profonde pour éviter la mutation directe de l'état
    const newData = [...preparedData];
    const day = newData[weekIndex].days[dayIndex]; // Accéder à l'objet jour spécifique
  
    // Mettre à jour la valeur spécifique
    const key = header.toLowerCase().replace(/\s/g, ""); // Convertir l'en-tête en clé correspondante
    day[key] = newValue || ""; // Utiliser une chaîne vide si la nouvelle valeur est falsy
  
    // Mettre à jour l'état du composant avec les nouvelles données
    setPreparedData(newData);
  };
  

  const handleInputBlur = (event, weekIndex, dayIndex, header) => {
    const newValue = event.target.value;
    const key = header.toLowerCase().replace(/\s/g, ""); // Convertit l'en-tête en clé correspondante
  
    // Copie profonde pour éviter la mutation directe de l'état
    const newData = [...preparedData];
    const day = newData[weekIndex].days[dayIndex]; // Accéder à l'objet jour spécifique
  
    // Met à jour la valeur spécifique
    day[key] = newValue || ""; // Utilisez une chaîne vide si la nouvelle valeur est falsy
  
    // Met à jour l'état du composant avec les nouvelles données
    setPreparedData(newData);
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


  const pasteDefaultWeekContent = async (weekIndex) => {
    try {
      const defaultWeekData = await scheduleGetDefaultWeek();
      if (defaultWeekData && defaultWeekData.length > 0 && preparedData[weekIndex]) {
        const newData = [...preparedData];
        const targetWeek = newData[weekIndex];

        const updatedDays = targetWeek.days.map((day, dayIndex) => {
          const defaultDay = defaultWeekData.find(day => day.day_of_week === dayIndex + 1);
          if (defaultDay) {
            return {
              ...day,
              isOpen: defaultDay.isOpen,
              morningOpening: defaultDay.morningOpening ? defaultDay.morningOpening.substring(0, 5) : day.morningOpening,
              morningClosing: defaultDay.morningClosing ? defaultDay.morningClosing.substring(0, 5) : day.morningClosing,
              afternoonOpening: defaultDay.afternoonOpening ? defaultDay.afternoonOpening.substring(0, 5) : day.afternoonOpening,
              afternoonClosing: defaultDay.afternoonClosing ? defaultDay.afternoonClosing.substring(0, 5) : day.afternoonClosing,
            };
          } else {
            return day;
          }
        });

        newData[weekIndex] = { ...targetWeek, days: updatedDays };
        setPreparedData(newData);
        console.log("NewData", newData);

      } else {
        console.error("Aucune donnée de semaine par défaut ou données de semaine préparées invalides.");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de la semaine par défaut:", error);
    }
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

  const rowsHeaders = [
    "Date",
    "État",
    "Ouverture Matin",
    "Fermeture Matin",
    "Ouverture Après-midi",
    "Fermeture Après-midi",
    `Actions`,
  ];

  return (
    <>
      <Container>
        {preparedData.map((weekData, index) => (
          <>
            <div>
              <h2
                key={`week-title-${index}`}
                className="text-light mt-5"
              >
                Semaine {weekData.weekNum}
              </h2>
              <Button
                variant="secondary"
                onClick={() => copyWeekContent(index)}
              >
                Copier
              </Button>{" "}
              <Button
                variant="secondary"
                onClick={() => pasteStoredWeekContent(index)}
              >
                Coller
              </Button>{" "}
              <Button
                variant="secondary"
                onClick={() => openDaysInWeek(index)}
              >
                Ouvrir la semaine
              </Button>
              <Button
                variant="secondary"
                onClick={() => closeDaysInWeek(index)}
              >
                Fermer la semaine
              </Button>
              <Button
                variant="secondary"
                onClick={() => pasteDefaultWeekContent(index)}
              >
                Appliquer semaine défault
              </Button>
            </div>

            <Table
              key={`table-${index}`}
              striped
              bordered
              hover
              className="text-center mt-4"
              responsive
            >
              <tbody>
                {rowsHeaders.map((header, headerIndex) => (
                  <tr key={headerIndex}>
                    <th>{header}</th>
                    {weekData.days.map((day, dayIndex) => {
                      let cellContent;
                      switch (header) {
                        case "Date":
                          // Assurez-vous que day.date est défini avant de l'utiliser
                          const date = day.date ? parseISO(day.date) : null;
                          cellContent = date
                            ? format(date, "EEEE dd MMMM yyyy", {
                                locale: fr,
                              })
                            : "Date non définie"; // Gestion d'une date indéfinie
                          break;
                        case "État":
                          return (
                            <td key={`${headerIndex}-${dayIndex}`}>
                              <Button
                                onClick={() => toggleDayState(index, dayIndex)}
                                style={{
                                  backgroundColor: day.isOpen ? "green" : "red",
                                  color: "white",
                                }}
                              >
                                {day.isOpen ? "Ouvert" : "Fermé"}
                              </Button>
                            </td>
                          );
                          case "Ouverture Matin": cellContent = (
                            <input
                              key={`input-${dayIndex}-${
                                day.isOpen ? "open" : "closed"
                              }`}
                              type="time"
                              value={
                                day.morningOpening
                              }
                              onChange={(e) =>
                                handleInputChange(e, index, dayIndex, header)
                              }
                              disabled={!day.isOpen}
                              style={{
                                backgroundColor: day.isOpen
                                  ? "lightyellow"
                                  : "lightgrey",
                              }}
                            />
                          );
                          break;
                        case "Fermeture Matin":
                            cellContent = (
                                <input
                                  key={`input-${dayIndex}-${
                                    day.isOpen ? "open" : "closed"
                                  }`}
                                  type="time"
                                  value={
                                    day.morningClosing
                                  }
                                  onChange={(e) =>
                                    handleInputChange(e, index, dayIndex, header)
                                  }
                                  disabled={!day.isOpen}
                                  style={{
                                    backgroundColor: day.isOpen
                                      ? "lightyellow"
                                      : "lightgrey",
                                  }}
                                />
                              );
                              break;
                        case "Ouverture Après-midi":
                            cellContent = (
                                <input
                                  key={`input-${dayIndex}-${
                                    day.isOpen ? "open" : "closed"
                                  }`}
                                  type="time"
                                  value={
                                    day.afternoonOpening
                                  }
                                  onChange={(e) =>
                                    handleInputChange(e, index, dayIndex, header)
                                  }
                                  disabled={!day.isOpen}
                                  style={{
                                    backgroundColor: day.isOpen
                                      ? "lightyellow"
                                      : "lightgrey",
                                  }}
                                />
                              );
                              break;
                        case "Fermeture Après-midi":
                          cellContent = (
                            <input
                              key={`input-${dayIndex}-${
                                day.isOpen ? "open" : "closed"
                              }`}
                              type="time"
                              value={
                                day.afternoonClosing
                              }
                              onChange={(e) =>
                                handleInputChange(e, index, dayIndex, header)
                              }
                              disabled={!day.isOpen}
                              style={{
                                backgroundColor: day.isOpen
                                  ? "lightyellow"
                                  : "lightgrey",
                              }}
                            />
                          );
                          break;
                       case "Actions":
                          cellContent = (
                            <div>
                              <Button
                                variant="secondary"
                                onClick={() => pasteStoredDayContent(day.id)}
                              >
                                Coller
                              </Button>{" "}
                              <Button
                                variant="secondary"
                                onClick={() => copyDayContent(day.id)}
                              >
                                Copier
                              </Button>
                            </div>
                          );
                          break;

                        default:
                          cellContent = "N/A";
                      }
                      return (
                        <td key={`${headerIndex}-${dayIndex}`}>
                          {cellContent}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        ))}
      </Container>
    </>
  );
};

export default ScheduleManagement;
