import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Select from "react-select";
import { capitalizeFirstLetter } from "../../../../functions/capitalizeFirstLetter";
import AddOptionModal from "../../../addingEntries/AddOptionModal";
import { fetchOptions } from "../../../../serverRelated/ApiRequest";

let vehicleOptions = [
  // { value: "addNewOption", label: "Ajouter une option de véhicule" },
];

export const OptionsForm = ({onOptionsChange}) => {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState(vehicleOptions); 

  useEffect(() => {
    const handleFetchOptions = async () => {
      try {
        const data = await fetchOptions();
     
        const transformedOptions = data.map((option) => ({
          value: option.id.toString(), 
          label: capitalizeFirstLetter(option.name),
        }));

        setOptions((prevOptions) => [...prevOptions, ...transformedOptions]);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    handleFetchOptions();
  }, []);

  return (
    <>
      <Select
        value={selectedOption}
        onChange={(selectedOptions) => {
          setSelectedOption(selectedOptions);
          onOptionsChange(selectedOptions);
        }}
        options={options}
        isMulti
        isSearchable
      />

      <Button
        variant="primary"
        onClick={handleOpenModal}
      >
        Ajouter une option
      </Button>

      <AddOptionModal
        show={showModal}
        onHide={handleCloseModal}
      />
    </>
  );
};

export default OptionsForm;
