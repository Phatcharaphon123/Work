-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Mar 24, 2024 at 10:41 AM
-- Server version: 8.3.0
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `product_name` varchar(255) NOT NULL COMMENT 'ชื่อสินค้า',
  `price` int NOT NULL COMMENT 'ราคา',
  `quantity` int NOT NULL COMMENT 'จำนวนคงเหลือ',
  `date` varchar(255) NOT NULL COMMENT 'วันที่',
  `time` varchar(255) NOT NULL COMMENT 'เวลา',
  `product_id` varchar(255) NOT NULL COMMENT 'รหัสสินค้า',
  `quantity_sold` int NOT NULL COMMENT 'จำนวนที่ขาย',
  `customer_name` varchar(255) NOT NULL COMMENT 'ชื่อ',
  `address` varchar(255) NOT NULL COMMENT 'ที่อยู่',
  `phone` varchar(255) NOT NULL COMMENT 'เบอร์โทรศัพท์'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_name`, `price`, `quantity`, `date`, `time`, `product_id`, `quantity_sold`, `customer_name`, `address`, `phone`) VALUES
(1, 'monitor', 7900, 100, '12/01/2024', '2:15 pm.', '0001', 1, 'khongpop', 'khongpop@gmail.com', '0829081143'),
(2, 'mouse', 1290, 100, '13/01/2024', '11:15 am.', '0002', 1, 'aotto', 'aotto@gmail.com', '0809027789');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
