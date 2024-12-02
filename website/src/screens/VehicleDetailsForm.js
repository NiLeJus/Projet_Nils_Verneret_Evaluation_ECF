import React, { useState, useEffect } from "react";
import { Carousel, Container, Image } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import IconsKeyInfo from "../components/general/VehicleDetailsIcons.js";
import Form from "react-bootstrap/Form";
import BrandForm from "../components/vehicleRelated/vehicleForm/keyInfosForm/BrandForm.js";
import ModelForm from "../components/vehicleRelated/vehicleForm/keyInfosForm/ModelForm.js";
import FuelForm from "../components/vehicleRelated/vehicleForm/keyInfosForm/FuelForm.js";
import TransmissionForm from "../components/vehicleRelated/vehicleForm/keyInfosForm/TransmissionForm.js";
import ColorForm from "../components/vehicleRelated/vehicleForm/keyInfosForm/ColorForm.js";
import VehicleTypeForm from "../components/vehicleRelated/vehicleForm/keyInfosForm/VehicleTypeForm.js";
import OptionsForm from "../components/vehicleRelated/vehicleForm/keyInfosForm/OptionsForm.js";
import VehicleConditionForm from "../components/vehicleRelated/vehicleForm/keyInfosForm/VehicleConditionForm.js";
import { FormGroup } from "react-bootstrap";
import { addNewVehicle } from "../serverRelated/ApiRequest.js";
import { Button } from "react-bootstrap";
import { useNavigate} from 'react-router-dom';

export const VehicleDetailsForm = () => {
  const [vehicleId, setVehicleId] = useState(null); // Pour stocker l'ID du véhicule ajouté

  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedTransmission, setSelectedTransmission] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);

  const [vehicleData, setVehicleData] = useState({
    id: 1,
    Vehicle: {
      Brand: {
        id: "",
        name: "",
      },
      Color: {
        id: "",
        name: "",
      },
      transmission_id: "",
      production_year: "",
      mileage: "",
      price: "",
      fuel_type_id: "",
      tax_horsepower: "",
      vehicle_type_id: "",
      vehicle_comment: "",
      vehicle_condition_id: "",
      VehicleModel: {
        id: "",
        door_number: "",
        wheel_number: "",
        seat_number: "",
      },
      Options: [
        {
          id: "",
        },
      ],
    },
  });

  const handleRegisterRelOptionsVehicles = async (vehicleId, optionsId) => {
    console.log("Envoi des options:", optionsId); // Afficher les options à envoyer
  };

  const handleSendPhotos = async (vehicleId) => {
    console.log("Envoi des photos:", photos); // Afficher les photos à envoyer
    const formData = new FormData();
    photos.forEach((photo) => {
      formData.append("photo", photo);
    });
    formData.append("vehicle_id", vehicleId); // En dehors de la boucle

    try {
      const response = await fetch("http://localhost:5001/api/photos", {
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

  const handlePhotosChange = (e) => {
    setPhotos([...e.target.files]);
  };

  const handleOptionsChange = (selectedOptions) => {
    console.log("Options sélectionnées:", selectedOptions); // Afficher les options sélectionnées

    setVehicleData((prevData) => {
      const updatedData = {
        ...prevData,
        Vehicle: {
          ...prevData.Vehicle,
          Options: selectedOptions.map((option) => ({ id: option.value })),
        },
      };

      console.log("Données mises à jour:", updatedData);
      return updatedData;
    });
  };

  const handleBrandChange = (selectedBrand) => {
    setSelectedBrand(selectedBrand); // Ajoutez cette ligne
    setVehicleData((prevData) => ({
      ...prevData,
      Vehicle: {
        ...prevData.Vehicle,
        Brand: {
          id: selectedBrand.value,
          name: selectedBrand.label,
        },
      },
    }));
  };

  const handleColorChange = (selectedColor) => {
    console.log("Couleur sélectionnée:", selectedColor); // Afficher la couleur sélectionnée
    setVehicleData((prevData) => ({
      ...prevData,
      Vehicle: {
        ...prevData.Vehicle,
        Color: {
          id: selectedColor,
        },
      },
    }));
  };

  const handleTransmissionChange = (selectedTransmission) => {
    setVehicleData((prevData) => ({
      ...prevData,
      Vehicle: {
        ...prevData.Vehicle,
        transmission_id: selectedTransmission, 
      },
    }));
  };

  const handleFuelTypeChange = (selectedFuelType) => {
    console.log("Type de carburant sélectionné:", selectedFuelType); 
    setVehicleData((prevData) => ({
      ...prevData,
      Vehicle: {
        ...prevData.Vehicle,
        fuel_type_id: selectedFuelType,
      },
    }));
  };

  const handleAddNewVehicle = async () => {
    console.log(vehicleData);

    // Fonction pour vérifier si un champ est vide
    const isFieldEmpty = (value) =>
      value === null || value === undefined || value === "";

    // Vérification des champs de niveau supérieur
    const vehicleFields = vehicleData.Vehicle;
    if (
      isFieldEmpty(vehicleData.id) ||
      isFieldEmpty(vehicleFields.transmission_id) ||
      isFieldEmpty(vehicleFields.production_year) ||
      isFieldEmpty(vehicleFields.mileage) ||
      isFieldEmpty(vehicleFields.price) ||
      isFieldEmpty(vehicleFields.tax_horsepower) ||
      isFieldEmpty(vehicleFields.vehicle_type_id) ||
      isFieldEmpty(vehicleFields.vehicle_comment)
    ) {
      console.error("Tous les champs obligatoires doivent être remplis");
      return;
    }

    if (photos && photos.length === 0) {
      console.error("Vous devez ajouter au moins une photo");
      return;
    }

    // Vérification des champs imbriqués
    const brandFields = vehicleFields.Brand;
    const colorFields = vehicleFields.Color;
    const modelFields = vehicleFields.VehicleModel;
    if (
      isFieldEmpty(brandFields.id) ||
      isFieldEmpty(colorFields.id) ||
      isFieldEmpty(modelFields.id) ||
      isFieldEmpty(modelFields.door_number) ||
      isFieldEmpty(modelFields.wheel_number) ||
      isFieldEmpty(modelFields.seat_number)
    ) {
      console.error("Tous les champs obligatoires doivent être remplis");
      return;
    }
    console.log(vehicleData.Vehicle.Options)

    try {
      const response = await addNewVehicle(vehicleData);
      if (response && response.id) {
        const newVehicleId = response.id;
        setVehicleId(newVehicleId);
        console.log(newVehicleId)
        handleRegisterRelOptionsVehicles(
          newVehicleId,
          vehicleData.Vehicle.Options
        );
        
        handleSendPhotos(newVehicleId);
        console.log("response.ok", response.ok )

        if (response.ok) {
          navigate('/admin')
        }
  
      } else {
        console.error("Réponse inattendue de l'API", response);
      }



    } catch (error) {
      console.error("Erreur lors de l'ajout du véhicule:", error);
    }
  };

  const handleProductionYearChange = (e) => {
    const newYear = e.target.value;
    setVehicleData((prevData) => ({
      ...prevData,
      Vehicle: {
        ...prevData.Vehicle,
        production_year: newYear,
      },
    }));
  };

  const handleMileageChange = (e) => {
    const newMileage = e.target.value;
    setVehicleData((prevData) => ({
      ...prevData,
      Vehicle: {
        ...prevData.Vehicle,
        mileage: newMileage,
      },
    }));
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setVehicleData((prevData) => ({
      ...prevData,
      Vehicle: {
        ...prevData.Vehicle,
        price: newPrice,
      },
    }));
  };

  const handleTaxHorsePowerChange = (e) => {
    const newValue = e.target.value;
    setVehicleData((prevData) => ({
      ...prevData,
      Vehicle: {
        ...prevData.Vehicle,
        tax_horsepower: newValue,
      },
    }));
  };

  const handleVehicleCommentChange = (e) => {
    const newValue = e.target.value;
    setVehicleData((prevData) => ({
      ...prevData,
      Vehicle: {
        ...prevData.Vehicle,
        vehicle_comment: newValue,
      },
    }));
  };

  const handleVehicleTypeChange = (selectedType) => {
    setVehicleData((prevData) => ({
      ...prevData,
      Vehicle: {
        ...prevData.Vehicle,
        vehicle_type_id: selectedType,
      },
    }));
  };

  const handleConditionChange = (selectedCondition) => {
    setVehicleData((prevData) => ({
      ...prevData,
      Vehicle: {
        ...prevData.Vehicle,
        vehicle_condition_id: selectedCondition, 
      },
    }));
  };

  const handleModelChange = (selectedModel) => {
    setSelectedModel(selectedModel);
    setVehicleData((prevData) => ({
      ...prevData,
      Vehicle: {
        ...prevData.Vehicle,
        VehicleModel: {
          ...prevData.Vehicle.VehicleModel,
          id: selectedModel.value,
          wheel_number: selectedModel.wheel_number,
          door_number: selectedModel.door_number,
          seat_number: selectedModel.seat_number,
        },
      },
    }));
  };

  return (
    <>
      <Container
        style={{
          position: "relative",
          width: "55%",
          height: "auto",
          margin: "auto",
        }}
      >
        <div className="d-flex justify-content-center mt-2 m-auto">
          <Container className="p-0">
            <div className="detail-panel-wrapper px-5 py-3 mb-3">
              <h2 className="details-title pb-4">Informations clès</h2>

              <Row id="key-info-wrapper">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label className="key-info-title">
                    <h3 className="key-info-title">
                      Commentaire sur levéhicule :
                    </h3>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={handleVehicleCommentChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="key-info-title">
                    <h3 className="key-info-title">Etat du véhicule :</h3>
                  </Form.Label>
                  <VehicleConditionForm
                    onConditionChange={handleConditionChange}
                  />
                </Form.Group>


                <div className=" mb-5">
                  <Form.Label className="key-info-title">
                    <h3 className="key-info-title">Prix :</h3>
                  </Form.Label>
                  <Form.Control
                    className="mb-5"
                    type="number"
                    placeholder="Prix"
                    id="priceForm"
                    onChange={handlePriceChange}
                  />
                </div>
                   
                <Col
                  xs={12}
                  md={6}
                  className="px-4"
                >
                <div className="d-flex align-items-top mb-5">
                  <IconsKeyInfo.Mileage className="me-2 key-icons" />
                  <div className="px-2">
                    <FormGroup>
                      <Form.Label>
                        <h3 className="key-info-title">Kilomètrage :</h3>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Kilometrage"
                        id="mileageForm"
                        onChange={handleMileageChange}
                      />
                    </FormGroup>
                  </div>
                </div>
            

                <div className="d-flex align-items-top mb-5">
                  <IconsKeyInfo.Factory className="me-2 key-icons" />
                  <div className="px-2">
                    <h3 className="key-info-title">Marque et modèle :</h3>
                    <BrandForm onBrandChange={handleBrandChange} /> 
                    <ModelForm
                      brand_id={selectedBrand?.value}
                      onModelChange={handleModelChange}
                    />
                  </div>
                </div>

                <div className="d-flex align-items-top  mb-2">
                  <IconsKeyInfo.Door className="me-2 key-icons" />
                  <div className="px-2">
                    <h3 className="key-info-title">Portes :</h3>
                    <p className="key-info">
                      {vehicleData.Vehicle.VehicleModel.door_number}
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-top mb-5">
                  <IconsKeyInfo.Seat className="me-2 key-icons" />
                  <div className="px-2">
                    <h3 className="key-info-title">Sièges :</h3>
                    <p className="key-info">
                      {vehicleData.Vehicle.VehicleModel.seat_number}
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-top mb-5">
                  <IconsKeyInfo.Key className="me-2 key-icons" />
                  <div className="px-2">
                    <FormGroup>
                      <Form.Label>
                        <h3 className="key-info-title">
                          Mise en circulation :
                        </h3>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Année de mise en circulation"
                        onChange={handleProductionYearChange}
                      />
                    </FormGroup>
                  </div>
                </div>
              </Col>
              <Col
                  xs={12}
                  md={6}
                  className="px-4"
                >
                <div className="d-flex align-items-top mb-5">
                  <IconsKeyInfo.Fuel className="me-2 key-icons" />
                  <div className="px-2">
                    <h3 className="key-info-title">Carburant :</h3>
                    <FuelForm onFuelChange={handleFuelTypeChange} />
                  </div>
                </div>

                <div className="d-flex align-items-top mb-5">
                  <IconsKeyInfo.Transmission className="me-2 key-icons" />
                  <div className="px-2">
                    <h3 className="key-info-title">Transmission :</h3>
                    <TransmissionForm
                      onTransmissionChange={handleTransmissionChange}
                    />
                  </div>
                </div>

                <div className="d-flex align-items-top mb-5">
                  <IconsKeyInfo.Stars className="me-2 key-icons" />
                  <div className="px-2">
                    <h3 className="key-info-title">Types :</h3>
                    <VehicleTypeForm onTypeChange={handleVehicleTypeChange} />
                  </div>
                </div>

                <div className="d-flex align-items-top mb-5">
                  <IconsKeyInfo.Painting className="me-2 key-icons" />
                  <div className="px-2">
                    <h3 className="key-info-title">Peinture :</h3>
                    <ColorForm onColorChange={handleColorChange} />
                  </div>
                </div>

                <div className="d-flex align-items-top mb-5">
                  <IconsKeyInfo.HorsePower className="me-2 key-icons" />
                  <div className="px-2">
                    <FormGroup>
                      <Form.Label>
                        <h3 className="key-info-title">Chevaux Fiscaux :</h3>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Chevaux Fiscaux "
                        id="tax_horsepower"
                        onChange={handleTaxHorsePowerChange}
                      />
                    </FormGroup>
                  </div>
                </div>
                </Col>
              </Row>
            </div>
            <div className="detail-panel-wrapper px-5 py-3 mb-3">
              <h2 className="details-title pb-4">Options et équipements</h2>

              <OptionsForm onOptionsChange={handleOptionsChange} />
              <Row>
                <Form.Group
                  controlId="formFile"
                  className="mb-3"
                >
                  <Form.Label> <h3 className="key-info-title">Ajouter des photos</h3></Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    onChange={handlePhotosChange}
                  />
                </Form.Group>
              </Row>
            </div>
          </Container>
        </div>
        <Button onClick={handleAddNewVehicle}>Ajouter un véhicule</Button>
      </Container>
    </>
  );
};

export default VehicleDetailsForm;
