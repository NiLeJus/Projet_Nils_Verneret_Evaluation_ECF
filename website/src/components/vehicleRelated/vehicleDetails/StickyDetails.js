import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import GUIIcons from "../../general/GUIIcons";
import Button from "react-bootstrap/Button";
import { Tabs, Tab } from "react-bootstrap";
import OffCanvasUserRequest from "../../offCanvas/OffCanvasUserRequest";
import OffCanvasDisplayVehicleCondition from "../../offCanvas/OffCanvasDisplayVehicleCondition";

export const StickyDetails = ({
  vehicleId,
  brand,
  vehicleModel,
  productionYear,
  mileage,
  fuelType,
  transmission,
  vehicleCondition,
  price,
  vehicleComment,
  vehicleModelDescription,
}) => {

//Pour le scroll
  const [topValue, setTopValue] = useState(0);

  const handleScroll = () => {
    setTopValue(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



// Pour les OffCanvas
  const [showOffcanvasVehicleCondition, setShowOffcanvasVehicleCondition] = useState(false);
  const handleShowOffcanvasVehicleCondition = () => setShowOffcanvasVehicleCondition(true);
  const handleCloseOffcanvasVehicleCondition = () => setShowOffcanvasVehicleCondition(false);

  const [showOffcanvasRequest, setShowOffcanvasRequest] = useState(false);
  const handleShowOffcanvasRequest = () => setShowOffcanvasRequest(true);
  const handleCloseOffcanvasRequest = () => setShowOffcanvasRequest(false);


 

 
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: `${topValue}px`,
          left: "1000px",
          width: "500px",
          height: "auto",
          transition: "all 0.5s ease",
        }}
        className="stick-info-wrapper pb-5"
      >
        <Container className="mt-2 mb-3">
          <h3 className="stick-info-title">
            {brand} - {vehicleModel}
          </h3>
          <p className="stick-infos">
            {productionYear} - {mileage} km
          </p>
          <p className="stick-infos">
            {fuelType} - {transmission}{" "}
          </p>
          <p
            className="stick-infos align-items-top"
            onClick={() => setShowOffcanvasVehicleCondition(true)}
          >
            {" "}
            {vehicleCondition} <GUIIcons.Info className="info-icon" />
          </p>
        </Container>
        <div className="mb-5">
          <Tabs
            defaultActiveKey="condition-description"
            id="sticky-descriptions"
            className="bg-dark mt-4"
            fill
          >
            <Tab
              eventKey="condition-description"
              title="État du véhicule"
              className="bg-light pb-3 pt-3 px-3"
            >
              {vehicleComment}
            </Tab>
            <Tab
              eventKey="model-description"
              title="Commentaire du Modèle"
              className="bg-light pb-3 pt-3 px-3"
            >
              {vehicleModelDescription}
            </Tab>
          </Tabs>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h4 className="stick-info-garantie">Garantie 12 mois</h4>
          <h3 className="stick-info-price">{price} €</h3>
          <h4 className="stick-info-garantie mt-4">
            Une question ? Un rendez-vous ?
          </h4>
          <Button
            className="btn btn-primary btn-lg mt-3"
            onClick={handleShowOffcanvasRequest}
          >
            Nous contacter
          </Button>
        </div>
      </div>

     <OffCanvasDisplayVehicleCondition
        showOffcanvasVehicleCondition={showOffcanvasVehicleCondition}
        handleCloseOffcanvasVehicleCondition={handleCloseOffcanvasVehicleCondition}
      />

      <OffCanvasUserRequest
        showOffcanvasRequest={showOffcanvasRequest}
        handleCloseRequest={handleCloseOffcanvasRequest}
        vehicleId={vehicleId}
      />
    </>
  );
}

export default StickyDetails;
