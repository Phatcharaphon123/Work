-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Mar 24, 2024 at 12:34 PM
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
  `study_grade:` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'เกรด',
  `extra_learning_activities` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'กิจกรรมเสริมการเรียน',
  `teacher_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'ชื่ออาจารย์',
  `teaching_subject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'วิชาที่สอน',
  `class_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'เวลาเรียน'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Educational`
--

INSERT INTO `Educational` (`id`, `student_name`, `student_age`, `student_address`, `education_level`, `study_subject`, `study_grade:`, `extra_learning_activities`, `teacher_name`, `teaching_subject`, `class_time`) VALUES
(1, 'พัชรพล ยอดราช', 20, 'นนทบุรี', 'มหาวิทยาลัย', 'เทคโนโลยีอินเทอร์เน็ต', 'A+', 'เชื่อมต่อเซอเวอร์', 'สุริยะ', 'เทคโนโลยีอินเทอร์เน็ต', 'วันศุกร์9:00 น.-13:00น.'),
(2, 'พัชรพล เทพซ่า', 35, 'นครปฐม', 'มัธยมศึกษา', 'ฐานข้อมูล', 'ฺิB+', 'เขียนโค้ต SQL', 'ดีเลิศ', 'ฐานข้อมูล', 'จันทร์16:00น.-18:00น.\r\nพฤหัสบดี15:00น.-16:00น.');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
