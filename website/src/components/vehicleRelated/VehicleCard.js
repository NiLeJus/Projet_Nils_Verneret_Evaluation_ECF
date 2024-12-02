import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { Container } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Tooltip from "react-bootstrap/Tooltip";

export const VehicleCard = ({
  vehicleId,
  brand,
  vehicleModel,
  productionYear,
  mileage,
  fuelType,
  transmission,
  vehicleCondition,
  price,
  photo,
  options,
}) => {
  const baseUrl = "http://localhost:3000";

  const navigate = useNavigate();
  const handleOpenDetails = () => {
    navigate(`/vehicleDetails/${vehicleId}`);
  };

  const popoverOptions = (
    <Tooltip id="popover-options">
        {options.map((option, index) => (
          <>
          <p className="popover-text" key={index}>{option}</p>
          </>
        ))}
    </Tooltip>
  );

  return (
    <Card
      style={{ width: "18rem", borderRadius: "0px", height: "auto" }}
      className="bg-light m-1"
    >
      <Container className="bg-primary vehicle-card-tag"> </Container>
      <Card.Img
        className="mt25"
        variant="top"
        src={baseUrl + photo}
      />
      <Card.Body>
        <Card.Title className="text-primary vehicle-card-title">
          {brand} - {vehicleModel}
        </Card.Title>
        <Card.Text className="text-dark mb-4">
          {productionYear} - {mileage} km <br />
          {fuelType} - {transmission} <br />
          Etat : {vehicleCondition} <br />
        </Card.Text>
        <Container className="d-flex justify-content-center">
          <OverlayTrigger
            placement="right"
            overlay={popoverOptions}
            
          >
            <Button variant="outline-dark">Voir les options...</Button>
          </OverlayTrigger>
        </Container>
        <Container className="text-center vehicle-card-price mt-4">
          <h3>
            {price}€
            <Badge
              bg="secondary"
              className="align-top bg-none text-primary p-0"
              style={{ fontSize: "0.5em" }}
            >
              TTC
            </Badge>
          </h3>
        </Container>
        <div className=" d-flex flex-row-reverse">
          <Button
            variant="primary"
            onClick={handleOpenDetails}
          >
            Détails
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default VehicleCard;
