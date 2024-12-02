import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Helmet } from "react-helmet";
import AdminManagement from "../components/admin/management/AdminManagement";
import VehicleManagement from "../components/admin/management/VehicleManagement";
import VehicleRelatedManagement from "../components/admin/management/VehicleRelatedManagement";
import RequestManagement from "../components/admin/management/RequestManagement";
import TestimonyManagement from "../components/admin/management/TestimonialsManagement";
import ServiceManagement from "../components/admin/management/ServiceManagement"
import GarageManagement from "../components/admin/management/GarageManagement"
import ScheduleManagementLogic from "../components/admin/management/ScheduleManagementLogic"

export const Admin = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleOpenComponent = (component) => {
    setActiveComponent(component);
  };

  return (
    <>
      <Helmet>
        <title>Administration</title>
        <meta
          name="description"
          content="Administration du site"
        />
        <meta charSet="utf-8" />
        <meta
          name="keywords"
          content="garage, voiture"
        />
      </Helmet>

    <div className="bg-dark pt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} lg={4}>
          <Button onClick={() => handleOpenComponent("AdminManagement")} className="mb-2 w-100">
            Gérer les comptes admins
          </Button>
          <Button onClick={() => handleOpenComponent("VehicleManagement")} className="mb-2 w-100">
          Gérer les véhicules
          </Button>
          <Button onClick={() => handleOpenComponent("VehicleRelatedManagement")} className="mb-2 w-100">
          Gérer les données des véhicules
          </Button>
          <Button onClick={() => handleOpenComponent("RequestManagement")} className="mb-2 w-100">
          Gérer les demandes
          </Button>
          <Button onClick={() => handleOpenComponent("TestimonyManagement")} className="mb-2 w-100">
          Gérer les commentaires
          </Button>
          <Button onClick={() => handleOpenComponent("ServiceManagement")} className="mb-2 w-100">
          Gérer les services
          </Button>
          <Button onClick={() => handleOpenComponent("GarageManagement")} className="mb-2 w-100">
          Gérer les informations du garage
          </Button>
          <Button onClick={() => handleOpenComponent("ScheduleManagementLogic")} className="mb-2 w-100">
          Gérer les horaires
          </Button>

        </Col>
      </Row>

      {activeComponent === "AdminManagement" && <AdminManagement />} 
      {activeComponent === "VehicleManagement" && <VehicleManagement />}
      {activeComponent === "VehicleRelatedManagement" && <VehicleRelatedManagement />}
      {activeComponent === "RequestManagement" && <RequestManagement />}
      {activeComponent === "TestimonyManagement" && <TestimonyManagement />}
      {activeComponent === "ServiceManagement" && <ServiceManagement />}
      {activeComponent === "GarageManagement" && <GarageManagement />}
      {activeComponent === "ScheduleManagementLogic" && <ScheduleManagementLogic />}
    </div>
    </>
  );
};
