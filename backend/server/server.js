const express = require('express');
const cors = require('cors');
const app = express();
const port = 5001;
const path = require('path');


app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());


//Routes
const adminsRoutes = require('./routes/admins');
const servicesRoutes = require('./routes/services');
const vehicleModelsRoutes = require('./routes/vehicleModels');
const brandsRoutes = require('./routes/brands');
const vehicleTypesRoutes = require('./routes/vehicleTypes');
const vehicleConditionsRoutes = require('./routes/vehicleConditions');
const optionsRoutes = require('./routes/options');
const fuelTypesRoutes = require('./routes/fuelTypes');
const transmissionsRoutes = require('./routes/transmissions');
const colorsRoutes = require('./routes/colors');
const photosRoutes = require('./routes/photos');
const requestsRoutes = require('./routes/requests');
const vehiclesRoutes = require('./routes/vehicles');
const testimonialsRoutes = require('./routes/testimonials');
const garagesRoutes = require('./routes/garages');


app.use('/api/admins', adminsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/vehicleModels', vehicleModelsRoutes);
app.use('/api/brands', brandsRoutes);
app.use('/api/vehicleTypes', vehicleTypesRoutes);
app.use('/api/vehicleConditions', vehicleConditionsRoutes);
app.use('/api/options', optionsRoutes);
app.use('/api/fuelTypes', fuelTypesRoutes);
app.use('/api/transmissions', transmissionsRoutes);
app.use('/api/colors', colorsRoutes);
app.use('/api/photos', photosRoutes);
app.use('/api/vehicles', vehiclesRoutes);
app.use('/api/requests', requestsRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/garages', garagesRoutes);

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
