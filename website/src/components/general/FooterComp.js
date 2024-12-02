import React, { useState, useEffect } from "react";
import { NavLink, Col } from "react-bootstrap";
import { AdminConnexionPanel } from "../admin/AdminConnexionPanel";
import { fetchGarage } from '../../serverRelated/ApiRequest';
import { ReactComponent as Logo } from "../../visuals/brand/LOGO_FULL_LIGHT.svg";
import FooterSchedule from "./FooterSchedule";

export const FooterComp = () => {
  const [garage, setGarage] = useState({});
  const [showConnexionModal, setShowConnexionModal] = useState(false);

  useEffect(() => {
    const handleGetGarageData = async () => {
      try {
        const data = await fetchGarage();
        setGarage(data);
      } catch (error) {
        console.error("Error fetching garage data:", error);
      }
    };

    handleGetGarageData();
  }, []);

  const handleOpenConnexionModal = () => setShowConnexionModal(true);
  const handleCloseConnexionModal = () => setShowConnexionModal(false);

  return (
    <div className="text-center text-light p-3 mt-5"> 
    <Logo className="home-logo mb-5 mt-5" />
    <FooterSchedule 
  />

      <span className="adress-p mt-1">
      <p className="mb-1">{garage.address}</p>
      <p className="mb-1">{garage.city}</p>
      <p className="mb-5">{garage.zip_code}</p>
      </span>
      <p><a className="footer-contact" href={`tel:${garage.telephone}`}>{garage.telephone}</a></p>
      <p><a className="footer-contact" href={`mailto:${garage.email}`}>{garage.email}</a></p>
      <NavLink onClick={handleOpenConnexionModal}>Connexion</NavLink>
      <AdminConnexionPanel
        show={showConnexionModal}
        onHide={handleCloseConnexionModal}
      />
    </div>
  );
};
