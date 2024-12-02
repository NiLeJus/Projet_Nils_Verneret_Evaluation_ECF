import React from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale'; // Assurez-vous que les locales sont correctement importées



const ScheduleManagement = ({
  preparedData,
  toggleDayState,
  copyDayContent,
  pasteStoredDayContent,
  handleInputChange,
  handleInputBlur,
  copyWeekContent,
  pasteStoredWeekContent,
  openDaysInWeek,
  closeDaysInWeek,
  pasteDefaultWeekContent,
  updateDayData,
}) => {  const rowsHeaders = [
  "date",
  "status",
  "morningOpening",
  "morningClosing",
  "afternoonOpening",
  "afternoonClosing",
  `actions`,
];

  
  return (
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
                    case "date":
                      // Assurez-vous que day.date est défini avant de l'utiliser
                      const date = day.date ? parseISO(day.date) : null;
                      cellContent = date
                        ? format(date, "EEEE dd MMMM yyyy", {
                            locale: fr,
                          })
                        : "Date non définie"; // Gestion d'une date indéfinie
                      break;
                    case "status":
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
                      case "morningOpening": cellContent = (
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
                    case "morningClosing":
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
                    case "afternoonOpening":
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
                    case "afternoonClosing":
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
                   case "actions":
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
  );
};

export default ScheduleManagement;
