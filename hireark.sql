-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 20, 2020 at 10:16 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hireark`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `ac_id` int(11) NOT NULL,
  `ac_name` varchar(50) NOT NULL,
  `ac_email` varchar(50) NOT NULL,
  `ac_no_hp` varchar(20) NOT NULL,
  `ac_password` varchar(100) NOT NULL,
  `ac_level` int(11) NOT NULL,
  `ac_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `ac_updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`ac_id`, `ac_name`, `ac_email`, `ac_no_hp`, `ac_password`, `ac_level`, `ac_created_at`, `ac_updated_at`) VALUES
(1, 'AFAREL RAMDANI', 'afarelshop@gmail.com', '08', '$2b$10$HMANlm.sn4SRHHotSCxPGuppeb4qK8UuNExTWNGI8ZJcXPfiEQSUe', 0, '2020-11-20 06:04:50', '2020-11-20 06:04:50'),
(2, 'Pasific', 'pasific@gmail.com', '08', '$2b$10$GhGOkFymB9nYf63s5VZZAOaLG0z2iRq24Yc90dBeTiv1lEh.ME.0a', 1, '2020-11-20 06:05:27', '2020-11-20 06:05:27'),
(3, 'Sejahtera Abadi', 'sejahteraabadi@gmail.com', '08', '$2b$10$7wGt8hXjcCwyMs.unLt/guzN2ALLCaXIdE1SLFUn6b3Km6rVgp0JS', 1, '2020-11-20 06:09:39', '2020-11-20 06:09:39');

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `cn_id` int(11) UNSIGNED NOT NULL,
  `ac_id` int(11) NOT NULL,
  `cn_name` varchar(100) NOT NULL,
  `cn_position` varchar(50) NOT NULL,
  `cn_part` varchar(50) NOT NULL,
  `cn_city` varchar(50) NOT NULL,
  `cn_desc` text NOT NULL,
  `cn_instagram` varchar(50) NOT NULL,
  `cn_linkedin` varchar(50) NOT NULL,
  `cn_foto_profile` text NOT NULL,
  `cn_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `cn_updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`cn_id`, `ac_id`, `cn_name`, `cn_position`, `cn_part`, `cn_city`, `cn_desc`, `cn_instagram`, `cn_linkedin`, `cn_foto_profile`, `cn_created_at`, `cn_updated_at`) VALUES
(350, 436, 'PT Mencari Cinta Sejati', 'Staff', '', '', '', '', '', '', '2020-11-20 06:05:27', '2020-11-20 06:05:27'),
(351, 437, 'PT Mencari Cinta Sejati', 'Staff', '', '', '', '', '', '', '2020-11-20 06:09:39', '2020-11-20 06:09:39'),
(352, 438, 'PT Mencari Cinta Sejati', 'Staff', '', '', '', '', '', '', '2020-11-20 06:10:39', '2020-11-20 06:10:39'),
(353, 439, 'PT Mencari Cinta Sejati', 'Staff', '', '', '', '', '', '', '2020-11-20 06:11:40', '2020-11-20 06:11:40'),
(355, 8, 'PT Mencari Cinta Sejati', 'Staff', '', '', '', '', '', '', '2020-11-20 06:14:23', '2020-11-20 06:14:23');

-- --------------------------------------------------------

--
-- Table structure for table `engineer`
--

CREATE TABLE `engineer` (
  `en_id` int(11) UNSIGNED NOT NULL,
  `ac_id` int(11) DEFAULT NULL,
  `en_job_tittle` varchar(50) NOT NULL,
  `en_job_type` enum('freelance','fulltime','','') NOT NULL,
  `en_origin` varchar(50) NOT NULL,
  `en_desc` text NOT NULL,
  `en_foto_profile` varchar(100) NOT NULL,
  `en_created_at` timestamp NULL DEFAULT current_timestamp(),
  `en_updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `engineer`
--

INSERT INTO `engineer` (`en_id`, `ac_id`, `en_job_tittle`, `en_job_type`, `en_origin`, `en_desc`, `en_foto_profile`, `en_created_at`, `en_updated_at`) VALUES
(117, 435, '', 'freelance', '', '', '', '2020-11-20 06:04:50', '2020-11-20 06:04:50');

-- --------------------------------------------------------

--
-- Table structure for table `experience`
--

CREATE TABLE `experience` (
  `ex_id` int(11) UNSIGNED NOT NULL,
  `en_id` int(11) UNSIGNED DEFAULT NULL,
  `ex_position` varchar(50) NOT NULL,
  `ex_company` varchar(50) NOT NULL,
  `ex_start` date NOT NULL,
  `ex_end` date NOT NULL,
  `ex_desc` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `hire`
--

CREATE TABLE `hire` (
  `hr_id` int(11) UNSIGNED NOT NULL,
  `en_id` int(11) UNSIGNED DEFAULT NULL,
  `pj_id` int(11) UNSIGNED DEFAULT NULL,
  `hr_price` bigint(12) UNSIGNED NOT NULL,
  `hr_message` text NOT NULL,
  `hr_status` enum('wait','reject','approve','') NOT NULL,
  `hr_date_confirm` datetime NOT NULL,
  `hr_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `portofolio`
--

CREATE TABLE `portofolio` (
  `pr_id` int(11) UNSIGNED NOT NULL,
  `en_id` int(11) UNSIGNED NOT NULL,
  `pr_application` varchar(100) NOT NULL,
  `pr_desc` text NOT NULL,
  `pr_link_pub` varchar(100) NOT NULL,
  `pr_link_repo` varchar(100) NOT NULL,
  `pr_tp_kerja` varchar(100) NOT NULL,
  `pr_type` enum('mobile application','web application','','') NOT NULL,
  `pr_gambar` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `pj_id` int(11) UNSIGNED NOT NULL,
  `cn_id` int(11) UNSIGNED DEFAULT NULL,
  `pj_project_name` varchar(100) NOT NULL,
  `pj_desc` text NOT NULL,
  `pj_deadline` date NOT NULL,
  `pj_picture` varchar(50) NOT NULL,
  `pj_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `pj_updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `skill`
--

CREATE TABLE `skill` (
  `sk_id` int(11) UNSIGNED NOT NULL,
  `en_id` int(11) NOT NULL,
  `sk_name_skill` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`ac_id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`cn_id`);

--
-- Indexes for table `engineer`
--
ALTER TABLE `engineer`
  ADD PRIMARY KEY (`en_id`),
  ADD KEY `ac_id` (`ac_id`),
  ADD KEY `ac_id_2` (`ac_id`);

--
-- Indexes for table `experience`
--
ALTER TABLE `experience`
  ADD PRIMARY KEY (`ex_id`),
  ADD UNIQUE KEY `en_id` (`en_id`),
  ADD KEY `en_id_2` (`en_id`);

--
-- Indexes for table `hire`
--
ALTER TABLE `hire`
  ADD PRIMARY KEY (`hr_id`),
  ADD UNIQUE KEY `pj_id` (`pj_id`),
  ADD UNIQUE KEY `en_id` (`en_id`),
  ADD KEY `en_id_2` (`en_id`),
  ADD KEY `pj_id_2` (`pj_id`),
  ADD KEY `en_id_3` (`en_id`),
  ADD KEY `pj_id_3` (`pj_id`),
  ADD KEY `en_id_4` (`en_id`);

--
-- Indexes for table `portofolio`
--
ALTER TABLE `portofolio`
  ADD PRIMARY KEY (`pr_id`),
  ADD UNIQUE KEY `en_id` (`en_id`),
  ADD KEY `en_id_2` (`en_id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`pj_id`),
  ADD UNIQUE KEY `cn_id` (`cn_id`),
  ADD KEY `cn_id_2` (`cn_id`);

--
-- Indexes for table `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`sk_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `ac_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `cn_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=356;

--
-- AUTO_INCREMENT for table `engineer`
--
ALTER TABLE `engineer`
  MODIFY `en_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

--
-- AUTO_INCREMENT for table `experience`
--
ALTER TABLE `experience`
  MODIFY `ex_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `hire`
--
ALTER TABLE `hire`
  MODIFY `hr_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `portofolio`
--
ALTER TABLE `portofolio`
  MODIFY `pr_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `pj_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `skill`
--
ALTER TABLE `skill`
  MODIFY `sk_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
