import React, { useState, useEffect } from "react";
import { Modal, Button, Row } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import { capitalizeFirstLetter } from "../../functions/capitalizeFirstLetter";
import { fetchFuelTypes } from "../../serverRelated/ApiRequest";

const AddFuelModal = ({ show, onHide, onModalClose }) => {
  const [selectedFuel, setSelectedFuel] = useState(null);
  const [fuels, setFuels] = useState([]);

  const handleCloseModal = () => {
    onHide();   
    onModalClose(); 
  };


  const handleFetchFuels = async () => {
    try {
      const data = await fetchFuelTypes();
      const transformedFuels = data.map(fuel => ({
        value: fuel.id.toString(),
        label: capitalizeFirstLetter(fuel.name),
      }));
      setFuels(transformedFuels);
    } catch (error) {
      console.error("Error fetching fuels:", error);
    }
  };

  useEffect(() => {
    handleFetchFuels();
  }, []);

  const handleSelectFuel = (selectedFuel) => {
    setSelectedFuel(selectedFuel);
  };

  const handleAddFuel = async () => {
    if (selectedFuel && selectedFuel.__isNew__) {
      try {
        const newFuel = {
          name: selectedFuel.label,
        };
        const response = await fetch("http://localhost:5001/api/fuelTypes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newFuel),
        });

        if (response.ok) {
          handleFetchFuels();
        }
      } catch (error) {
        console.error("Error adding fuel:", error);
      }
    }
  };

  const handleModifyFuel = async () => {
    if (selectedFuel && !selectedFuel.__isNew__) {
      const newName = prompt("Entrez le nouveau nom du type de carburant :", selectedFuel.label);
      if (newName && newName.trim() !== "") {
        try {
          const updatedFuel = {
            name: newName,
          };
          const response = await fetch(`http://localhost:5001/api/fuelTypes/${selectedFuel.value}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFuel),
          });

          if (response.ok) {
            handleFetchFuels();
          }
        } catch (error) {
          console.error("Error updating fuel:", error);
        }
      }
    }
  };

  const handleDeleteFuel = async (fuelId) => {
    if (fuelId) {
      const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce type de carburant ?");
      if (confirmDelete) {
        try {
          const response = await fetch(`http://localhost:5001/api/fuelTypes/${fuelId}`, {
            method: "DELETE",
          });

          if (response.ok) {
            handleFetchFuels();
          }
        } catch (error) {
          console.error("Error deleting fuel:", error);
        }
      }
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Carburant</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <CreatableSelect
            isClearable
            isSearchable
            onChange={handleSelectFuel}
            options={fuels}
            value={selectedFuel}
          />
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={handleAddFuel}
        >
          Ajouter
        </Button>
        <Button
          variant="orange"
          onClick={handleModifyFuel}
        >
          Modifier
        </Button>
        <Button
          variant="danger"
          onClick={() => handleDeleteFuel(selectedFuel?.value)}
        >
          Supprimer
        </Button>
        <Button
          variant="secondary"
          onClick={handleCloseModal}
        >
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddFuelModal;
