import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

import {
  fetchAllTestimonials,
  modifyTestimony,
  deleteTestimony,
  addNewTestimony,
} from "../../../serverRelated/ApiRequest";

export const TestimonialsManagement = () => {
  const [testimonials, setTestimonials] = useState([]);

  const getTestimonials = async () => {
    const data = await fetchAllTestimonials();
    setTestimonials(data);
  };
  useEffect(() => {
    getTestimonials();
  }, []);

  const handlePrepAddNewTestimony = () => {
    const existingEmptyTestimony = testimonials.some(
      (testimony) => testimony.id === "new"
    );

    if (!existingEmptyTestimony) {
      setTestimonials([
        {
          testimony_status: "pending",
          id: "new",
          name: "",
          testimony: "",
          note: "",
        },
        ...testimonials,
      ]);
    }
  };

  const toggleTestimonyStatus = (id) => {
    setTestimonials((prevTestimonials) =>
      prevTestimonials.map((testimony) => {
        if (testimony.id === id) {
          let newStatus = "";
          switch (testimony.testimony_status) {
            case "pending":
              newStatus = "displayed";
              break;
            case "displayed":
              newStatus = "hidden";
              break;
            case "hidden":
              newStatus = "displayed";
              break;
            default:
              newStatus = testimony.testimony_status;
          }
          return { ...testimony, testimony_status: newStatus };
        }
        return testimony;
      })
    );
  };

  const handleAddNewTestimony = async () => {
    const newTestimonyData = testimonials.find(
      (testimony) => testimony.id === "new"
    );

    if (newTestimonyData) {
      const addedTestimony = await addNewTestimony(newTestimonyData);
      setTestimonials((prevTestimonials) =>
        prevTestimonials.map((testimony) =>
          testimony.id === "new" ? addedTestimony : testimony
        )
      );
    }
  };

  const handleModifyTestimony = async (id) => {
    const testimonyToModify = testimonials.find(
      (testimony) => testimony.id === id
    );
    if (!testimonyToModify) return;

    try {
      const updatedTestimonial = await modifyTestimony(id, testimonyToModify);
      console.log(updatedTestimonial);

      getTestimonials();
    } catch (error) {
      console.error("Erreur lors de la modification du témoignage:", error);
    }
  };

  const handleDeleteTestimony = async (id) => {
    const userConfirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce témoignage ?"
    );

    if (userConfirmed) {
      await deleteTestimony(id);
      setTestimonials((prevTestimonials) =>
        prevTestimonials.filter((testimony) => testimony.id !== id)
      );
    }
  };

  const handleChange = (id, field, value) => {
    setTestimonials((prevTestimonials) =>
      prevTestimonials.map((testimony) => {
        if (testimony.id === id || (id === "new" && testimony.id === "new")) {
          return { ...testimony, [field]: value };
        }
        return testimony;
      })
    );
  };

  return (
    <Container>
      <div className="bg-dark align-content-center">
        <h1 className="text-light">TestimonialsManagement</h1>
        <div className="bg-dark d-flex justify-content-center">
          <Button
            className="mb-5 mx-auto"
            onClick={handlePrepAddNewTestimony}
          >
            Ajouter un nouveau témoignage
          </Button>

          <p className="text-light">Liens à envoyer aux utilisateurs pour laisse un avis</p>
          <p>http://localhost:3000/leaveTestimony</p>
        </div>
      </div>
      <Table
        striped
        bordered
        hover
      >
        <thead>
          <tr>
            <th>Etat</th>
            <th>Nom</th>
            <th>Note</th>
            <th>Témoignage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((testimony, index) => (
            <tr key={testimony.id || index}>
              <td>
                <Button onClick={() => toggleTestimonyStatus(testimony.id)}>
                  {testimony.testimony_status}
                </Button>
              </td>
              <td>
                <Form.Control
                  value={testimony.name}
                  type="text"
                  onChange={(e) =>
                    handleChange(testimony.id, "name", e.target.value)
                  }
                />
              </td>
              <td>
                <Form.Control
                  value={testimony.note}
                  type="number"
                  step={0.5}
                  onChange={(e) =>
                    handleChange(testimony.id, "note", e.target.value)
                  }
                />
              </td>

              <td>
                <Form.Control
                  value={testimony.testimony}
                  as="textarea"
                  rows={3}
                  onChange={(e) =>
                    handleChange(testimony.id, "testimony", e.target.value)
                  }
                />
              </td>
              <td className="">
                {testimony.id && testimony.id !== "new" ? (
                  <>
                    <Button onClick={() => handleModifyTestimony(testimony.id)}>
                      Appliquer les modifications
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteTestimony(testimony.id)}
                    >
                      Supprimer
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="success"
                    onClick={handleAddNewTestimony}
                  >
                    Créer nouveau témoignage
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TestimonialsManagement;
