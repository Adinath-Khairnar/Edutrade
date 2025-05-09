-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2025 at 03:41 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `edutrade`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `location` varchar(255) NOT NULL,
  `book_condition` enum('New','Good','Used') NOT NULL,
  `edition` varchar(100) DEFAULT NULL,
  `pages` int(11) DEFAULT NULL,
  `language` varchar(50) DEFAULT NULL,
  `isbn` varchar(20) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `user_id`, `title`, `author`, `price`, `location`, `book_condition`, `edition`, `pages`, `language`, `isbn`, `description`, `image`, `created_at`) VALUES
(2, 7, 'The Great Hunt', 'Robert Jordan', 199.00, 'Jaipur', 'Good', 'Second edition', 190, 'English', '2434243442387', 'The Forsaken are loose, the Horn of Valere has been found and the Dead are rising from their dreamless sleep. The Prophecies are being fulfilled - but Rand al\\\'Thor, the shepherd the Aes Sedai have proclaimed as the Dragon Reborn, desperately seeks to escape his destiny.', 'uploads/1742543474_great hunt.PNG', '2025-03-21 07:51:14'),
(3, 7, 'The Night Circus', 'Erin Morgenstern', 230.00, 'Delhi', 'Good', 'Second edition', 230, 'English', '2434243442387', 'The circus arrives without warning. No announcements precede it. It is simply there, when yesterday it was not. Within the black-and-white striped canvas tents is an utterly unique experience full of breathtaking amazements. It is called Le Cirque des Rêves, and it is only open at night. ', 'uploads/1742545913_circus.PNG', '2025-03-21 08:31:53'),
(4, 7, 'The Book Thief', 'Markus Zusak', 599.00, 'Surat', 'New', 'Second edition', 200, 'English', '457632091243', 'It is 1939. Nazi Germany. The country is holding its breath. Death has never been busier, and will be busier still.\r\n\r\nBy her brother\'s graveside, Liesel\'s life is changed when she picks up a single object, partially hidden in the snow. It is The Gravedigger\'s Handbook, left behind there by accident, and it is her first act of book thievery. So begins a love affair with books and words, as Liesel, with the help of her accordian-playing foster father, learns to read. Soon she is stealing books from Nazi book-burnings, the mayor\'s wife\'s library, wherever there are books to be found.\r\n\r\nBut these are dangerous times. When Liesel\'s foster family hides a Jew in their basement, Liesel\'s world is both opened up, and closed down.\r\n\r\nIn superbly crafted writing that burns with intensity, award-winning author Markus Zusak has given us one of the most enduring stories of our time.\r\n\r\n(Note: this title was not published as YA fiction)\r\n', 'uploads/1742562227_thief.PNG', '2025-03-21 13:03:47'),
(25, 9, 'Artificial Intelligence', 'Deepak Chavan ', 599.00, 'Nagpur', 'Good', 'First Edition ', 433, 'English ', '6548465165465', 'Nice ', 'uploads/1745653617_610 0VFgdJL._AC_UF1000,1000_QL80.jpg', '2025-04-26 07:46:57'),
(26, 9, 'Cloud Computing ', 'Sanket Jadhav', 799.00, 'Punjab', '', 'First Edition ', 200, 'English ', '6546549865654', 'Good Book ', 'uploads/1745653659_61Nf PS8DjL.jpg', '2025-04-26 07:47:39'),
(27, 9, 'PYTHON Programming ', 'Tushar Patil', 230.00, 'Nashik', 'New', 'First Edition ', 233, 'English', '4684656846456', 'Best for Learners ', 'uploads/1745653724_9781493225866_800_2d.jpg', '2025-04-26 07:48:44'),
(28, 9, 'Java Book ', 'Alex Clein ', 899.00, 'New Delhi ', 'Good', 'First Edition ', 545, 'English', '5464654654', '', 'uploads/1745653786_978-1-4302-0032-1.jpg', '2025-04-26 07:49:46'),
(29, 9, 'Advance Database', 'Deepak', 89.00, 'Dhule', 'Good', 'First ', 40, 'English', '5464654654684', 'Niceq', 'uploads/1745754575_Untitled (1).jpg', '2025-04-27 11:49:35'),
(30, 9, 'C Programming Language ', 'Devil', 599.00, 'Punjab', 'Good', 'First ', 456, 'English ', '1876548465465', 'New Condition', 'uploads/1745756161_91-l2iv-4hL._UF1000,1000_QL80.jpg', '2025-04-27 12:16:01'),
(31, 9, 'Psychology Of Money', 'Morgon Housel', 150.00, 'Nashik', 'New', 'First Edition ', 200, 'English ', '546552132645', 'Good', 'uploads/1745835245_the-psychology-of-money-original.jpg', '2025-04-28 10:14:05'),
(32, 19, 'Rich Dad Poor Dad', 'Robert Kiyosaki ', 199.00, 'Nashik ', 'Good', 'First', 520, 'English', '54846546546', 'Best book to Read ', 'uploads/1745912977_images (2).jpg', '2025-04-29 07:49:37');

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `buyer_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `sender_id` int(11) NOT NULL,
  `timestamp` datetime DEFAULT current_timestamp(),
  `file_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`id`, `book_id`, `seller_id`, `buyer_id`, `message`, `sender_id`, `timestamp`, `file_url`) VALUES
(16, 4, 7, 2, 'hey', 2, '2025-04-12 00:12:09', NULL),
(18, 2, 7, 3, 'hui', 3, '2025-04-18 00:01:38', 'blob:http://localhost:5173/7768efe8-1870-4401-9486-62d023f30a36'),
(19, 4, 7, 2, 'Want to Buy Book', 7, '2025-04-24 12:16:41', NULL),
(20, 4, 7, 2, 'How Much You will give ', 7, '2025-04-24 12:23:56', NULL),
(23, 25, 9, 10, 'Hello', 10, '2025-04-26 13:48:12', NULL),
(24, 25, 9, 10, 'Hello', 9, '2025-04-26 13:48:26', NULL),
(25, 25, 9, 10, 'I want to Purchase This Book', 10, '2025-04-26 13:48:48', NULL),
(26, 25, 9, 10, 'How should i pickup this Book ', 10, '2025-04-26 13:49:16', NULL),
(27, 25, 9, 10, 'You\'d come near Sandip University ', 9, '2025-04-26 13:50:12', NULL),
(28, 25, 9, 10, 'Okay', 10, '2025-04-26 13:50:37', NULL),
(29, 25, 9, 10, 'Okay ', 9, '2025-04-26 13:50:43', NULL),
(31, 25, 9, 10, 'Hello', 9, '2025-04-28 15:31:09', NULL),
(32, 3, 7, 10, 'Hello', 10, '2025-04-28 15:34:13', NULL),
(33, 28, 9, 10, 'Hello', 10, '2025-04-28 15:35:44', NULL),
(34, 31, 9, 9, 'hiee', 9, '2025-04-28 15:44:40', NULL),
(35, 3, 7, 19, 'hello I want to Buy this book', 19, '2025-05-02 12:24:33', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `type` enum('book','stationery') DEFAULT 'book',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`id`, `user_id`, `product_id`, `type`, `created_at`) VALUES
(9, 3, 22, 'book', '2025-04-06 12:20:26'),
(10, 7, 22, 'book', '2025-04-06 13:30:09'),
(15, 2, 22, 'book', '2025-04-08 14:25:44'),
(16, 2, 6, 'book', '2025-04-08 17:31:26'),
(17, 7, 3, 'book', '2025-04-12 07:12:16'),
(18, 3, 3, 'book', '2025-04-19 07:00:51'),
(19, 3, 7, 'book', '2025-04-19 07:01:22'),
(21, 3, 2, 'book', '2025-04-19 07:20:48'),
(26, 3, 11, 'book', '2025-04-19 07:21:11'),
(27, 3, 11, 'stationery', '2025-04-19 07:32:12'),
(29, 3, 9, 'stationery', '2025-04-19 07:37:15'),
(30, 7, 11, 'stationery', '2025-04-19 17:30:38'),
(33, 9, 9, 'stationery', '2025-04-28 10:39:05');

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `note_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_type` varchar(10) DEFAULT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`note_id`, `user_id`, `title`, `subject`, `file_name`, `file_type`, `uploaded_at`) VALUES
(4, 9, 'Introduction to react', 'Web Development', 'Introduction to React.pdf', 'pdf', '2025-04-26 07:58:28'),
(7, 9, 'ADB NOTES', 'Computer Science', 'ADB Notes.pdf', 'pdf', '2025-04-27 12:35:13'),
(8, 9, 'OOAD Notes', 'Computer Science', 'OOAD Unit-4 notes.pdf', 'pdf', '2025-04-28 10:15:43');

-- --------------------------------------------------------

--
-- Table structure for table `question_papers`
--

CREATE TABLE `question_papers` (
  `question_paper_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `university` varchar(255) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `question_papers`
--

INSERT INTO `question_papers` (`question_paper_id`, `user_id`, `subject`, `university`, `year`, `file_path`, `uploaded_at`) VALUES
(4, 9, 'NEET 2024', 'Allen Institute ', 2024, '680c94791e9bb_38500 3rd year fees.pdf', '2025-04-26 08:08:25'),
(5, 9, 'Critical Thinking', 'Sandip University', 2024, '680e33f603e54_QB-Critical-Thinking.pdf', '2025-04-27 13:41:10'),
(6, 9, 'CET ', 'SSVPS University ', 2025, '680f5571a22b4_sample-mht-cet-2025-question-paper.pdf', '2025-04-28 10:16:17');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `reviewer_id` int(11) DEFAULT NULL,
  `reviewee_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `product_type` enum('book','product') DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `review` text DEFAULT NULL,
  `role` enum('buyer','seller') DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `reviewer_id`, `reviewee_id`, `product_id`, `product_type`, `rating`, `review`, `role`, `created_at`) VALUES
(5, 7, 3, 22, NULL, 5, 'nice seller', 'buyer', '2025-04-06 19:30:05'),
(6, 2, 3, 22, NULL, 5, 'nice', 'buyer', '2025-04-08 22:05:42'),
(7, 2, 7, 4, NULL, 3, 'good', 'buyer', '2025-04-12 00:12:17'),
(8, 10, 9, 25, NULL, 5, 'Nice Condition', 'buyer', '2025-04-26 13:57:18');

-- --------------------------------------------------------

--
-- Table structure for table `search_history`
--

CREATE TABLE `search_history` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `search_term` varchar(255) NOT NULL,
  `searched_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stationery_chat`
--

CREATE TABLE `stationery_chat` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `buyer_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `sender_id` int(11) NOT NULL,
  `timestamp` datetime DEFAULT current_timestamp(),
  `file_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stationery_chat`
--

INSERT INTO `stationery_chat` (`id`, `product_id`, `buyer_id`, `seller_id`, `message`, `sender_id`, `timestamp`, `file_url`) VALUES
(5, 9, 3, 7, 'hey😊😊😊🫠', 3, '2025-04-17 22:32:53', NULL),
(17, 11, 3, 7, 'hey', 3, '2025-04-18 00:00:27', NULL),
(20, 9, 3, 7, '😁😍', 3, '2025-04-18 20:57:33', NULL),
(21, 9, 3, 7, 'hey', 3, '2025-04-19 12:20:20', NULL),
(23, 9, 3, 7, 'how much You will give for the stationery ?', 7, '2025-04-24 12:32:32', NULL),
(24, 9, 3, 7, '100 $ Okay ?', 3, '2025-04-24 12:37:49', NULL),
(25, 17, 9, 9, 'hello', 9, '2025-04-27 19:31:18', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `stationery_items`
--

CREATE TABLE `stationery_items` (
  `product_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `course` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_url` text NOT NULL,
  `color` varchar(50) DEFAULT NULL,
  `size` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `item_condition` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stationery_items`
--

INSERT INTO `stationery_items` (`product_id`, `user_id`, `name`, `course`, `location`, `price`, `image_url`, `color`, `size`, `created_at`, `item_condition`, `brand`, `description`) VALUES
(9, 7, 'Calculator', '2022', 'Surat', 299.00, 'http://localhost/MarkV/uploads/stationery/calci.jpg', 'Black', '1', '2025-04-11 07:32:33', 'Used', 'Casio', 'Good '),
(11, 7, 'Sheet container', '2023', 'Surat', 399.00, 'http://localhost/MarkV/uploads/stationery/67f9164508ff5_container.jpg', 'Black', '1', '2025-04-11 13:16:53', 'Like New', 'cello', 'good product'),
(12, 7, 'calcilator', '2022', 'Pune', 355.00, 'http://localhost/MarkV/uploads/stationery/67f916d9a281d_calci.jpg', 'black', '1', '2025-04-11 13:19:21', 'Used', 'casio', 'nice'),
(14, 7, 'Sheet container', '2022', 'Mumbai', 399.00, 'http://localhost/MarkV/uploads/stationery/67f917c3c4148_container.jpg', 'Black', '1', '2025-04-11 13:23:15', 'New', 'casio', 'Nice product'),
(15, 7, 'Calculator', '2022', 'Pune', 399.00, 'http://localhost/MarkV/uploads/stationery/67f91cd115191_calci.jpg', 'Black', '1', '2025-04-11 13:44:49', 'Like New', 'Casio', 'good '),
(16, 9, 'Duster', 'Cleaning', 'Nashik', 70.00, 'http://localhost/MarkV/uploads/stationery/680c955e4135e_images.jpg', 'Brown and Green ', '1', '2025-04-26 08:12:14', 'Like New', 'Amol ', 'Good Condition '),
(17, 9, 'Multi Colour Pens', '2024', 'Nashik', 130.00, 'http://localhost/MarkV/uploads/stationery/680e38990d8cc_images (1).jpg', 'All Colour', '13', '2025-04-27 14:00:57', 'New', 'Cello', 'All Are Working Fine'),
(18, 9, 'Pen Stand', '2025', 'Nashik', 100.00, 'http://localhost/MarkV/uploads/stationery/680f55aa35d44_x7p9e_512.jpg', 'Black', '1', '2025-04-28 10:17:14', 'New', 'Nirmal Steel', 'Contact for any detail\'s '),
(19, 9, 'Highlighter', '2025', 'Nashik', 140.00, 'http://localhost/MarkV/uploads/stationery/680f5a9f1fb6c_-original-imagw3dtyrrjazhg.jpg', 'All Colour', '5', '2025-04-28 10:38:23', 'Like New', 'Luxot', 'Useful'),
(20, 9, 'All Colour Pens', '2024', 'Nashik', 180.00, 'http://localhost/MarkV/uploads/stationery/680f5be489d80_neonpen24-kivya-original-imah95g.jpg', 'All Colour', '24', '2025-04-28 10:43:48', 'Like New', 'ZuiXua', '1.0 mm pens');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `buyer_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` enum('Pending','Completed','Cancelled') DEFAULT 'Pending',
  `transaction_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `verified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `phone`, `location`, `created_at`, `verified`) VALUES
(1, 'Adinath Kai', 'adinath232@gmail.com', '$2y$10$QdOVrEA8ZIN6tm3hYMUVbejir224BDpu/rezBKc8bpopJhRj43OYO', '8545651478', 'Nashik', '2025-03-19 11:50:59', 1),
(2, 'prajakta Medhe', 'praj12@gmail.com', '$2y$10$gb1zhwCkRofbZ5K.7sFDme8XoQzsOmSg8MdDNKQP3Cp4akBTAow1y', '8668610462', 'Nashik', '2025-03-19 12:01:33', 0),
(3, 'Sanket Nikam', 'Sanket12@gmail.com', '$2y$10$yhKkWvVnqzVgjA27r4HuY.MbdUDAsS2tFwJ7yhAj8EMAQiSVnw9WG', '8598741454', 'Nimbol', '2025-03-19 12:05:20', 0),
(4, 'Deepak chavhan', 'deeps12@gmail.com', '$2y$10$9NNJ9PgwoMEXRJanTsSMauqaAkVp7JajX0/sYht0aK9j7.mllZQ1W', '8925146525', 'Nashik', '2025-03-19 12:20:49', 0),
(5, 'Salman khan', 'Sallu1@gmail.com', '$2y$10$HkUN8cBWDq.uacpipCDBve1hPfgbJjGb2GcJp6VMGioBJ.UA5ZbaG', NULL, NULL, '2025-03-20 07:41:46', 0),
(7, 'Adinath Khairnar', 'adinath231@gmail.com', '$2y$10$TPEK5Xom4MOXEqyQprJZFeAFgAJ9AU6NaVJPBh0ZYuQH3H9XKIvtW', '9518789814', 'Nashik', '2025-03-20 08:37:52', 1),
(8, 'Kunal Khairnar', 'Kunal01@gmail.com', '$2y$10$/TVTKsEMDh5rcW377iI95..Nin4w2/Ql3Vn/ayhOaFKCgO2MHXcQi', '8545741487', 'Pune', '2025-04-09 11:12:26', 0),
(9, 'Deepak Chavan', 'deepak18@gmail.com', '$2y$10$rbxpgxjJytLLBuRyf0VdMO5k7aHxK7.HubLsbzCvCfTdRmxarRpmy', '8669831973', 'Nashik', '2025-04-26 07:10:31', 1),
(10, 'Shantanu Ahirrao', 'alex@gmail.com', '$2y$10$LzCMQHggG2nQBJrnsNkCzePQI/yjREIRKKtglEMG7jYLA9EkMrp9O', '8669831973', 'Nashik', '2025-04-26 08:17:39', 0),
(12, 'Dogeshwar', 'dogee@gmail.com', '$2b$10$raRjIL6ffnhRzneCIWxN8.qws2ECIQ6BLtAPTtFGkHQVXVpVbb9Ue', '9373966507', 'Nashik', '2025-04-28 08:11:09', 0),
(18, 'Sanket Nikam', 'sanketnikam317@gmail.com', '$2b$10$.dy1E3wn8e37.EhzQ8vuQOpjR.8YpvVS1uPWYt/eL0N64trX4RgSO', '8669831973', 'Nashik', '2025-04-29 07:37:37', 1),
(19, 'Deepak Tulshiram Chavan', 'www.deepakchavan18@gmail.com', '$2b$10$TjJx9LIQnLl.Fq9GvggjI.9lIurCL9kqMT092xQ2MyUaBdRvvZGIG', '+918669831973', 'Nashik', '2025-04-29 07:39:58', 1),
(20, 'Aryaman Bhamre', 'aryamanbhamare@gmail.com', '$2b$10$/MG2D3Q3/ywI98/ZF1q6UODPHhREgN6UYxh9zj59cWPq86sLOTIy.', '5846546840', 'Nashik', '2025-04-29 09:01:12', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `book_id` (`book_id`),
  ADD KEY `seller_id` (`seller_id`),
  ADD KEY `buyer_id` (`buyer_id`),
  ADD KEY `sender_id` (`sender_id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`note_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `question_papers`
--
ALTER TABLE `question_papers`
  ADD PRIMARY KEY (`question_paper_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `search_history`
--
ALTER TABLE `search_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `stationery_chat`
--
ALTER TABLE `stationery_chat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stationery_items`
--
ALTER TABLE `stationery_items`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `buyer_id` (`buyer_id`),
  ADD KEY `seller_id` (`seller_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `note_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `question_papers`
--
ALTER TABLE `question_papers`
  MODIFY `question_paper_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `search_history`
--
ALTER TABLE `search_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stationery_chat`
--
ALTER TABLE `stationery_chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `stationery_items`
--
ALTER TABLE `stationery_items`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `chat_ibfk_3` FOREIGN KEY (`buyer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `chat_ibfk_4` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
