import React, { useState, useEffect } from "react";
import { Modal, Button, Row } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { capitalizeFirstLetter } from "../../functions/capitalizeFirstLetter";
import Form from "react-bootstrap/Form";
import {fetchColors} from "../../serverRelated/ApiRequest";

const ColorOption = (props) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center" }}
      onClick={() => props.selectOption(props.data)}
    >
      <div
        style={{
          width: "20px",
          height: "20px",
          backgroundColor: props.data.hex,
          marginLeft: "10px",
          marginRight: "10px",
        }}
      />
      {props.data.label}
    </div>
  );
};

const AddColorModal = ({ show, onHide, onModalClose }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [colors, setColors] = useState([]);
  const [colorHex, setColorHex] = useState("#563d7c"); // Valeur initiale par défaut
  const [colorName, setColorName] = useState("");

  const handleCloseModal = () => {
    onHide();
  };

  const handleFetchColors = async () => {
    try {
      const data = await fetchColors();

      const transformedColors = data.map((color) => ({
        value: color.id.toString(),
        label: capitalizeFirstLetter(color.name),
        hex: color.hex, // Ajoutez ceci pour utiliser la couleur dans le composant d'option personnalisé
      }));

      setColors(transformedColors);
    } catch (error) {
      console.error("Error fetching colors:", error);
    }
  };

  useEffect(() => {
    handleFetchColors();
  }, []);

  const handleModifyColorPicker = (e) => {
    setColorHex(e.target.value);
  };

  const handleColorChange = (selectedOption) => {
    setSelectedColor(selectedOption);
    if (selectedOption) {
      setColorHex(selectedOption.hex);
      setColorName(selectedOption.label); // Mettez à jour le nom ici
    } else {
      setColorHex("#563d7c");
      setColorName(""); // Réinitialiser si aucune couleur n'est sélectionnée
    }
  };

  const handleAddColor = async () => {
    if (!colorName) {
      alert("Veuillez entrer un nom pour la couleur.");
      return;
    }

    const colorNameLower = colorName.toLowerCase();

    const colorExists = colors.some(
      (color) =>
        color.hex === colorHex || color.label.toLowerCase() === colorNameLower
    );

    if (colorExists) {
      alert("Une couleur avec ce code hexadécimal ou ce nom existe déjà.");
      return;
    }

    const newColor = {
      name: colorName, // Utilisez le nom saisi par l'utilisateur
      hex: colorHex,
    };

    try {
      const response = await fetch("http://localhost:5001/api/colors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newColor),
      });

      if (response.ok) {
        handleFetchColors(); // Mise à jour des couleurs après l'ajout
      } else {
        alert("Erreur lors de l'ajout de la couleur.");
      }
    } catch (error) {
      console.error("Error adding color:", error);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Couleurs</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <CreatableSelect
            value={selectedColor}
            onChange={handleColorChange} // Utilisez la nouvelle fonction pour gérer le changement
            options={colors}
            isSearchable
            components={{ Option: ColorOption }}
          />
          <Form.Control
            type="color"
            id="ColorInput"
            value={colorHex} // Utilisez l'état pour contrôler la valeur
            onChange={handleModifyColorPicker}
          />
          <Form.Control
            type="text-number"
            placeholder="Code hex"
            id="hex"
            disabled
            readOnly
            value={colorHex}
          />
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={handleAddColor}
        >
          Ajouter
        </Button>
        <Button variant="orange">Modifier</Button>
        <Button variant="danger">Supprimer</Button>
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

export default AddColorModal;
