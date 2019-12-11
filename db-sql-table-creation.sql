-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2019 at 10:23 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `web`
--

-- --------------------------------------------------------

--
-- Table structure for table `web_car`
--

CREATE TABLE `web_car` (
  `car_id` int(11) NOT NULL,
  `car_reg` varchar(40) NOT NULL,
  `car_model` varchar(40) NOT NULL,
  `car_price` varchar(40) NOT NULL,
  `car_location` varchar(40) NOT NULL,
  `car_mileage` varchar(40) NOT NULL,
  `car_engine` varchar(40) NOT NULL,
  `car_reg_date` date DEFAULT NULL,
  `car_inspection_date` date DEFAULT NULL,
  `car_ad_date_time` datetime DEFAULT NULL,
  `car_make_fk` int(11) NOT NULL,
  `car_fuel_fk` int(11) NOT NULL,
  `car_gearbox_fk` int(11) NOT NULL,
  `car_user_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `web_car`
--

INSERT INTO `web_car` (`car_id`, `car_reg`, `car_model`, `car_price`, `car_location`, `car_mileage`, `car_engine`, `car_reg_date`, `car_inspection_date`, `car_ad_date_time`, `car_make_fk`, `car_fuel_fk`, `car_gearbox_fk`, `car_user_fk`) VALUES
(81, 'ABC-100', 'A1', '5000', 'Espoo', '240000', '1.6', '2001-04-01', '2019-12-02', '2019-12-10 15:38:57', 4, 2, 1, 61),
(82, 'ABC-101', 'A2', '5000', 'Espoo', '240000', '2.0', '2010-12-01', '2019-12-02', '2019-12-10 15:40:13', 4, 2, 1, 61),
(84, 'ABC-104', 'A4', '5000', 'Espoo', '240000', '1.6', '2011-12-01', '2019-12-02', '2019-12-10 15:43:26', 4, 1, 1, 62),
(86, 'ABC-106', 'A6', '5000', 'Espoo', '240000', '2.0', '2018-12-01', '2019-12-02', '2019-12-10 15:48:04', 4, 2, 1, 63),
(88, 'ABC-108', 'A8', '5000', 'Espoo', '240000', '2.0', '1998-12-01', '2019-12-02', '2019-12-10 21:35:08', 4, 1, 1, 71);

-- --------------------------------------------------------

--
-- Table structure for table `web_comment`
--

CREATE TABLE `web_comment` (
  `comment_id` int(11) NOT NULL,
  `commment_car_fk` int(11) NOT NULL,
  `comment_user_fk` int(11) NOT NULL,
  `comment_text` varchar(200) NOT NULL,
  `comment_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `web_fav`
--

CREATE TABLE `web_fav` (
  `fav_id` int(11) NOT NULL,
  `fav_car_fk` int(11) NOT NULL,
  `fav_user_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `web_fav`
--

INSERT INTO `web_fav` (`fav_id`, `fav_car_fk`, `fav_user_fk`) VALUES
(1, 82, 62),
(2, 82, 63),
(3, 84, 63),
(6, 82, 71),
(7, 84, 71);

-- --------------------------------------------------------

--
-- Table structure for table `web_fuel`
--

CREATE TABLE `web_fuel` (
  `fuel_id` int(11) NOT NULL,
  `fuel_type` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `web_fuel`
--

INSERT INTO `web_fuel` (`fuel_id`, `fuel_type`) VALUES
(1, 'petrol'),
(2, 'diesel'),
(3, 'hybrid'),
(4, 'electric');

-- --------------------------------------------------------

--
-- Table structure for table `web_gearbox`
--

CREATE TABLE `web_gearbox` (
  `gearbox_id` int(11) NOT NULL,
  `gearbox_type` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `web_gearbox`
--

INSERT INTO `web_gearbox` (`gearbox_id`, `gearbox_type`) VALUES
(1, 'automatic'),
(2, 'manual');

-- --------------------------------------------------------

--
-- Table structure for table `web_image`
--

CREATE TABLE `web_image` (
  `image_id` int(11) NOT NULL,
  `image_car_fk` int(11) NOT NULL,
  `image_filename` varchar(40) NOT NULL,
  `image_profile` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `web_image`
--

INSERT INTO `web_image` (`image_id`, `image_car_fk`, `image_filename`, `image_profile`) VALUES
(242, 81, 'aad7695f1d3e7d96ab7d171c618746fb', 1),
(243, 81, '6bd52348a805ba209943e7adddbf19d4', NULL),
(244, 81, '93224b741d7a4c2f7ba887622f892160', NULL),
(245, 81, 'f633613c96be29da2dd6abc265a12b1f', NULL),
(246, 81, 'ae09c44f33574e9f159a8bcb167bcbbe', NULL),
(247, 82, 'ed8f5a7e614ba909986271169faa027f', NULL),
(248, 82, '980922ffcec55d6c44327daedc7b2445', 1),
(249, 82, '21fadf03c16c88da57dc702495b05489', NULL),
(250, 82, '04d437aad25f00661fdea824c378ab4b', NULL),
(251, 82, 'a3bbbdab8c6e670c523627abb85afa7d', NULL),
(257, 84, 'e0e3ad82298d5095f811074390482283', NULL),
(258, 84, '9e3c6820725dfd41c9784b39a664d6d6', NULL),
(259, 84, 'c7398d8d5d3f2d8c2cae18260b2eebd2', NULL),
(260, 84, '7439fa800520b65c048c50e178d018d4', 1),
(261, 84, 'eec0430e07f8ac44f48c61dd3b0a37e4', NULL),
(267, 86, '6083075448f0a0d3844479d9d5a3e2fd', 1),
(268, 86, '5a867a13fb3dbd2cc118fc15a223a65e', NULL),
(269, 86, '922532c08b33712b6ac834d3d12706b2', NULL),
(270, 86, '7a48f84c7121e46a6d88a76defdfc56d', NULL),
(271, 86, '359b2de96c17a4ff4cfba5c4a113de50', NULL),
(277, 88, '4a45de0f5be4197384451b2574fa2a5b', 1),
(278, 88, 'c5e3006a1c9bcf3253449b90c1babf04', NULL),
(279, 88, 'f199525edc12c971db89d571324daee2', NULL),
(280, 88, '20e9de06bc671a68045cb98821ab85e2', NULL),
(281, 88, 'eb05b5eb19ed0f085c7b2992b810c7c8', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `web_make`
--

CREATE TABLE `web_make` (
  `make_id` int(11) NOT NULL,
  `make_name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `web_make`
--

INSERT INTO `web_make` (`make_id`, `make_name`) VALUES
(4, 'Audi'),
(6, 'BMW'),
(5, 'Honda'),
(1, 'Toyota'),
(3, 'Volkswagen'),
(2, 'Volvo');

-- --------------------------------------------------------

--
-- Table structure for table `web_user`
--

CREATE TABLE `web_user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(40) NOT NULL,
  `user_email` varchar(40) NOT NULL,
  `user_address` varchar(255) NOT NULL,
  `user_password` varchar(200) NOT NULL,
  `user_admin` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `web_user`
--

INSERT INTO `web_user` (`user_id`, `user_name`, `user_email`, `user_address`, `user_password`, `user_admin`) VALUES
(59, 'admin', 'admin@carapp.fi', 'admin address', '$2a$12$llCy2/oac6kZW4.Zz5uwLuOn1W9JQmZYVOsCxmh0eHT1JNGb.7clK', 1),
(61, 'tester1', 'tester1@metropolia.fi', 'tester1 address', '$2a$12$sN4Bq2.10ESySaUJcx9ZWuuJAGpqKLPWhD.i9CKGs6PSPnDYGldsS', NULL),
(62, 'tester2', 'tester2@metropolia.fi', 'tester2 address', '$2a$12$maux.nCBs5peBiaY3.TxRusjDfnnBv9sXL1tw8shP6HzK.R/To/u.', NULL),
(63, 'tester3', 'tester3@metropolia.fi', 'tester3 address', '$2a$12$KhwDwWbJksHs840W8BAHdemC0woimm4MTSk0Cd/ayacAOS3jINU.m', NULL),
(64, 'tester4', 'tester4@metropolia.fi', 'tester4 address', '$2a$12$XRKZzTOrcvf9NDCdqOJi/eazAlourSWKP.ymggwDFWTyF6nzFfene', NULL),
(70, 'tester5', 'tester5@metropolia.fi', 'tester5 address', '$2a$12$/w6ghQcZSyfDkjfbtUmB2O3/Ao0Zq5sgpjJeYMtFGUpPC5kJPQVs2', NULL),
(71, 'tester6', 'tester6@metropolia.fi', 'tester6 address', '$2a$12$NxGKCbEjpvpHQfVefoXY0ubMnWcYUCQZlXOeN35OlvVMd4V/wuzqa', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `web_car`
--
ALTER TABLE `web_car`
  ADD PRIMARY KEY (`car_id`),
  ADD KEY `make` (`car_make_fk`),
  ADD KEY `fuel_type` (`car_fuel_fk`),
  ADD KEY `car_gearbox` (`car_gearbox_fk`),
  ADD KEY `car_user` (`car_user_fk`);

--
-- Indexes for table `web_comment`
--
ALTER TABLE `web_comment`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `commment_car_fk` (`commment_car_fk`),
  ADD KEY `comment_user_fk` (`comment_user_fk`);

--
-- Indexes for table `web_fav`
--
ALTER TABLE `web_fav`
  ADD PRIMARY KEY (`fav_id`),
  ADD KEY `fav_car_fk` (`fav_car_fk`),
  ADD KEY `fav_user_fk` (`fav_user_fk`);

--
-- Indexes for table `web_fuel`
--
ALTER TABLE `web_fuel`
  ADD PRIMARY KEY (`fuel_id`);

--
-- Indexes for table `web_gearbox`
--
ALTER TABLE `web_gearbox`
  ADD PRIMARY KEY (`gearbox_id`);

--
-- Indexes for table `web_image`
--
ALTER TABLE `web_image`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `car_id` (`image_car_fk`);

--
-- Indexes for table `web_make`
--
ALTER TABLE `web_make`
  ADD PRIMARY KEY (`make_id`),
  ADD UNIQUE KEY `maker` (`make_name`);

--
-- Indexes for table `web_user`
--
ALTER TABLE `web_user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `web_car`
--
ALTER TABLE `web_car`
  MODIFY `car_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `web_comment`
--
ALTER TABLE `web_comment`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `web_fav`
--
ALTER TABLE `web_fav`
  MODIFY `fav_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `web_fuel`
--
ALTER TABLE `web_fuel`
  MODIFY `fuel_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `web_gearbox`
--
ALTER TABLE `web_gearbox`
  MODIFY `gearbox_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `web_image`
--
ALTER TABLE `web_image`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=282;

--
-- AUTO_INCREMENT for table `web_make`
--
ALTER TABLE `web_make`
  MODIFY `make_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `web_user`
--
ALTER TABLE `web_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `web_car`
--
ALTER TABLE `web_car`
  ADD CONSTRAINT `link_to_fuel` FOREIGN KEY (`car_fuel_fk`) REFERENCES `web_fuel` (`fuel_id`),
  ADD CONSTRAINT `link_to_gearbox` FOREIGN KEY (`car_gearbox_fk`) REFERENCES `web_gearbox` (`gearbox_id`),
  ADD CONSTRAINT `link_to_make` FOREIGN KEY (`car_make_fk`) REFERENCES `web_make` (`make_id`),
  ADD CONSTRAINT `link_to_user` FOREIGN KEY (`car_user_fk`) REFERENCES `web_user` (`user_id`);

--
-- Constraints for table `web_comment`
--
ALTER TABLE `web_comment`
  ADD CONSTRAINT `web_comment_ibfk_1` FOREIGN KEY (`comment_user_fk`) REFERENCES `web_user` (`user_id`),
  ADD CONSTRAINT `web_comment_ibfk_2` FOREIGN KEY (`commment_car_fk`) REFERENCES `web_car` (`car_id`);

--
-- Constraints for table `web_fav`
--
ALTER TABLE `web_fav`
  ADD CONSTRAINT `web_fav_ibfk_1` FOREIGN KEY (`fav_car_fk`) REFERENCES `web_car` (`car_id`),
  ADD CONSTRAINT `web_fav_ibfk_2` FOREIGN KEY (`fav_user_fk`) REFERENCES `web_user` (`user_id`);

--
-- Constraints for table `web_image`
--
ALTER TABLE `web_image`
  ADD CONSTRAINT `link_to_car` FOREIGN KEY (`image_car_fk`) REFERENCES `web_car` (`car_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
