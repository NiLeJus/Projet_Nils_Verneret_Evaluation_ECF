import React, { useState, useEffect } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { fetchGarage, modifyGarage } from "../../../serverRelated/ApiRequest";

export const GarageManagement = () => {
  const [garage, setGarage] = useState({
    address: "",
    city: "",
    zip_code: "",
    telephone: "",
    email: "",
  });

  useEffect(() => {
    const getGarageData = async () => {
      try {
        const data = await fetchGarage();
        setGarage(data);
      } catch (error) {
        console.error("Error fetching garage data:", error);
      }
    };

    getGarageData();
  }, []);

  const handleInputChange = (e) => {
    setGarage({ ...garage, [e.target.name]: e.target.value });
  };

  const handleModify = async () => {
    try {
      await modifyGarage(garage);
    } catch (error) {
      console.error("Error modifying garage:", error);
    }
  };

  return (
    <Container className="bg-dark pb-4">
    <h1 className="text-light">Informations du garage</h1>
    <Form style={{ width: "50%", margin: "auto" }}>
      <Form.Group className="mb-3">
        <Form.Label className="text-light">Adresse</Form.Label>
        <Form.Control
          name="address"
          value={garage.address}
          type="text"
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="text-light">Ville</Form.Label>
        <Form.Control
          name="city"
          value={garage.city}
          type="text"
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="text-light">Code Postal</Form.Label>
        <Form.Control
          name="zip_code"
          value={garage.zip_code}
          type="text"
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="text-light">Numéro de téléphone</Form.Label>
        <Form.Control
          name="telephone"
          value={garage.telephone}
          type="number"
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="text-light">Adresse E-mail</Form.Label>
        <Form.Control
          name="email"
          value={garage.email}
          type="text"
          onChange={handleInputChange}
        />
      </Form.Group>

      <div className="d-flex justify-content-center">
        <Button
          variant="success"
          onClick={handleModify}
        >
          Appliquer les modifications
        </Button>
      </div>
    </Form>
  </Container>
  );
};
export default GarageManagement;
