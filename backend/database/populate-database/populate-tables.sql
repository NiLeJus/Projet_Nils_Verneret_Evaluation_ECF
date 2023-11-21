--* Populate Table Garages



--* Populate Table Activity Related
INSERT INTO garages (address, city, zip_code, telephone, email) 
VALUES 
    ('1234 une rue à Toulouse askip', 'Toulouse', '12345', '0405050505', 'contact.toulouse@vparrot.com'),
    ('5678 rue Quoikou baie', 'Marspellier', '67890', '0405050505-5678', 'contact.marspellier@vparrot.com');

INSERT INTO admins (name, email, password, is_master_user, is_connected) 
VALUES 
    ('V.Parrot', 'v.parrot@garage.com', 'password123', TRUE, FALSE),
    ('B.Pichon', 'b.pichon@garage.com', 'password456', FALSE, FALSE);

INSERT INTO services (name, description, min_price) 
VALUES 
    ('Vidange d’huile moteur', 'Changement d’huile moteur et du filtre à huile.', 79),
    ('Entretien des freins', 'Inspection et remplacement des plaquettes et disques de frein si nécessaire.', 99),
    ('Révision complète', 'Contrôle technique et maintenance complète du véhicule.', 199),
    ('Changement de pneus', 'Remplacement des pneus usés par des neufs.', 70),
    ('Équilibrage des pneus', 'Équilibrage des roues pour une usure uniforme des pneus.', 30),
    ('Réparation de pneus', 'Réparation de crevaisons et de dommages mineurs sur les pneus.', 25),
    ('Diagnostic électronique', 'Analyse électronique pour diagnostiquer des problèmes techniques.', 50),
    ('Climatisation', 'Entretien et recharge du système de climatisation.', 90),
    ('Peinture', 'Service de peinture partielle ou complète du véhicule.', 150),
    ('Nettoyage intérieur', 'Nettoyage en profondeur de l’intérieur du véhicule.', 65),
    ('Polissage', 'Polissage de la carrosserie pour restaurer l’éclat.', 80),
    ('Lavage de voiture', 'Lavage extérieur à la main avec cire de finition.', 20),
    ('Remplacement de batterie', 'Installation d’une nouvelle batterie.', 120),
    ('Contrôle et remplissage des fluides', 'Vérification et ajustement des niveaux de tous les fluides.', 35),
    ('Remplacement du filtre à air', 'Installation d’un nouveau filtre à air pour le moteur.', 40),
    ('Inspection de sécurité', 'Vérification des systèmes critiques pour la sécurité.', 60),
    ('Réglage des phares', 'Ajustement et alignement des phares.', 25),
    ('Remplacement d’essuie-glaces', 'Installation de nouvelles lames d’essuie-glace.', 30),
    ('Restauration des phares', 'Nettoyage et rénovation des phares opaques ou jaunis.', 45),
    ('Inspection avant achat', 'Évaluation complète d’un véhicule d’occasion avant achat.', 100);

INSERT INTO testimonials (name, testimony) 
VALUES 
    ('Jean Martin', 'Très satisfait des services offerts, je recommande!'),
    ('Sophie Dupont', 'Accueil chaleureux et service professionnel. Merci!'),
    ('Lucas Durand', 'Des prix compétitifs et un travail de qualité, rien à redire.'),
    ('Émilie Petit', 'Le personnel est compétent et à l’écoute, je reviendrai.'),
    ('Hugo Bernard', 'Rapidité et efficacité, le garage a résolu mon problème en un rien de temps.');

--* Populate Table Vehicle Related

INSERT INTO vehicle_types (vehicle_type_name, vehicle_subtype_name, description) 
VALUES 
    ('voiture', 'berline', 'Une voiture conçue pour le confort et la performance sur la route.'),
    ('voiture', 'coupé', 'Un véhicule sportif avec un toit fixe et deux portes.'),
    ('voiture', 'roadster', 'Une voiture de sport décapotable ou convertible pour deux passagers.'),
    ('voiture', 'S.U.V', 'Un véhicule utilitaire sportif, idéal pour la conduite tout-terrain et les familles.'),
    ('voiture', 'citadine', 'Petite voiture économique parfaite pour la conduite urbaine.'),
    ('voiture', 'break', 'Voiture avec un espace de chargement étendu, idéale pour les familles et les voyages.');
    ('2 Roues', 'moto', 'Vroom Vroom');


INSERT INTO brands (name)
VALUES
    ('toyota'),
    ('honda'),
    ('ford'),
    ('chevrolet'),
    ('mercedes-benz'),
    ('bmw'),
    ('volkswagen'),
    ('hyundai'),
    ('nissan'),
    ('audi'),
    ('porsche'),
    ('kia'),
    ('mazda'),
    ('jaguar'),
    ('land rover'),
    ('subaru'),
    ('tesla'),
    ('fiat'),
    ('renault'),
    ('peugeot'),
    ('mitsubishi'),
    ('suzuki'),
    ('lexus'),
    ('dodge'),
    ('volvo');



INSERT INTO colors (name, hex)
VALUES
    ('red', '#FF0000'),
    ('green', '#00FF00'),
    ('blue', '#0000FF'),
    ('yellow', '#FFFF00'),
    ('black', '#000000'),
    ('white', '#FFFFFF'),
    ('purple', '#800080'),
    ('cyan', '#00FFFF'),
    ('magenta', '#FF00FF'),
    ('orange', '#FFA500'),
    ('brown', '#A52A2A'),
    ('teal', '#008080'),
    ('navy', '#000080'),
    ('olive', '#808000'),
    ('maroon', '#800000');

INSERT INTO transmissions (transmission_type, speed_number, name) 
VALUES 
    ('automatic', 6,'automatique 6 vitesses'),
    ('manual', 5, 'manuelle 5 vitesses'),
    ('automatic', 8, 'automatique 8 vitesses'),
    ('manual', 6, 'manuelle 6 vitesses'),
    ('automatic', 7, 'automatique 7 vitesses'),
    ('manual', 4, 'manuelle 4 vitesses');

INSERT INTO options (name, description)
VALUES 
    ('climatisation', 'Système de refroidissement pour réguler la température intérieure.'),
    ('chauffage', 'Système de chauffage pour réchauffer l’intérieur du véhicule.'),
    ('direction assistée', 'Facilite la manœuvre du volant avec moins d’effort.'),
    ('aide au démarrage en côte', 'Empêche le véhicule de reculer lors du démarrage sur une pente.'),
    ('régulateur de vitesse', 'Maintient la vitesse du véhicule à une valeur constante choisie.'),
    ('limiteur de vitesse', 'Empêche le véhicule de dépasser une certaine vitesse.'),
    ('start and stop', 'Arrête et redémarre automatiquement le moteur à l’arrêt pour économiser du carburant.'),
    ('frein à main manuel', 'Frein activé manuellement pour immobiliser le véhicule.'),
    ('frein à main électrique', 'Frein activé électriquement pour immobiliser le véhicule.'),
    ('vitres électriques avant', 'Vitres avant actionnées électriquement.'),
    ('vitres manuelles avant', 'Vitres avant actionnées manuellement.'),
    ('vitres électriques arrières', 'Vitres arrière actionnées électriquement.'),
    ('vitres manuelles arrières', 'Vitres arrière actionnées manuellement.'),
    ('camera de recul', 'Caméra pour aider à la manœuvre en marche arrière.'),
    ('radar de recul', 'Capteurs pour détecter les obstacles lors de la marche arrière.'),
    ('gps', 'Système de navigation par satellite.'),
    ('allumage automatique des feux', 'Allume automatiquement les phares en fonction de la luminosité.'),
    ('allumage automatique des essuies glaces', 'Active automatiquement les essuies-glaces en cas de pluie.'),
    ('rétroviseurs réglables électriquement', 'Rétroviseurs ajustables électriquement depuis l’intérieur.'),
    ('rétroviseurs réglables manuellement', 'Rétroviseurs ajustables manuellement depuis l’extérieur.'),
    ('rétroviseurs rabattables électriquement', 'Rétroviseurs qui se replient électriquement.'),
    ('rétroviseurs rabattables manuellement', 'Rétroviseurs qui se replient manuellement.'),
    ('rétroviseurs dégivrants', 'Rétroviseurs avec fonction de dégivrage.');

INSERT INTO vehicle_conditions (name, description)
VALUES 
    ('neuf', 'Véhicule jamais utilisé, sans défauts ni signes d''usure, dans sa condition d''origine.'),
    ('comme neuf', 'Véhicule en excellent état, utilisé mais ne présente pratiquement aucun signe d''usure.'),
    ('très bon', 'Véhicule en très bon état avec des signes minimes d''usure ou d''utilisation. Fonctionne parfaitement.'),
    ('bon', 'Véhicule en bon état avec quelques signes visibles d''usure ou d''utilisation, mais fonctionne sans problèmes majeurs.');

INSERT INTO fuel_types (name)
 VALUES 
    ('essence'),
    ('diesel'),
    ('hybride'),
    ('electrique'),
    ('gpl'),
    ('ethanol'),
    ('hydrogene'),
    ('gaz naturel');


--* Populate Models Tables Photos

INSERT INTO vehicle_models (brand_id, name, description, seat_number) 
VALUES 
    (19, 'Clio', 'La Renault Clio est une citadine polyvalente, idéale pour les trajets urbains et périurbains.', 5),
    (19, 'Mégane', 'La Renault Mégane offre un bon équilibre entre confort et performance, avec un intérieur spacieux.', 5),
    (19, 'Twingo', 'Petite par la taille, mais grande par son agilité, la Renault Twingo est parfaite pour les rues étroites de la ville.', 4),
    (19, 'Kadjar', 'Le Renault Kadjar est un SUV robuste et élégant, offrant confort et sécurité pour toute la famille.', 5),
    (19, 'Captur', 'Avec son style distinctif et sa modularité, le Renault Captur est le crossover idéal pour ceux qui cherchent à se démarquer.', 5),
    (19, 'Espace', 'Le Renault Espace est une voiture familiale par excellence, avec un espace intérieur généreux et un confort de conduite.', 7),
    (19, 'Scénic', 'La Renault Scénic combine esthétique et fonctionnalité, offrant une expérience de conduite agréable et pratique.', 5),
    (19, 'Talisman', 'La Renault Talisman est une berline raffinée qui met l''accent sur le confort et la technologie avancée.', 5),
    (19, 'Zoe', 'La Renault Zoe est une pionnière de la mobilité électrique, alliant performances écologiques et autonomie impressionnante.', 5),
    (19, 'Koleos', 'Le Renault Koleos est un grand SUV qui offre confort, espace et capacités hors route.', 5),
    (19, 'Alaskan', 'Renault Alaskan est un pick-up robuste et fiable, conçu pour les travaux les plus durs et les aventures.', 5),
    (19, 'Master', 'Le Renault Master est un utilitaire grand volume, conçu pour les professionnels exigeant de l''espace et de la polyvalence.', 3);

INSERT INTO vehicle_models (brand_id, name, description, seat_number) 
VALUES 
    (20, '208', 'La Peugeot 208 est une citadine stylée et moderne, offrant un intérieur de qualité et une conduite dynamique.', 5),
    (20, '308', 'La Peugeot 308 est une berline compacte, connue pour son design élégant et son efficacité énergétique.', 5),
    (20, '508', 'La Peugeot 508 est une grande berline qui combine élégance, confort et performance pour un plaisir de conduite supérieur.', 5),
    (20, '2008', 'Le SUV Peugeot 2008 offre un espace généreux, une technologie de pointe et une forte capacité sur route comme hors route.', 5),
    (20, '3008', 'Peugeot 3008, le SUV familial primé, est apprécié pour son design audacieux, sa technologie innovante et son confort de conduite.', 5),
    (20, '5008', 'Le Peugeot 5008 est un SUV 7 places qui allie puissance et élégance, avec un espace intérieur modulable et des finitions de qualité.', 7),
    (20, 'Rifter', 'Polyvalent et robuste, le Peugeot Rifter est le véhicule idéal pour les familles actives et les aventuriers.', 5),
    (20, 'Traveller', 'Le Peugeot Traveller est conçu pour transporter confortablement passagers et bagages, parfait pour les longs trajets et les aventures.', 8);

INSERT INTO vehicle_models (brand_id, name, description, seat_number) 
VALUES 
    (1, 'Aygo', 'La toyota Aygo est une citadine polyvalente, idéale pour les trajets urbains et périurbains.', 5),

    (1, 'Corolla', 'La Toyota Corolla est une berline compacte emblématique connue pour sa fiabilité et son efficacité énergétique.', 5),
    (1, 'Camry', 'La Toyota Camry offre un intérieur spacieux et confortable, avec une conduite douce et une performance fiable.', 5),
    (1, 'Prius', 'Le Toyota Prius est le pionnier des véhicules hybrides, offrant une excellente économie de carburant et un design aérodynamique distinct.', 5),
    (1, 'RAV4', 'Le SUV Toyota RAV4 allie capacité tout-terrain, espace et technologie, idéal pour les aventuriers urbains et les familles.', 5),
    (1, 'Land Cruiser', 'Le Toyota Land Cruiser est un SUV robuste conçu pour offrir une durabilité exceptionnelle et une performance hors route.', 7),
    (1, 'Yaris', 'La Toyota Yaris est une citadine économique qui combine un design intelligent, une maniabilité agile et une bonne efficacité énergétique.', 5),
    (1, '86', 'Le Toyota 86 est une voiture de sport abordable, avec une maniabilité précise et une traction arrière pour une expérience de conduite pure.', 4),
    (1, 'Tundra', 'Le Toyota Tundra est un pick-up puissant et durable, capable de remorquage lourd et conçu pour le travail ou les loisirs.', 5);

INSERT INTO vehicle_models (brand_id, name, description, seat_number) 
VALUES 
    (2, 'Civic', 'La Honda Civic est une berline compacte offrant un équilibre parfait entre économie de carburant et performance dynamique.', 5),
    (2, 'Accord', 'La Honda Accord est une berline intermédiaire connue pour son intérieur spacieux et son engagement envers la sécurité et le confort.', 5);

INSERT INTO vehicle_models (brand_id, name, description, seat_number) 
VALUES 
    (3, 'Fiesta', 'La Ford Fiesta est une voiture subcompacte avec une conduite engageante et des fonctionnalités de haute technologie.', 5),
    (3, 'Mustang', 'La Ford Mustang est une voiture de sport emblématique qui offre une performance musclée et un style classique américain.', 4);

INSERT INTO vehicle_models (brand_id, name, description, seat_number) 
VALUES 
    (4, 'Cruze', 'La Chevrolet Cruze est une berline compacte qui se distingue par son confort, sa technologie et son économie de carburant.', 5),
    (4, 'Silverado', 'Le Chevrolet Silverado est un pick-up robuste conçu pour les tâches lourdes, avec des capacités de remorquage impressionnantes.', 5);
    (19, 'Clio', 'La Renault Clio est une citadine polyvalente, idéale pour les trajets urbains et périurbains.', 5),


INSERT INTO vehicles (
    vehicle_model_id, 
    color_id, 
    paint_type, 
    production_year, 
    mileage, 
    vehicle_condition_id, 
    price, 
    vehicle_comment, 
    fuel_type_id, 
    transmission_id, 
    tax_horsepower, 
    vehicle_ad_status, 
    vehicle_status, 
    at_garage_id
) VALUES (
(
    36, -- ID du modèle de véhicule
    1, -- ID de la couleur
    'glossy', -- ou 'matte' ou 'metallic'
    2021, -- Année de production
    10000, -- Kilométrage
    1, -- ID de l'état du véhicule
    20000, -- Prix
    'Ceci est un Commentaire sur le véhicule', -- Commentaire sur le véhicule
    1, -- ID du type de carburant
    1, -- ID de la transmission
    5, -- Chevaux fiscaux
    'displayed', -- ou 'hidden'
    'available', -- ou 'reserved' ou 'sold'
    1
),
(
    3,
    4,
    'glossy',
    2020,
    20000,
    2,
    15000,
    'Ceci est un Commentaire sur le véhicule',
    2,
    2,
    6,
    'displayed',
    'available',
    1
)
);

INSERT INTO rel_vehicle_models_vehicle_types (vehicle_model_id, vehicle_type_id)
VALUES (36, 1), (36, 2)

INSERT INTO photos (vehicle_id, url)
VALUES
    (1, '/public/vehicleImages/toyota_aygox.jpg');
    (1, '/public/vehicleImages/Toyota_Aygo_X_13.jpg');
    (1, '/public/vehicleImages/98-toyota-aygo-x-2022-official-images-rear.jpg')


INSERT INTO rel_vehicles_options (vehicle_id, option_id) VALUES
(1, 2),
(1, 5),
(2, 3),
(2, 7),
(2, 8);


--* Populate Table Engines Types

--* Populate Table Admin Types

