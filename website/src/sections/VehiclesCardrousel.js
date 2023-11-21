import React, { useState, useEffect, forwardRef } from 'react';
import VehicleCard from '../components/vehicleRelated/VehicleCard';
import { Container, Row } from 'react-bootstrap';
import { fetchVehicles } from '../serverRelated/ApiRequest';

export const VehiclesCardrousel = forwardRef(({ selectedBrands, selectedModels, selectedTypes, onLoaded }, ref) => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const initVehicles = async () => {
      try {
        const fetchedVehicles = await fetchVehicles();
        setVehicles(fetchedVehicles);
        onLoaded();
      } catch (error) {
        console.error('Erreur lors de l\'initialisation des véhicules:', error);
      }
    };
    initVehicles();
  }, [onLoaded]); 
  // Fonction de filtrage
  const filterVehicles = () => {
    return vehicles.filter(vehicle => 
      (selectedBrands.length === 0 || selectedBrands.includes(vehicle.VehicleModel.Brand.name)) &&
      (selectedModels.length === 0 || selectedModels.includes(vehicle.VehicleModel.name)) &&
      (selectedTypes.length === 0 || selectedTypes.includes(vehicle.VehicleType.name))
    );
  };

  return (
    <Row className='d-flex justify-content-center' ref={ref}>
      {filterVehicles().map((vehicle, index) => (
        <VehicleCard
          vehicleId={vehicle.id}
          key={index}
          brand={vehicle.VehicleModel.Brand.name}
          vehicleModel={vehicle.VehicleModel.name}
          productionYear={vehicle.production_year}
          mileage={vehicle.mileage}
          fuelType={vehicle.FuelType.name}
          transmission={vehicle.Transmission.name}
          vehicleCondition={vehicle.VehicleCondition.name}
          price={vehicle.price}
          photo={vehicle.Photos[0]?.url || 'chemin_vers_image_par_defaut.jpg'} // Gestion des photos absentes
          options={vehicle.Options.map(option => option.name + ' - ' + option.description)}
        />
      ))}
    </Row>
    
  );
}
);

export default VehiclesCardrousel;
