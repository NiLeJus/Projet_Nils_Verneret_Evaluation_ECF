import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import {
  fetchServices,
  modifyService,
  deleteService,
  addNewService,
} from "../../../serverRelated/ApiRequest";
import { Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";

export const ServiceManagement = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const getServices = async () => {
      const data = await fetchServices();
      setServices(data);
    };
    getServices();
  }, []);

  const handlePrepAddNewService = () => {
    const existingEmptyService = services.some(
      (service) => service.id === "new"
    );

    if (!existingEmptyService) {
      setServices([
        { id: "new", name: "", description: "", min_price: "" },
        ...services,
      ]);
    }
  };

  const handleAddNewService = async () => {
    const newServiceData = services.find((service) => service.id === "new");
    console.log(newServiceData);
    if (newServiceData) {
      const addedService = await addNewService(newServiceData);
      setServices(
        services.map((service) =>
          service.id === "new" ? addedService : service
        )
      );
    }
  };

  const handleModifyService = async (id) => {
    const serviceToModify = services.find((service) => service.id === id);
    if (serviceToModify) {
      const updatedService = await modifyService(id, serviceToModify);
      setServices(
        services.map((service) =>
          service.id === id ? updatedService : service
        )
      );
    }
  };

  const handleDeleteService = async (id) => {
    const userConfirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce service ?"
    );

    if (userConfirmed) {
      await deleteService(id);
      setServices(services.filter((service) => service.id !== id));
    }
  };

  const handleChange = (id, field, value) => {
    setServices(
      services.map((service) => {
        if (service.id === id || (id === "new" && service.id === "new")) {
          return { ...service, [field]: value };
        }
        return service;
      })
    );
  };

  return (
    <>
      <Container style={{minHeight: "100vh"}}>
        <div className="bg-dark align-content-center">
          <h1 className="text-light">ServiceManagement</h1>

          <div className="bg-dark d-flex justify-content-center">
            <Button
              className="mb-5 mx-auto"
              onClick={handlePrepAddNewService}
            >
              Ajouter un nouveau service
            </Button>
          </div>
        </div>
        <Table
          striped
          bordered
          hover
        >
          <thead>
            <tr>
              <th>Nom</th>
              <th>Description</th>
              <th>Prix minimum</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={service.id || index}>
                <td>
                  <Form.Control
                    value={service.name}
                    type="text"
                    onChange={(e) =>
                      handleChange(service.id, "name", e.target.value)
                    }
                  />
                </td>
                <td>
                  <Form.Control
                    value={service.description}
                    type="text"
                    onChange={(e) =>
                      handleChange(service.id, "description", e.target.value)
                    }
                  />
                </td>
                <td>
                  <Form.Control
                    value={service.min_price}
                    type="number"
                    min="0"
                    onChange={(e) =>
                      handleChange(service.id, "min_price", e.target.value)
                    }
                  />
                </td>
                <td className="d-flex justify-content-around">
                  {service.id && service.id !== "new" ? (
                    <>
                      <Button onClick={() => handleModifyService(service.id)}>
                        Appliquer les modifications
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        Supprimer
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="success"
                      onClick={handleAddNewService}
                    >
                      Créer nouveau service
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default ServiceManagement;
