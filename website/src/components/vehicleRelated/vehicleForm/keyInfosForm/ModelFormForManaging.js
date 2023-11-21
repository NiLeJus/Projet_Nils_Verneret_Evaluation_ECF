import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import { capitalizeFirstLetter } from "../../../../functions/capitalizeFirstLetter";
import AddVehicleModelModal from "../../../addingEntries/AddVehicleModelModal";
import { fetchVehicleModels } from "../../../../serverRelated/ApiRequest";

export const ModelFormForManaging = ({ onModelChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [models, setModels] = useState([]);

  const handleOpenModal = () => {
    setShowModal(true);
    setSelectedModel(null);
  };

  const handleChange = (selectedOption) => {
    setSelectedModel(selectedOption);
    onModelChange(selectedOption);
  };
  

  const handleCloseModal = () => setShowModal(false);

  const handleFetchModels = async () => {


    try {
      const data = await fetchVehicleModels();

      const transformedModels = data.map(model => ({
        value: model.id.toString(),
        label: capitalizeFirstLetter(model.name),
        wheel_number: model.wheel_number,
        door_number: model.door_number,
        seat_number: model.seat_number,
      }));
      

      setModels(transformedModels);
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

  useEffect(() => {
    handleFetchModels();
    }
    , [showModal]);
    
    
  return (
    <>
      <Select
        value={selectedModel}
        options={models}
        isSearchable
        placeholder="Sélectionnez un modèle..."
      />
      <Button onClick={handleOpenModal}>Ajouter un modèle</Button>
      <AddVehicleModelModal
        show={showModal}
        onHide={handleCloseModal}
        onModalClose={handleFetchModels} // Rafraîchir les modèles après fermeture du modal
      />
    </>
  );
};

export default ModelFormForManaging;
