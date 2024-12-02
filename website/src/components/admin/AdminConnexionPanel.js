import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import useAuthToken from "../../functions/useAuthToken"; 
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../serverRelated/ApiRequest";

export const AdminConnexionPanel = ({ show, onHide }) => {
  const navigate = useNavigate();
  const isValidToken = useAuthToken(); 

  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 

  // Effectuer une redirection si l'utilisateur est déjà authentifié ET si le panneau est affiché
  useEffect(() => {
    if (isValidToken && show) {
      navigate("/admin");
      onHide();
    }
  }, [isValidToken, navigate, show, onHide]); 

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    try {
      const response = await fetch(`${serverUrl}api/admins/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); 

      if (response.ok) {
        localStorage.setItem('token', data.token); // Stock le token JWT dans le stockage local
        navigate("/admin");
        onHide();
      } else {
        console.error("Erreur de connexion");
      }
    } catch (error) {
      console.error("Erreur de connexion : ", error);
    }
  };

  
  return (
    <Modal
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Connexion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
          >
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicPassword"
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}> Fermer </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminConnexionPanel;
