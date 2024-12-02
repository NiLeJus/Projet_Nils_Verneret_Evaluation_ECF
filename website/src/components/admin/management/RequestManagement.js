import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {
  fetchCustomerRequest,
  modifyCustomerRequest,
  deleteCustomerRequest,
} from "../../../serverRelated/ApiRequest";
import { formatDateToDmy } from "../../../functions/formatDateToDmy";

export const RequestManagement = () => {
  const [requests, setRequests] = useState([]);

  const getCustomerRequests = async () => {
    try {
      const data = await fetchCustomerRequest();
      // Trier les données
      const sortedData = data.sort((a, b) => {
        // Trier par statut (en attente en premier)
        if (!a.is_processed && b.is_processed) return -1;
        if (a.is_processed && !b.is_processed) return 1;

        return new Date(b.received_at) - new Date(a.received_at);
      });
      setRequests(sortedData);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des demandes client:",
        error
      );
    }
  };

  useEffect(() => {
    getCustomerRequests();
  }, []);

  const handleProcessRequest = async (requestId) => {
    try {
      await modifyCustomerRequest(requestId, { is_processed: true });
      getCustomerRequests(); // Recharger les demandes après la mise à jour
    } catch (error) {
      console.error("Erreur lors du traitement de la demande:", error);
    }
  };

  const handleDeleteRequest = async (requestId) => {
    try {
      const response = await deleteCustomerRequest(requestId);
      if (response.status === 204)
        setRequests(currentRequests => currentRequests.filter(request => request.id !== requestId));
      } catch (error) {
      console.error("Erreur lors de la suppression de la demande:", error);
    }
  };
  
  const handleViewDetails = (vehicleId) => {
    window.open(`/vehicleDetails/${vehicleId}`, "_blank");
  };

  return (
    <>
    <Container>

    <div className="bg-dark align-content-center">
        <h1 className="text-light">Gérer les demandes</h1>
      </div>
        <Table
          striped
          bordered
          hover
        >
          <thead>
            <tr>
              <th>Reçu le</th>
              <th>Statut</th>
              <th>Request ref</th>
              <th>Nom du client</th>
              <th>Vehicle ref</th>
              <th>Message</th>
              <th>Numéro de téléphone</th>
              <th>Email</th>
              <th>Préférence</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={index}>
                <td>{formatDateToDmy(request.received_at)}</td>
                <td>{request.is_processed ? "Traitée" : "En attente"}</td>
                <td>{request.id}</td>
                <td>{request.requester_name}</td>
                <td>
                  <Button onClick={() => handleViewDetails(request.vehicle_id)}>
                    Voir
                  </Button>
                </td>
                <td>{request.message}</td>
                <td>
                  <a href={`phoneto:${request.phone}`}>{request.phone}</a>
                </td>
                <td>
                  <a href={`mailto:${request.email}`}>{request.email}</a>
                </td>

                <td>{request.prefer_phone ? "Téléphone" : "Email"}</td>
                <td>
                  <Button onClick={() => handleProcessRequest(request.id)}>
                    Traiter
                  </Button>
                  <Button onClick={() => handleDeleteRequest(request.id)}>
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default RequestManagement;
