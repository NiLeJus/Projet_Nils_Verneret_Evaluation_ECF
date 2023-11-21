import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// importing Components
import VehicleFilters from "../components/vehicleRelated/VehicleFilters.js";
import VehiclesCardrousel from "../sections/VehiclesCardrousel.js";
import { VehicleSearchResult } from "../components/vehicleRelated/VehicleSearchResult.js";

export const Vehicles = () => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const cardrouselRef = useRef(null); 
  const [cardrouselHeight, setCardrouselHeight] = useState(0);

  useEffect(() => {
    if (cardrouselRef.current) {
      setCardrouselHeight(cardrouselRef.current.offsetHeight);
    }
  }, [selectedBrands, selectedModels, selectedTypes]); 
  const handleCardrouselLoad = () => {
    if (cardrouselRef.current) {
      setCardrouselHeight(cardrouselRef.current.offsetHeight);
    }
  };

  return (
    <main style={{height: `${cardrouselHeight * 1.5}px`}}>
      <VehicleSearchResult  />
      <div
        className="bg-dark p-2"
        style={{ height: "25px" }}
      ></div>

      <Row className="justify-content-center bg-dark">
        <VehicleFilters
          setSelectedBrands={setSelectedBrands}
          setSelectedModels={setSelectedModels}
          setSelectedTypes={setSelectedTypes}
          
        />
        <Col>
          <Container className="vehicle-cardrousel pb-5">
            <VehiclesCardrousel
             ref={cardrouselRef}
              selectedBrands={selectedBrands}
              selectedModels={selectedModels}
              selectedTypes={selectedTypes}
              onLoaded={handleCardrouselLoad}
            />
          </Container>
        </Col>
      </Row>
    </main>
  );
};

export default Vehicles;
