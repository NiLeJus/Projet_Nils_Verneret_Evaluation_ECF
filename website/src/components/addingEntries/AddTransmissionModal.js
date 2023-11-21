import React, { useState, useEffect } from "react";
import { Modal, Button, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { capitalizeFirstLetter } from "../../functions/capitalizeFirstLetter";
import { fetchTransmissions  } from "../../serverRelated/ApiRequest";

const AddTransmissionModal = ({ show, onHide, onModalClose }) => {
  const [selectedTransmission, setSelectedTransmission] = useState(null);
  const [transmissions, setTransmissions] = useState([]);
  const [speedNumber, setSpeedNumber] = useState("");
  const [isAutomatic, setIsAutomatic] = useState(false);

  const handleCloseModal = () => {
    onHide();
    if (onModalClose) {
      onModalClose();
    }}

    const handleFetchTransmissions = async () => {
      try {
        const data = await fetchTransmissions();
        const transformedTransmissions = data.map((transmission) => ({
          value: transmission.id.toString(),
          label: transmission.name,
          speedNumber: transmission.speed_number,
          isAutomatic: transmission.transmission_type === "automatic",
        }));
        setTransmissions(transformedTransmissions);
        setTransmissions(transformedTransmissions);
      } catch (error) {
        console.error("Error fetching transmissions:", error);
      }
    };

    useEffect(() => {
      handleFetchTransmissions();
    }, []);

    const handleSpeedNumberChange = (e) => {
      setSpeedNumber(e.target.value);
    };

    const handleTransmissionTypeChange = (e) => {
      setIsAutomatic(e.target.checked);
    };

    const handleSelectTransmission = (selected) => {
      setSelectedTransmission(selected);
      if (selected) {
        setSpeedNumber(selected.speedNumber.toString());
        setIsAutomatic(selected.isAutomatic);
      } else {
        setSpeedNumber("");
        setIsAutomatic(false);
      }
    };

    const handleAddTransmission = async () => {
      if (speedNumber) {
        // Vérifiez si la transmission existe déjà
        const existingTransmission = transmissions.find(
          (t) =>
            t.isAutomatic === isAutomatic &&
            t.speedNumber === parseInt(speedNumber)
        );

        if (!existingTransmission) {
          // Créez un nouvel objet de transmission
          const newTransmission = {
            transmission_type: isAutomatic ? "automatic" : "manual",
            speed_number: speedNumber,
            name: generateTransmissionName(isAutomatic, speedNumber),
          };

          try {
            // Envoyez la nouvelle transmission à l'API
            const response = await fetch(
              "http://localhost:5001/api/transmissions",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newTransmission),
              }
            );

            if (response.ok) {
              // Mise à jour de la liste des transmissions
              handleFetchTransmissions();
            }
          } catch (error) {
            console.error("Error adding transmission:", error);
          }
        } else {
          alert("Une transmission avec cette combinaison existe déjà.");
        }
      } else {
        alert("Veuillez entrer le nombre de vitesses.");
      }
    };

    const handleDeleteTransmission = async (transmissionId) => {
        if (transmissionId) {
          // Afficher une confirmation avant de supprimer
          const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette transmission ?");
          if (confirmDelete) {
            try {
              const response = await fetch(`http://localhost:5001/api/transmissions/${transmissionId}`, {
                method: "DELETE",
              });
      
              if (response.ok) {
                // Transmission supprimée avec succès, mise à jour de la liste des transmissions
                handleFetchTransmissions();
                alert("Transmission supprimée avec succès.");
              } else {
                // Gérer les réponses non OK
                alert("Échec de la suppression de la transmission.");
              }
            } catch (error) {
              console.error("Error deleting transmission:", error);
              alert("Une erreur s'est produite lors de la suppression de la transmission.");
            }
          }
        } else {
          alert("Aucune transmission sélectionnée pour la suppression.");
        }
      };
      

    const generateTransmissionName = (isAutomatic, speedNumber) => {
      return `${
        isAutomatic ? "Automatique" : "Manuelle"
      } ${speedNumber} vitesses`;
    };

    return (
      <Modal
        show={show}
        onHide={onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>Type de transmission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Select
              isClearable
              isSearchable
              onChange={handleSelectTransmission}
              options={transmissions}
              value={selectedTransmission}
            />
          </Row>
          <Form.Control
            type="number"
            placeholder="Nombre de rapports"
            id="doorsNumber"
            value={speedNumber}
            onChange={handleSpeedNumberChange}
          />
          <Form.Check
            type="checkbox"
            label="Est automatique ?"
            onChange={handleTransmissionTypeChange}
            checked={isAutomatic}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleAddTransmission}
          >
            Ajouter
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              handleDeleteTransmission(selectedTransmission?.value)
            }
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


export default AddTransmissionModal;
