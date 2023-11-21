import { Vehicles } from "../../../screens/Vehicles.js";
import { Button, Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import VehicleDetailsForm from "../../../screens/VehicleDetailsForm.js";
import DeleteVehicleModal from "../manageModals/DeleteVehicleModal.js";

export const VehicleManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddNewVehicle = () => {
    // Ouvrir le formulaire de détails du véhicule dans un nouvel onglet
    window.open("/vehicleForm", "_blank");
  };

  return (
    <>
      <Container className="mb-5">
        <div className="bg-dark align-content-center">
          <h1 className="text-light">Gérer les vehicules</h1>
          <div className="bg-dark d-flex justify-content-center">
            <Button onClick={() => handleAddNewVehicle()}>
              Ajouter un nouveau vehicule
            </Button>

            <Button className="mx-5" onClick={handleOpenModal}>Supprimer un vehicule</Button>
          </div>
        </div>
      </Container>

      <Vehicles />

      <DeleteVehicleModal
        show={showModal}
        onHide={handleCloseModal}
      />
    </>
  );
};
export default VehicleManagement;
