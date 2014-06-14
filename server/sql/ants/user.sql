DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`(
  id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  salt TINYBLOB NOT NULL,
  password_hash TINYBLOB NOT NULL,
  email VARCHAR(250) NOT NULL,
  email_state_id INT NOT NULL,
  created_at INT UNSIGNED NOT NULL,
  is_open_source TINYINT UNSIGNED NOT NULL,
  source MEDIUMTEXT NOT NULL,
  UNIQUE KEY by_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;
