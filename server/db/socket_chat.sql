-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 08, 2024 at 09:56 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `socket_chat`
--

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `user_ids` varchar(100) NOT NULL,
  `message` text DEFAULT NULL,
  `attachment` text DEFAULT NULL,
  `read_flag` tinyint(4) NOT NULL DEFAULT 0,
  `is_deleted` tinyint(4) NOT NULL DEFAULT 0,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `user_ids`, `message`, `attachment`, `read_flag`, `is_deleted`, `created_on`, `updated_on`) VALUES
(21, '38,39', 'hi user2', NULL, 0, 0, '2024-07-07 16:44:01', '2024-07-07 16:44:01'),
(22, '39,38', 'hello user1', NULL, 0, 0, '2024-07-07 16:59:06', '2024-07-07 16:59:06'),
(23, '39,38', 'hi user1 what are you doing?', NULL, 0, 0, '2024-07-08 19:34:40', '2024-07-08 19:34:40'),
(24, '38,39', 'nothing just testing socket io', NULL, 0, 0, '2024-07-08 19:35:55', '2024-07-08 19:35:55'),
(25, '39,38', 'ok good', NULL, 0, 0, '2024-07-08 19:39:06', '2024-07-08 19:39:06'),
(26, '38,39', 'are able to see my messages in realtime?', NULL, 0, 0, '2024-07-08 19:39:23', '2024-07-08 19:39:23'),
(27, '39,38', 'yes bro socket is working fine', NULL, 0, 0, '2024-07-08 19:39:35', '2024-07-08 19:39:35');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `email_notification_flag` tinyint(4) NOT NULL DEFAULT 0,
  `push_notification_flag` tinyint(4) NOT NULL DEFAULT 1,
  `email_message_flag` tinyint(4) NOT NULL DEFAULT 0,
  `push_message_flag` tinyint(4) NOT NULL DEFAULT 1,
  `is_active` tinyint(4) NOT NULL DEFAULT 1,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `image`, `email_notification_flag`, `push_notification_flag`, `email_message_flag`, `push_message_flag`, `is_active`, `created_on`, `updated_on`) VALUES
(37, 'shubhamstr', NULL, 0, 1, 0, 1, 1, '2024-07-07 15:22:37', '2024-07-07 15:22:37'),
(38, 'user1', NULL, 0, 1, 0, 1, 1, '2024-07-07 16:12:42', '2024-07-07 16:12:42'),
(39, 'user2', NULL, 0, 1, 0, 1, 1, '2024-07-07 16:23:49', '2024-07-07 16:23:49'),
(48, 'vendor1', NULL, 0, 1, 0, 1, 1, '2024-07-08 19:47:07', '2024-07-08 19:47:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
