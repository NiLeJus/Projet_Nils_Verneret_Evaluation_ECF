import React, { useState, useEffect } from "react";
import { Carousel, Container, Image } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import IconsKeyInfo from "../components/general/VehicleDetailsIcons.js";
import StickyDetails from "../components/vehicleRelated/vehicleDetails/StickyDetails.js";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { handleDateDifference } from "../functions/handleDateDifference.js";
import { capitalizeFirstLetter } from "../functions/capitalizeFirstLetter.js";
import { formatMileage } from "../functions/formatMileage.js";
import { fetchVehicleById } from "../serverRelated/ApiRequest.js";
import { Helmet } from "react-helmet";

const carouselStyle = {
  Width: "720px", 
  Height: "400px", 
  margin: "auto", 
};

const carouselImagesStyle = {
  width: "100%", 
  height: "100%", 
  objectFit: "cover", 
  objectPosition: "center", 
};

export const VehicleDetails = () => {
  const baseUrl = "http://localhost:3000";
  const { vehicleId } = useParams();
  const [vehicleDetails, setVehicleDetails] = useState({});
  const [index, setIndex] = useState(0);

  const handleTransformedData = (vehicle) => {
    const formattedPrice = vehicle.price.toLocaleString("fr-FR");

    const transformedData = {
      vehicleId: vehicle.id,
      brand: capitalizeFirstLetter(vehicle.VehicleModel?.Brand?.name),
      vehicleModel: vehicle.VehicleModel?.name,
      productionYear: vehicle.production_year,
      mileage: formatMileage(vehicle?.mileage),
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
      vehicleType: vehicle.VehicleType.name,
      vehicleOptions: vehicle.Options,
    };

    const photoUrls = vehicle.Photos.map((photo) => baseUrl + photo.url);
    setVehicleDetails({ ...transformedData, photoUrls });
  };

  useEffect(() => {
    async function fetchData(vehicleId) {
      const response = await fetchVehicleById(vehicleId);
      handleTransformedData(response);
    }

    if (vehicleId) {
      fetchData(vehicleId);
    }
  }, [vehicleId]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const fetchVehicle = async () => {
    try {
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du véhicule:",
        error
      );
    }
  };

  const [containerStyle, setContainerStyle] = useState({
    position: "relative",
    width: "69%",
    height: "2000px",
  });

  useEffect(() => {
    fetchVehicle();
    const updateContainerStyle = () => {
      if (window.matchMedia("(min-width: 1068px)").matches) {
        setContainerStyle({
          position: "relative",
          width: "39%",
        });
      } else {
        setContainerStyle({
          position: "relative",
          width: "69%",
        });
      }
    };

    window.addEventListener("resize", updateContainerStyle);
    updateContainerStyle();
    return () => window.removeEventListener("resize", updateContainerStyle);
  }, []);

  return (
    <>
      <Helmet>
        <title>Vehicule</title>
        <meta
          name="description"
          content="Découvrez ce véhicule"
        />
        <meta charSet="utf-8" />
        <meta
          name="keywords"
          content="garage, voiture"
        />
      </Helmet>

      <Container
        mb-5
        style={containerStyle}
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
          Réfèrence : {vehicleDetails.vehicleId} - En ligne depuis{" "}
          {vehicleDetails.createdAtDate}
        </p>
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
                      <h3 className="key-info-title">Marque et modèle</h3>
                      <p className="key-info">
                        {vehicleDetails.brand} - {vehicleDetails.vehicleModel}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.Key className="me-2 key-icons" />
                    <div className="px-2">
                      <h3 className="key-info-title">Mise en circulation</h3>
                      <p className="key-info">
                        {vehicleDetails.productionYear}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.Mileage className="me-2 key-icons" />
                    <div className="px-2">
                      <h3 className="key-info-title">Kilomètrage</h3>
                      <p className="key-info">{vehicleDetails.mileage}</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.Fuel className="me-2 key-icons" />
                    <div className="px-2">
                      <h3 className="key-info-title">Carburant</h3>
                      <p className="key-info">{vehicleDetails.fuelType}</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.Transmission className="me-2 key-icons" />
                    <div className="px-2">
                      <h3 className="key-info-title">Transmission</h3>
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
                      <h3 className="key-info-title">Type</h3>
                      <p className="key-info">{vehicleDetails.vehicleType}</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.Painting className="me-2 key-icons" />
                    <div className="px-2">
                      <h3 className="key-info-title">Peinture</h3>
                      <p className="key-info d-inline-flex">
                        {vehicleDetails.color}
                        <Form.Control
                          className="mx-2"
                          style={{
                            backgroundColor: vehicleDetails.colorHex,
                            width: "2em",
                            height: "auto",
                          }}
                          type="color"
                          id="ColorInput"
                          value={vehicleDetails.colorHex}
                          disabled
                          readOnly
                        />
                      </p>
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
              <ul>
                {vehicleDetails.vehicleOptions?.map((option, idx) => (
                  <li
                    key={idx}
                    className="option-wrapper text-light mb-3"
                  >
                    <h2 className="option-item">
                      {option.name.charAt(0).toUpperCase() +
                        option.name.slice(1).toLowerCase()}
                    </h2>

                    <p>{option.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </div>
      </Container>
    </>
  );
};

export default VehicleDetails;
