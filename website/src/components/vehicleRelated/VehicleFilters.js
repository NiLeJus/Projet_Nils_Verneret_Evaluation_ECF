import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { capitalizeFirstLetter } from "../../functions/capitalizeFirstLetter";
import { fetchBrands, fetchVehicleModels, fetchVehicleTypes } from "../../serverRelated/ApiRequest";

const VehicleFilters = ({ setSelectedBrands, setSelectedModels, setSelectedTypes }) => {


  
  
  
  const [filters, setFilters] = useState({
    brands: [],
    vehicleModels: [],
    vehicleTypes: [],
  });

  useEffect(() => {
    const initFilters = async () => {
      try {
        const brandsData = await fetchBrands();
        const vehicleModelsData = await fetchVehicleModels();
        const vehicleTypesData = await fetchVehicleTypes();
        setFilters({
          brands: brandsData,
          vehicleModels: vehicleModelsData,
          vehicleTypes: vehicleTypesData,
        });
      } catch (error) {
        console.error("Erreur lors de l'initialisation des filtres:", error);
      }
    };
    initFilters();
  }, []);

  const renderFilterOptions = (filterOptions, labelKey, handleChange) => (
    filterOptions.map((option, index) => {
      const label = typeof option === 'string' ? option : option[labelKey] || '';
      return (
        <Form.Check
          key={index}
          label={`${capitalizeFirstLetter(label)}`}
          value={label}
          className="text-light"
          onChange={handleChange}
        />
      );
    })
  );

  const handleBrandChange = (event) => {
    const brand = event.target.value;
    setSelectedBrands(prevBrands =>
      event.target.checked
        ? [...prevBrands, brand]
        : prevBrands.filter(b => b !== brand)
    );
  };

  const handleModelChange = (event) => {
    const model = event.target.value;
    setSelectedModels(prevModels =>
      event.target.checked
        ? [...prevModels, model]
        : prevModels.filter(m => m !== model)
    );
  };

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSelectedTypes(prevTypes =>
      event.target.checked
        ? [...prevTypes, type]
        : prevTypes.filter(t => t !== type)
    );
  };

  return (
    <Container className="bg-dark filters-wrapper" style={{ width: "20%" }}>
      <Accordion defaultActiveKey={["0"]} style={{"--bs-accordion-bg": "transparent", "--bs-accordion-border-color": "transparent"}} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header className="filter-accordion-title">Filtre</Accordion.Header>
          <Accordion.Body>
            {/* Marques */}
            <Accordion defaultActiveKey={["0"]} style={{"--bs-accordion-bg": "transparent", "--bs-accordion-border-color": "transparent"}} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header className="filter-accordion-sub-title">Marques</Accordion.Header>
                <Accordion.Body>
                  <Form className="px-3 filter-options-wrapper" onChange={handleBrandChange}>
                    {renderFilterOptions(filters.brands, 'name', handleBrandChange)}
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            {/* Modèles */}
            <Accordion defaultActiveKey={["0"]} style={{"--bs-accordion-bg": "transparent", "--bs-accordion-border-color": "transparent"}} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header className="filter-accordion-sub-title">Modèles</Accordion.Header>
                <Accordion.Body>
                  <Form className="px-3 filter-options-wrapper" onChange={handleModelChange}>
                    {renderFilterOptions(filters.vehicleModels, 'name', handleModelChange)}
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
             {/* Type */}
             <Accordion defaultActiveKey={["0"]} style={{"--bs-accordion-bg": "transparent", "--bs-accordion-border-color": "transparent"}} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header className="filter-accordion-sub-title">Type de Véhicule</Accordion.Header>
                <Accordion.Body>
                  <Form className="px-3 filter-options-wrapper" onChange={handleTypeChange}>
                    {renderFilterOptions(filters.vehicleTypes, 'name', handleTypeChange)}
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
   
    </Container>
  );
};

export default VehicleFilters;
