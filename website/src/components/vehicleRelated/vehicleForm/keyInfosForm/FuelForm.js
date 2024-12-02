import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Select from "react-select";
import { capitalizeFirstLetter } from "../../../../functions/capitalizeFirstLetter";
import AddFuelModal from "../../../addingEntries/AddFuelModal";
import { fetchFuelTypes } from "../../../../serverRelated/ApiRequest";

let initialFuelTypes = [
  // { value: "id", label: "FuelType name" },
];

export const FuelForm = ({ onFuelChange }) => {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFuelType(null);
  };

  const onModalClose = () => {
    handleFetchFuelTypes();
  };

  const [selectedFuelType, setSelectedFuelType] = useState(null);
  const [fuelTypes, setFuelTypes] = useState(initialFuelTypes);

  const handleFetchFuelTypes = async () => {
    try {
      const data = await fetchFuelTypes();

      const transformedFuelTypes = data.map((fuelType) => ({
        value: fuelType.id.toString(),
        label: capitalizeFirstLetter(fuelType.name),
      }));

      setFuelTypes(transformedFuelTypes);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    handleFetchFuelTypes();
  }, []);

  const handleFuelChange = (selectedOption) => {
    setSelectedFuelType(selectedOption); 
    onFuelChange(selectedOption.value); 
  };
  

  return (
    <>
      <Select
        value={selectedFuelType}
        onChange={handleFuelChange}
        options={fuelTypes}
        isSearchable
      />
      <Button onClick={handleOpenModal}>Ajouter un carburant</Button>
      <AddFuelModal
        show={showModal}
        onHide={handleCloseModal}
        onModalClose={onModalClose}
      />
    </>
  );
};

export default FuelForm;
