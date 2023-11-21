import { Modal, Button, Form } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import { useState, useEffect } from "react";
import {
  fetchVehicles,
  deleteVehicle,
  deletePhotos,
} from "../../../serverRelated/ApiRequest";
import { capitalizeFirstLetter } from "../../../functions/capitalizeFirstLetter";

export const DeleteVehicleModal = ({ show, onHide }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicles, setVehicles] = useState([]);

  const handleFetchVehicles = async () => {
    try {
      const data = await fetchVehicles();
      const transformedVehicles = data.map((vehicle) => ({
        value: vehicle.id.toString(),
        label: `${vehicle.id} - ${capitalizeFirstLetter(
          vehicle.VehicleModel.Brand.name
        )} ${capitalizeFirstLetter(vehicle.VehicleModel.name)}`,
      }));
      setVehicles(transformedVehicles);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };
  useEffect(() => {
    handleFetchVehicles();
  }, []);
  
  const handleDeleteVehicle = async () => {
    if (selectedVehicle) {
      try {
        await deleteVehicle(selectedVehicle.value); // Suppression du véhicule
        console.log("Véhicule supprimé avec succès:", selectedVehicle);
  
        try {
          await handleDeletePhotos(selectedVehicle.value); // Suppression des photos associées
          console.log("Photos liées au véhicule supprimées avec succès");
        } catch (photoError) {
          console.error("Erreur lors de la suppression des photos:", photoError);
        }
  
        setSelectedVehicle(null); // Réinitialiser la sélection
        handleFetchVehicles(); // Rafraîchir la liste des véhicules
        onHide(); // Fermer le modal
      } catch (error) {
        console.error("Erreur lors de la suppression du véhicule:", error);
      }
    } else {
      console.error("Aucun véhicule sélectionné pour la suppression");
    }
  };
  

  const handleDeletePhotos = async (vehicleId) => {
    try {
      await deletePhotos(vehicleId);
      console.log("Photos supprimées avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression des photos:", error);
    }
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Supprimer un véhicule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>
          <h3 className="key-info-title">Choisissez un véhicule :</h3>
        </Form.Label>
        <CreatableSelect
          isClearable
          isSearchable
          onChange={setSelectedVehicle}
          options={vehicles}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={handleDeleteVehicle}
        >
          Supprimer
        </Button>
        <Button
          variant="secondary"
          onClick={onHide}
        >
          Annuler
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteVehicleModal;
