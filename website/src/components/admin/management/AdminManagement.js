import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import {
  fetchAdmins,
  modifyAdmin,
  deleteAdmin,
  addNewAdmin,
} from "../../../serverRelated/ApiRequest";

export const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);

  const getAdminsData = async () => {
    try {
      const data = await fetchAdmins();
      setAdmins(data);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  useEffect(() => {
    getAdminsData();
  }, []);

  const handlePrepAddNewAdmin = () => {
    if (!admins.some((admin) => admin.id === "new")) {
      setAdmins([{ id: "new", name: "", email: "", password: "" }, ...admins]);
    }
  };

  const handleAddNewAdmin = async () => {
    const password = window.prompt(
      "Entrez le mot de passe pour le nouvel administrateur:"
    );
    if (!password) return;

    // Trouver les données du nouvel admin
    const newAdmin = admins.find((admin) => admin.id === "new");
    if (!newAdmin) return;

    const newAdminData = {
      name: newAdmin.name,
      email: newAdmin.email,
      password: password,
    };

    try {
      const addedAdmin = await addNewAdmin(newAdminData);
      setAdmins([addedAdmin, ...admins.filter((admin) => admin.id !== "new")]);
      getAdminsData(); // Recharger les admins après l'ajout
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'administrateur:", error);
    }
  };

  const handleModifyAdmin = async (id) => {
    const adminToModify = admins.find((admin) => admin.id === id);
    if (!adminToModify) return;

    console.log("Avant la modification:", adminToModify);

    try {
      const updatedAdmin = await modifyAdmin(id, adminToModify);
      console.log("Après la modification:", updatedAdmin);

      getAdminsData();
    } catch (error) {
      console.error(
        "Erreur lors de la modification de l'administrateur:",
        error
      );
    }
  };

  const handleDeleteAdmin = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet admin ?"))
      return;

    try {
      await deleteAdmin(id);
      setAdmins(admins.filter((admin) => admin.id !== id));
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de l'administrateur:",
        error
      );
    }
  };

  const handleChange = (id, field, value) => {
    setAdmins(
      admins.map((admin) =>
        admin.id === id ? { ...admin, [field]: value } : admin
      )
    );
  };

  const handleChangePassword = (id) => {
    // Demander à l'utilisateur de saisir un nouveau mot de passe
    const newPassword = window.prompt("Entrez le nouveau mot de passe:");

    // Vérifier si l'utilisateur a cliqué sur "Annuler" ou a laissé le champ vide
    if (newPassword === null || newPassword.trim() === "") {
      console.log("Saisie du nouveau mot de passe annulée.");
      return;
    }

    // Mettre à jour le mot de passe de l'administrateur avec le nouveau mot de passe
    const adminToUpdate = admins.find((admin) => admin.id === id);
    if (adminToUpdate) {
      adminToUpdate.password = newPassword;
    }
  };

  return (
    <>
    <Container>
      <div className="bg-dark align-content-center">
        <h1 className="text-light">Gérer les admins</h1>
        <div className="bg-dark d-flex justify-content-center">
          <Button
            className="mb-5 mx-auto"
            onClick={handlePrepAddNewAdmin}
          >
            Ajouter un nouvel Admin
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
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, index) => (
            <tr key={admin.id || index}>
              <td>
                <Form.Control
                  value={admin.name}
                  type="text"
                  onChange={(e) =>
                    handleChange(admin.id, "name", e.target.value)
                  }
                />
              </td>
              <td>
                <Form.Control
                  value={admin.email}
                  type="text"
                  onChange={(e) =>
                    handleChange(admin.id, "email", e.target.value)
                  }
                />
              </td>
              <td className="d-flex justify-content-around">
                {admin.id && admin.id !== "new" ? (
                  <>
                    <Button onClick={() => handleModifyAdmin(admin.id)}>
                      Appliquer les modifications
                    </Button>
                    <Button onClick={() => handleChangePassword(admin.id)}>
                      Modifier le mot de passe
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteAdmin(admin.id)}
                    >
                      Supprimer
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="success"
                    onClick={handleAddNewAdmin}
                  >
                    Créer nouveau Admin
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

export default AdminManagement;
