import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddPhotoModal = ({ show, onHide, vehicleId }) => {
  const [photos, setPhotos] = useState([]);

  const handlePhotosChange = (e) => {
    setPhotos([...e.target.files]);
  };

  const handleCancel = async () => {};
  const handleSendPhotos = async () => {
    const formData = new FormData();
    photos.forEach((photo) => {
      formData.append("photos", photo);
    });
    formData.append("vehicle_id", vehicleId);

    try {
      const response = await fetch("http://localhost:5001/photos", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
      if (!response.ok)
        throw new Error("Erreur réseau lors de l’upload des photos");
    } catch (error) {
      console.error("Erreur lors de l’envoi des photos:", error);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>Ajouter des photos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleSendPhotos}
          >
            Ajouter
          </Button>
          <Button
            variant="secondary"
            onClick={handleCancel}
          >
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddPhotoModal;
