import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import { capitalizeFirstLetter } from "../../functions/capitalizeFirstLetter";
import { fetchOptions } from "../../serverRelated/ApiRequest";

const AddOptionModal = ({ show, onHide }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState([]);

  const handleFetchOptions = async () => {
    try {
      const data = await fetchOptions();
     
      const transformedOptions = data.map((option) => ({
        value: option.id.toString(),
        label: capitalizeFirstLetter(option.name),
        description: option.description,
      }));
      setOptions(transformedOptions);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    handleFetchOptions();
  }, []);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setDescription(option ? option.description : ""); // Mettre à jour la description ici
  };

  const handleAddOption = async () => {
    if (!description.trim()) {
      alert("Veuillez fournir une description pour l'option.");
      return;
    }

    if (!selectedOption) {
      alert("Veuillez sélectionner une option.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/options", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: selectedOption.label,
          description: description,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error adding option:", error);
    }
  };

  const handleModifyOption = async () => {
    if (selectedOption && selectedOption.value) {
      const newOptionName =
        prompt("Entrez le nouveau nom de l'option:", selectedOption.label) ||
        selectedOption.label;
      const newOptionDescription =
        prompt(
          "Entrez la nouvelle description de l'option:",
          selectedOption.description
        ) || selectedOption.description;

      try {
        const response = await fetch(
          `http://localhost:5001/api/options/${selectedOption.value}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: newOptionName,
              description: newOptionDescription,
            }),
          }
        );

        if (response.ok) {
          // Mise à jour de l'état des options
          setOptions((prevOptions) =>
            prevOptions.map((option) =>
              option.value === selectedOption.value
                ? {
                    ...option,
                    label: capitalizeFirstLetter(newOptionName),
                    description: newOptionDescription,
                  }
                : option
            )
          );
          setSelectedOption(null); // Réinitialiser l'option sélectionnée
          alert("Option modifiée avec succès");
          handleFetchOptions();
        } else {
          
          alert("Erreur lors de la modification de l'option");
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi de la requête", error);
        alert("Erreur lors de la modification de l'option");
      }
    } else {
      alert("Veuillez sélectionner une option à modifier");
    }
  };

  const handleDeleteOption = async (optionId) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/options/${optionId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        alert(`Erreur lors de la suppression de l'option: ${data.message}`);
      } else {
        // Mise à jour de l'état des options
        setOptions((prevOptions) =>
          prevOptions.filter((option) => option.value !== optionId)
        );
        alert("Option supprimée avec succès");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête", error);
      alert("Erreur lors de la suppression de l'option");
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Options</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreatableSelect
          isClearable
          isSearchable
          onChange={handleSelectOption}
          options={options}
        />
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={description} // Utiliser la valeur de l'état de la description ici
        />
      </Modal.Body>
      <Modal.Footer>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleAddOption}
          >
            Ajouter
          </Button>
          <Button
            variant="orange"
            onClick={handleModifyOption}
          >
            Modifier
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDeleteOption(selectedOption?.value)}
          >
            Supprimer
          </Button>
          <Button
            variant="secondary"
            onClick={onHide}
          >
            {" "}
            Fermer{" "}
          </Button>
        </Modal.Footer>
      </Modal.Footer>
    </Modal>
  );
};

export default AddOptionModal;
