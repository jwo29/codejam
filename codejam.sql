--
-- Table strucure for table `study`
--

CREATE TABLE `study` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `title` varchar(20) NOT NULL,
    `desc` text,
    `created` datetime NOT NULL,
    PRIMARY KEY (`id`)
);

--
--Dumping data for table `author`
--

INSERT INTO `study` VALUES (1, 'JavaScript', 'JS is ...', NOW());