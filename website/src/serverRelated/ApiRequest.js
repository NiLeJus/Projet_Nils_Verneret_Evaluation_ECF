export const serverUrl = "http://localhost:5001/";

//Brand
const fetchBrands = async () => {
  try {
    const response = await fetch(serverUrl + "api/brands");
    if (!response.ok) throw new Error("Erreur réseau");
    return response.json();
  } catch (error) {
    console.error("Error fetching Brands:", error);
    throw error;
  }
};

//Options
const fetchOptions = async () => {
  try {
    const response = await fetch(serverUrl + "api/options");
    if (!response.ok) throw new Error("Erreur réseau");
    return response.json();
  } catch (error) {
    console.error("Error fetching Options:", error);
    throw error;
  }
};

//vehicle models
const fetchVehicleModels = async () => {
  try {
    const response = await fetch(serverUrl + "api/vehicleModels");
    if (!response.ok) throw new Error("Erreur réseau");
    return response.json();
  } catch (error) {
    console.error("Error fetching VehicleModels:", error);
    throw error;
  }
};

const fetchVehicleModelData = async (model_id) => {
  try {
    const response = await fetch(
      serverUrl + "api/vehicleModels/" + { model_id }
    );
    if (!response.ok) throw new Error("Erreur réseau");

    return response.json();
  } catch (error) {
    console.error("Error fetching Model Data:", error);
    throw error;
  }
};

const fetchVehicleModelsByBrand = async (brand_id) => {
  console.log()
  try {
    const response = await fetch(
      serverUrl + "api/vehicleModels/byBrand/" +  brand_id
    );
    if (!response.ok) throw new Error("Erreur réseau");

    return response.json();
  } catch (error) {
    console.error("Error fetching Model Data:", error);
    throw error;
  }
}

//Vehicle types
const fetchVehicleTypes = async () => {
  try {
    const response = await fetch(serverUrl + "api/vehicleTypes");
    return response.json();
  } catch (error) {
    console.error("Error fetching vehicleTypes:", error);
    throw error;
  }
};

//Customer request
const fetchCustomerRequest = async () => {
  try {
    const response = await fetch(serverUrl + "api/requests");
    if (!response.ok) throw new Error("Erreur réseau");
    return response.json();
  } catch (error) {
    console.error("Error fetching customerRequest:", error);
    throw error;
  }
};

const modifyCustomerRequest = async (requestId, updatedData) => {
  try {
    const response = await fetch(`${serverUrl}api/requests/${requestId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok)
      throw new Error("Erreur réseau lors de la modification de la demande");
    return response.json();
  } catch (error) {
    console.error("Error modifying customerRequest:", error);
    throw error;
  }
};

const deleteCustomerRequest = async (requestId) => {
  try {
    const response = await fetch(`${serverUrl}api/requests/${requestId}`, {
      method: "DELETE",
    });
    if (!response.ok)
      throw new Error("Erreur réseau lors de la suppression de la demande");
    return response;
  } catch (error) {
    console.error("Error deleting customerRequest:", error);
    throw error;
  }
};

//Photos

const deletePhotos = async (vehicleId) => {
  try {
    const response = await fetch(`${serverUrl}api/photos/${vehicleId}`, {
      method: "DELETE",
    });
    if (!response.ok)
      throw new Error("Erreur réseau lors de la suppression des photos");
    return response;
  } catch (error) {
    console.error("Error deleting photos:", error);
    throw error;
  }
};

//Vehicles
const fetchVehicles = async () => {
  try {
    const response = await fetch("/api/vehicles/all");
    if (!response.ok) throw new Error("Erreur réseau");
    return response.json();
  } catch (error) {
    console.error("Error fetching vehicle:", error);
  }
};

const deleteVehicle = async (vehicleId) => {
  try {
    const response = await fetch(`${serverUrl}api/vehicles/${vehicleId}`, {
      method: "DELETE",
    });
    if (!response.ok)
      throw new Error("Erreur réseau lors de la suppression du véhicule");
    return response;
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    throw error;
  }
};

const addNewVehicle = async (vehicleData) => {
  console.log(vehicleData);
  try {
    // Création de l'objet de données à envoyer
    const dataToSend = {
      vehicle_model_id: vehicleData.Vehicle.VehicleModel.id,
      color_id: vehicleData.Vehicle.Color.id,
      vehicle_type_id: 1,
      paint_type: vehicleData.Vehicle.paint_type,
      production_year: vehicleData.Vehicle.production_year,
      mileage: vehicleData.Vehicle.mileage,
      vehicle_condition_id: vehicleData.Vehicle.vehicle_condition_id,
      price: vehicleData.Vehicle.price,
      vehicle_comment: vehicleData.Vehicle.vehicle_comment,
      fuel_type_id: vehicleData.Vehicle.fuel_type_id,
      transmission_id: vehicleData.Vehicle.transmission_id,
      tax_horsepower: vehicleData.Vehicle.tax_horsepower,
      at_garage_id: 1,
    };
    console.log(dataToSend);

    const response = await fetch(serverUrl + "api/vehicles/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      throw new Error("Erreur réseau lors de l'ajout d'un nouveau véhicule");
    }

    const responseData = await response.json();
    console.log("réponse de la requête : ", responseData);
    return responseData;
  } catch (error) {
    console.error("Error adding new vehicle:", error);
    throw error;
  }
};

//Colors

const fetchColors = async () => {
  try {
    const response = await fetch(serverUrl + "api/colors");
    if (!response.ok) throw new Error("Erreur réseau");
    return response.json();
  } catch (error) {
    console.error("Error fetching colors:", error);
    throw error;
  }
};

//Admins
const fetchAdmins = async () => {
  try {
    const response = await fetch(`${serverUrl}api/admins`);
    if (!response.ok) throw new Error("Erreur réseau");
    return response.json();
  } catch (error) {
    console.error("Error fetching admins:", error);
  }
};

const deleteAdmin = async (adminId) => {
  try {
    const response = await fetch(`${serverUrl}api/admins/${adminId}`, {
      method: "DELETE",
    });
    if (!response.ok)
      throw new Error(
        "Erreur réseau lors de la suppression de l'administrateur"
      );
    return response;
  } catch (error) {
    console.error("Error deleting admin:", error);
    throw error;
  }
};

const modifyAdmin = async (adminId, updatedData) => {
  try {
    const response = await fetch(`${serverUrl}api/admins/${adminId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok)
      throw new Error(
        "Erreur réseau lors de la modification de l'administrateur"
      );
    return response.json();
  } catch (error) {
    console.error("Error modifying admin:", error);
    throw error;
  }
};

const addNewAdmin = async (newAdminData) => {
  console.log(newAdminData);
  try {
    const response = await fetch(`${serverUrl}api/admins/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAdminData),
    });
    if (!response.ok) {
      throw new Error("Erreur réseau lors de l'ajout de l'administrateur");
    }
    return response.json();
  } catch (error) {
    console.error("Error adding new admin:", error);
    throw error;
  }
};

//Fuels

const fetchFuelTypes = async () => {
  try {
    const response = await fetch(serverUrl + "api/fuelTypes");
    if (!response.ok) throw new Error("Erreur réseau");
    return response.json();
  } catch (error) {
    console.error("Error fetching fuels:", error);
  }
};

//Services

const fetchServices = async () => {
  try {
    const response = await fetch(serverUrl + "api/services");
    if (!response.ok) throw new Error("Erreur réseau");
    return response.json();
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

const deleteService = async (serviceId) => {
  try {
    const response = await fetch(`${serverUrl}api/services/${serviceId}`, {
      method: "DELETE",
    });
    if (!response.ok)
      throw new Error("Erreur réseau lors de la suppression du service");
    return response;
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};

const modifyService = async (serviceId, updatedData) => {
  try {
    const response = await fetch(`${serverUrl}api/services/${serviceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok)
      throw new Error("Erreur réseau lors de la modification du service");
    return response.json();
  } catch (error) {
    console.error("Error modifying service:", error);
    throw error;
  }
};

const addNewService = async (newServiceData) => {
  try {
    const response = await fetch(`${serverUrl}api/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newServiceData),
    });
    if (!response.ok) {
      throw new Error("Erreur réseau lors de l'ajout du service");
    }
    return response.json();
  } catch (error) {
    console.error("Error adding new service:", error);
    throw error;
  }
};

// Testimonials

const fetchAllTestimonials = async () => {
  try {
    const response = await fetch(serverUrl + "api/testimonials/all");
    if (!response.ok) throw new Error("Erreur réseau");
    return response.json();
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw error;
  }
};

const fetchDisplayedTestimonials = async () => {
  try {
    const response = await fetch(serverUrl + "api/testimonials/displayed");
    if (!response.ok) throw new Error("Erreur réseau");
    return response.json();
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw error;
  }
};

const deleteTestimony = async (testimonyId) => {
  console.log(testimonyId);
  try {
    const response = await fetch(
      `${serverUrl}api/testimonials/${testimonyId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok)
      throw new Error("Erreur réseau lors de la suppression du témoignage");
    return response;
  } catch (error) {
    console.error("Error deleting testimony:", error);
    throw error;
  }
};

const modifyTestimony = async (testimonyId, updatedData) => {
  try {
    console.log(updatedData);
    const response = await fetch(
      `${serverUrl}api/testimonials/${testimonyId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );
    if (!response.ok)
      throw new Error("Erreur réseau lors de la modification du témoignage");
    return response.json();
  } catch (error) {
    console.error("Error modifying testimonial:", error);
    throw error;
  }
};

const addNewTestimony = async (newTestimonyData) => {
  console.log(newTestimonyData);
  try {
    const response = await fetch(`${serverUrl}api/testimonials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTestimonyData),
    });
    if (!response.ok) {
      throw new Error("Erreur réseau lors de l'ajout du témoignage");
    }
    return response.json();
  } catch (error) {
    console.error("Error adding new testimony:", error);
    throw error;
  }
};

// Fetch details of the garage with ID 1
const fetchGarage = async () => {
  try {
    const response = await fetch(`${serverUrl}api/garages/1`);
    if (!response.ok)
      throw new Error(
        "Erreur réseau lors de la récupération des informations du garage"
      );
    return response.json();
  } catch (error) {
    console.error("Error fetching garage:", error);
    throw error;
  }
};

// Modify details of the garage with ID 1
const modifyGarage = async (updatedData) => {
  try {
    const response = await fetch(`${serverUrl}api/garages/1`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok)
      throw new Error(
        "Erreur réseau lors de la modification des informations du garage"
      );
    return response.json();
  } catch (error) {
    console.error("Error modifying garage:", error);
    throw error;
  }
};

//Transmissions

const fetchTransmissions = async () => {
  try {
    const response = await fetch(serverUrl + "api/transmissions");
    if (!response.ok) throw new Error("Erreur réseau");
    return response.json();
  } catch (error) {
    console.error("Error fetching transmissions:", error);
    throw error;
  }
};

//Conditions

const fetchVehicleConditions = async () => {
  try {
    const response = await fetch(serverUrl + "api/vehicleConditions");
    if (!response.ok) throw new Error("Erreur réseau");
    return response.json();
  } catch (error) {
    console.error("Error fetching conditions:", error);
    throw error;
  }
};

//Admins

// Exporting functions
export {
  addNewVehicle,
  fetchBrands,
  fetchVehicleModels,
  fetchVehicleModelData,
  fetchVehicleModelsByBrand,
  fetchVehicleTypes,
  deletePhotos,
  fetchVehicles,
  addNewAdmin,
  fetchAdmins,
  deleteAdmin,
  modifyAdmin,
  fetchServices,
  addNewService,
  deleteService,
  modifyService,
  fetchCustomerRequest,
  modifyCustomerRequest,
  deleteCustomerRequest,
  deleteVehicle,
  fetchAllTestimonials,
  fetchDisplayedTestimonials,
  deleteTestimony,
  modifyTestimony,
  addNewTestimony,
  fetchGarage,
  modifyGarage,
  fetchFuelTypes,
  fetchColors,
  fetchOptions,
  fetchTransmissions,
  fetchVehicleConditions
};
