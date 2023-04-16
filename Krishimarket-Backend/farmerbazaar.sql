-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 14, 2023 at 08:23 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `farmerbazaar`
--

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` bigint(20) NOT NULL,
  `users_id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `itemCount` bigint(20) NOT NULL DEFAULT 0,
  `itemPrice` bigint(20) NOT NULL DEFAULT 0,
  `img` text NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `users_id`, `name`, `description`, `itemCount`, `itemPrice`, `img`, `created_at`, `updated_at`) VALUES
(3, 1, 'Potato', 'sweet', 1400, 1200, 'no-img.jpg', '2023-04-10 19:31:56', '2023-04-10 19:52:50'),
(4, 1, 'Potato', '1234', 1234, 1234, 'no-img.jpg', '2023-04-10 20:10:32', '2023-04-10 20:10:32'),
(5, 0, 'Potato', 'Sweet', 1500, 1200, 'no-img.jpg', '2023-04-11 17:57:22', '2023-04-11 17:57:22');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `farm_name` varchar(255) DEFAULT NULL,
  `street_address` text NOT NULL,
  `city` text NOT NULL,
  `state` text NOT NULL,
  `zip` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_name`, `password`, `farm_name`, `street_address`, `city`, `state`, `zip`, `created_at`, `updated_at`) VALUES
(1, 'Parth', '$2a$12$yoxVGEXDA8Nn/Ce12XP2DuRA7gb.axe3NDhOyM4ufyW/OQJf8K8zi', 'Hello World', 'Delhi', 'Delhi', 'Delhi', '110035', '2023-04-10 12:35:06', '2023-04-10 12:35:06'),
(2, 'CodeInitiator', '$2a$12$VWGI9xGYlbp/qXUmOteybu2UcCWok0SxVB852B4yIQmpYYk2X2uYC', 'Hello World', 'Pacific Street', 'Delhi', 'Delhi', '110035', '2023-04-11 17:57:07', '2023-04-11 17:57:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_name` (`user_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
