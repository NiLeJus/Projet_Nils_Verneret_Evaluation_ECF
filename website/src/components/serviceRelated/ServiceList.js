import React, { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard'; // Ce composant doit être celui que vous avez défini ailleurs
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap est importé
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const ServiceList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchServices() {
      const response = await fetch('http://localhost:5001/api/services');
      const data = await response.json();
      setServices(data);
    }

    fetchServices();
  }, []);

  return (
    <Container>
      <Row>
        {services.map((service) => (
          <Col key={service.id} lg={3} md={6} sm={12} className="mb-4">
            <ServiceCard service={service} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ServiceList;

