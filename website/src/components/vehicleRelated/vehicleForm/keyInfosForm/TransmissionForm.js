import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Select from "react-select";
import { capitalizeFirstLetter } from "../../../../functions/capitalizeFirstLetter";
import AddTransmissionModal from "../../../addingEntries/AddTransmissionModal";
import  { fetchTransmissions } from "../../../../serverRelated/ApiRequest";

let initialTransmissions = [
  // { value: "id", label: "Transmission name" },
];

export const TransmissionForm = ({onTransmissionChange}) => {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTransmission(null);
  };

  const [selectedTransmission, setSelectedTransmission] = useState(null);
  const [transmissions, setTransmissions] = useState(initialTransmissions); 

  const handleFetchTransmissions = async () => {
    try {
      const data = await fetchTransmissions();

      const transformedTransmissions = data.map((transmission) => ({
        value: transmission.id.toString(),
        label: capitalizeFirstLetter(transmission.name),
      }));

      setTransmissions(transformedTransmissions);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    handleFetchTransmissions();
  }, []);

  const handleTransmissionChange = (selectedOption) => {
      setSelectedTransmission(selectedOption);
      if (onTransmissionChange) {
        onTransmissionChange(selectedOption.value);
      }
    };


  const handleModalClose = () => {
    handleFetchTransmissions(); 
  };

  return (
    <>
      <Select
         value={selectedTransmission}
         onChange={handleTransmissionChange}
         options={transmissions}
         isSearchable
      />
      <Button onClick={handleOpenModal}>Ajouter une marque</Button>
      <AddTransmissionModal
  show={showModal}
  onHide={handleCloseModal}
  onModalClose={handleModalClose} 
/>


    </>
  );
};

export default TransmissionForm;
