import React, { useState, useEffect } from "react";

import Offcanvas from "react-bootstrap/Offcanvas";
import { capitalizeFirstLetter } from "../../functions/capitalizeFirstLetter";


export const OffCanvasDisplayVehicleCondition = ({
  vehicleId,
  showOffcanvasVehicleCondition,
  handleCloseOffcanvasVehicleCondition,
}) => {
  const [vehicleConditions, setVehicleConditions] = useState([]);
  useEffect(() => {
    const fetchVehicleConditions = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/vehicleConditions"
        );
        const data = await response.json();
        setVehicleConditions(data);
      } catch (error) {
        console.error("Error fetching vehicle conditions:", error);
      }
    };
    fetchVehicleConditions();
  }, []);

  return <>
    <Offcanvas
        show={showOffcanvasVehicleCondition}
        onHide={handleCloseOffcanvasVehicleCondition}
        scroll={true}
        backdrop={true}
        className="bg-dark custom-offcanvas"
      >
        <Offcanvas.Header
          closeVariant="white"
          closeButton
        >
          <Offcanvas.Title className="mx-auto offcanvas-title">
            États des véhicules
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="px-1">
            {vehicleConditions.map((condition, index) => (
              <div className="mb-3">
                <li
                  key={index}
                  className="text-light li-no-style"
                >
                  <span className="offcanvas-condition-name">
                    {" "}
                    {capitalizeFirstLetter(condition.name) + " : "}{" "}
                  </span>{" "}
                  <br />
                  <span className="offcanvas-condition-description">
                    {condition.description}
                  </span>
                </li>
                <hr />
              </div>
            ))}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>

  </>;
};
export default OffCanvasDisplayVehicleCondition;
