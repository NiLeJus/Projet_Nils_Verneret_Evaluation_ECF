import React, { useState, useEffect, props } from "react";
import { Modal, Button, Form, Row } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import { capitalizeFirstLetter } from "../../functions/capitalizeFirstLetter";

const AddVehicleModelModal = ({ show, onHide, onModalClose}) => {
  const [selectedVehicleModel, setSelectedVehicleModel] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [vehicleModels, setVehicleModels] = useState([]);
  const [brands, setBrands] = useState([]);
  const [description, setDescription] = useState("");
  const [doorsNumber, setDoorsNumber] = useState("");
  const [wheelsNumber, setWheelsNumber] = useState("");
  const [seatsNumber, setSeatsNumber] = useState("");

  const handleCloseModal = () => {
    onHide();    // Fermer le modal
    onModalClose(); // Mise à jour de la liste des modèles
  };

  let initialVehicleModels = [
    // { value: "id", label: "VehicleModel name" },
  ];

  const fetchVehicleModels = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/vehicleModels");
      const data = await response.json();

      const transformedVehicleModels = data.map((vehicleModel) => ({
        value: vehicleModel.id.toString(),
        label: capitalizeFirstLetter(vehicleModel.name),
        description: vehicleModel.description,
        door_number: vehicleModel.door_number,
        wheel_number: vehicleModel.wheel_number,
        seat_number: vehicleModel.seat_number,
        brand_id: vehicleModel.brand_id,
      }));

      setVehicleModels(transformedVehicleModels);
    } catch (error) {
      console.error("Error fetching vehicleModels:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/brands");
      const data = await response.json();
      const transformedBrands = data.map((brand) => ({
        value: brand.id.toString(),
        label: capitalizeFirstLetter(brand.name),
      }));
      setBrands(transformedBrands);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    fetchVehicleModels();
    fetchBrands();
  }, []);

  const handleSelectVehicleModel = (selectedVehicleModel) => {
    setSelectedVehicleModel(selectedVehicleModel);

    if (selectedVehicleModel) {
      const vehicleModelDetails = vehicleModels.find(
        (vehicleModel) => vehicleModel.value === selectedVehicleModel.value
      );
      if (vehicleModelDetails) {
        setDescription(vehicleModelDetails.description || "");
        setDoorsNumber(vehicleModelDetails.door_number?.toString() || "");
        setWheelsNumber(vehicleModelDetails.wheel_number?.toString() || "");
        setSeatsNumber(vehicleModelDetails.seat_number?.toString() || "");

        // Trouver la marque correspondante
        const brand = brands.find(
          (brand) => brand.value === vehicleModelDetails.brand_id.toString()
        );
        console.log("Selected brand: ", brand); // Débogage pour vérifier la marque sélectionnée
        setSelectedBrand(brand || null);
      }
    } else {
      // Réinitialiser les champs si aucun modèle n'est sélectionné
      setDescription("");
      setDoorsNumber("");
      setWheelsNumber("");
      setSeatsNumber("");
      setSelectedBrand(null);
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSeatsNumberChange = (e) => {
    setSeatsNumber(e.target.value);
  };

  const handleWheelsNumberChange = (e) => {
    setWheelsNumber(e.target.value);
  };

  const handleDoorsNumberChange = (e) => {
    setDoorsNumber(e.target.value);
  };

  const validateForm = () => {
    // Vérification que les champs sont remplis
    const isFilled =
      selectedVehicleModel && selectedBrand && description.trim() !== "";

    // Vérification que doorsNumber, wheelsNumber et seatsNumber sont des nombres valides
    const isDoorsNumberValid =
      doorsNumber.trim() !== "" && Number.isFinite(Number(doorsNumber));
    const isWheelsNumberValid =
      wheelsNumber.trim() !== "" && Number.isFinite(Number(wheelsNumber));
    const isSeatsNumberValid =
      seatsNumber.trim() !== "" && Number.isFinite(Number(seatsNumber));

    return (
      isFilled &&
      isDoorsNumberValid &&
      isWheelsNumberValid &&
      isSeatsNumberValid
    );
  };

  const handleAddVehicleModel = async () => {
    if (validateForm()) {
      try {
        const newModel = {
          name: selectedVehicleModel.label,
          brand_id: parseInt(selectedBrand.value, 10),
          description: description,
          door_number: parseInt(doorsNumber, 10),
          wheel_number: parseInt(wheelsNumber, 10),
          seat_number: parseInt(seatsNumber, 10),
        };

        // Effectuer la requête d'ajout
        const response = await fetch(
          "http://localhost:5001/api/vehicleModels",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newModel),
          }
        );

        const data = await response.json();
        console.log(data);

        // Gérer la réponse ici, par exemple en actualisant la liste des modèles
        // ou en affichant un message de succès
      } catch (error) {
        console.error("Error adding vehicleModel:", error);
      }
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const handleModifyVehicleModel = async () => {
    if (validateForm()) {
      try {
        // Création de l'objet avec les nouvelles valeurs
        const updatedModel = {
          name: selectedVehicleModel.label,
          brand_id: parseInt(selectedBrand.value),
          description: description,
          door_number: parseInt(doorsNumber),
          wheel_number: parseInt(wheelsNumber),
          seat_number: parseInt(seatsNumber),
        };

        // Effectuer la requête de mise à jour
        const response = await fetch(
          `http://localhost:5001/api/vehicleModels/${selectedVehicleModel.value}`,
          {
            method: "PUT", // ou PATCH, selon votre API
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedModel),
          }
        );

        const data = await response.json();
        console.log(data);
        fetchVehicleModels();

        // Gérer la réponse ici, par exemple en actualisant la liste des modèles
        // ou en affichant un message de succès
      } catch (error) {
        console.error("Error updating vehicleModel:", error);
      }
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const handleModifyVehicleModelName = async () => {
    if (selectedVehicleModel) {
      const newName = prompt("Entrez le nouveau nom du modèle de véhicule :", selectedVehicleModel.label);
  
      if (newName && newName.trim() !== "") {
        try {
          // Création de l'objet avec la nouvelle valeur de nom
          const updatedModelName = {
            name: newName,
          };
  
          // Effectuer la requête de mise à jour pour le nom
          const response = await fetch(`http://localhost:5001/api/vehicleModels/${selectedVehicleModel.value}`, {
            method: "PUT", // ou PATCH, selon votre API
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedModelName),
          });
  
          if (response.ok) {
            const data = await response.json();
            console.log("Nom du modèle mis à jour:", data);
            fetchVehicleModels();
            // Mise à jour de l'état pour refléter le nouveau nom
            setSelectedVehicleModel({ ...selectedVehicleModel, label: newName });
          } else {
            // Gérer les erreurs de la réponse ici
            alert("Erreur lors de la mise à jour du nom du modèle");
          }
        } catch (error) {
          console.error("Error updating vehicle model name:", error);
          alert("Erreur lors de la mise à jour du nom du modèle");
        }
      } else if (newName !== null) {
        // Gérer le cas où l'utilisateur n'entre pas de nom valide
        alert("Veuillez entrer un nom valide.");
      }
    } else {
      alert("Veuillez sélectionner un modèle de véhicule.");
    }
  };

  const handleDeleteVehicleModel = async (modelId) => {
    if (modelId) {
      const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce modèle de véhicule ?");
      if (confirmDelete) {
        try {
          const response = await fetch(`http://localhost:5001/api/vehicleModels/${modelId}`, {
            method: 'DELETE',
          });
  
          if (response.ok) {
            alert('Modèle de véhicule supprimé avec succès');
            fetchVehicleModels(); // Mettre à jour la liste des modèles après la suppression
          } else {
            alert('Erreur lors de la suppression du modèle de véhicule');
          }
        } catch (error) {
          console.error('Erreur lors de la suppression du modèle de véhicule:', error);
          alert('Erreur lors de la suppression du modèle de véhicule');
        }
      }
    } else {
      alert('ID du modèle de véhicule non spécifié');
    }
  };
  


  return (
    <Modal
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modèle de véhicule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
        <CreatableSelect
          isClearable
          isSearchable
          onChange={handleSelectVehicleModel}
          options={vehicleModels}
        />
        
        <Button
          variant="primary"
          onClick={handleModifyVehicleModelName}
        >
          Modifier le nom du modèle
        </Button>
        </Row>

        <CreatableSelect
          isClearable
          isSearchable
          onChange={setSelectedBrand}
          options={brands}
          value={selectedBrand}
        />


        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            onChange={handleDescriptionChange} // Utilisation du nouveau gestionnaire
            value={description}
          />
          <Form.Control
            type="number"
            placeholder="Nombre de portes"
            id="doorsNumber"
            value={doorsNumber}
            onChange={handleDoorsNumberChange}
          />
          <Form.Control
            type="number"
            placeholder="Nombre de roues"
            id="wheelsNumber"
            value={wheelsNumber}
            onChange={handleWheelsNumberChange}
          />

          <Form.Control
            type="number"
            placeholder="Nombre de sièges"
            id="seatsNumber"
            value={seatsNumber}
            onChange={handleSeatsNumberChange}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={handleAddVehicleModel}
        >
          Ajouter
        </Button>
        <Button
          variant="orange"
          onClick={handleModifyVehicleModel}
        >
          Modifier
        </Button>
        <Button
          variant="danger"
          onClick={() => handleDeleteVehicleModel(selectedVehicleModel?.value)}
        >
          Supprimer
        </Button>
        <Button
          variant="secondary"
          onClick={handleCloseModal}
        >
          {" "}
          Fermer{" "}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddVehicleModelModal;
