import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { addNewTestimony } from "../serverRelated/ApiRequest";
import Form from "react-bootstrap/Form";

export const UserLeaveATestimony = () => {
  const [name, setName] = useState("");
  const [testimony, setTestimony] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");

  const validateInputs = () => {
    if (!name.trim()) {
      setError("Veuillez entrer votre nom.");
      return false;
    }
    if (!testimony.trim()) {
      setError("Veuillez entrer votre témoignage.");
      return false;
    }
    if (isNaN(rating) || rating < 0 || rating > 5) {
      setError("La note doit être un nombre entre 0 et 5.");
      return false;
    }
    setError("");
    return true;
  };

  const handleAddNewTestimon = async (event) => {
    event.preventDefault();
    if (!validateInputs()) {
      return;
    }

    try {
      const newTestimonyData = { name, testimony, rating };
      const response = await addNewTestimony(newTestimonyData);
      console.log(response);
      // Reset form or show success message
    } catch (error) {
      console.error("Error submitting testimony:", error);
      setError("Erreur lors de la soumission du témoignage.");
    }
  };

  return (
    <div className="bg-dark p-5">
      <Container>
        <h1>Laissez-nous un avis</h1>
        <Form onSubmit={handleAddNewTestimon}>
          {error && <p className="text-danger">{error}</p>}
          <Form.Group
            className="mb-3"
            controlId="name"
          >
            <Form.Label className="text-light">Votre nom</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="testimony"
          >
            <Form.Label className="text-light">
              Qu'avez-vous pensé de votre expérience au garage Vincent Parrot ?
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={testimony}
              onChange={(e) => setTestimony(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="rating"
          >
            <Form.Label className="text-light">
              Donnez-nous une note de 1 à 5
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="note"
              value={rating}
              onChange={(e) =>
                setRating(Math.max(0, Math.min(5, Number(e.target.value))))
              }
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
          >
            Envoyer
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default UserLeaveATestimony;
