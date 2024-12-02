import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

function ResponsiveContainer() {
  const [containerStyle, setContainerStyle] = useState({
    position: "relative",
    width: "69%", // Valeur par défaut pour les petits écrans
    height: "2000px",
  });

  useEffect(() => {
    // Fonction pour vérifier la largeur de l'écran et ajuster les styles
    const updateContainerStyle = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        // Pour les écrans md et plus larges
        setContainerStyle({
          position: "relative",
          width: "39%",
          height: "2000px",
        });
      } else {
        // Pour les écrans plus petits
        setContainerStyle({
          position: "relative",
          width: "69%",
          height: "2000px",
        });
      }
    };

    // Écouter les changements de taille de l'écran
    window.addEventListener("resize", updateContainerStyle);

    // Appliquer immédiatement après le montage
    updateContainerStyle();

    // Nettoyage de l'effet
    return () => window.removeEventListener("resize", updateContainerStyle);
  }, []);

  return (
    <Container style={containerStyle}>
        
    </Container>
  );
}

export default ResponsiveContainer;
