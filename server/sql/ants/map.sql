DROP TABLE IF EXISTS `map`;
CREATE TABLE `map`(
  id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name TEXT NOT NULL,
  terrain TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;
