CREATE TABLE garages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(50) NOT NULL,
  zip_code VARCHAR(10) NOT NULL,
  telephone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL
);

CREATE TABLE admins (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(60) NOT NULL,
  is_master_user BOOLEAN NOT NULL DEFAULT FALSE,
  is_connected BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE services (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  min_price INT NOT NULL
);

CREATE TABLE testimonials (
  id INT PRIMARY KEY A UTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  posted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  testimony TEXT NOT NULL,
  testimony_status ENUM('pending', 'displayed', 'hidden') NOT NULL DEFAULT 'pending'
);

CREATE TABLE vehicle_types (
  id INT PRIMARY KEY AUTO_INCREMENT,
  vehicle_type_name VARCHAR(50) NOT NULL,
  description TEXT UNIQUE NOT NULL
);

CREATE TABLE vehicle_subtypes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  vehicle_subtype_name VARCHAR(50) UNIQUE NOT NULL,
  vehicle_type_id INT NOT NULL,
    CONSTRAINT fk_vehicle_type_id
    FOREIGN KEY (vehicle_type_id) 
    REFERENCES vehicle_types(id),
  description TEXT UNIQUE NOT NULL
);

CREATE TABLE brands (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE vehicle_models (
  id INT PRIMARY KEY AUTO_INCREMENT,
  brand_id INT NOT NULL,
    CONSTRAINT fk_brand_id 
    FOREIGN KEY (brand_id) 
    REFERENCES brands(id),
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  door_number TINYINT NOT NULL DEFAULT 5,
  wheel_number TINYINT NOT NULL DEFAULT 4,
  seat_number TINYINT NOT NULL
);

CREATE TABLE colors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) UNIQUE NOT NULL,
  hex VARCHAR(7) NOT NULL
);

CREATE TABLE vehicle_conditions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE fuel_types (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE transmissions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  transmission_type ENUM('automatic', 'manual') NOT NULL DEFAULT 'manual',
  speed_number TINYINT NOT NULL,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE options (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE vehicles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  vehicle_model_id INT NOT NULL,
    CONSTRAINT fk_vehicle_model_id 
    FOREIGN KEY (vehicle_model_id) 
    REFERENCES vehicle_models(id),
  color_id INT NOT NULL,
    CONSTRAINT fk_color_id 
    FOREIGN KEY (color_id) 
    REFERENCES colors(id),
  paint_type ENUM('glossy', 'matte', 'metallic') NOT NULL DEFAULT 'glossy',
  production_year YEAR NOT NULL,
  mileage MEDIUMINT NOT NULL,
  vehicle_condition_id INT NOT NULL,
    CONSTRAINT fk_vehicle_condition_id 
    FOREIGN KEY (vehicle_condition_id) 
    REFERENCES vehicle_conditions(id),
  price INT NOT NULL,
  vehicle_comment TEXT NOT NULL,
  fuel_type_id INT NOT NULL,
    CONSTRAINT fk_fuel_type_id 
    FOREIGN KEY (fuel_type_id) 
    REFERENCES fuel_types(id),
  transmission_id INT NOT NULL,
    CONSTRAINT fk_transmission_id 
    FOREIGN KEY (transmission_id) 
    REFERENCES transmissions(id),
  tax_horsepower TINYINT NOT NULL,
  clicked INT NOT NULL DEFAULT 0,
  vehicle_ad_status ENUM('displayed', 'hidden') NOT NULL DEFAULT 'hidden',
  vehicle_status ENUM('available', 'reserved', 'sold') NOT NULL DEFAULT 'available',
  at_garage_id INT NOT NULL,
    CONSTRAINT fk_at_garage_id FOREIGN KEY (at_garage_id) REFERENCES garages(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE requests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  gender ENUM('mister', 'madam', 'not_defined') NOT NULL DEFAULT 'not_defined',
  requester_name VARCHAR(100) NOT NULL,
  vehicle_id INT NOT NULL, 
    CONSTRAINT fk_vehicle_id 
    FOREIGN KEY (vehicle_id) 
    REFERENCES vehicles(id),
  message TEXT NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(250) NOT NULL,
  prefer_phone BOOLEAN NOT NULL DEFAULT FALSE,
  is_processed BOOLEAN NOT NULL DEFAULT FALSE,
  received_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  processed_at TIMESTAMP NULL

);

CREATE TABLE photos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  vehicle_id INT NOT NULL, 
    CONSTRAINT fk_vehicle_id_for_photo
    FOREIGN KEY (vehicle_id) 
    REFERENCES vehicles(id),
  url VARCHAR(2048) UNIQUE NOT NULL
);


ALTER TABLE photos DROP FOREIGN KEY fk_vehicle_id_for_photo;
ALTER TABLE photos ADD CONSTRAINT fk_vehicle_id_for_photo 
FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE;



CREATE TABLE rel_vehicle_options (
  PRIMARY KEY(vehicle_id, option_id),
  vehicle_id INT NOT NULL,  
    CONSTRAINT fk_vehicle_option_vehicle_id 
    FOREIGN KEY (vehicle_id) 
    REFERENCES vehicles(id),
  option_id INT NOT NULL,
    CONSTRAINT fk_option_id 
    FOREIGN KEY (option_id) 
    REFERENCES options(id)
);

CREATE TABLE rel_vehicle_models_vehicle_types (
  id INT PRIMARY KEY AUTO_INCREMENT,
  vehicle_model_id INT NOT NULL, 
    CONSTRAINT fk_vehicle_model_id_for_rel_vehicle_models_vehicle_types 
    FOREIGN KEY (vehicle_model_id) 
    REFERENCES vehicle_models(id),
  vehicle_type_id INT NOT NULL, 
    CONSTRAINT fk_vehicle_type_id_for_rel_vehicle_models_vehicle_types
    FOREIGN KEY (vehicle_type_id) 
    REFERENCES vehicle_types(id)
);









