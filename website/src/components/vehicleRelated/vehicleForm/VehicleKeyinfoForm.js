import React, { useState, useEffect } from "react";
import { Carousel, Container, Image } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import IconsKeyInfo from "../../general/VehicleDetailsIcons.js";
import { Form, FormGroup } from "react-bootstrap";
import Select from "react-select";
import ColorForm from "./keyInfosForm/ColorForm.js";

export const VehicleKeyinfoForm = () => {
  return (
    <>
      <Container
        className="text-center"
        style={{
          position: "relative",
          width: "60%",
          height: "2000px",
          margin: "auto",
        }}
      >
        <div className="justify">
          <p className="text-light mt-2">Réfèrence : fesfsefr</p>
          <p className="text-light mt-2">En ligne : 08/05/2023</p>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <Container className="p-0">
            <div className="detail-panel-wrapper px-5 py-3 mb-3">
              <h2 className="details-title pb-4">Informations clès</h2>

              <Form.Group className="mb-3">
                <Form.Label className="text-light"><h3>Description du véhicule :</h3></Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                />
              </Form.Group>

              <FormGroup>
                <Form.Label>
                  <h3 className="key-info-title">Prix :</h3>
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Prix sans espaces"
                />
              </FormGroup>

    

              <Row>
                <Col
                  xs={12}
                  md={6}
                  className="px-4"
                >
                  <div className=" d-flex align-items-top">
                    <IconsKeyInfo.Factory className="me-2 key-icons" />
                    <div className="px-2">
                      <FormGroup>
                        <Form.Label>
                          <h3 className="key-info-title">Marque et modèle :</h3>
                        </Form.Label>
                        <div className="">
                          <Form.Select aria-label="Select Brand">
                            <option>Choississez une marque</option>
                            <option value="addBrand">Ajouter une Marque</option>
                          </Form.Select>
                          <Form.Select aria-label="Select Model">
                            <option>Choississez un modèle</option>
                            <option value="addModel">Ajouter un Modèle</option>
                          </Form.Select>
                        </div>
                      </FormGroup>
                    </div>
                  </div>

                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.Door className="me-2 key-icons" />
                    <div className="px-2">
                      <FormGroup>
                        <Form.Label>
                          <h3 className="key-info-title">Portes :</h3>
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Nombre de porte "
                          id="doorsNumberForm"
                        />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.Seat className="me-2 key-icons" />
                    <div className="px-2">
                      <FormGroup>
                        <Form.Label>
                          <h3 className="key-info-title">Sièges :</h3>
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Nombre de sièges "
                          id="seatsNumberForm"
                        />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="d-flex align-items-top">
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
                        />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="d-flex align-items-top">
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
                        />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.Fuel className="me-2 key-icons" />
                    <div className="px-2">
                      <FormGroup>
                        <Form.Label>
                          <h3 className="key-info-title">Carburant :</h3>
                        </Form.Label>
                        <Form.Select aria-label="Select Fuel">
                          <option>Choississez un Carburant</option>
                          <option value="addModel">
                            Ajouter un Type de Carburant{" "}
                          </option>
                        </Form.Select>
                      </FormGroup>
                    </div>
                  </div>

                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.Transmission className="me-2 key-icons" />
                    <div className="px-2">
                      <FormGroup>
                        <Form.Label>
                          <h3 className="key-info-title">Transmission :</h3>
                        </Form.Label>
                        <Form.Select aria-label="Select Transmission">
                          <option>Choississez une transmission</option>
                          <option value="addTransmission">
                            Ajouter une transmission
                          </option>
                        </Form.Select>
                      </FormGroup>
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
                      <FormGroup>
                        <Form.Label>
                          <h3 className="key-info-title">Types :</h3>
                        </Form.Label>
                      </FormGroup>
                    </div>
                  </div>

                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.Painting className="me-2 key-icons" />
                    <div className="px-2">
                      <h3 className="key-info-title">Peinture :</h3>
                      <ColorForm />
                    </div>
                  </div>

                  <div className="d-flex align-items-top">
                    <IconsKeyInfo.HorsePower className="me-2 key-icons" />
                    <div className="px-2">
                      <FormGroup>
                        <Form.Label>
                          <h3 className="key-info-title">Chevaux fiscaux :</h3>
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Nombre de porte "
                          id="doorsNumberForm"
                        />
                      </FormGroup>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </Container>
    </>
  );
};

export default VehicleKeyinfoForm;
