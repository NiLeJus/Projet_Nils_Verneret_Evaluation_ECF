import { capitalizeFirstLetter } from "../../functions/capitalizeFirstLetter";
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Select from "react-select";
import { Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import CreatableSelect from "react-select/creatable";


const AddAdminModal = ({ show, onHide }) => {
  const handleCloseModal = () => {
    onHide();
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [is_master, setIs_master] = useState(false);

  const handleAddAdmin = async () => {
    if(!name || !email || !password) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    try {
      const newAdmin = {
        name,
        email,
        password,
        is_master
      };
      const response = await fetch("http://localhost:5001/api/admins/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAdmin),
      });

      if (response.ok) {
        alert("Admin ajouté");
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };


  // Renommez cette variable pour éviter les conflits
  return (
    <Modal
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Admin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nom"
            id="name"
            onChange={(e) => setName(e.target.value)}
            />
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Mot de passe"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Label>Is master</Form.Label>
          <Form.Check
            type="checkbox"
            placeholder="Is master"
            id="is_master"
            onChange={(e) => setIs_master(e.target.checked)}
          />
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={handleAddAdmin}
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

export default AddAdminModal;
