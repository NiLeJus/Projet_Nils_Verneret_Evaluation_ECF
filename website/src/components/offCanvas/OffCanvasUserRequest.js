import React, { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export const OffCanvasUserRequest = ({
  vehicleId,
  showOffcanvasRequest,
  handleCloseRequest,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [preferPhone, setPreferPhone] = useState(false);
  const [message, setMessage] = useState("");
  const [requesterName, setRequesterName] = useState("");
  const [gender, setGender] = useState(""); 



  //#region //* Changement des valeurs
  const handlePhoneChange = (event) => {
    let input = event.target.value;

    if (input.length > 13) {
      input = input.slice(0, 13);
    }
    setPhoneNumber(input);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleNameChange = (event) => {
    setRequesterName(event.target.value);
  };

  const handleMessageChange = (event) => { 
    setMessage(event.target.value);
  };

  const handlePreferChange = (event) => {
    setPreferPhone(!event.target.checked);
  };

  //#endregion

  //#region //* Validation des valeurs
  const isValidPhoneNumber = (phoneNumber) => {
    const validPrefixes = ["+336", "+337", "336", "337", "07", "06"];
    return validPrefixes.some(prefix => phoneNumber.startsWith(prefix));
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidField = (field) => {
    return field.trim().length > 0;
  };
  //#endregion

  const handleSendRequest = async (event) => {
    event.preventDefault();

    if (!isValidPhoneNumber(phoneNumber)) {
      alert("Veuillez entrer un numéro de téléphone valide");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Veuillez entrer une adresse e-mail valide");
      return;
    }

    if (!isValidField(requesterName) || !isValidField(message)) {
      alert("Veuillez remplir tous les champs requis");
      return;
    }

    const newRequest = {
      requester_name: requesterName,
      vehicle_id: vehicleId,
      message: message,
      phone: phoneNumber,
      email: email,
      prefer_phone: preferPhone,
      is_processed: false,
      received_at: new Date(),
      processed_at: null,
      gender
    };

        try {
          const response = await fetch("http://localhost:5001/api/requests", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newRequest),
          });

          if (response.ok) {
            alert("Votre demande a bien été envoyée");
            handleCloseRequest();
          } else {
            alert("Une erreur est survenue");
          }
        } catch (error) {
          console.error("Erreur lors de l'envoi de la demande:", error);
          alert("Une erreur est survenue lors de l'envoi de la demande");
        }
  };

  return (
    <>
      <Offcanvas
        show={showOffcanvasRequest}
        onHide={handleCloseRequest}
        scroll={true}
        backdrop={true}
        className="bg-dark custom-offcanvas"
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>Contacter nous !</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form className="text-light px-1 py-3">
            <Form.Group className="mb-3"
           >
              <Form.Label>Civilité</Form.Label>
              <Form.Check
                inline
                label="M."
                name="gender"
                type="radio"
                id={`inline-radio-mr`}
                onChange={handleGenderChange}
              />
              <Form.Check
                inline
                label="Mme."
                name="gender"
                type="radio"
                id={`inline-radio-md`}
                onChange={handleGenderChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Nom"
                onChange={handleNameChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Adresse Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="adresse@mail.fr"
                required
                onChange={handleEmailChange}
                isValid={!isValidEmail}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Numéro de téléphone</Form.Label>
              <Form.Control
                name="phone"
                type="tel"
                placeholder= "+336 ou 06"
                onChange={handlePhoneChange}
                required
                isInvalid={!isValidPhoneNumber}
              />
              <Form.Control.Feedback type="invalid">
                Entrez un numéro de téléphone valide
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                label="Préférer être contacté par email"
                name="preference"
                type="checkbox"
                id={`inline-checkbox-md`}
                onChange={handlePreferChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                required
                isInvalid={!isValidField}
                onChange={handleMessageChange}
                placeholder="Votre message ici"
              />
            </Form.Group>

            <div className="text-center">
              <Button
                variant="primary"
                type="submit"
                onClick={handleSendRequest}
              >
                Envoyer
              </Button>
              <Button
                variant="secondary"
                className="ms-3"
                onClick={handleCloseRequest}
              >
                Annuler
              </Button>
            </div>
          </Form>

          
        </Offcanvas.Body>
        <hr/>
 
      </Offcanvas>
    </>
  );
};

export default OffCanvasUserRequest;
