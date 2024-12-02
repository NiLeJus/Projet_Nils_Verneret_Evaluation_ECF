import React, { useEffect, useState } from "react";
import { scheduleGetWeek } from "../../serverRelated/ApiRequest";
import { Container, Row, Col } from "react-bootstrap";
import { format, getISOWeek } from "date-fns";
import { fr } from "date-fns/locale"; // Importez le locale de votre choix

const getCurrentDate = () => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    weekNumber: getISOWeek(now), // Utilisez getISOWeek pour obtenir le numéro de la semaine actuelle selon la norme ISO.
  };
};

export const FooterSchedule = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const currentDate = getCurrentDate();
      try {
        const year = currentDate.year;
        const weekNumber = currentDate.weekNumber;

        console.log("weekNumber", weekNumber);

        const response = await scheduleGetWeek(year, weekNumber, 1);
        const weekData = response[weekNumber];
        console.log(weekData);
        if (weekData) {
          const transformedWeekData = weekData.map((day) => {
            // Ajustez la logique pour traiter '00:00:00' comme indiquant que le créneau est fermé
            const isMorningOpen = day.morningOpening !== '00:00:00' && day.morningClosing !== '00:00:00';
            const isAfternoonOpen = day.afternoonOpening !== '00:00:00' && day.afternoonClosing !== '00:00:00';
          
            const morningStatus = isMorningOpen
              ? `${day.morningOpening.slice(0, -3)} - ${day.morningClosing.slice(0, -3)}`
              : "Fermé";
          
            const afternoonStatus = isAfternoonOpen
              ? `${day.afternoonOpening.slice(0, -3)} - ${day.afternoonClosing.slice(0, -3)}`
              : "Fermé";
          
            // Utilisez isOpen pour déterminer si le jour est complètement fermé
            const dayStatus = !day.isOpen ? "Fermé pour toute la journée" : null;
          
            return {
              ...day,
              dayStatus,
              morningStatus,
              afternoonStatus,
            };
          });
          
          

          setSchedule(transformedWeekData);
        } else {
          setSchedule([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des horaires:", error);
      }
    };

    fetchData();
  }, []);

  const getDate = (date) => {
    const dayDate = new Date(date);
    const dayName = format(dayDate, "EEEE", { locale: fr });
    return `${dayName.charAt(0).toUpperCase() + dayName.slice(1)}`;
  };

  // Séparez le tableau en deux : la majorité des jours et les deux derniers jours
  const mainSchedule = schedule.slice(0, -2);
  const lastTwoDays = schedule.slice(-2);

  return (
    <Container>
      {schedule.length > 0 ? (
        <>
          {" "}
          <p className="footer-schedule pb-2 border-light">
            Horaires d'ouverture
          </p>
          <Row>
            {mainSchedule.map((day, index) => (
              <Col key={index}>
                <p className="schedule-days">{getDate(day.date)}</p>
                {day.dayStatus ? (
                  <p className="footer-schedule schedule-hours">
                    {day.dayStatus}
                  </p>
                ) : (
                  <>
                    <p className="schedule-hours">
                      Matin : <br /> {day.morningStatus}
                    </p>
                    <p className="schedule-hours">
                      Après-midi : <br /> {day.afternoonStatus}
                    </p>
                  </>
                )}
              </Col>
            ))}
          </Row>
          <Row className="mt-4">
            {lastTwoDays.map((day, index) => (
              <Col key={index}>
                <p className="schedule-days">{getDate(day.date)}</p>
                {day.dayStatus ? (
                  <p className="footer-schedule schedule-hours">
                    {day.dayStatus}
                  </p>
                ) : (
                  <>
                    <p className="schedule-hours">
                      Matin : <br /> {day.morningStatus}
                    </p>
                    <p className="schedule-hours">
                      Après-midi : <br /> {day.afternoonStatus}
                    </p>
                  </>
                )}
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <p>Aucun horaire disponible</p>
      )}
    </Container>
  );
};

export default FooterSchedule;