import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Select from "react-select";
import { capitalizeFirstLetter } from "../../../../functions/capitalizeFirstLetter";
import AddVehicleTypeModal from "../../../addingEntries/AddVehicleTypeModal";
import { fetchVehicleTypes } from "../../../../serverRelated/ApiRequest";

export const VehicleTypeForm = ({onTypeChange}) => {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const [vehicleTypes, setVehicleTypes] = useState([]);

  useEffect(() => {
    const handleFetchVehicleTypes = async () => {
      try {
        const data = await fetchVehicleTypes();

        let seenTypes = {};
        const transformedVehicleTypes = data.reduce((unique, vehicleType) => {
          const typeName = vehicleType.name.toLowerCase();

          if (!seenTypes[typeName]) {
            seenTypes[typeName] = true;
            unique.push({
              value: vehicleType.id.toString(),
              label: capitalizeFirstLetter(vehicleType.name),
            });
          }
          return unique;
        }, []);

        setVehicleTypes(transformedVehicleTypes);
      } catch (error) {
        console.error("Error fetching vehicle types:", error);
      }
    };

    handleFetchVehicleTypes();
  }, []);

  const handleTypeChange = (selectedOption) => {
    setSelectedVehicleType(selectedOption);
    if (onTypeChange) {
      onTypeChange(selectedOption.value); 
    }
  };
  
  return (
    <>
      <Select
        value={selectedVehicleType}
        onChange={handleTypeChange}
        options={vehicleTypes}
        isSearchable
      />

      <Button
        variant="primary"
        onClick={() => handleOpenModal()}
      >
        Ajouter un type de véhicule
      </Button>
      <AddVehicleTypeModal
        show={showModal}
        onHide={handleCloseModal}/>
    </>
  );
};

export default VehicleTypeForm;
