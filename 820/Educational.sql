-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Mar 27, 2024 at 05:22 AM
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
-- Table structure for table `Educational`
--

CREATE TABLE `Educational` (
  `id` int NOT NULL,
  `student_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'ชื่อนักเรียน',
  `student_age` int NOT NULL COMMENT 'อายุนักศึกษา',
  `student_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'ที่อยู่นักศึกษา',
  `education_level` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'ระดับการศึกษา',
  `study_subject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'วิชา',
  `study_grade` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'เกรด',
  `extra_learning_activities` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'กิจกรรมเสริมการเรียน',
  `teacher_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'ชื่ออาจารย์',
  `teaching_subject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'วิชาที่สอน',
  `class_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'เวลาเรียน'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Educational`
--

INSERT INTO `Educational` (`id`, `student_name`, `student_age`, `student_address`, `education_level`, `study_subject`, `study_grade`, `extra_learning_activities`, `teacher_name`, `teaching_subject`, `class_time`) VALUES
(21, 'สมชาย', 35, 'นครปฐม', 'มหาวิทยาลัย', 'database', 'A+', 'เขียน sql', 'สมหญิง', 'database', 'จันทร์16:00น.-18:00น.\r\nพฤหัสบดี15:00น.-16:00น.'),
(22, 'พัชรพล', 20, 'นนทบุรี', 'มัธยมศึกษา', 'internet', 'A', 'เขียนเว็บ+เซอเวอร์', 'สุริยะ', 'internet', 'ศุกร์9:00น.-13:00น.'),
(23, 'จัสติน', 36, 'ตรัง', 'มัธยมศึกษา', 'ท่องก.-ฮ.', 'A', 'ท่องศัพท์', 'สมปอง', 'ท่องก.-ฮ.', 'พุธ12:00น.-15.00น.'),
(33, 'สีดา', 19, 'เชียงใหม่', 'มัธยมศึกษา', 'แคลคูลัส', 'C+', 'บวกเลขตึงๆ', 'โจเซฟ', 'แคลคูลัส', 'อังคาร14:00น.-15:00น.'),
(34, 'สมหมาย', 21, 'เชียงราย', 'มัธยมศึกษา', 'network', 'A', 'ต่อสายLAN', 'สมศัก', 'network', 'พุธ9:00น.-12:00น.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Educational`
--
ALTER TABLE `Educational`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Educational`
--
ALTER TABLE `Educational`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
