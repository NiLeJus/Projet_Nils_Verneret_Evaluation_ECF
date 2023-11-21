import React, { useState } from "react";
import { Carousel, Container, Image } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import IconsKeyInfo from "../components/vehicleRelated/vehicleDetails/VehicleDetailsIcons.js";
import StickyDetails from "../components/vehicleRelated/vehicleDetails/StickyDetails.js";

const imageUrls = [
  "https://placehold.co/720x400?text=Vehicle+Image",
  "https://placehold.co/720x400?text=Vehicle+Image2",
  "https://placehold.co/720x400?text=Vehicle+Image3",
  "https://placehold.co/720x400?text=Vehicle+Image4",
  "https://placehold.co/720x400?text=Vehicle+Image5",
];

const carouselStyle = {
  maxWidth: "720px", // Largeur maximale de l'image
  maxHeight: "400px", // Hauteur maximale de l'image
  margin: "auto", // Centre le carrousel si l'écran est plus large
};

export const VehicleDetailsTemplate = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
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
          {imageUrls.map((url, idx) => (
            <Carousel.Item key={idx}>
              <Image
                className="d-block"
                src={url}
                alt={`Slide ${idx + 1}`}
                fluid
              />
            </Carousel.Item>
          ))}
        </Carousel>
        
        <div className="d-flex justify-content-center mt-0 ">
          {imageUrls.map((thumbnailUrl, idx) => (
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
        <p className="text-light mt-2">Réfèrence : fesfsefr</p>
        <div className="d-flex justify-content-center mt-2">
          <Container className="p-0">
            <div className="detail-panel-wrapper px-5 py-3 mb-3">
              <h2 className="details-title pb-4">Informations clès</h2>

              <Row>
                <Col
                  xs={12}
                  md={6}
                  className="px-4"
                >
                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.Factory className="me-2 key-icons" />
                    <div className="px-2">
                      <h3 className="key-info-title">Marque et modèle :</h3>
                      <p className="key-info">Renault - 205</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.Key className="me-2 key-icons" />
                    <div className="px-2">
                      <h3 className="key-info-title">Mise en circulation :</h3>
                      <p className="key-info">2014</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.Mileage className="me-2 key-icons" />
                    <div className="px-2">
                      <h3 className="key-info-title">Kilomètrage :</h3>
                      <p className="key-info">354 541</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.Fuel className="me-2 key-icons" />
                    <div className="px-2">
                      <h3 className="key-info-title">Carburant :</h3>
                      <p className="key-info">Diesel</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.Transmission className="me-2 key-icons" />
                    <div className="px-2">
                      <h3 className="key-info-title">Transmission :</h3>
                      <p className="key-info">Automatic 6</p>
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
                      <p className="key-info">Rouge</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.HorsePower className="me-2 key-icons" />
                    <div className="px-2">
                      <h3 className="key-info-title">Chevaux fiscaux :</h3>
                      <p className="key-info">9</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.Door className="me-2 key-icons" />
                    <div className="px-2">
                      <h3 className="key-info-title">Portes :</h3>
                      <p className="key-info">5</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.Seat className="me-2 key-icons" />
                    <div className="px-2">
                      <h3 className="key-info-title">Sièges :</h3>
                      <p className="key-info">4</p>
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
                  <div className="d-flex align-items-top">
                  </div>
                </Col>

                <Col
                  xs={12}
                  md={6}
                  className="px-4"
                >
                  <div className="d-flex align-items-top">
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <StickyDetails/>
      </Container>
    </>
  );
};

export default VehicleDetailsTemplate;
