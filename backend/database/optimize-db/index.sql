-- Use index when the database entries > 10 000

-- For 'models' table:
CREATE INDEX idx_vehicle_type_id ON models(vehicle_type_id);
CREATE INDEX idx_brand_id ON models(brand_id);

-- For 'vehicle' table:
CREATE INDEX idx_model_id ON vehicles(model_id);
CREATE INDEX idx_color_id ON vehicles(color_id);
CREATE INDEX idx_vehicle_condition_id ON vehicles(vehicle_condition_id);
CREATE INDEX idx_engine_id ON vehicles(engine_id);
CREATE INDEX idx_at_garage_id ON vehicles(at_garage_id);
CREATE INDEX idx_created_at ON vehicles(created_at);
CREATE INDEX idx_price ON vehicles(price);

-- For `vehicles_options` table:
CREATE INDEX idx_vehicle_option ON vehicles_options(vehicle_id, option_id);

--For `requests` table:
CREATE INDEX idx_is_processed ON requests(is_processed);
CREATE INDEX idx_received_at ON requests(received_at);

-- Pour le table `testimonials`:
CREATE INDEX idx_testimony_status ON testimonials(testimony_status);
