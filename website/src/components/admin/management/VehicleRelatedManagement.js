import React from "react";
import Container from "react-bootstrap/Container";
import OptionsForm from "../../vehicleRelated/vehicleForm/keyInfosForm/OptionsForm";
import BrandForm from "../../vehicleRelated/vehicleForm/keyInfosForm/BrandForm";
import ModelFormForManaging from "../../vehicleRelated/vehicleForm/keyInfosForm/ModelFormForManaging";
import VehicleTypeForm from "../../vehicleRelated/vehicleForm/keyInfosForm/VehicleTypeForm";
import FuelTypeForm from "../../vehicleRelated/vehicleForm/keyInfosForm/FuelForm";
import TransmissionForm from "../../vehicleRelated/vehicleForm/keyInfosForm/TransmissionForm";
import ColorForm from "../../vehicleRelated/vehicleForm/keyInfosForm/ColorForm";

export const VehicleRelatedManagement = () => {
  return (
    <Container>
        <h1 className="text-light">Gérer les données propres aux véhicules</h1>

        <div className="container">
      <div className="row">
        <div className="col">
          <OptionsForm />
        </div>
        <div className="col">
          <BrandForm />
        </div>
        <div className="col">
          <ModelFormForManaging />
        </div>
        <div className="col">
          <VehicleTypeForm />
        </div>
        <div className="col">
          <FuelTypeForm />
        </div>
        <div className="col">
          <TransmissionForm />
        </div>
        <div className="col">
          <ColorForm />
        </div>
      </div>
    </div>
    </Container>
  );
};

export default VehicleRelatedManagement;
