import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Select, { components } from "react-select";
import { capitalizeFirstLetter } from "../../../../functions/capitalizeFirstLetter";
import Button from "react-bootstrap/Button";
import { fetchColors } from "../../../../serverRelated/ApiRequest";
import AddColorModal from "../../../addingEntries/AddColorModal";

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

export const ColorForm = ({ onColorChange }) => {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [colors, setColors] = useState([]);

  const handleColorChange = (selectedOption) => {
    setSelectedColor(selectedOption);
    if (onColorChange) {
      onColorChange(selectedOption.value); // Envoyer l'ID de la couleur au parent
    }
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

  return (
    <>
      <Select
        value={selectedColor}
        onChange={handleColorChange}
        options={colors}
        components={{ Option: ColorOption }}
        isSearchable
      />

      <Button
        className="mt-3"
        onClick={handleOpenModal}
      >
        Ajouter une couleur
      </Button>
      <AddColorModal
        show={showModal}
        onHide={handleCloseModal}
      />
    </>
  );
};

export default ColorForm;
