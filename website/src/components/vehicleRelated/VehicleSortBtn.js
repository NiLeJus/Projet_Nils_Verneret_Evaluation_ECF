import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

export const VehicleSortBtn = () => {
  return (
    <div>
    <Form.Select
      aria-label="sort-select"
      className="sort-select"
    >
      <option>Trier par ...</option>
      <option value="1">Prix croissant</option>
      <option value="2">Prix décroissant</option>
      <option value="3">Année croissante</option>
      <option value="4">Année décroissante</option>
      <option value="5">Km. croissant</option>
      <option value="6">Km. décroissant</option>
    </Form.Select>
    </div>
  );
};

export default VehicleSortBtn;