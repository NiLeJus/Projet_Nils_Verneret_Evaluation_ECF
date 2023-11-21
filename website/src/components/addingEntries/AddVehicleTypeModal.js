import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import { capitalizeFirstLetter } from "../../functions/capitalizeFirstLetter";
import { fetchVehicleTypes } from "../../serverRelated/ApiRequest";

const AddVehicleTypeModal = ({ show, onHide }) => {
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleFetchVehicleTypes = async () => {
    try {
      const data = await fetchVehicleTypes();
      const transformedVehicleTypes = data.map(type => ({
        value: type.id.toString(),
        label: capitalizeFirstLetter(type.name),
        description: type.description,
      }));
      setVehicleTypes(transformedVehicleTypes);
    } catch (error) {
      console.error("Error fetching vehicle types:", error);
    }
  };

  useEffect(() => {
    handleFetchVehicleTypes();
  }, []);

  const handleVehicleTypeChange = (selectedOption) => {
    setSelectedVehicleType(selectedOption);
    setDescription(selectedOption ? selectedOption.description : "");
    setName(selectedOption ? selectedOption.label : "");
  };

  const handleAddVehicleType = async () => {
    if (!name) return alert("Veuillez saisir un nom pour le type de véhicule");

    try {
      const response = await fetch("http://localhost:5001/api/vehicleTypes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });

      if (response.ok) {
        alert("Type de véhicule ajouté avec succès");
        handleFetchVehicleTypes();
        setName("");
        setDescription("");
      } else {
        alert("Erreur lors de l'ajout du type de véhicule");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête", error);
    }
  };

  const handleModifyVehicleType = async () => {
    if (!selectedVehicleType || !selectedVehicleType.value) {
      return alert("Veuillez sélectionner un type de véhicule à modifier");
    }

    const newTypeName = prompt("Entrez le nouveau nom pour le type de véhicule:", selectedVehicleType.label);

    if (newTypeName) {
      try {
        const response = await fetch(`http://localhost:5001/api/vehicleTypes/${selectedVehicleType.value}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newTypeName }),
        });

        if (response.ok) {
          alert("Type de véhicule modifié avec succès");
          handleFetchVehicleTypes();
          setSelectedVehicleType(null);
        } else {
          alert("Erreur lors de la modification du type de véhicule");
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi de la requête", error);
      }
    }
  };

  const handleDeleteVehicleType = async (vehicleTypeId) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce type de véhicule ?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5001/api/vehicleTypes/${vehicleTypeId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert("Type de véhicule supprimé avec succès");
          handleFetchVehicleTypes();
          setSelectedVehicleType(null);
        } else {
          alert("Erreur lors de la suppression du type de véhicule");
        }
      } catch (error) {
        console.error("Erreur lors de la suppression", error);
      }
    }
  };

 


  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Types de véhicules</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Type de véhicule</Form.Label>
          <CreatableSelect
            isClearable
            isSearchable
            onChange={handleVehicleTypeChange}
            options={vehicleTypes}
            value={selectedVehicleType}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleAddVehicleType}>Ajouter</Button>
        <Button variant="orange" onClick={handleModifyVehicleType}>Modifier</Button>
        <Button variant="danger" onClick={() => handleDeleteVehicleType(selectedVehicleType?.value)}>Supprimer</Button>
        <Button variant="secondary" onClick={onHide}>Fermer</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddVehicleTypeModal;