import { capitalizeFirstLetter } from "../../functions/capitalizeFirstLetter";
import React, { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import Select from "react-select";
import { Form } from "react-bootstrap";
import CreatableSelect from 'react-select/creatable';
import { fetchBrands } from "../../serverRelated/ApiRequest";

const AddBrandModal = ({ show, onHide }) => {

let initialBrands = [
    // { value: "id", label: "Brand name" },
   ];


   const [selectedBrand, setSelectedBrand] = useState(null);
   const [brands, setBrands] = useState(initialBrands); // Utilisez le nom renommé ici
 
   const handleFetchBrands = async () => {
    try {
      const data = await fetchBrands();
      const transformedBrands = data.map(brand => ({
        value: brand.id.toString(),
        label: capitalizeFirstLetter(brand.name),
      }));
      setBrands(transformedBrands); 
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    handleFetchBrands();
  }, []);
   
   const handleAddBrand = async () => {
    if (selectedBrand) {
      // Vérifiez si la marque sélectionnée existe déjà (si elle a un 'value') ou si c'est une nouvelle marque
      const isNewBrand = !selectedBrand.value;
      const brandName = isNewBrand ? selectedBrand.label : selectedBrand.label; // Utilisez 'label' pour la nouvelle marque
  
      try {
        const response = await fetch("http://localhost:5001/api/brands", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: brandName }),
        });
  
        if (response.ok) {
          const newBrand = await response.json();
          setBrands(prevBrands => [...prevBrands, { value: newBrand.id, label: capitalizeFirstLetter(newBrand.name) }]);
            setSelectedBrand(null); // Réinitialiser la marque sélectionnée
            alert("Marque ajoutée avec succès");
            fetchBrands();
            
        } else {
          // Gérer les erreurs de réponse
          console.error("Erreur lors de l'ajout de la marque");
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi de la requête", error);
      }
    }
  };

  const handleModifyBrand = async () => {
    if (selectedBrand && selectedBrand.value) {
      const newBrandName = prompt("Entrez le nouveau nom de la marque:", selectedBrand.label);
  
      if (newBrandName) {
        try {
          const response = await fetch(`http://localhost:5001/api/brands/${selectedBrand.value}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newBrandName }),
          });
  
          if (response.ok) {
            // Mise à jour de l'état des marques
            setBrands(prevBrands =>
              prevBrands.map(brand =>
                brand.value === selectedBrand.value
                  ? { ...brand, label: capitalizeFirstLetter(newBrandName) }
                  : brand
              )
            );
            setSelectedBrand(null); // Réinitialiser la marque sélectionnée
            alert("Marque modifiée avec succès");
            fetchBrands();
          } else {
            // Gérer les erreurs de réponse
            alert("Erreur lors de la modification de la marque");
          }
        } catch (error) {
          console.error("Erreur lors de l'envoi de la requête", error);
          alert("Erreur lors de la modification de la marque");
        }
      }
    } else {
      alert("Veuillez sélectionner une marque à modifier");
    }
  };
  
  const handleDeleteBrand = async (brandId) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette marque ?");
    if (confirmDelete) {
    try {
      const response = await fetch(`http://localhost:5001/api/brands/${brandId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        const data = await response.json();
        if (data.models) {
          // Affichez une alerte avec les modèles associés
          alert(`Impossible de supprimer la marque : ${data.message}\nModèles associés: ${data.models.join(', ')}`);
        } else {
          // Gérer d'autres erreurs
          alert('Erreur lors de la suppression de la marque');
        }
      } else {
        alert("Marque supprimée avec succès");
        setSelectedBrand(null); // Réinitialiser la marque sélectionnée
        fetchBrands();

      }
    } catch (error) {
      console.error('Erreur lors de la suppression', error);
    }
  }};
  
  


  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Marque</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Label>
        <h3 className="key-info-title">Marque :</h3>
      </Form.Label>
      <CreatableSelect isClearable is isSearchable onChange={setSelectedBrand}
        options={brands} />
  
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleAddBrand}>Ajouter</Button>
        <Button variant="orange" onClick={handleModifyBrand}>Modifier</Button>
        <Button variant="danger" onClick={() => handleDeleteBrand(selectedBrand?.value)}>Supprimer</Button>
        <Button variant="secondary" onClick={onHide}> Fermer </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddBrandModal;