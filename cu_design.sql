-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 11, 2022 at 02:15 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cu_design`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_auths`
--

CREATE TABLE `tbl_auths` (
  `Sno` bigint(10) NOT NULL,
  `UserId` varchar(75) NOT NULL,
  `Date` varchar(75) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `User_Password` varchar(100) NOT NULL,
  `Role` varchar(75) NOT NULL,
  `Name` varchar(150) NOT NULL,
  `Mobile` varchar(75) NOT NULL,
  `address` text NOT NULL,
  `organization` varchar(255) NOT NULL,
  `Status` varchar(75) NOT NULL DEFAULT 'Active',
  `deleted` varchar(15) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_auths`
--

INSERT INTO `tbl_auths` (`Sno`, `UserId`, `Date`, `Email`, `User_Password`, `Role`, `Name`, `Mobile`, `address`, `organization`, `Status`, `deleted`) VALUES
(1, '001', '2018-12-14 07:45:45', 'rsat@rankerslearning.com', 'VGhSSENmaHBzVFUzbVZxN0dhMFBWQT09', '1', 'Curriculum Design', '7337223345', '', '', 'Active', '0');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_courses`
--

CREATE TABLE `tbl_courses` (
  `id` int(11) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `course_short_code` varchar(55) NOT NULL,
  `min_credits` int(5) NOT NULL,
  `max_credits` int(5) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `deleted` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_courses`
--

INSERT INTO `tbl_courses` (`id`, `course_name`, `course_short_code`, `min_credits`, `max_credits`, `status`, `deleted`) VALUES
(2, 'Bachelor of Technology', 'B.Tech', 160, 180, 0, 0),
(3, 'Masters of Technology', 'M.Tech', 160, 180, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_institutions`
--

CREATE TABLE `tbl_institutions` (
  `id` int(11) NOT NULL,
  `institution_name` varchar(355) NOT NULL,
  `email` text NOT NULL,
  `password` varchar(155) NOT NULL,
  `address` text NOT NULL,
  `contact_person_name` varchar(155) NOT NULL,
  `contact_person_mobile_number` varchar(20) NOT NULL,
  `contact_person_email` text NOT NULL,
  `status` int(11) NOT NULL,
  `is_email_verified` int(11) NOT NULL,
  `is_mobile_verified` int(11) NOT NULL,
  `deleted` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_programs`
--

CREATE TABLE `tbl_programs` (
  `id` int(11) NOT NULL,
  `program_name` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `deleted` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_programs`
--

INSERT INTO `tbl_programs` (`id`, `program_name`, `status`, `deleted`) VALUES
(2, 'Post Graduate', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_program_course_links`
--

CREATE TABLE `tbl_program_course_links` (
  `id` int(11) NOT NULL,
  `program` int(11) NOT NULL,
  `course` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_program_course_links`
--

INSERT INTO `tbl_program_course_links` (`id`, `program`, `course`) VALUES
(2, 2, 3),
(3, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_semesters`
--

CREATE TABLE `tbl_semesters` (
  `id` int(11) NOT NULL,
  `semester_name` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `deleted` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_semesters`
--

INSERT INTO `tbl_semesters` (`id`, `semester_name`, `status`, `deleted`) VALUES
(1, 'I', 0, 0),
(2, 'II', 1, 0),
(3, 'III', 1, 0),
(4, 'IV', 1, 0),
(7, 'V', 1, 0),
(8, 'VI', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_subcat_course_links`
--

CREATE TABLE `tbl_subcat_course_links` (
  `id` int(11) NOT NULL,
  `course` int(11) NOT NULL,
  `subject_category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_subcat_course_links`
--

INSERT INTO `tbl_subcat_course_links` (`id`, `course`, `subject_category`) VALUES
(1, 2, 2),
(5, 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_subjects`
--

CREATE TABLE `tbl_subjects` (
  `id` int(11) NOT NULL,
  `subject_name` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `deleted` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_subjects`
--

INSERT INTO `tbl_subjects` (`id`, `subject_name`, `status`, `deleted`) VALUES
(2, 'Chemistry', 0, 0),
(3, 'Maths A', 1, 0),
(4, 'Maths B', 1, 0),
(5, 'Physics', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_subject_category`
--

CREATE TABLE `tbl_subject_category` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `deleted` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_subject_category`
--

INSERT INTO `tbl_subject_category` (`id`, `category_name`, `status`, `deleted`) VALUES
(2, 'Humanities', 1, 0),
(3, 'Basic Sciences', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sub_subcat_links`
--

CREATE TABLE `tbl_sub_subcat_links` (
  `id` int(11) NOT NULL,
  `subject_category` int(11) NOT NULL,
  `subject` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_sub_subcat_links`
--

INSERT INTO `tbl_sub_subcat_links` (`id`, `subject_category`, `subject`) VALUES
(7, 3, 2),
(8, 3, 3),
(9, 3, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_auths`
--
ALTER TABLE `tbl_auths`
  ADD PRIMARY KEY (`Sno`),
  ADD KEY `Role` (`Role`);

--
-- Indexes for table `tbl_courses`
--
ALTER TABLE `tbl_courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_institutions`
--
ALTER TABLE `tbl_institutions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_programs`
--
ALTER TABLE `tbl_programs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_program_course_links`
--
ALTER TABLE `tbl_program_course_links`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_semesters`
--
ALTER TABLE `tbl_semesters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_subcat_course_links`
--
ALTER TABLE `tbl_subcat_course_links`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_subjects`
--
ALTER TABLE `tbl_subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_subject_category`
--
ALTER TABLE `tbl_subject_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_sub_subcat_links`
--
ALTER TABLE `tbl_sub_subcat_links`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_auths`
--
ALTER TABLE `tbl_auths`
  MODIFY `Sno` bigint(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_courses`
--
ALTER TABLE `tbl_courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_institutions`
--
ALTER TABLE `tbl_institutions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_programs`
--
ALTER TABLE `tbl_programs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_program_course_links`
--
ALTER TABLE `tbl_program_course_links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_semesters`
--
ALTER TABLE `tbl_semesters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tbl_subcat_course_links`
--
ALTER TABLE `tbl_subcat_course_links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_subjects`
--
ALTER TABLE `tbl_subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_subject_category`
--
ALTER TABLE `tbl_subject_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_sub_subcat_links`
--
ALTER TABLE `tbl_sub_subcat_links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
