-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 21 nov. 2023 à 15:03
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `vparrot_activity_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(60) NOT NULL,
  `is_master_user` tinyint(1) NOT NULL DEFAULT 0,
  `is_connected` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `password`, `is_master_user`, `is_connected`) VALUES
(1, 'V.Parrot', 'v.parrot@garage.com', '$2b$10$69mQpNfV6XkukWCmGGgt.O15pggtB00KF5FCyyA1KK4xj1pReBSfW', 1, 0),
(2, 'B.Pichon', 'b.pichon@garage.com', '$2b$10$qUXDZRaQEz8y0yPx78/z/.hF2fJUYsF22UMb5pJTjdc59jkuIaRy.', 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `annual_calendar`
--

CREATE TABLE `annual_calendar` (
  `day_of_year_id` int(11) NOT NULL,
  `day_of_week_id` int(11) NOT NULL,
  `time_slot_id` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `annual_calendar`
--

INSERT INTO `annual_calendar` (`day_of_year_id`, `day_of_week_id`, `time_slot_id`, `date`) VALUES
(1, 1, 1, '2023-01-01'),
(2, 1, 2, '2023-01-01'),
(3, 2, 1, '2023-01-02'),
(4, 2, 2, '2023-01-02'),
(5, 3, 1, '2023-01-03'),
(6, 3, 2, '2023-01-03'),
(7, 4, 1, '2023-01-04'),
(8, 4, 2, '2023-01-04'),
(9, 5, 1, '2023-01-05'),
(10, 5, 2, '2023-01-05'),
(11, 6, 1, '2023-01-06'),
(12, 6, 2, '2023-01-06'),
(13, 7, 1, '2023-01-07'),
(14, 7, 2, '2023-01-07');

-- --------------------------------------------------------

--
-- Structure de la table `brands`
--

CREATE TABLE `brands` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `brands`
--

INSERT INTO `brands` (`id`, `name`) VALUES
(6, 'bmw'),
(4, 'chevrolet'),
(24, 'dodge'),
(18, 'fiat'),
(3, 'ford'),
(2, 'honda'),
(8, 'hyundai'),
(14, 'jaguar'),
(12, 'kia'),
(15, 'land rover'),
(23, 'lexus'),
(13, 'mazda'),
(5, 'mercedes-benz'),
(21, 'mitsubishi'),
(9, 'nissan'),
(20, 'peugeot'),
(11, 'porsche'),
(19, 'renault'),
(16, 'subaru'),
(22, 'suzuki'),
(17, 'tesla'),
(1, 'toyota'),
(7, 'volkswagen'),
(25, 'volvo');

-- --------------------------------------------------------

--
-- Structure de la table `colors`
--

CREATE TABLE `colors` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `hex` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `colors`
--

INSERT INTO `colors` (`id`, `name`, `hex`) VALUES
(1, 'rouge', '#FF0000'),
(2, 'vert', '#00FF00'),
(3, 'bleu', '#0000FF'),
(4, 'jaune', '#FFFF00'),
(5, 'noir', '#000000'),
(6, 'blanc', '#FFFFFF'),
(7, 'violet', '#800080'),
(8, 'cyan', '#00FFFF'),
(9, 'magenta', '#FF00FF'),
(10, 'orange', '#FFA500'),
(11, 'brown', '#A52A2A'),
(12, 'teal', '#008080'),
(13, 'navy', '#000080'),
(14, 'olive', '#808000'),
(15, 'maroon', '#800000'),
(19, 'Gris', '#a8a8a8');

-- --------------------------------------------------------

--
-- Structure de la table `days_of_week`
--

CREATE TABLE `days_of_week` (
  `day_of_week_id` int(11) NOT NULL,
  `day_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `days_of_week`
--

INSERT INTO `days_of_week` (`day_of_week_id`, `day_name`) VALUES
(1, 'Lundi'),
(2, 'Tuesday'),
(3, 'Wednesday'),
(4, 'Thursday'),
(5, 'Friday'),
(6, 'Saturday'),
(7, 'Sunday');

-- --------------------------------------------------------

--
-- Structure de la table `fuel_types`
--

CREATE TABLE `fuel_types` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `fuel_types`
--

INSERT INTO `fuel_types` (`id`, `name`) VALUES
(2, 'Diesel'),
(4, 'electrique'),
(1, 'essence'),
(6, 'ethanol'),
(8, 'gaz naturel'),
(5, 'gpl'),
(3, 'hybride'),
(7, 'hydrogene');

-- --------------------------------------------------------

--
-- Structure de la table `garages`
--

CREATE TABLE `garages` (
  `id` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(50) NOT NULL,
  `zip_code` varchar(10) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `garages`
--

INSERT INTO `garages` (`id`, `address`, `city`, `zip_code`, `telephone`, `email`) VALUES
(1, '1234 une rue à Toulouse askip', 'Toulouse', '12345', '0405050505', 'contact.toulouse@vparrot.com');

-- --------------------------------------------------------

--
-- Structure de la table `options`
--

CREATE TABLE `options` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `options`
--

INSERT INTO `options` (`id`, `name`, `description`) VALUES
(1, 'Climatisation', 'Système de refroidissement pour réguler la température intérieure.'),
(2, 'chauffage', 'Système de chauffage pour réchauffer l’intérieur du véhicule.'),
(3, 'direction assistée', 'Facilite la manœuvre du volant avec moins d’effort.'),
(4, 'aide au démarrage en côte', 'Empêche le véhicule de reculer lors du démarrage sur une pente.'),
(5, 'régulateur de vitesse', 'Maintient la vitesse du véhicule à une valeur constante choisie.'),
(6, 'limiteur de vitesse', 'Empêche le véhicule de dépasser une certaine vitesse.'),
(7, 'start and stop', 'Arrête et redémarre automatiquement le moteur à l’arrêt pour économiser du carburant.'),
(8, 'frein à main manuel', 'Frein activé manuellement pour immobiliser le véhicule.'),
(9, 'frein à main électrique', 'Frein activé électriquement pour immobiliser le véhicule.'),
(10, 'vitres électriques avant', 'Vitres avant actionnées électriquement.'),
(11, 'vitres manuelles avant', 'Vitres avant actionnées manuellement.'),
(12, 'vitres électriques arrières', 'Vitres arrière actionnées électriquement.'),
(13, 'vitres manuelles arrières', 'Vitres arrière actionnées manuellement.'),
(14, 'camera de recul', 'Caméra pour aider à la manœuvre en marche arrière.'),
(15, 'radar de recul', 'Capteurs pour détecter les obstacles lors de la marche arrière.'),
(16, 'gps', 'Système de navigation par satellite.'),
(17, 'allumage automatique des feux', 'Allume automatiquement les phares en fonction de la luminosité.'),
(18, 'allumage automatique des essuies glaces', 'Active automatiquement les essuies-glaces en cas de pluie.'),
(19, 'rétroviseurs réglables électriquement', 'Rétroviseurs ajustables électriquement depuis l’intérieur.'),
(20, 'rétroviseurs réglables manuellement', 'Rétroviseurs ajustables manuellement depuis l’extérieur.'),
(21, 'rétroviseurs rabattables électriquement', 'Rétroviseurs qui se replient électriquement.'),
(22, 'rétroviseurs rabattables manuellement', 'Rétroviseurs qui se replient manuellement.'),
(23, 'rétroviseurs dégivrants', 'Rétroviseurs avec fonction de dégivrage.');

-- --------------------------------------------------------

--
-- Structure de la table `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `url` varchar(2048) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `photos`
--

INSERT INTO `photos` (`id`, `vehicle_id`, `url`) VALUES
(1, 1, '/public/vehicleImages/toyota_aygox.jpg'),
(2, 2, '/public/vehicleImages/qzdqzdzqd.jpg'),
(4, 1, '/public/vehicleImages/Toyota_Aygo_X_13.jpg'),
(5, 1, '/public/vehicleImages/98-toyota-aygo-x-2022-official-images-rear.jpg'),
(11, 33, '/public/vehicleImages/1700397059494-01 Renault Captur_0.jpeg'),
(12, 34, '/public/vehicleImages/1700572607417-\'17_Chevrolet_Cruze_Hatchback_--_Front.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `rel_vehicles_options`
--

CREATE TABLE `rel_vehicles_options` (
  `vehicle_id` int(11) NOT NULL,
  `option_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `rel_vehicles_options`
--

INSERT INTO `rel_vehicles_options` (`vehicle_id`, `option_id`) VALUES
(1, 2),
(1, 5),
(2, 3),
(2, 7),
(2, 8);

-- --------------------------------------------------------

--
-- Structure de la table `rel_vehicle_models_vehicle_types`
--

CREATE TABLE `rel_vehicle_models_vehicle_types` (
  `id` int(11) NOT NULL,
  `vehicle_model_id` int(11) NOT NULL,
  `vehicle_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `rel_vehicle_models_vehicle_types`
--

INSERT INTO `rel_vehicle_models_vehicle_types` (`id`, `vehicle_model_id`, `vehicle_type_id`) VALUES
(1, 36, 1),
(2, 36, 2);

-- --------------------------------------------------------

--
-- Structure de la table `requests`
--

CREATE TABLE `requests` (
  `id` int(11) NOT NULL,
  `gender` enum('mister','madam','not_defined') NOT NULL DEFAULT 'not_defined',
  `requester_name` varchar(100) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(250) NOT NULL,
  `prefer_phone` tinyint(1) NOT NULL DEFAULT 0,
  `is_processed` tinyint(1) NOT NULL DEFAULT 0,
  `received_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `processed_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `min_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `services`
--

INSERT INTO `services` (`id`, `name`, `description`, `min_price`) VALUES
(1, 'Vidange d’huile moteur', 'Changement d’huile moteur et du filtre à huile.', 79),
(2, 'Entretien des freins', 'Inspection et remplacement des plaquettes et disques de frein si nécessaire.', 99),
(3, 'Révision complète', 'Contrôle technique et maintenance complète du véhicule.', 199),
(4, 'Changement de pneus', 'Remplacement des pneus usés par des neufs.', 70),
(5, 'Équilibrage des pneus', 'Équilibrage des roues pour une usure uniforme des pneus.', 30),
(6, 'Réparation de pneus', 'Réparation de crevaisons et de dommages mineurs sur les pneus.', 25),
(7, 'Diagnostic électronique', 'Analyse électronique pour diagnostiquer des problèmes techniques.', 50),
(8, 'Climatisation', 'Entretien et recharge du système de climatisation.', 90),
(9, 'Peinture', 'Service de peinture partielle ou complète du véhicule.', 150),
(10, 'Nettoyage intérieur', 'Nettoyage en profondeur de l’intérieur du véhicule.', 65),
(11, 'Polissage', 'Polissage de la carrosserie pour restaurer l’éclat.', 80),
(12, 'Lavage de voiture', 'Lavage extérieur à la main avec cire de finition.', 20),
(13, 'Remplacement de batterie', 'Installation d’une nouvelle batterie.', 120),
(14, 'Contrôle et remplissage des fluides', 'Vérification et ajustement des niveaux de tous les fluides.', 35),
(15, 'Remplacement du filtre à air', 'Installation d’un nouveau filtre à air pour le moteur.', 40),
(16, 'Inspection de sécurité', 'Vérification des systèmes critiques pour la sécurité.', 60),
(17, 'Réglage des phares', 'Ajustement et alignement des phares.', 25),
(18, 'Remplacement d’essuie-glaces', 'Installation de nouvelles lames d’essuie-glace.', 30),
(19, 'Restauration des phares', 'Nettoyage et rénovation des phares opaques ou jaunis.', 45),
(20, 'Inspection avant achat', 'Évaluation complète d’un véhicule d’occasion avant achat.', 100);

-- --------------------------------------------------------

--
-- Structure de la table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `posted_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `testimony` text NOT NULL,
  `testimony_status` enum('pending','displayed','hidden') NOT NULL DEFAULT 'pending',
  `note` decimal(2,1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `posted_at`, `testimony`, `testimony_status`, `note`) VALUES
(1, 'Jean Martin ', '2023-11-08 11:04:07', 'Très satisfait des services offerts, je recommande!', 'displayed', 4.5),
(2, 'Sophie Dupont', '2023-11-08 11:04:07', 'Accueil chaleureux et service professionnel. Merci!', 'displayed', 5.0),
(3, 'Lucas Durand', '2023-10-08 10:04:07', 'Des prix compétitifs et un travail de qualité, rien à redire.', 'displayed', 4.0),
(4, 'Émilie Petit', '2023-11-08 11:04:07', 'Le personnel est compétent et à l’écoute, je reviendrai. ', 'displayed', 3.5);

-- --------------------------------------------------------

--
-- Structure de la table `time_slots`
--

CREATE TABLE `time_slots` (
  `time_slot_id` int(11) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `time_slots`
--

INSERT INTO `time_slots` (`time_slot_id`, `start_time`, `end_time`) VALUES
(1, '08:30:00', '12:30:00'),
(2, '13:30:00', '17:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `transmissions`
--

CREATE TABLE `transmissions` (
  `id` int(11) NOT NULL,
  `transmission_type` enum('automatic','manual') NOT NULL DEFAULT 'manual',
  `speed_number` tinyint(4) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `transmissions`
--

INSERT INTO `transmissions` (`id`, `transmission_type`, `speed_number`, `name`) VALUES
(1, 'automatic', 6, 'automatique 6 vitesses'),
(2, 'manual', 5, 'manuelle 5 vitesses'),
(3, 'automatic', 8, 'automatique 8 vitesses'),
(4, 'manual', 6, 'manuelle 6 vitesses'),
(5, 'automatic', 7, 'automatique 7 vitesses'),
(6, 'manual', 4, 'manuelle 4 vitesses'),
(7, 'manual', 8, 'Manuelle 8 vitesses');

-- --------------------------------------------------------

--
-- Structure de la table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `vehicle_model_id` int(11) NOT NULL,
  `color_id` int(11) NOT NULL,
  `paint_type` enum('glossy','matte','metallic') NOT NULL DEFAULT 'glossy',
  `production_year` year(4) NOT NULL,
  `mileage` mediumint(9) NOT NULL,
  `vehicle_condition_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `vehicle_comment` text NOT NULL,
  `fuel_type_id` int(11) NOT NULL,
  `transmission_id` int(11) NOT NULL,
  `tax_horsepower` tinyint(4) NOT NULL,
  `clicked` int(11) NOT NULL DEFAULT 0,
  `vehicle_ad_status` enum('displayed','hidden') NOT NULL DEFAULT 'hidden',
  `vehicle_status` enum('available','reserved','sold') NOT NULL DEFAULT 'available',
  `at_garage_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `vehicle_type_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `vehicles`
--

INSERT INTO `vehicles` (`id`, `vehicle_model_id`, `color_id`, `paint_type`, `production_year`, `mileage`, `vehicle_condition_id`, `price`, `vehicle_comment`, `fuel_type_id`, `transmission_id`, `tax_horsepower`, `clicked`, `vehicle_ad_status`, `vehicle_status`, `at_garage_id`, `created_at`, `vehicle_type_id`) VALUES
(1, 36, 14, 'glossy', '2021', 10000, 1, 20000, 'Ceci est un Commentaire sur le véhicule', 1, 1, 5, 0, 'displayed', 'available', 1, '2023-11-14 20:32:03', 5),
(2, 3, 1, 'glossy', '2020', 20000, 2, 15000, 'Ceci est un Commentaire sur le véhicule', 2, 2, 6, 0, 'displayed', 'available', 1, '2023-11-15 17:04:41', 5),
(33, 5, 3, 'glossy', '2020', 9500, 1, 12000, 'Bon vehicule', 1, 2, 9, 0, 'hidden', 'available', 1, '2023-11-19 12:30:59', 1),
(34, 33, 3, 'glossy', '2019', 65000, 1, 15000, 'Rayure sur la jante arrière gauche', 1, 4, 9, 0, 'hidden', 'available', 1, '2023-11-21 13:16:47', 1);

-- --------------------------------------------------------

--
-- Structure de la table `vehicle_conditions`
--

CREATE TABLE `vehicle_conditions` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `vehicle_conditions`
--

INSERT INTO `vehicle_conditions` (`id`, `name`, `description`) VALUES
(1, 'neuf', 'Véhicule jamais utilisé, sans défauts ni signes d\'usure, dans sa condition d\'origine.'),
(2, 'comme neuf', 'Véhicule en excellent état, utilisé mais ne présente pratiquement aucun signe d\'usure.'),
(3, 'très bon', 'Véhicule en très bon état avec des signes minimes d\'usure ou d\'utilisation. Fonctionne parfaitement.'),
(4, 'bon', 'Véhicule en bon état avec quelques signes visibles d\'usure ou d\'utilisation, mais fonctionne sans problèmes majeurs.');

-- --------------------------------------------------------

--
-- Structure de la table `vehicle_models`
--

CREATE TABLE `vehicle_models` (
  `id` int(11) NOT NULL,
  `brand_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `door_number` tinyint(4) NOT NULL DEFAULT 5,
  `wheel_number` tinyint(4) NOT NULL DEFAULT 4,
  `seat_number` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `vehicle_models`
--

INSERT INTO `vehicle_models` (`id`, `brand_id`, `name`, `description`, `door_number`, `wheel_number`, `seat_number`) VALUES
(1, 19, 'Clio', 'AAALa Renault Clio est une citadine polyvalente, idéale pour les trajet78s urbains et périurbains.', 4, 4, 5),
(2, 19, 'Mégane2', 'La Renault Mégane offre un bon équilibre entre confort et performance, avec un intérieur spacieux.', 5, 4, 5),
(3, 19, 'Twingo', 'Petite par la taille, mais grande par son agilité, la Renault Twingo est parfaite pour les rues étroites de la ville.', 5, 4, 4),
(4, 19, 'Kadjar', 'Le Renault Kadjar est un SUV robuste et élégant, offrant confort et sécurité pour toute la famille.', 5, 4, 5),
(5, 19, 'Captur', 'Avec son style distinctif et sa modularité, le Renault Captur est le crossover idéal pour ceux qui cherchent à se démarquer.', 5, 4, 5),
(6, 19, 'Espace', 'Le Renault Espace est une voiture familiale par excellence, avec un espace intérieur généreux et un confort de conduite.', 5, 4, 7),
(7, 19, 'Scénic', 'La Renault Scénic combine esthétique et fonctionnalité, offrant une expérience de conduite agréable et pratique.', 5, 4, 5),
(8, 19, 'Talisman', 'La Renault Talisman est une berline raffinée qui met l\'accent sur le confort et la technologie avancée.', 5, 4, 5),
(9, 19, 'Zoe', 'La Renault Zoe est une pionnière de la mobilité électrique, alliant performances écologiques et autonomie impressionnante.', 5, 4, 5),
(10, 19, 'Koleos', 'Le Renault Koleos est un grand SUV qui offre confort, espace et capacités hors route.', 5, 4, 5),
(11, 19, 'Alaskan', 'Renault Alaskan est un pick-up robuste et fiable, conçu pour les travaux les plus durs et les aventures.', 5, 4, 5),
(12, 19, 'Master', 'Le Renault Master est un utilitaire grand volume, conçu pour les professionnels exigeant de l\'espace et de la polyvalence.', 5, 4, 3),
(13, 20, '208', 'La Peugeot 208 est une citadine stylée et moderne, offrant un intérieur de qualité et une conduite dynamique.', 5, 4, 5),
(14, 20, '308', 'La Peugeot 308 est une berline compacte, connue pour son design élégant et son efficacité énergétique.', 5, 4, 5),
(15, 20, '508', 'La Peugeot 508 est une grande berline qui combine élégance, confort et performance pour un plaisir de conduite supérieur.', 5, 4, 5),
(16, 20, '2008', 'Le SUV Peugeot 2008 offre un espace généreux, une technologie de pointe et une forte capacité sur route comme hors route.', 5, 4, 5),
(17, 20, '3008', 'Peugeot 3008, le SUV familial primé, est apprécié pour son design audacieux, sa technologie innovante et son confort de conduite.', 5, 4, 5),
(18, 20, '5008', 'Le Peugeot 5008 est un SUV 7 places qui allie puissance et élégance, avec un espace intérieur modulable et des finitions de qualité.', 5, 4, 7),
(19, 20, 'Rifter', 'Polyvalent et robuste, le Peugeot Rifter est le véhicule idéal pour les familles actives et les aventuriers.', 5, 4, 5),
(20, 20, 'Traveller', 'Le Peugeot Traveller est conçu pour transporter confortablement passagers et bagages, parfait pour les longs trajets et les aventures.', 5, 4, 8),
(21, 1, 'Corolla', 'La Toyota Corolla est une berline compacte emblématique connue pour sa fiabilité et son efficacité énergétique.', 5, 4, 5),
(22, 1, 'Camry', 'La Toyota Camry offre un intérieur spacieux et confortable, avec une conduite douce et une performance fiable.', 5, 4, 5),
(23, 1, 'Prius', 'Le Toyota Prius est le pionnier des véhicules hybrides, offrant une excellente économie de carburant et un design aérodynamique distinct.', 5, 4, 5),
(24, 1, 'RAV4', 'Le SUV Toyota RAV4 allie capacité tout-terrain, espace et technologie, idéal pour les aventuriers urbains et les familles.', 5, 4, 5),
(25, 1, 'Land Cruiser', 'Le Toyota Land Cruiser est un SUV robuste conçu pour offrir une durabilité exceptionnelle et une performance hors route.', 5, 4, 7),
(26, 1, 'Yaris', 'La Toyota Yaris est une citadine économique qui combine un design intelligent, une maniabilité agile et une bonne efficacité énergétique.', 5, 4, 5),
(27, 1, '86', 'Le Toyota 86 est une voiture de sport abordable, avec une maniabilité précise et une traction arrière pour une expérience de conduite pure.', 5, 4, 4),
(28, 1, 'Tundra', 'Le Toyota Tundra est un pick-up puissant et durable, capable de remorquage lourd et conçu pour le travail ou les loisirs.', 5, 4, 5),
(29, 2, 'Civic', 'La Honda Civic est une berline compacte offrant un équilibre parfait entre économie de carburant et performance dynamique.', 5, 4, 5),
(30, 2, 'Accord', 'La Honda Accord est une berline intermédiaire connue pour son intérieur spacieux et son engagement envers la sécurité et le confort.', 5, 4, 5),
(31, 3, 'Fiesta', 'La Ford Fiesta est une voiture subcompacte avec une conduite engageante et des fonctionnalités de haute technologie.', 5, 4, 5),
(32, 3, 'Mustang', 'La Ford Mustang est une voiture de sport emblématique qui offre une performance musclée et un style classique américain.', 5, 4, 4),
(33, 4, 'Cruze', 'La Chevrolet Cruze est une berline compacte qui se distingue par son confort, sa technologie et son économie de carburant.', 5, 4, 5),
(34, 4, 'Silverado', 'Le Chevrolet Silverado est un pick-up robuste conçu pour les tâches lourdes, avec des capacités de remorquage impressionnantes.', 5, 4, 5),
(36, 1, 'Aygo', 'La toyota Aygo est une citadine polyvalente, idéale pour les trajets urbains et périurbains.', 5, 4, 5),
(37, 6, 'serie 1', 'Bmw serie 1 est une voiture à 4 roues', 4, 4, 5);

-- --------------------------------------------------------

--
-- Structure de la table `vehicle_types`
--

CREATE TABLE `vehicle_types` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `vehicle_types`
--

INSERT INTO `vehicle_types` (`id`, `name`, `description`) VALUES
(1, 'berline', 'Une voiture conçue pour le confort et la performance sur la route.'),
(2, 'coupé', 'Un véhicule sportif avec un toit fixe et deux portes.'),
(3, 'roadster', 'Une voiture de sport décapotable ou convertible pour deux passagers.'),
(4, 'S.U.V', 'Un véhicule utilitaire sportif, idéal pour la conduite tout-terrain et les familles.'),
(5, 'citadine', 'Petite voiture économique parfaite pour la conduite urbaine.'),
(6, 'break', 'Voiture avec un espace de chargement étendu, idéale pour les familles et les voyages.');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `annual_calendar`
--
ALTER TABLE `annual_calendar`
  ADD PRIMARY KEY (`day_of_year_id`),
  ADD KEY `day_of_week_id` (`day_of_week_id`),
  ADD KEY `time_slot_id` (`time_slot_id`);

--
-- Index pour la table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `days_of_week`
--
ALTER TABLE `days_of_week`
  ADD PRIMARY KEY (`day_of_week_id`);

--
-- Index pour la table `fuel_types`
--
ALTER TABLE `fuel_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `garages`
--
ALTER TABLE `garages`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `url` (`url`) USING HASH,
  ADD KEY `fk_vehicle_id_for_photo` (`vehicle_id`);

--
-- Index pour la table `rel_vehicles_options`
--
ALTER TABLE `rel_vehicles_options`
  ADD PRIMARY KEY (`vehicle_id`,`option_id`),
  ADD UNIQUE KEY `rel_vehicles_options_option_id_vehicle_id_unique` (`vehicle_id`,`option_id`),
  ADD KEY `option_id` (`option_id`);

--
-- Index pour la table `rel_vehicle_models_vehicle_types`
--
ALTER TABLE `rel_vehicle_models_vehicle_types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vehicle_model_id_for_rel_vehicle_models_vehicle_types` (`vehicle_model_id`),
  ADD KEY `fk_vehicle_type_id_for_rel_vehicle_models_vehicle_types` (`vehicle_type_id`);

--
-- Index pour la table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vehicle_id` (`vehicle_id`);

--
-- Index pour la table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `time_slots`
--
ALTER TABLE `time_slots`
  ADD PRIMARY KEY (`time_slot_id`);

--
-- Index pour la table `transmissions`
--
ALTER TABLE `transmissions`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vehicle_model_id` (`vehicle_model_id`),
  ADD KEY `fk_color_id` (`color_id`),
  ADD KEY `fk_vehicle_condition_id` (`vehicle_condition_id`),
  ADD KEY `fk_fuel_type_id` (`fuel_type_id`),
  ADD KEY `fk_transmission_id` (`transmission_id`),
  ADD KEY `fk_at_garage_id` (`at_garage_id`),
  ADD KEY `fk_vehicle_type_id` (`vehicle_type_id`);

--
-- Index pour la table `vehicle_conditions`
--
ALTER TABLE `vehicle_conditions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `vehicle_models`
--
ALTER TABLE `vehicle_models`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_brand_id` (`brand_id`);

--
-- Index pour la table `vehicle_types`
--
ALTER TABLE `vehicle_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `description` (`description`) USING HASH;

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `annual_calendar`
--
ALTER TABLE `annual_calendar`
  MODIFY `day_of_year_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT pour la table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `days_of_week`
--
ALTER TABLE `days_of_week`
  MODIFY `day_of_week_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `fuel_types`
--
ALTER TABLE `fuel_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `garages`
--
ALTER TABLE `garages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `options`
--
ALTER TABLE `options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `rel_vehicle_models_vehicle_types`
--
ALTER TABLE `rel_vehicle_models_vehicle_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `requests`
--
ALTER TABLE `requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `time_slots`
--
ALTER TABLE `time_slots`
  MODIFY `time_slot_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `transmissions`
--
ALTER TABLE `transmissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT pour la table `vehicle_conditions`
--
ALTER TABLE `vehicle_conditions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `vehicle_models`
--
ALTER TABLE `vehicle_models`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT pour la table `vehicle_types`
--
ALTER TABLE `vehicle_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `annual_calendar`
--
ALTER TABLE `annual_calendar`
  ADD CONSTRAINT `annual_calendar_ibfk_1` FOREIGN KEY (`day_of_week_id`) REFERENCES `days_of_week` (`day_of_week_id`),
  ADD CONSTRAINT `annual_calendar_ibfk_2` FOREIGN KEY (`time_slot_id`) REFERENCES `time_slots` (`time_slot_id`);

--
-- Contraintes pour la table `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `fk_vehicle_id_for_photo` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`);

--
-- Contraintes pour la table `rel_vehicles_options`
--
ALTER TABLE `rel_vehicles_options`
  ADD CONSTRAINT `rel_vehicles_options_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rel_vehicles_options_ibfk_2` FOREIGN KEY (`option_id`) REFERENCES `options` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `rel_vehicle_models_vehicle_types`
--
ALTER TABLE `rel_vehicle_models_vehicle_types`
  ADD CONSTRAINT `fk_vehicle_model_id_for_rel_vehicle_models_vehicle_types` FOREIGN KEY (`vehicle_model_id`) REFERENCES `vehicle_models` (`id`),
  ADD CONSTRAINT `fk_vehicle_type_id_for_rel_vehicle_models_vehicle_types` FOREIGN KEY (`vehicle_type_id`) REFERENCES `vehicle_types` (`id`);

--
-- Contraintes pour la table `requests`
--
ALTER TABLE `requests`
  ADD CONSTRAINT `fk_vehicle_id` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`);

--
-- Contraintes pour la table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `fk_at_garage_id` FOREIGN KEY (`at_garage_id`) REFERENCES `garages` (`id`),
  ADD CONSTRAINT `fk_color_id` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`),
  ADD CONSTRAINT `fk_fuel_type_id` FOREIGN KEY (`fuel_type_id`) REFERENCES `fuel_types` (`id`),
  ADD CONSTRAINT `fk_transmission_id` FOREIGN KEY (`transmission_id`) REFERENCES `transmissions` (`id`),
  ADD CONSTRAINT `fk_vehicle_condition_id` FOREIGN KEY (`vehicle_condition_id`) REFERENCES `vehicle_conditions` (`id`),
  ADD CONSTRAINT `fk_vehicle_model_id` FOREIGN KEY (`vehicle_model_id`) REFERENCES `vehicle_models` (`id`),
  ADD CONSTRAINT `fk_vehicle_type_id` FOREIGN KEY (`vehicle_type_id`) REFERENCES `vehicle_types` (`id`);

--
-- Contraintes pour la table `vehicle_models`
--
ALTER TABLE `vehicle_models`
  ADD CONSTRAINT `fk_brand_id` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
