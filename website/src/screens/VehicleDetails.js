import React, { useState, useEffect } from "react";
import { Carousel, Container, Image } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import IconsKeyInfo from "../components/general/VehicleDetailsIcons.js";
import StickyDetails from "../components/vehicleRelated/vehicleDetails/StickyDetails.js";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { handleDateDifference } from "../functions/handleDateDifference.js";
import { capitalizeFirstLetter } from "../functions/capitalizeFirstLetter.js";

const carouselStyle = {
  Width: "720px", // Largeur maximale de l'image
  Height: "400px", // Hauteur maximale de l'image
  margin: "auto", // Centre le carrousel si l'écran est plus large
};
const carouselImagesStyle = {
  width: "100%", // Remplir la largeur du cadre
  height: "100%", // Remplir la hauteur du cadre
  objectFit: "cover", // Agrandir ou réduire l'image pour couvrir le cadre
  objectPosition: "center", // Centrer l'image dans le cadre
};

export const VehicleDetails = () => {
  const baseUrl = "http://localhost:3000";
  const { vehicleId } = useParams();
  const [vehicleDetails, setVehicleDetails] = useState({});

  const handleTransformedData = (vehicle) => {
    const formattedPrice = vehicle.price.toLocaleString("fr-FR");

    const transformedData = {
      vehicleId: vehicle.id,
      brand: capitalizeFirstLetter(vehicle.VehicleModel?.Brand?.name),
      vehicleModel: vehicle.VehicleModel?.name,
      productionYear: vehicle.production_year,
      mileage: vehicle.mileage,
      fuelType: capitalizeFirstLetter(vehicle.FuelType?.name),
      transmission: capitalizeFirstLetter(vehicle.Transmission?.name),
      vehicleCondition: vehicle.VehicleCondition?.name,
      price: formattedPrice,
      taxHorsepower: vehicle.tax_horsepower,
      color: capitalizeFirstLetter(vehicle.Color?.name),
      colorHex: vehicle.Color?.hex,
      doorNumber: vehicle.VehicleModel?.door_number,
      wheelNumber: vehicle.VehicleModel?.wheel_number,
      vehicleComment: vehicle.vehicle_comment,
      vehicleModelDescription: vehicle.VehicleModel?.description,
      createdAtDate: handleDateDifference(vehicle.created_at),
    };
    const photoUrls = vehicle.Photos.map((photo) => baseUrl + photo.url);
    setVehicleDetails({ ...transformedData, photoUrls });
  };

  useEffect(() => {
    fetchVehicle();
  }, [vehicleId]);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const fetchVehicle = async () => {
    try {
      const response = await fetch(`/api/vehicles/details/${vehicleId}`);
      const vehicle = await response.json();
      handleTransformedData(vehicle);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du véhicule:",
        error
      );
    }
  };

  return (
    <>
      <Container
        style={{ position: "relative", width: "39%", height: "2000px" }}
      >
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          fade
          style={carouselStyle}
        >
          {vehicleDetails.photoUrls?.map((url, idx) => (
            <Carousel.Item
              key={idx}
              className="bg-dark"
            >
              <Image
                className="d-block"
                src={url}
                alt={`Slide ${idx + 1}`}
                fluid
                style={carouselImagesStyle}
              />
            </Carousel.Item>
          ))}
        </Carousel>

        <div className="d-flex justify-content-center mt-0 ">
          {vehicleDetails.photoUrls?.map((thumbnailUrl, idx) => (
            <Image
              key={`thumb-${idx}`}
              src={thumbnailUrl}
              alt={`Thumbnail ${idx + 1}`}
              className={`img-thumbnail ${
                index === idx ? "active-carousel-thumbnail" : ""
              } m-1 bg-transparent`}
              onClick={() => setIndex(idx)}
              style={{
                cursor: "pointer",
                maxWidth: "100px",
                maxHeight: "100px",
                marginRight: "4px",
                border: "none",
                outline: "none",
                borderRadius: "8px",
              }}
              thumbnail
            />
          ))}
        </div>
        <p className="text-light mt-2">
          Réfèrence : {vehicleDetails.vehicleId}
        </p>
        <p className="text-light mt-2">
          En ligne depuis {vehicleDetails.createdAtDate}
        </p>

        <div className="d-flex justify-content-center mt-2">
          <Container className="p-0">
            <div className="detail-panel-wrapper px-5 py-3 mb-3">
              <h2 className="details-title pb-4">Informations clès</h2>

              <Row id="key-info-wrapper">
                <Col
                  xs={12}
                  md={6}
                  className="px-4"
                >
                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.Factory className="me-2 key-icons" />
                    <div className="px-2">
                      <h3 className="key-info-title">Marque et modèle :</h3>
                      <p className="key-info">
                        {" "}
                        {vehicleDetails.brand} - {vehicleDetails.vehicleModel}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.Key className="me-2 key-icons" />
                    <div className="px-2">
                      <h3 className="key-info-title">Mise en circulation :</h3>
                      <p className="key-info">
                        {" "}
                        {vehicleDetails.productionYear}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.Mileage className="me-2 key-icons" />
                    <div className="px-2">
                      <h3 className="key-info-title">Kilomètrage :</h3>
                      <p className="key-info">{vehicleDetails.mileage}</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.Fuel className="me-2 key-icons" />
                    <div className="px-2">
                      <h3 className="key-info-title">Carburant :</h3>
                      <p className="key-info">{vehicleDetails.fuelType}</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.Transmission className="me-2 key-icons" />
                    <div className="px-2">
                      <h3 className="key-info-title">Transmission :</h3>
                      <p className="key-info">{vehicleDetails.transmission}</p>
                    </div>
                  </div>
                </Col>

                <Col
                  xs={12}
                  md={6}
                  className="px-4"
                >
                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.Stars className="me-2 key-icons" />
                    <div className="px-2">
                      <h3 className="key-info-title">Types :</h3>
                      <p className="key-info">Berline</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.Painting className="me-2 key-icons" />
                    <div className="px-2">
                      <h3 className="key-info-title">Peinture :</h3>
                      <p className="key-info">{vehicleDetails.color}</p>
                      <Form.Control
                        style={{ backgroundColor: vehicleDetails.colorHex }}
                        type="color"
                        id="ColorInput"
                        value={vehicleDetails.colorHex} // Utilisez l'état pour contrôler la valeur
                        disabled
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.HorsePower className="me-2 key-icons" />
                    <div className="px-2">
                      <h3 className="key-info-title">Chevaux fiscaux :</h3>
                      <p className="key-info">{vehicleDetails.taxHorsepower}</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.Door className="me-2 key-icons" />
                    <div className="px-2">
                      <h3 className="key-info-title">Portes :</h3>
                      <p className="key-info">{vehicleDetails.doorNumber}</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.Seat className="me-2 key-icons" />
                    <div className="px-2">
                      <h3 className="key-info-title">Sièges :</h3>
                      <p className="key-info">{vehicleDetails.wheelNumber}</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="detail-panel-wrapper px-5 py-3 mb-3">
              <h2 className="details-title pb-4">Options et équipements</h2>

              <Row>
                <Col
                  xs={12}
                  md={6}
                  className="px-4"
                >
                  <div className="d-flex align-items-top"></div>
                </Col>

                <Col
                  xs={12}
                  md={6}
                  className="px-4"
                >
                  <div className="d-flex align-items-top"></div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <StickyDetails
          vehicleId={vehicleDetails.vehicleId}
          brand={vehicleDetails.brand}
          vehicleModel={vehicleDetails.vehicleModel}
          productionYear={vehicleDetails.productionYear}
          mileage={vehicleDetails.mileage}
          fuelType={vehicleDetails.fuelType}
          transmission={vehicleDetails.transmission}
          vehicleCondition={vehicleDetails.vehicleCondition}
          price={vehicleDetails.price}
          vehicleComment={vehicleDetails.vehicleComment}
          vehicleModelDescription={vehicleDetails.vehicleModelDescription}
        />
      </Container>
    </>
  );
};

export default VehicleDetails;
