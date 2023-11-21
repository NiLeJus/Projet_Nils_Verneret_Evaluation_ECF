import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Select from "react-select";
import { capitalizeFirstLetter } from "../../../../functions/capitalizeFirstLetter";
import AddBrandModal from "../../../addingEntries/AddBrandModal";
import { fetchBrands } from "../../../../serverRelated/ApiRequest";
// Renommez cette variable pour éviter les conflits
let initialBrands = [
  // { value: "id", label: "Brand name" },
];

export const BrandForm = ({ onBrandChange }) => {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brands, setBrands] = useState(initialBrands); // Utilisez le nom renommé ici

  useEffect(() => {
    const handleFetchBrands = async () => {
      try {
        const data = await fetchBrands();

        const transformedBrands = data.map((brand) => ({
          value: brand.id.toString(),
          label: capitalizeFirstLetter(brand.name),
        }));

        setBrands(transformedBrands); // Modifiez pour remplacer complètement les marques
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    handleFetchBrands();
  }, []);

  const handleBrandChange = (selectedOption) => {
    setSelectedBrand(selectedOption);
    if (onBrandChange) {
      onBrandChange(selectedOption); // Envoyer l'objet sélectionné au parent
    }
  };

  return (
    <>
      <Select
        value={selectedBrand}
        onChange={handleBrandChange}
        options={brands}
        isSearchable
      />
      <Button onClick={handleOpenModal}>Ajouter une marque</Button>
      <AddBrandModal
        show={showModal}
        onHide={handleCloseModal}
      />
    </>
  );
};

export default BrandForm;
